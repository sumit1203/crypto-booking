import React from 'react'
import classnames from 'classnames'

export default class CopyLinkInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isCopied: false
    }
  }

  copyToClipboard = () => {
    if (this.input) this.input.select()
    window.document.execCommand('copy')
  }

  setInput = (input) => {
    this.input = input
  }

  onClickUrl = () => {
    this.copyToClipboard()
    this.setState({isCopied: true})
    setTimeout(() => {
      this.setState({isCopied: false})
    }, 3000)
  }

  render () {
    const {
      state: {isCopied},
      props: {className, ...restProps}
    } = this
    const buttonClass = classnames('btn btn-block btn-primary', {['btn-success']: isCopied})
    const inputClass = classnames('form-control', className)
    return (
      <form className="input-group input-group--responsive">
        <input {...restProps} ref={this.setInput} className={inputClass}/>
        <div className="input-group-append">
          <button onClick={this.onClickUrl} className={buttonClass}>
            {isCopied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </form>
    )
  }
}
