import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1 className='text-6xl text-center text-blue-300'>Hello World!</h1>
    </div>
  )
}

export default App
