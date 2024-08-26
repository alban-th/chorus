import { useCallback, useState } from "react";
import { Pokemon } from "../../types"
import styled from "@emotion/styled";

const Container = styled.div`
  padding: 0 4rem;
`;
const Head = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 800px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
  }
`;
const Title = styled.h2`
  flex: 1;
  font-size: 2rem;
  margin-top: 2rem;
  padding-left: 0.5rem;

  @media (min-width: 800px) {
    margin-top: unset;
    padding-left: .5rem;
  }
`;

const SearchFormContainer = styled.div`
  flex: 1;
  margin: 0.5rem 1rem 1rem 0.5rem;

  @media (min-width: 800px) {
    margin-right : 1.5rem;
  }
`; 
const SearchFormInput = styled.input`
  font-size: 1.2rem;
  padding: 0.5rem;
  width: 100%;
`;

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  list-style-type: none;
  display: flex;
  padding: 0;
  width: 100%;
`;
const Li = styled.li`
  padding: 0.5rem;
  width: calc((100% - 1rem) / 2);
  height: 10vw;

  @media (min-width: 700px) {
    width: calc((100% - 1rem) / 4);
  }
  @media (min-width: 1200px) {
    width: calc((100% - 1rem) / 6);
  }
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
  border-right: none;
  padding: 0.5rem;
  width: 100%;
  height: 100%;

  &:last-child {
    border-right: 1px solid #eee;
  }

  text-decoration: none;
  color: #333;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const Name = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
`;





type PokemonPickerProps = {
    pokemons: Pokemon[];
    onPick: (id: string) => void;
}
export function PokemonPicker({ pokemons, onPick }: PokemonPickerProps) {
    const [filter, setFilter] = useState("");
    const updateFilter = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    }, []);

    return (
      <Container>
        <Head>
          <Title>Pick your Pokemons</Title>
          <SearchFormContainer>
            <SearchFormInput
              type="text"
              placeholder="Filter..."
              value={filter}
              onChange={updateFilter}
            />
          </SearchFormContainer>
        </Head>
        <Ul>
          {pokemons
            .filter((pokemon) =>
              pokemon.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map((pokemon) => (
              <Li key={pokemon.id}>
                <Button onClick={() => onPick(pokemon.id)}>
                  <Name>{pokemon.name}</Name>
                </Button>
              </Li>
            ))}
        </Ul>
      </Container>
    );
}