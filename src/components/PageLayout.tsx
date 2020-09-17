import styled from '@emotion/styled';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: inherit;
  padding: 32px;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 900px;
`;

const Content = styled.div`
  padding: 32px;
`;

type Props = {
  children?: ReactNode;
};

export function PageLayout({ children }: Props) {
  return (
    <Layout>
      <Inner>
        <nav>
          <Link to="/">Homepage</Link>
          <Link to="/questions">Questions</Link>
        </nav>
        <Content>{children}</Content>
      </Inner>
    </Layout>
  );
}
