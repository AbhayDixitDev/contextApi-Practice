import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './home'
import About from './About'
import Contact from './Contact'
import NavigationBar from './Navbar'
import Resume from './ResumeMake'

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </Router>
  )
}

export default App
