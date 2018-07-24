import React from 'react';
import Web3 from 'web3';
import imgRoom1 from '../../img/content/hotel-rooms/hotel-room-01.jpg';
import imgRoom2 from '../../img/content/hotel-rooms/hotel-room-02.jpg';
import imgRoom3 from '../../img/content/hotel-rooms/hotel-room-03.jpg';
import imgRoom4 from '../../img/content/hotel-rooms/hotel-room-04.jpg';

import Room from '../Room';

class RoomsSection extends React.Component {
  constructor(props) {
    super(props);
    this.web3 = new Web3(process.env.WEB3_PROVIDER);
    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    // TODO ask for rooms data
    try {
      const mockedRequest = () => new Promise(() => []);
      const response = await mockedRequest();
      this.setState({ isLoading: false, rooms: response });
    } catch (e) {
      this.setState({ isLoading: true });
    }
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) return null; // TODO here should be some Loading component
    return (
      <article className="section-wrapper bg--gradient-toright pt-1 pb-4 text-center text-md-left">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2 className="text-white my-2 h3">
                  Rooms for hackers with discount
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="card mr-1">
                <img className="card-img-top" src={imgRoom1} alt="Card image cap" />
                <div className="card-body p-2">
                  <h5 className="card-title h4">
                      Double Room
                    <small className="float-right">
                      <b>
                          $80/Night
                      </b>
                    </small>
                  </h5>
                  <hr className="my-1" />
                  <p className="card-text">
                      Room description goes here, lorem ipsum dolor sit amet,
                      consectetur adipisicing elit. Rem vel fuga voluptate ipsam nostrum velit aut
                      corporis, eveniet dolor illo officiis consectetur adipisci similique architecto
                      laborum assumenda deleniti suscipit dolore.
                  </p>
                  <p>
                    <b>
                        Price in USD
                    </b>
                      : 100$/night
                  </p>
                  <p>
                    <b>
                        Price in Lif
                    </b>
                      : 80$/night
                  </p>
                  <a href="#" className="btn  btn-secondary mt-1">
                      Book this room
                  </a>
                  <a href="#" className="float-right mt-2">
                      How to pay with Lif
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card ml-1">
                <img className="card-img-top" src={imgRoom4} alt="Card image cap" />
                <div className="card-body p-2">
                  <h5 className="card-title h4">
                      Twinn Room
                    <small className="float-right">
                      <b>
                          $80/Night
                      </b>
                    </small>
                  </h5>
                  <hr className="my-1" />
                  <p className="card-text">
                      Room description goes here, lorem ipsum dolor sit amet,
                      consectetur adipisicing elit. Rem vel fuga voluptate ipsam nostrum velit aut
                      corporis, eveniet dolor illo officiis consectetur adipisci similique architecto
                      laborum assumenda deleniti suscipit dolore.
                  </p>
                  <p>
                    <b>
                        Price in USD
                    </b>
                      : 100$/night
                  </p>
                  <p>
                    <b>
                        Price in Lif
                    </b>
                      : 80$/night
                  </p>
                  <a href="#" className="btn  btn-secondary mt-1">
                      Book this room
                  </a>
                  <a href="#" className="float-right mt-2">
                      How to pay with Lif
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </article>
    );
  }
}

export default RoomsSection;
