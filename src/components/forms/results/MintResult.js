
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Typography } from '@material-ui/core'

export default class MintResult extends Component {

  getResultJsx = () => {

    if (this.props.deploymentResult.error) {
      return (
        <Typography variant="h6" align="center" gutterBottom>
          {
            'We\'re sorry, your deployment appears to have failed.\n' +
            'Please see MetaMask for details.'
          }
        </Typography>
      )
    }
    return (
      <Fragment>
        <Typography variant="h5" align="center" gutterBottom>
          Success!
        </Typography>
        <Typography variant="subtitle1" align="center">
          Your token was deployed at the following address:
        </Typography>
        <CopyToClipboard
          text={this.props.deploymentResult.data.address}
          style={{ cursor: 'pointer'}}
        >
          <Typography variant="subtitle1" align="center" gutterBottom>
            {this.props.deploymentResult.data.address}
          </Typography>
        </CopyToClipboard>
      </Fragment>
    )
  }

  render () {
    return (
      <Fragment>
        {
          !this.props.deploymentResult
          ? <Typography variant="h5" align="center" gutterBottom>
              Please wait while your token is created...
            </Typography>
          : this.getResultJsx()
        }
      </Fragment>
    )
  }
}

MintResult.propTypes = {
  classes: PropTypes.object,
  deploymentResult: PropTypes.object,
}
