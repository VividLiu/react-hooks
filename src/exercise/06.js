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
  const [state, setState] = useState({
    status: 'initial',
    error: null,
    pokemon: null,
  })

  useEffect(() => {
    if (pokemonName) {
      setState(pre => ({...pre, status: 'loading'}))
      fetchPokemon(pokemonName, 1000)
        .then(data => {
          setState(pre => ({...pre, status: 'done', pokemon: data}))
        })
        .catch(e => {
          setState(pre => ({...pre, status: 'error', error: e.message}))
        })
    }
  }, [pokemonName])

  if (state.status === 'initial') {
    return <h3>Submit a pokemon</h3>
  } else if (state.status === 'loading') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (state.status === 'error') {
    return (
      <>
        <h3>There is an error</h3>
        <h3>{state.error}</h3>
      </>
    )
  } else {
    return <PokemonDataView pokemon={state.pokemon} />
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
