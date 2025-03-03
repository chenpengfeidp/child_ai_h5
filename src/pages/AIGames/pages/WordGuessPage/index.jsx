import React from 'react';
import { Layout, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import NavButtons from '../../../../components/NavButtons';
import WordGuess from '../../components/WordGuess';
import './index.css';

const { Content } = Layout;
const { Title } = Typography;

const WordGuessPage = () => {
  const navigate = useNavigate();

  return (
    <Layout className="ai-games-container">
      <Content className="ai-games-content">
        <NavButtons />
        <Title level={1} className="page-title">AI词语猜谜</Title>
        <div className="content-section">
          <WordGuess />
        </div>
      </Content>
    </Layout>
  );
};

export default WordGuessPage;