import React from 'react';
import styled from '@emotion/styled';

import { Profiles } from '../../modules/Profiles/Profiles';

const StyledApp = styled.div``;

export function Home() {
  return (
    <StyledApp>
      <p>Home</p>
      <Profiles />
    </StyledApp>
  );
}
