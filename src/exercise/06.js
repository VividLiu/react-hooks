// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useEffect, useState} from 'react'
import {
  PokemonForm,
  PokemonInfoFallback,
  PokemonDataView,
  fetchPokemon,
} from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary'

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
          setState({error: e.message})
        })
    }
  }, [pokemonName])

  if (state.status === 'initial') {
    return <h3>Submit a pokemon</h3>
  } else if (state.status === 'loading') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (state.status === 'error') {
    throw new Error(state.error)
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
      <ErrorBoundary
        FallbackComponent={error => (
          <div>
            <h3>Error happened {error.message}</h3>
          </div>
        )}
        resetKeys={[pokemonName]}
      >
        <div className="pokemon-info">
          <PokemonInfo pokemonName={pokemonName} />
        </div>
      </ErrorBoundary>
    </div>
  )
}

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       error: null,
//     }
//   }

//   static getDerivedStateFromError(error) {
//     return {error: error}
//   }

//   componentDidCatch(error, errorInfo) {
//     console.log('Error happened: ', error)
//   }

//   render() {
//     if (this.state.error) {
//       return (
//         <div>
//           <h3>Error happened {this.state.error.message}</h3>
//         </div>
//       )
//     }
//     return this.props.children
//   }
// }

export default App
