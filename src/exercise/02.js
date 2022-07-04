// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, {useState, useEffect} from 'react'

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    console.log('Getting initial storage value')
    return window.localStorage.getItem(key) ?? initialValue
  })

  useEffect(() => {
    window.localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue]
}

function Greeting({initialName = ''}) {
  const [name, updateStorage] = useLocalStorage('name', initialName)

  function handleChange(event) {
    updateStorage(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
