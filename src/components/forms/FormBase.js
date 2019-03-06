
import { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * All action forms must extend this base class.
 */
export default class FormBase extends Component {

  constructor (props) {
    super(props)
    this.state = {
      fieldValues: props.fieldValues || {},
    }
  }

  componentWillUnmount () {
    this.props.handleUnmount(this.props.step, this.state.fieldValues)
  }

  /**
   * Stores input in component state.
   * @param {string} id input field id
   */
  handleInputChange = id => event => {

    const target = event.target
    // const value = target.type === 'checkbox' ? target.checked : target.value
    // TODO: handle checkboxes and radio buttons

    this.setState({
      fieldValues: {
        ...this.state.fieldValues,
        [id]: target.value,
      },
    })
  }

  render () {
    return null
  }
}

FormBase.propTypes = {
  classes: PropTypes.object.isRequired,
  handleUnmount: PropTypes.func.isRequired,
  fieldValues: PropTypes.object,
  step: PropTypes.number.isRequired,
}
