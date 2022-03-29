import Link from 'next/link';

const Pokemon = ({ pokemon }) => {
  const id = pokemon.url.split('/').filter(x => x).pop();
  return(
    <li>
      <Link href={`/pokemon/${id}`}>
        {pokemon.name}
      </Link>
    </li>
  )
}

export default function Pokemons({ pokemon }) {


  return (
    <div>
      <p>Pokemon</p>

      <ul>
        { pokemon.map(pokemon => <Pokemon pokemon={pokemon} key={pokemon.name} />) }
      </ul>

    </div>
  )
}

export const getStaticProps = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const data = await response.json()

  return {
    props: { pokemon: data.results }
  }
}