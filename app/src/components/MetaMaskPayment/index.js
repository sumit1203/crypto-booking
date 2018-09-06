import React from 'react'
import iconSrc from './icon.svg'
import BookingContainer from '../Booking'

const PENDING = 'pending'
const SUCCESS = 'success'
const ERROR = 'error'

export default class MetaMaskIntegration extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      confirmedTxs: []
    }
  }

  addTx = (txHash, status = PENDING) => {
    this.setState(({confirmedTxs}) => ({confirmedTxs: [...confirmedTxs, {txHash, status}]}))
  }

  updateLastTx = status => {
    this.setState(prevState => {
      const {confirmedTxs} = prevState
      const lastTx = confirmedTxs[confirmedTxs.length - 1]
      return {confirmedTxs: [...confirmedTxs.slice(0, confirmedTxs.length - 1), {...lastTx, status}]}
    })
  }

  onClick = async () => {
    const {txs} = this.props
    for (let i = 0; i < txs.length; i++) {
      try {
        await BookingContainer.web3.eth.sendTransaction(txs[i]).once('transactionHash', txHash => this.addTx(txHash))
        this.updateLastTx(SUCCESS)
      } catch (e) {
        this.updateLastTx(ERROR)
        console.error(e)
      }
    }
  }

  renderTxStatus = (status) => {
    switch (status) {
      case  PENDING:
        return <i className="mdi mdi-loading mdi-24px mdi-spin text-primary"/>
      case  SUCCESS:
        return <i className="mdi mdi-24px mdi-check" style={{color: "#4BB543"}}/>
      case  ERROR:
        return <i className="mdi mdi-24px mdi-do-not-disturb" style={{color: "red"}}/>
    }
  }

  render () {
    const {confirmedTxs} = this.state
    if (!BookingContainer.web3.currentProvider.isMetaMask) return null
    if (!confirmedTxs.length) return (
      <button type="button" className="btn btn-primary" onClick={this.onClick}>
        <img className='d-inline-block' src={iconSrc} height={24} width={24}/>
        <span> &nbsp; Pay with metaMask</span>
      </button>
    )
    return confirmedTxs.map(tx => (
      <div key={tx.txHash} className="metamask-tx">
        {this.renderTxStatus(tx.status)}
        &nbsp; <p className="metamask-tx-label">{tx.txHash}</p>
      </div>
    ))
  }
}

