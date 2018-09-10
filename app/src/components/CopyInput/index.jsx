import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class CopyLinkInput extends React.Component {
  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      isCopied: false,
    };
  }

  onClickUrl = () => {
    this.copyToClipboard();
    this.setState({ isCopied: true });
    setTimeout(() => {
      this.setState({ isCopied: false });
    }, 3000);
  }

  setInput = (input) => {
    this.input = input;
  }

  copyToClipboard = () => {
    if (this.input) this.input.select();
    window.document.execCommand('copy');
  }

  render() {
    const {
      state: { isCopied },
      props: { className, ...restProps },
    } = this;
    const buttonClass = classnames('btn btn-block btn-primary', { 'btn-success': isCopied });
    const inputClass = classnames('form-control', className);
    return (
      <form className="input-group input-group--responsive">
        <input {...restProps} ref={this.setInput} className={inputClass} />
        <div className="input-group-append">
          <button type="button" onClick={this.onClickUrl} className={buttonClass}>
            {isCopied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </form>
    );
  }
}

CopyLinkInput.propTypes = {
  className: PropTypes.string,
};
