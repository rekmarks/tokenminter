
/**
 * Original component courtesy:
 * https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/page-layout-examples/checkout
 */

// React and Redux
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Prompt, matchPath } from 'react-router-dom'
import PropTypes from 'prop-types'
import { actions as w3sActions } from 'web3-sagas'

// material-ui
import withStyles from '@material-ui/core/styles/withStyles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { ROUTES } from '../utils'

import ConstructorForm from './forms/ConstructorForm'

import styles from './style/FormManager.style'
import { selectConstructorNodes } from '../redux/selectors'

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

// eslint erroneously warns about a react/display-name violation below
// (it should only do this on component declaration)
const forms = {
  mint: {
    numSteps: 1,
    labels: ['Create Token'],
    components: [
      props => <ConstructorForm key="0" {...props} />, // eslint-disable-line
      props => testSuccess,
    ],
  },
}

/**
 * Used to generate certain values in render() below.
 * @param {string} currentPath the current router path
 */
function getManagerValues (currentPath) {

  const args = { exact: false, strict: false }
  const out = {}

  if (matchPath(currentPath, { ...args, path: ROUTES.actions.mint })) {

    out.workflow = 'mint' // TODO: normalize, use ids
    out.title = 'Mint'
    out.finalStepName = 'Deploy'

  } else throw new Error('Invalid URL.')

  return out
}


class FormManager extends Component {

  constructor (props) {
    super(props)
    this.state = {
      currentStep: 0,
      fieldValues: {},
    }
  }

  componentDidUpdate (prevProps) {
    if (
      this.props.location.pathname !== prevProps.location.pathname
    ) this.handleReset()
  }

  handleNext = () => {
    this.setState(state => ({
      currentStep: state.currentStep + 1,
    }))
  }

  handleBack = () => {
    this.setState(state => ({
      currentStep: state.currentStep - 1,
    }))
  }

  handleReset = () => {
    this.setState({
      currentStep: 0,
      fieldValues: {},
    })
  }

  saveChildFieldValues = (step, childFieldValues) => {
    if (!childFieldValues) return
    this.setState({
      ...this.state,
      fieldValues: {
        ...this.state.fieldValues,
        [step]: childFieldValues,
      },
    })
  }

  getActiveChildProps = (step, workflow, finalStepName) => {

    const props = {
      handleUnmount: this.saveChildFieldValues,
      classes: this.props.classes,
      fieldValues: this.state.fieldValues[step] || null,
      step: step,
      getButtons: this.getButtonComponents(step, workflow, finalStepName),
      handleNext: this.handleNext,
    }

    if (['mint'].includes(workflow)) {
      props.constructorNodes = this.props.constructorNodes
      props.deployContract = this.props.deployContract
    }

    return props
  }

  getButtonComponents = (step, workflow, finalStepName) => submitHandler => {
  const { classes } = this.props
  return (
    step < forms[workflow].numSteps
    ? (
        <Fragment>
          <div className={classes.buttons}>
            {
              step !== 0 && (
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
              onClick={submitHandler}
              className={classes.button}
            >
              {
                step === forms[workflow].numSteps - 1
                ? finalStepName
                : 'Next'
              }
            </Button>
          </div>
        </Fragment>
      )
      : null
    )
  }

  render () {

    const { classes } = this.props
    const { currentStep } = this.state
    const { workflow, title, finalStepName } = getManagerValues(
      this.props.location.pathname
    )

    return (
      <Fragment>
        <CssBaseline />
        <Prompt
          message="If you leave this page, you will lose your work. Are you sure you want to leave?"
        />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              {title}
            </Typography>
            <Stepper activeStep={currentStep} className={classes.stepper}>
              {forms[workflow].labels.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Fragment>
              {
                forms[workflow].components[currentStep](
                  this.getActiveChildProps(
                    currentStep, workflow, finalStepName
                  )
                )
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
  deployContract: PropTypes.func.isRequired,
  constructorNodes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    // graphs
    constructorNodes: selectConstructorNodes(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // contracts
    deployContract: (id, params) =>
      dispatch(w3sActions.contracts.deploy(id, params)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FormManager))
