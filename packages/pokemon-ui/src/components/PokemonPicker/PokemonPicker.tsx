import { useCallback, useState } from "react";
import { Pokemon } from "../../types"
import styled from "@emotion/styled";

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  list-style-type: none;
  display: flex;
  padding: 0;
  margin: 1rem;
  width: 100%;
`;
const Li = styled.li`
  padding: 0.5rem;
  width: calc((100vw - 2rem) / 2);
  height: 10vw;

  @media (min-width: 700px) {
    width: calc((100vw - 2rem) / 4);
  }
  @media (min-width: 1200px) {
    width: calc((100vw - 2rem) / 6);
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

const SearchFormContainer = styled.div`
    margin: 2rem;
    display: flex;
    justify-content: center;
`;
const SearchFormInput = styled.input`
    font-size: 1.2rem;
    padding: 0.5rem;
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
      <div>
        <h1>Pokemon Picker</h1>
        <SearchFormContainer>
          <SearchFormInput
            type="text"
            placeholder="Filter..."
            value={filter}
            onChange={updateFilter}
          />
        </SearchFormContainer>
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
      </div>
    );
}