import React from 'react';

export default class Hotel extends React.Component {

  render() {

    return (
      <article className="section-wrapper bg--gradient-toright pt-4 pb-3 text-center text-md-left"
      style={{
        borderBottom: '1px solid rgba(255,255,255,.2)'
      }}
      >
        <div className="container">

          <div className="row flex-column flex-md-row align-items-center">
            <div className="col-md-8 mb-1 mb-md-0">
              <h2 className="mb-1 text-white">
                Boutique Hotel i31 Berlin
              </h2>
              <p className="text-white mb-1">
                Das 4 Sterne Superior Hotel in Berlin Mitte –  nur 1 km vom Berliner Hauptbahnhof entfernt – begrüßt
                seine Gäste in einem modernen Design und trotzdem mit dem lässigen Gefühl Berlins.
              </p>
              <p className="text-white">
                <b>For more info please check</b> <a className="text-light" href="https://www.hotel-i31.de/">https://www.hotel-i31.de/</a>
              </p>
          </div>
          <div className="col-md-4 text-center">
            <i className="mdi mdi-48px mdi-xxl mdi-office-building d-block mb-1 mb-md-2 text-white"/>
            <a href="/startups-and-developers.html" className="btn btn-outline-light">
              Pick a room
            </a>
          </div>
        </div>

        </div>
      </article>
    );

  }

}