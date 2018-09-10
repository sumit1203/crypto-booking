/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import Transaction, { transactionType } from '../../../components/Transaction';
import MetaMaskIntegration from '../../../components/MetaMaskPayment';
import Loader from '../../../components/Loader';

class CheckEmail extends React.Component {
  static defaultProps = {
    instructions: null,
  }

  componentDidMount() {
    $('#checkEmail').modal('show');
    $('#checkEmail').on('hidden.bs.modal', () => {
      this.props.onClose();
    });
  }

  render() {
    const { instructions, loading } = this.props;
    return (
      <div className="modal" id="checkEmail" tabIndex="-2" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            {loading ? <Loader block={200} label="Loading..." /> : <Transactions txs={instructions.txs} />}
          </div>
        </div>
      </div>
    );
  }
}

const Transactions = (props) => {
  const { txs } = props;
  return (
    <Fragment>
      <div className="modal-header">
        <h5 className="modal-title">
          Please, check your email
        </h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <i className="mdi mdi-close" />
        </button>
      </div>
      <div className="modal-body">
        <h5 className="mb-1">
          We sent the payment instructions to your email address.
        </h5>
        <h5 className="mb-1">
          To pay your room and book it
        </h5>
        {txs.length > 1 ? <LifBody txs={txs} /> : <EthBody tx={txs[0]} />}
        <MetaMaskIntegration txs={txs} />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-dismiss="modal">
          Ok
        </button>
      </div>
    </Fragment>
  );
};

const EthBody = ({ tx }) => (
  <Fragment>
    <h5 className="mb-1">
      Please, send following transaction.
    </h5>
    <Transaction {...tx} />
  </Fragment>
);

const LifBody = ({ txs }) => (
  <Fragment>
    <h5 className="mb-1">
      Please send the following transactions in order.
    </h5>
    {txs.map((tx, index) => <Transaction key={index} {...tx} />)}
  </Fragment>
);

LifBody.propTypes = { txs: PropTypes.arrayOf(PropTypes.shape(transactionType)).isRequired };
EthBody.propTypes = { tx: transactionType.isRequired };
Transactions.propTypes = { txs: PropTypes.arrayOf(PropTypes.shape(transactionType)).isRequired };

CheckEmail.propTypes = {
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  instructions: PropTypes.shape({
    txs: PropTypes.arrayOf(PropTypes.shape(transactionType)),
    booking: PropTypes.object,
  }),
};

export default CheckEmail;
