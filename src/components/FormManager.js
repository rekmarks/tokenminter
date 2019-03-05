
/**
 * Courtesy:
 * https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/page-layout-examples/checkout
 */

import React, { Component, Fragment } from 'react'
import { Prompt, matchPath } from 'react-router-dom'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

// TODO: temp
import AddressForm from './temp/AddressForm'
import PaymentForm from './temp/PaymentForm'
import ReviewForm from './temp/ReviewForm'

import ROUTES from '../routing'

import ConstructorForm from './forms/ConstructorForm'

import styles from './style/FormManager.style'

const testSuccess = (
  <Fragment>
    <Typography variant="h5" gutterBottom>
      Thank you for your order.
    </Typography>
    <Typography variant="subtitle1">
      Your order number is #2001539. We have emailed your order confirmation, and will
      send you an update when your order has shipped.
    </Typography>
  </Fragment>
)

const forms = {
  test: {
    numSteps: 3,
    labels: ['Shipping address', 'Payment details', 'Review your order'],
    components: [
      <AddressForm key="0" />,
      <PaymentForm key="1" />,
      <ReviewForm key="2" />,
      testSuccess,
    ],
  },
  mint: {
    numSteps: 1,
    labels: ['Create Token'],
    components: [
      <ConstructorForm key="0" />,
      testSuccess,
    ],
  },
}

class FormManager extends Component {

  state = {
    activeStep: 0,
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }))
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }))
  }

  handleReset = () => {
    this.setState({
      activeStep: 0,
    })
  }

  render () {

    const { classes } = this.props
    const { activeStep } = this.state
    const { workflow, title, finalStepName } = getManagerValues(
      this.props.location.pathname
    )

    return (
      <Fragment>
        <CssBaseline />
        <Prompt
          message="If you leave this page, you may lose your work. Are you sure you want to leave?"
        />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              {title}
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {forms[workflow].labels.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Fragment>
              {forms[workflow].components[activeStep]}
              {
                activeStep < forms[workflow].numSteps
                ? (
                    <Fragment>
                      <div className={classes.buttons}>
                        {
                          activeStep !== 0 && (
                            <Button
                              onClick={this.handleBack}
                              className={classes.button}
                            >
                              Back
                            </Button>
                          )
                         }
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                          className={classes.button}
                        >
                          {
                            activeStep === forms[workflow].numSteps - 1
                            ? finalStepName
                            : 'Next'
                          }
                        </Button>
                      </div>
                    </Fragment>
                  )
                : null
              }
            </Fragment>
          </Paper>
        </main>
      </Fragment>
    )
  }
}

FormManager.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default withStyles(styles)(FormManager)

function getManagerValues (currentPath) {

  const args = { exact: false, strict: false }
  const out = {}

  if (matchPath(currentPath, { ...args, path: ROUTES.actions.mint })) {

    out.workflow = 'mint' // TODO: normalize, use ids
    out.title = 'Mint'
    out.finalStepName = 'Deploy'

  } else if (matchPath(currentPath, { ...args, path: ROUTES.actions.test })) {

    out.workflow = 'test' // TODO: normalize, use ids
    out.title = 'Place an Order'
    out.finalStepName = 'Place Order'

  } else throw new Error('Invalid URL.')

  return out
}
