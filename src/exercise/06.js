// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useEffect, useState} from 'react'
import {
  PokemonForm,
  PokemonInfoFallback,
  PokemonDataView,
  fetchPokemon,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = useState(null)
  const [status, setStatus] = useState('initial')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (pokemonName) {
      setStatus('loading')
      fetchPokemon(pokemonName, 1000)
        .then(data => {
          setStatus('done')
          setPokemon(data)
        })
        .catch(e => {
          setStatus('error')
          setError(e.message)
        })
    }
  }, [pokemonName])

  if (status === 'initial') {
    return <h3>Submit a pokemon</h3>
  } else if (status === 'loading') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'error') {
    console.log(error)
    return (
      <>
        <h3>There is an error</h3>
        <h3>{error}</h3>
      </>
    )
  } else {
    return <PokemonDataView pokemon={pokemon} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
