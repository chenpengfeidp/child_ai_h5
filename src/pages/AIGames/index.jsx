import React from 'react';
import { Layout, Typography, Button, Card, Row, Col } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './index.css';

const { Content } = Layout;
const { Title } = Typography;

const AIGames = () => {
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
        <Title level={1} className="page-title">AI趣味游戏</Title>
        <div className="content-section">
          <Title level={2}>AI游戏体验</Title>
          <p>在这里，你可以通过有趣的游戏来了解AI的工作原理。我们准备了多个互动小游戏，让你在玩乐中学习AI知识。</p>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12}>
              <Card
                hoverable
                className="game-card"
                onClick={() => navigate('/ai-games/memory')}
              >
                <Title level={3}>AI图片连连看</Title>
                <p>通过配对相同的AI生成图片来训练你的记忆力</p>
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card
                hoverable
                className="game-card"
                onClick={() => navigate('/ai-games/word-guess')}
              >
                <Title level={3}>AI词语猜谜</Title>
                <p>根据提示猜出AI相关的词语，考验你的AI知识</p>
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card
                hoverable
                className="game-card"
                onClick={() => navigate('/ai-games/scratch-card')}
              >
                <Title level={3}>AI图片刮刮乐</Title>
                <p>通过刮开图片，探索AI生成的神奇画作</p>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default AIGames;