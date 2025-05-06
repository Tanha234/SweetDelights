import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className="text-center p-10 bg-blue-200">
      <h1 className="text-3xl font-bold text-blue-700">
        Tailwind is working in React!
      </h1>
    </div>
    </>
  )
}

export default App
