import React from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Form from './components/Form'

const App = () => {
  return (
    <div className='hero-bg bg-scroll bg-cover h-screen font-serif'>
      <div className="backdrop-blur-none bg-black/10 overflow-y-scroll h-screen no-scrollbar w-full p-8">
        <Navbar></Navbar>
        <Form></Form>
      </div>
    </div>
  )
}

export default App