import React from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import AnchorLink from 'react-anchor-link-smooth-scroll';

export default class Hotel extends React.Component {

  render() {

    const {name, description, url} = this.props;

    return (
      <article className="section-wrapper bg--gradient-toright pt-4 pb-3 text-center text-md-left"
      style={{
        borderBottom: '1px solid rgba(255,255,255,.2)'
      }}
      >
        <div className="container">

          <div className="row flex-column flex-md-row align-items-center">
            <div className="col-md-8 mb-1 mb-md-0">
              <h2 className="mb-1 text-white"> {name} </h2>
              <MarkdownRenderer markdown={description} className="text-white mb-1"/>
              <p className="text-white">
                <b>For more info please check</b>
                <a className="ml-1 btn btn-sm btn-secondary" href={url}>&nbsp;{url}</a>
              </p>
          </div>
          <div className="col-md-4 text-center">
            <i className="mdi mdi-48px mdi-xxl mdi-office-building d-block mb-1 mb-md-2 text-white"/>
            <AnchorLink href="#pick-room" className="btn btn-outline-light">
              Pick a room
            </AnchorLink>
          </div>
        </div>

        </div>
      </article>
    );

  }

}