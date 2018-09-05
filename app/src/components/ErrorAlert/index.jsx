import React from 'react'
import $ from 'jquery'
import PropTypes from 'prop-types'

class ErrorAlert extends React.Component {
    componentDidMount() {
        const {onClose} = this.props
        $('.alert').addClass('show')
        setTimeout(() => {
          $('.alert').removeClass('show')
          onClose()
        }, 3000)
    }

    render() {
        const {message} = this.props 
        return (
            <div className="alert fade fixed-top alert-danger text-center" role="alert">
                <span>{message}</span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }
}

ErrorAlert.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
}

export default ErrorAlert
