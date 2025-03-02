import React from 'react';
import { Layout, Typography, Card, Row, Col, Carousel } from 'antd';
import { RobotOutlined, PlayCircleOutlined, ExperimentOutlined, QrcodeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './index.css';

const { Content } = Layout;
const { Title } = Typography;

const Home = () => {
  const navigate = useNavigate();

  const carouselItems = [
    {
      title: '智能图像识别',
      description: 'AI能够识别和理解图像中的内容，就像人类的视觉系统一样',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop'
    },
    {
      title: '机器学习',
      description: '通过大量数据训练，AI可以不断学习和改进自己的能力',
      imageUrl: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=400&fit=crop'
    },
    {
      title: '智能机器人',
      description: 'AI驱动的机器人可以完成各种复杂的任务，协助人类工作',
      imageUrl: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=800&h=400&fit=crop'
    },
    {
      title: '自然语言处理',
      description: 'AI能够理解和处理人类语言，实现智能对话和文本分析',
      imageUrl: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=800&h=400&fit=crop'
    },
    {
      title: '智能创作',
      description: 'AI可以创作音乐、绘画和文学作品，展现独特的创造力',
      imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=400&fit=crop'
    },

  ];

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
    },
    {
      title: '手机访问',
      icon: <QrcodeOutlined style={{ fontSize: '32px' }} />,
      description: '扫描二维码在手机上访问',
      path: '/qrcode'
    }
  ];

  return (
    <Layout className="home-container">
      <Content className="home-content">
        <div className="content-wrapper">
          <Title level={1} className="home-title">少儿AI启蒙乐园</Title>

          <div className="carousel-container">
            <Carousel autoplay>
              {carouselItems.map((item, index) => (
                <div key={index}>
                  <div
                    className="carousel-item"
                    style={{ backgroundImage: `url(${item.imageUrl})` }}
                  >
                    <div className="carousel-content" style={{
                      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%)',
                      padding: '20px',
                      position: 'absolute',
                      bottom: '0',
                      top: '50%',
                      left: 0,
                      right: 0
                    }}>
                      <h2 className="carousel-title">{item.title}</h2>
                      <p className="carousel-description">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          <div className="cards-container">
            <Row gutter={[24, 24]} justify="center">
              {cards.map((card, index) => (
                <Col xs={24} sm={24} md={24} key={index}>
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