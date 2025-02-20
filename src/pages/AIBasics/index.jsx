import React from 'react';
import { Layout, Typography, Button, Card, Row, Col } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './index.css';

const { Content } = Layout;
const { Title } = Typography;

const AIBasics = () => {
  const navigate = useNavigate();

  return (
    <Layout className="ai-basics-container">
      <Content className="ai-basics-content">
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
        <Title level={1} className="page-title">AI基础知识</Title>
        <div className="content-section">
          <Title level={2}>人工智能基础知识导航</Title>
          <p>欢迎来到AI基础知识学习中心。在这里，你可以系统地了解人工智能的各个方面，从基本概念到未来发展。选择下面的主题开始你的AI学习之旅。</p>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12}>
              <Card
                hoverable
                className="topic-card"
                onClick={() => navigate('/ai-basics/introduction')}
              >
                <Title level={3}>AI简介</Title>
                <p>了解人工智能的基本概念、发展历史和核心原理</p>
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card
                hoverable
                className="topic-card"
                onClick={() => navigate('/ai-basics/applications')}
              >
                <Title level={3}>AI应用场景</Title>
                <p>探索AI在各个领域的实际应用和影响</p>
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card
                hoverable
                className="topic-card"
                onClick={() => navigate('/ai-basics/learning')}
              >
                <Title level={3}>AI学习原理</Title>
                <p>深入了解AI是如何学习和进化的</p>
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card
                hoverable
                className="topic-card"
                onClick={() => navigate('/ai-basics/future')}
              >
                <Title level={3}>AI的未来</Title>
                <p>探索AI技术的发展趋势和未来可能性</p>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default AIBasics;