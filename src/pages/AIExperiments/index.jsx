import React from 'react';
import { Layout, Typography, Button, Card, Row, Col } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import NavButtons from '../../components/NavButtons';
import './index.css';

const { Content } = Layout;
const { Title } = Typography;

const AIExperiments = () => {
  const navigate = useNavigate();

  return (
    <Layout className="ai-experiments-container">
      <Content className="ai-experiments-content">
        <NavButtons />
        <Title level={1} className="page-title">AI实验室</Title>
        <div className="content-section">
          <Title level={2}>AI实验体验</Title>
          <p>在这里，你可以亲自动手操作，体验AI的神奇力量。通过简单有趣的实验，了解AI是如何工作的。</p>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12}>
              <Card
                hoverable
                className="experiment-card"
                onClick={() => navigate('/ai-experiments/image-recognition')}
              >
                <Title level={3}>图像识别实验</Title>
                <p>体验AI如何识别和分析图像内容</p>
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card
                hoverable
                className="experiment-card"
                onClick={() => navigate('/ai-experiments/speech-synthesis')}
              >
                <Title level={3}>语音合成实验</Title>
                <p>探索AI是如何将文字转换为语音的</p>
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card
                hoverable
                className="experiment-card"
                onClick={() => navigate('/ai-experiments/nlp')}
              >
                <Title level={3}>自然语言处理实验</Title>
                <p>了解AI如何理解和处理人类语言</p>
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card
                hoverable
                className="experiment-card"
                onClick={() => navigate('/ai-experiments/machine-learning')}
              >
                <Title level={3}>机器学习实验</Title>
                <p>通过互动体验AI的学习过程</p>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default AIExperiments;