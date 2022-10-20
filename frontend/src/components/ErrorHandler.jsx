import { Component } from 'react'
import { Button } from 'react-bootstrap'
import Header from './Header'
import Footer from './Footer'
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

  refreshHandler = (e) => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Header />
          <div
            className='justify-content-center align-items-center d-flex flex-column'
            style={{ height: '400px' }}
          >
            <h1>Something went wrong.</h1>
            <Button onClick={this.refreshHandler}>Try Refresh</Button>
          </div>
          <Footer />
        </>
      )
    } else {
      return this.props.children
    }
  }
}

export default ErrorHandler
