pragma solidity ^0.4.21;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "zeppelin-solidity/contracts/ECRecovery.sol";

/**
 * @title BookingPoC
 * @dev A contract to offer hotel rooms for booking, the payment can be done
 * with ETH or Lif
 */
contract BookingPoC is Ownable {

  using SafeMath for uint256;
  using ECRecovery for bytes32;

  // The account that will sign the offers
  address public offerSigner;

  // A mapping of the rooms booked by night, it saves the guest address by
  // room/night
  // Night => Room => Guest
  mapping(uint256 => mapping(uint256 => address)) public nights;

  // The total amount of rooms offered for booking
  uint256 public totalRooms;

  // The total amount of nights offered for booking
  uint256 public totalNights;

  // The ERC20 lifToken that will be used for payment
  ERC20 public lifToken;

  event BookingChanged(uint256[] nights, uint256 room, address newGuest);

  event BookingDone(uint256[] nights, uint256 room, address guest);

  event RoomsAdded(uint256 newRooms);

  /**
   * @dev Constructor
   * @param _offerSigner Address of the account that will sign offers
   * @param _lifToken Address of the Lif token contract
   * @param _totalNights The max amount of nights to be booked
   */
  function BookingPoC(
    address _offerSigner, address _lifToken, uint256 _totalNights
  ) public {
    require(_offerSigner != address(0));
    require(_lifToken != address(0));
    require(_totalNights > 0);
    offerSigner = _offerSigner;
    lifToken = ERC20(_lifToken);
    totalNights = _totalNights;
  }

  /**
   * @dev Change the signer or lif token addresses, only called by owner
   * @param _offerSigner Address of the account that will sign offers
   * @param _lifToken Address of the Lif token contract
   */
  function edit(address _offerSigner, address _lifToken) onlyOwner public {
    require(_offerSigner != address(0));
    require(_lifToken != address(0));
    offerSigner = _offerSigner;
    lifToken = ERC20(_lifToken);
  }

  /**
   * @dev Increase the amount of rooms offered, only called by owner
   * @param rooms The amount of rooms to be increased
   */
  function addRooms(uint256 rooms) onlyOwner public {
    totalRooms = totalRooms.add(rooms);
    emit RoomsAdded(rooms);
  }

  /**
   * @dev Book a room for a certain address, internal function
   * @param _nights The nights that we want to book
   * @param room The room that wants to be booked
   * @param guest The address of the guest that will book the room
   */
  function bookRoom(uint256[] _nights, uint256 room, address guest) internal {
    for (uint i = 0; i < _nights.length; i ++)
      nights[_nights[i]][room] = guest;
    emit BookingDone(_nights, room, guest);
  }

  /**
   * @dev Book a room for a certain address, onlyOwner function
   * @param _nights The nights that we want to book
   * @param room The room that wants to be booked
   * @param guest The address of the guest that will book the room
   */
  function changeBooking(
    uint256[] _nights, uint256 room, address guest
  ) public onlyOwner {
    for (uint i = 0; i < _nights.length; i ++)
      nights[_nights[i]][room] = guest;
    emit BookingChanged(_nights, room, guest);
  }

  /**
   * @dev Book a room paying with ETH
   * @param pricePerNight The price per night in wei
   * @param offerTimestamp The timestamp of when the offer ends
   * @param offerSignature The signature provided by the offer signer
   * @param _nights The nights that the guest wants to book
   */
  function bookWithEth(
    uint256 pricePerNight,
    uint256 offerTimestamp,
    bytes offerSignature,
    uint256[] _nights
  ) public payable {
    // Check that the offer is still valid
    require(offerTimestamp < now);

    // Check the eth sent
    require(pricePerNight.mul(_nights.length) <= msg.value);

    // Check if there is at least one room available
    uint256[] memory rooms = roomsAvailable(_nights);
    require(rooms.length > 0);

    // Check the signer of the offer is the right address
    bytes32 priceSigned = keccak256(
      abi.encodePacked(pricePerNight, offerTimestamp, "eth")
    ).toEthSignedMessageHash();
    require(offerSigner == priceSigned.recover(offerSignature));

    // Assign the available room to the guest
    bookRoom(_nights, rooms[0], msg.sender);

    // Transfer the eth to the owner
    owner.transfer(msg.value);
  }

  /**
   * @dev Book a room paying with Lif
   * @param pricePerNight The price per night in wei
   * @param offerTimestamp The timestamp of when the offer ends
   * @param offerSignature The signature provided by the offer signer
   * @param _nights The nights that the guest wants to book
   */
  function bookWithLif(
    uint256 pricePerNight,
    uint256 offerTimestamp,
    bytes offerSignature,
    uint256[] _nights
  ) public {
    // Check that the offer is still valid
    require(offerTimestamp < now);

    // Check the amount of lifTokens allowed to be spent by this contract
    uint256 lifTokenAllowance = lifToken.allowance(msg.sender, address(this));
    require(pricePerNight.mul(_nights.length) <= lifTokenAllowance);

    // Check if there is at least one room available
    uint256[] memory rooms = roomsAvailable(_nights);
    require(rooms.length > 0);

    // Check the signer of the offer is the right address
    bytes32 priceSigned = keccak256(
      abi.encodePacked(pricePerNight, offerTimestamp, "lif")
    ).toEthSignedMessageHash();
    require(offerSigner == priceSigned.recover(offerSignature));

    // Assign the available room to the guest
    bookRoom(_nights, rooms[0], msg.sender);

    // Transfer the lifTokens to the owner
    lifToken.transferFrom(msg.sender, owner, lifTokenAllowance);
  }


  /**
   * @dev Get the availability of a specific room
   * @param _nights The nights to check availability
   * @param room The room that wants to be booked
   * @return bool If the room is available or not
   */
  function roomAvailable(uint256[] _nights, uint256 room) view public returns (bool) {
    require(room <= totalRooms);
    for (uint i = 0; i < _nights.length; i ++) {
      require(_nights[i] <= totalNights);
      if (nights[_nights[i]][room] != address(0))
        return false;
      }
    return true;
  }

  /**
   * @dev Get the available rooms for certain nights
   * @param _nights The nights to check availability
   * @return uint256 Array of the rooms available for that nights
   */
  function roomsAvailable(uint256[] _nights) view public returns (uint256[]) {
    require(_nights[i] <= totalNights);
    uint256[] memory rooms = new uint256[](totalRooms);
    for (uint z = 1; z <= totalRooms; z ++) {
      rooms[z-1] = z;
      for (uint i = 0; i < _nights.length; i ++)
        if (nights[_nights[i]][z] != address(0)) {
          rooms[z-1] = 0;
          break;
        }
    }
    return rooms;
  }

}
