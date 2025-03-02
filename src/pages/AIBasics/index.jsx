import React from 'react';
import { Layout, Typography, Card, Row, Col } from 'antd';
import { useNavigate, Routes, Route } from 'react-router-dom';
import NavButtons from '../../components/NavButtons';
import './index.css';
import IntroductionPage from './pages/IntroductionPage';
import AIAnimationPage from './pages/AIAnimationPage';

const { Content } = Layout;
const { Title } = Typography;

const MainContent = ({ navigate }) => (
  <Layout className="ai-basics-container">
    <Content className="ai-basics-content">
      <NavButtons />
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
              onClick={() => navigate('/ai-basics/panorama')}
            >
              <Title level={3}>AI全景探索</Title>
              <p>通过360度全景视角，探索AI技术在各个领域的应用</p>
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
          {/* <Col xs={24} sm={12}>
            <Card
              hoverable
              className="topic-card"
              onClick={() => navigate('/ai-basics/animation')}
            >
              <Title level={3}>AI动画</Title>
              <p>通过生动的动画演示了解AI的工作原理</p>
            </Card>
          </Col> */}
        </Row>
      </div>
    </Content>
  </Layout>
);

const AIBasics = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<MainContent navigate={navigate} />} />
      <Route path="introduction" element={<IntroductionPage />} />
      <Route path="animation" element={<AIAnimationPage />} />
    </Routes>
  );
};

export default AIBasics;