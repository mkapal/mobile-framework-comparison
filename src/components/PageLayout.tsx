import styled from '@emotion/styled';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: inherit;
  padding: 32px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    rgb(230, 230, 230) 0%,
    rgb(255, 255, 255) 50%,
    rgb(230, 230, 230) 100%
  );
`;

type Props = {
  children?: ReactNode;
};

export function PageLayout({ children }: Props) {
  return (
    <Layout>
      <nav>
        <Link to="/">Homepage</Link>
      </nav>
      {children}
    </Layout>
  );
}
