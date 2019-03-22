
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Redirect } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'

import { getPath } from '../utils'

import EthereumIcon from './common/EthereumIcon'

const containerStyle = {
  position: 'absolute',
  width: '100%',
  top: '50%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}

const buttonStyle = {
  top: '15px',
  alignSelf: 'center',
  color: '#ffffff',
  backgroundColor: '#7cb342',
  fontWeight: 'bold',
}

/**
 * Minimalist EIP1102-compliance solution that prevents its children from
 * rendering until the user enables web3. Also informs user whether they
 * need to install MetaMask or if the connection to MetaMask failed.
 */
class Web3Gatekeeper extends Component {

  constructor (props) {

    super(props)

    this.state = {
      ethereumInjected: false,
      web3Enabled: false,
      enableFailed: false,
    }
  }

  componentDidMount () {

    // only allow MetaMask for now
    // TODO: let other dapp browsers through
    if (window.ethereum && window.ethereum.isMetaMask) {
      this.setState({ ethereumInjected: true })
    }

    // if there's a selected address available, the user has already enabled
    // web3
    if (window.ethereum && window.ethereum.selectedAddress) {
      this.setState({ web3Enabled: true })
    }
  }

  render () {

    if (!this.state.web3Enabled) {

      return (
        ['/', ''].includes(this.props.location.pathname)
        ? <Fragment>
            <EthereumIcon/>
            <div style={containerStyle}>
              <Typography
                align="center"
                variant="h2"
              >
                {
                  !this.state.ethereumInjected
                  ? 'Please Download MetaMask'
                  : this.state.enableFailed
                    ? 'Access Denied'
                    : 'Please Connect to MetaMask'
                }
              </Typography>
              {
                this.state.enableFailed || !this.state.ethereumInjected
                ? null
                : <Fab
                    size="large"
                    variant="extended"
                    style={buttonStyle}
                    onClick={this.handleConnect}
                  >
                    Connect
                  </Fab>
              }
            </div>
          </Fragment>
        : <Redirect to={getPath('/')}/>
      )
    }

    return this.props.children
  }

  /**
   * Calls window.ethereum.enable() and sets component state per result.
   */
  handleConnect = async (event) => {

    event.preventDefault()

    let accounts

    try {
      accounts = await window.ethereum.enable()
    } catch (error) {
      console.error(error)
      this.setState({ enableFailed: true })
      return
    }

    // if it somehow failed without throwing anything
    if (!accounts || accounts.length < 1) {
      console.error('No accounts found.')
      this.setState({ enableFailed: true })
      return
    }

    // exactly one account should be returned
    if (accounts.length > 1) {
      console.warn('More than one Web3 account found. ' +
        'Defaulting to first account.', accounts)
    }

    this.setState({ web3Enabled: true })
  }
}

Web3Gatekeeper.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object,
}

export default withRouter(Web3Gatekeeper)
