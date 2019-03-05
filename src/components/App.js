
// general packages
import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

// @material-ui components
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

// @material-ui icons
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney'

// local components
import Dashboard from './Dashboard'
import FormManager from './FormManager'

// style
import styles from './style/App.style'
import withMuiRoot from '../withMuiRoot'

class App extends Component {

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
              <Typography variant="h4" color="inherit" noWrap>
                TokenMinter
              </Typography>
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
        </div>
      </Router>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object,
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withMuiRoot(withStyles(styles)(App)))
