
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

import FormBase from './FormBase'
import DropdownMenu from '../common/DropdownMenu'

import { capitalize } from '../../utils'

export default class ConstructorForm extends FormBase {

  constructor (props) {
    super(props)
    this.state.selectedMenuItem = null
  }

  handleReset = () => {
    this.setState({
      fieldValues: this.props.fieldValues || {},
      selectedMenuItem: null,
    })
  }

  handleMenuSelect = id => {
    this.setState({
      ...this.state,
      selectedMenuItem: id,
    })
  }

  handleDeploy = event => {

    event.preventDefault()

    if (!this.state.selectedMenuItem) return

    this.props.deployContract(
      this.state.selectedMenuItem,
      this.props.constructorNodes[this.state.selectedMenuItem].inputs
        .map(inputNode => {
          return {
            order: inputNode.order,
            value: this.state.fieldValues[inputNode.id],
          }
        })
    )
    this.props.handleNext()
  }

  getFormFields = () => {
    if (!this.state.selectedMenuItem) return null
    return Object.values(
      this.props.constructorNodes[this.state.selectedMenuItem].inputs
    ).map(node =>
      <Grid item xs={12} sm={6} key={node.id}>
        <TextField
          required
          id={node.id}
          name={node.name}
          label={capitalize(node.name)}
          value={this.state.fieldValues[node.id] || ''}
          onChange={this.handleInputChange(node.id)}
          fullWidth
        />
      </Grid>
    )
  }

  render () {

    const { classes } = this.props

    return (
      <Fragment>
        <DropdownMenu
          classes={{ root: classes.root }}
          menuItemData={
            getMenuItemData(this.props.constructorNodes)
          }
          menuTitle="Token"
          placeholder="Please select a token"
          selectAction={this.handleMenuSelect} />
          <Grid container spacing={24}>
            {this.getFormFields()}
          </Grid>
          {this.props.getButtons(this.handleDeploy)}
      </Fragment>
    )
  }
}

function getMenuItemData (nodes) {

  const data = Object.values(nodes).map(n => {
    return {
      id: n.id,
      name: n.contractName,
    }
  })

  data.sort((a, b) => {
    if (a.name === b.name) return 0 // sanity
    return a.name < b.name ? -1 : 1
  })

  return data
}

ConstructorForm.propTypes = {
  classes: PropTypes.object.isRequired,
  constructorNodes: PropTypes.object.isRequired,
  getButtons: PropTypes.func.isRequired,
  deployContract: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
}
