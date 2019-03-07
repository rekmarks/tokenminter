
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

// redux
import { actionCreators as w3sActions } from 'web3-sagas'

// local components
import Dashboard from './Dashboard'
import FormManager from './FormManager'

// style
import styles from './style/App.style'
import withMuiRoot from '../withMuiRoot'

class App extends Component {

  constructor (props) {

    super(props)

    // Reloads the page if Ethereum network or accounts change
    // TODO: handle this gracefully
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
              <Link to="/" style={{textDecoration: 'none'}}>
                <Typography variant="h4" color="default" noWrap>
                  TokenMinter
                </Typography>
              </Link>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Redirect exact from="/actions" to="/" />
            <Route
              path="/actions/*" render={props => <FormManager {...props} />}
            />
            <Route path="/sune" component={() => <h2>Ayyyyyy</h2>} />
          </Switch>
          <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
              Remember
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
              Carnivorism causes cancer.
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
