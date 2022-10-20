import { Component } from 'react'
import NotFound from '../screens/NotFound'

class ErrorHandler extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    }
  }

  render() {
    if (this.state.hasError) {
      return <NotFound />
    } else {
      return this.props.children
    }
  }
}

export default ErrorHandler
