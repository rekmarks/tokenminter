
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'

export default class MintResult extends Component {

  handleAddToWallet = event => {

    event.preventDefault()
    const data = this.props.deploymentResult.data

    this.props.watchAsset(
      data.address,
      data.constructorParams[1].value,
      data.constructorParams[2].value,
    )
  }

  render () {

    const classes = this.props.classes

    return (
      <Fragment>
        {
          !this.props.deploymentResult
          ? <Typography variant="h5" align="center" gutterBottom>
              Please wait while your token is created...
            </Typography>
          : this.getResultJsx(classes)
        }
      </Fragment>
    )
  }

  getResultJsx = classes => {

    if (this.props.deploymentResult.error) {
      return (
        <Typography variant="h6" align="center" gutterBottom>
          {
            'We\'re sorry, your deployment appears to have failed.\n' +
            'Please check MetaMask or the developer console. We will improve ' +
            'this message in the future.'
          }
        </Typography>
      )
    }
    return (
      <div style={{ textAlign: 'center' }}>
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
        <Button
           variant="contained"
           color="primary"
           className={classes.button}
           onClick={this.handleAddToWallet}
           style={{ marginLeft: 0 }}
        >
          Add to Wallet
        </Button>
      </div>
    )
  }
}

MintResult.propTypes = {
  classes: PropTypes.object.isRequired,
  deploymentResult: PropTypes.object,
  watchAsset: PropTypes.func.isRequired,
}
