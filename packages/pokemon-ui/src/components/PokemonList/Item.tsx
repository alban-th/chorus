import styled from '@emotion/styled';
import { PawPrint, X } from 'lucide-react';
import { useCallback, useState } from 'react';

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
    background-color: #e0c5c5;
  }
`;

const Name = styled.span`
  margin-left: 0.5rem;
  font-weight: bold;

  @media (min-width: 600px) {
    font-size: 1.5rem;
  }
`;

type ItemProps = {
  id: string;
  name: string;
  deletePokemon: (id: string) => () => void;
};
export function Item({ id, name, deletePokemon }: ItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const setHovered = useCallback((b: boolean) => () => setIsHovered(b), []);

  return (
    <Button
      type="button"
      onClick={deletePokemon(id)}
      onMouseOver={setHovered(true)}
      onMouseLeave={setHovered(false)}
    >
      {isHovered ? <X /> : <PawPrint />}
      <Name>{name}</Name>
    </Button>
  );
}
