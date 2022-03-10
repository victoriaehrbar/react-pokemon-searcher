import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

class PokemonIndex extends React.Component {
  state = {
    pokemonCollection: [],
    searchTerm: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/pokemon')
      .then(res => res.json())
      .then(pokemonCollection => this.setState({ pokemonCollection: pokemonCollection }))
      .catch(e => console.error(e))
  }

  handleSearchChange = event => {
    this.setState({ searchTerm: event.target.value })
  }

  toggleImage = pokemon => {
    const col = this.state.pokemonCollection
    const i = col.indexOf(pokemon)
    this.setState({
      pokemonCollection: [
        ...col.slice(0, i),
        // initially pokemon.isClicked is undefined; inverting that falsey value makes it true
        { ...pokemon, isClicked: !pokemon.isClicked },
        ...col.slice(i + 1)
      ]
    })
  }

  addPokemon = pokemon => {
    this.setState({ pokemonCollection: [...this.state.pokemonCollection, pokemon] })
  }

  render() {
    const desiredPokemon = this.state.pokemonCollection.filter(p =>
      p.name.includes(this.state.searchTerm)
    )
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
        <br />
        <Search onChange={this.handleSearchChange} />
        <br />
        <PokemonCollection pokemon={desiredPokemon} toggleImage={this.toggleImage}/>
      </Container>
    )
  }
}

export default PokemonIndex