import React from 'react';
import { Layout, Typography, Button } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import WordGuess from '../../components/WordGuess';
import './index.css';

const { Content } = Layout;
const { Title } = Typography;

const WordGuessPage = () => {
  const navigate = useNavigate();

  return (
    <Layout className="ai-games-container">
      <Content className="ai-games-content">
        <div className="nav-buttons" style={{ marginBottom: '20px' }}>
          <Button 
            type="primary" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate(-1)}
            style={{ marginRight: '10px' }}
          >
            返回上一页
          </Button>
          <Button 
            type="primary" 
            icon={<HomeOutlined />} 
            onClick={() => navigate('/')}
          >
            返回首页
          </Button>
        </div>
        <Title level={1} className="page-title">AI词语猜谜</Title>
        <div className="content-section">
          <WordGuess />
        </div>
      </Content>
    </Layout>
  );
};

export default WordGuessPage;