pragma solidity ^0.4.24;

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
  // RoomType => Night => Room => Booking
  struct Booking {
    address guest;
    bytes32 bookingHash;
  }
  struct RoomType {
    uint256 totalRooms;
    mapping(uint256 => mapping(uint256 => Booking)) nights;
  }
  mapping(string => RoomType) rooms;

  // The total amount of nights offered for booking
  uint256 public totalNights;

  // The ERC20 lifToken that will be used for payment
  ERC20 public lifToken;

  event BookingChanged(
    string roomType, uint256[] nights, uint256 room,
    address newGuest, bytes32 bookingHash
  );

  event BookingDone(
    string roomType, uint256[] nights, uint256 room,
    address guest, bytes32 bookingHash
  );

  event RoomsAdded(string roomType, uint256 newRooms);

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
   * @param roomType The room type to be added
   * @param amount The amount of rooms to be increased
   */
  function addRooms(string roomType, uint256 amount) onlyOwner public {
    rooms[roomType].totalRooms = rooms[roomType].totalRooms.add(amount);
    emit RoomsAdded(roomType, amount);
  }

  /**
   * @dev Book a room for a certain address, internal function
   * @param roomType The room type to be booked
   * @param _nights The nights that we want to book
   * @param room The room that wants to be booked
   * @param guest The address of the guest that will book the room
   */
  function bookRoom(
    string roomType, uint256[] _nights, uint256 room,
    address guest, bytes32 bookingHash
  ) internal {
    for (uint i = 0; i < _nights.length; i ++) {
      rooms[roomType].nights[_nights[i]][room].guest = guest;
      rooms[roomType].nights[_nights[i]][room].bookingHash = bookingHash;
    }
    emit BookingDone(roomType, _nights, room, guest, bookingHash);
  }

  /**
   * @dev Book a room for a certain address, onlyOwner function
   * @param roomType The room type to be booked
   * @param _nights The nights that we want to book
   * @param room The room that wants to be booked
   * @param guest The address of the guest that will book the room
   */
  function changeBooking(
    string roomType, uint256[] _nights, uint256 room,
    address guest, bytes32 bookingHash
  ) public onlyOwner {
    for (uint i = 0; i < _nights.length; i ++) {
      rooms[roomType].nights[_nights[i]][room].guest = guest;
      rooms[roomType].nights[_nights[i]][room].bookingHash = bookingHash;
    }
    emit BookingChanged(roomType, _nights, room, guest, bookingHash);
  }

  /**
   * @dev Book a room paying with ETH
   * @param pricePerNight The price per night in wei
   * @param offerTimestamp The timestamp of when the offer ends
   * @param offerSignature The signature provided by the offer signer
   * @param roomType The room type that the guest wants to book
   * @param _nights The nights that the guest wants to book
   */
  function bookWithEth(
    uint256 pricePerNight,
    uint256 offerTimestamp,
    bytes offerSignature,
    string roomType,
    uint256[] _nights,
    bytes32 bookingHash
  ) public payable {
    // Check that the offer is still valid
    require(offerTimestamp < now);

    // Check the eth sent
    require(pricePerNight.mul(_nights.length) <= msg.value);

    // Check if there is at least one room available
    uint256[] memory available = roomsAvailable(roomType, _nights);
    require(available.length > 0);

    // Check the signer of the offer is the right address
    bytes32 priceSigned = keccak256(abi.encodePacked(
      roomType, pricePerNight, offerTimestamp, "eth", bookingHash
    )).toEthSignedMessageHash();
    require(offerSigner == priceSigned.recover(offerSignature));

    // Assign the available room to the guest
    bookRoom(roomType, _nights, available[0], msg.sender, bookingHash);

    // Transfer the eth to the owner
    owner.transfer(msg.value);
  }

  /**
   * @dev Book a room paying with Lif
   * @param pricePerNight The price per night in wei
   * @param offerTimestamp The timestamp of when the offer ends
   * @param offerSignature The signature provided by the offer signer
   * @param roomType The room type that the guest wants to book
   * @param _nights The nights that the guest wants to book
   */
  function bookWithLif(
    uint256 pricePerNight,
    uint256 offerTimestamp,
    bytes offerSignature,
    string roomType,
    uint256[] _nights,
    bytes32 bookingHash
  ) public {
    // Check that the offer is still valid
    require(offerTimestamp < now);

    // Check the amount of lifTokens allowed to be spent by this contract
    uint256 lifTokenAllowance = lifToken.allowance(msg.sender, address(this));
    require(pricePerNight.mul(_nights.length) <= lifTokenAllowance);

    // Check if there is at least one room available
    uint256[] memory available = roomsAvailable(roomType, _nights);
    require(available.length > 0);

    // Check the signer of the offer is the right address
    bytes32 priceSigned = keccak256(abi.encodePacked(
      roomType, pricePerNight, offerTimestamp, "lif", bookingHash
    )).toEthSignedMessageHash();
    require(offerSigner == priceSigned.recover(offerSignature));

    // Assign the available room to the guest
    bookRoom(roomType, _nights, available[0], msg.sender, bookingHash);

    // Transfer the lifTokens to the owner
    lifToken.transferFrom(msg.sender, owner, lifTokenAllowance);
  }

  /**
   * @dev Get the total rooms for a room type
   * @param roomType The room type that wants to be booked
   */
  function totalRooms(string roomType) view public returns (uint256) {
    return rooms[roomType].totalRooms;
  }

  /**
   * @dev Get the availability of a specific room
   * @param roomType The room type that wants to be booked
   * @param _nights The nights to check availability
   * @param room The room that wants to be booked
   * @return bool If the room is available or not
   */
  function roomAvailable(
    string roomType, uint256[] _nights, uint256 room
  ) view public returns (bool) {
    require(room <= rooms[roomType].totalRooms);
    for (uint i = 0; i < _nights.length; i ++) {
      require(_nights[i] <= totalNights);
      if (rooms[roomType].nights[_nights[i]][room].guest != address(0))
        return false;
      }
    return true;
  }

  /**
   * @dev Get the available rooms for certain nights
   * @param roomType The room type that wants to be booked
   * @param _nights The nights to check availability
   * @return uint256 Array of the rooms available for that nights
   */
  function roomsAvailable(
    string roomType, uint256[] _nights
  ) view public returns (uint256[]) {
    require(_nights[i] <= totalNights);
    uint256[] memory available = new uint256[](rooms[roomType].totalRooms);
    for (uint z = 1; z <= rooms[roomType].totalRooms; z ++) {
      available[z-1] = z;
      for (uint i = 0; i < _nights.length; i ++)
        if (rooms[roomType].nights[_nights[i]][z].guest != address(0)) {
          available[z-1] = 0;
          break;
        }
    }
    return available;
  }


}
