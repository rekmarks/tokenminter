
// general packages
import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// @material-ui components
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

// @material-ui icons
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney'

// local imports

import { getPath } from '../utils'

// redux
import { actionCreators as w3sActions } from 'web3-sagas'

// components
import Dashboard from './Dashboard'
import FormManager from './FormManager'

// style
import styles from './style/App.style'
import withMuiRoot from '../withMuiRoot'

// misc
import flavorMessages from '../misc/flavorMessages'

class App extends Component {

  constructor (props) {

    super(props)

    // Reloads the page if Ethereum network or accounts change
    // TODO: handle reloads gracefully, actually use the web3Saga listeners
    // props.addWeb3Listeners() // add web3 saga listeners
    window.ethereum.on('accountsChanged', accounts => {
      window.location.reload()
    })
    window.ethereum.on('networkChanged', networkId => {
      window.location.reload()
    })

    this.props.getWeb3()
  }

  render () {

    const classes = this.props.classes

    return (
      <Router>
        <div style={{ width: '100%' }}>
          <AppBar
              position="relative"
              className={classNames(
                classes.appBar
              )}
            >
            <Toolbar>
              {/* <AttachMoneyIcon className={classes.largeIcon} /> */}
              <Link to={getPath('/')} style={{textDecoration: 'none'}}>
                <Typography variant="h4" color="default" noWrap>
                  TokenMinter
                </Typography>
              </Link>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route exact path={getPath('/')} component={Dashboard} />
            <Redirect exact from={getPath('/actions')} to={getPath('/')} />
            <Route
              path={getPath('/actions/*')} render={props => <FormManager {...props} />}
            />
          </Switch>
          <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
              Remember
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
              {
                // flavorMessages[Math.floor(Math.random * (flavorMessages.length + 1))]
                flavorMessages[Math.random() * flavorMessages.length | 0]
              }
            </Typography>
          </footer>
        </div>
      </Router>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object,
  getWeb3: PropTypes.func.isRequired,
  addWeb3Listeners: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    getWeb3: () => dispatch(w3sActions.web3.getWeb3()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withMuiRoot(withStyles(styles)(App)))
