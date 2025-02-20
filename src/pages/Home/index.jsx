import React from 'react';
import { Layout, Typography, Card, Row, Col } from 'antd';
import { RobotOutlined, PlayCircleOutlined, ExperimentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './index.css';

const { Content } = Layout;
const { Title } = Typography;

const Home = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'AI基础知识',
      icon: <RobotOutlined style={{ fontSize: '32px' }} />,
      description: '探索AI的奥秘，了解人工智能的基本概念',
      path: '/ai-basics'
    },
    {
      title: 'AI趣味游戏',
      icon: <PlayCircleOutlined style={{ fontSize: '32px' }} />,
      description: '通过有趣的游戏体验AI的魅力',
      path: '/ai-games'
    },
    {
      title: 'AI实验室',
      icon: <ExperimentOutlined style={{ fontSize: '32px' }} />,
      description: '动手实践，亲身体验AI的神奇',
      path: '/ai-experiments'
    }
  ];

  return (
    <Layout className="home-container">
      <Content className="home-content">
        <div className="content-wrapper">
          <Title level={1} className="home-title">少儿AI启蒙乐园</Title>
          <div className="cards-container">
            <Row gutter={[24, 24]} justify="center">
              {cards.map((card, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <Card
                    hoverable
                    className="feature-card"
                    onClick={() => navigate(card.path)}
                  >
                    <div className="card-icon">{card.icon}</div>
                    <Title level={3}>{card.title}</Title>
                    <p>{card.description}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;