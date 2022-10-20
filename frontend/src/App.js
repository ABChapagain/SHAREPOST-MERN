import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import AboutScreen from './screens/AboutScreen'
import { PostSingleScreen } from './screens/PostSingleScreen'
import CreatePost from './screens/CreatePost'
import PostEdit from './screens/PostEdit'

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <main className='py-3'>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/about' element={<AboutScreen />} />
            <Route path='/post/create' element={<CreatePost />} />
            <Route path='/post/:id/edit' element={<PostEdit />} />
            <Route path='/post/:id' element={<PostSingleScreen />} />
          </Routes>
        </main>
      </Container>
      <Footer />
    </Router>
  )
}

export default App
