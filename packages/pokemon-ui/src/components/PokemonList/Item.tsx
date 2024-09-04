import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Loader, PawPrint, X } from 'lucide-react';
import { useCallback, useState } from 'react';

const button = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
  padding: 0.5rem;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: #333;
  background-color: #f5f5f5;
`;

const buttonInteraction = css`
  ${button};

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
  deletePokemon?: (id: string) => () => void;
};
export function Item({ id, name, deletePokemon }: ItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const setHovered = useCallback((b: boolean) => () => setIsHovered(b), []);

  return (
    <button
      css={buttonInteraction}
      type="button"
      onClick={deletePokemon?.(id)}
      onMouseOver={setHovered(true)}
      onMouseLeave={setHovered(false)}
    >
      {isHovered ? <X /> : <PawPrint />}
      <Name>{name}</Name>
    </button>
  );
}

export function Placeholder() {
  return (
    <span css={button}>
      <PawPrint css={css`
        color: #ccc;
      `} />
    </span>
  );
}
