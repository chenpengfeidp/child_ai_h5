import React from 'react';
import { Layout, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import NavButtons from '../../../../components/NavButtons';
import ScratchCard from '../../components/ScratchCard';
// import ScratchCard from '../../../../components/ScratchCard';
import './index.css';

const { Content } = Layout;
const { Title } = Typography;

const ScratchCardPage = () => {
  const navigate = useNavigate();

  return (
    <Layout className="ai-games-container">
      <Content className="ai-games-content">
        <NavButtons />
        <Title level={1} className="page-title">AI图片刮刮乐</Title>
        <div className="content-wrapper">
          <div className="content-section">
            <ScratchCard />
          </div>
        </div>
      </Content>
      <style>{`
        .ai-games-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }
        .ai-games-content {
          padding: 24px;
        }
        .content-wrapper {
          max-width: 500px;
          margin: 0 auto;
        }
        .content-section {
          background: white;
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .page-title {
          text-align: center;
          margin-bottom: 40px;
        }
      `}</style>
    </Layout>
  );
};

export default ScratchCardPage;