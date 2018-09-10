import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const CollaborationSection = () => (
  <article className="section-wrapper py-5">
    <div className="container py-md-2 py-lg-3">
      <div className="row justify-content-center">
        <div className="col-lg-10 text-center">
          <p className="mb-1 h3">
            Winding Tree provides ETH Berlin accomodation services together with our
            partner Botique Hotel i31.
          </p>
          <p className="h4 lead">
            We offer at least a
            <b>
              20% discount
            </b>
            to hackers and engineers who pay
            with
            <AnchorLink href="#paying-with-lif">
              <b>
                LIF
              </b>
            </AnchorLink>
            or
            <b>
              ETH
            </b>
            .
          </p>
        </div>
      </div>
    </div>
  </article>
);

export default CollaborationSection;
