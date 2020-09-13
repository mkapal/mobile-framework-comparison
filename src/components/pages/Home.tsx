import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Space, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: inherit;
  padding: 32px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    rgb(230, 230, 230) 0%,
    rgb(255, 255, 255) 50%,
    rgb(230, 230, 230) 100%
  );
`;

const Main = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  color: gray;
  text-align: center;
`;
export function Home() {
  return (
    <Layout>
      <Main>
        <Space>
          <FontAwesomeIcon color="#444" icon="mobile-alt" size="6x" />
          <FontAwesomeIcon color="#444" icon="tablet-alt" size="8x" />
          <Space direction="vertical">
            <FontAwesomeIcon
              color="#8e8e93"
              icon={['fab', 'apple']}
              size="5x"
            />
            <FontAwesomeIcon
              color="#3DDC84"
              icon={['fab', 'android']}
              size="5x"
            />
          </Space>
        </Space>
        <Title>Cross-Platform Mobile Framework Recommendation System</Title>
        <p>Get a ranked list of recommended mobile frameworks</p>
        <Link to="/questions">
          <Button size="large" type="primary">
            Start filling questions
          </Button>
        </Link>
      </Main>
      <Footer>Created by Martin Kapal</Footer>
    </Layout>
  );
}
