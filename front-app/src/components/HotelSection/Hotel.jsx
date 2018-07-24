import React from 'react';

export default class Hotel extends React.Component {

  render() {

    return (
      <article class="section-wrapper bg--gradient-toright pt-4 pb-3 text-center text-md-left"
      style={{
        borderBottom: '1px solid rgba(255,255,255,.2)'
      }}
      >
        <div class="container">

          <div class="row flex-column flex-md-row align-items-center">
            <div class="col-md-8 mb-1 mb-md-0">
              <h2 class="mb-1 text-white">
                Boutique Hotel i31 Berlin
              </h2>
              <p class="text-white mb-1">
                Das 4 Sterne Superior Hotel in Berlin Mitte –  nur 1 km vom Berliner Hauptbahnhof entfernt – begrüßt
                seine Gäste in einem modernen Design und trotzdem mit dem lässigen Gefühl Berlins.
              </p>
              <p class="text-white">
                <b>For more info please check</b> <a className="text-light" href="https://www.hotel-i31.de/">https://www.hotel-i31.de/</a>
              </p>
          </div>
          <div class="col-md-4 text-center">
            <i class="mdi mdi-48px mdi-xxl mdi-office-building d-block mb-1 mb-md-2 text-white"></i>
            <a href="/startups-and-developers.html" class="btn btn-outline-light">
              Pick a room
            </a>
          </div>
        </div>

        </div>
      </article>
    );

  }

}