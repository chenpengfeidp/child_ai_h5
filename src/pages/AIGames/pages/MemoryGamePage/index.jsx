import React from 'react';
import { Layout, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import NavButtons from '../../../../components/NavButtons';
import MemoryGame from '../../components/MemoryGame';
import './index.css';

const { Content } = Layout;
const { Title } = Typography;

const MemoryGamePage = () => {
  const navigate = useNavigate();

  return (
    <Layout className="ai-games-container">
      <Content className="ai-games-content">
        <NavButtons />
        <Title level={1} className="page-title">AI图片连连看</Title>
        <div className="content-section">
          <MemoryGame />
        </div>
      </Content>
    </Layout>
  );
};

export default MemoryGamePage;