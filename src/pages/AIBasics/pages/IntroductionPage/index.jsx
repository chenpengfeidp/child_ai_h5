import React from 'react';
import { Layout, Typography, Button } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

const { Content } = Layout;
const { Title } = Typography;

const IntroductionPage = () => {
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
        <Title level={1} className="page-title">AI简介</Title>
        <div className="content-section">
          <Title level={2}>什么是人工智能？</Title>
          <p>人工智能（AI）是让计算机模仿人类思维和学习的科技。就像你的大脑可以学习新知识一样，AI也可以通过学习来完成各种任务。</p>
        </div>

        <div className="content-section">
          <Title level={2}>AI的发展历史</Title>
          <p>人工智能的发展历程可以追溯到20世纪50年代，经历了以下几个重要阶段：</p>
          <ul className="feature-list">
            <li>1950年代：图灵测试的提出，为AI的发展奠定了理论基础</li>
            <li>1960-1970年代：专家系统的兴起，AI开始在特定领域展现能力</li>
            <li>1980-1990年代：机器学习算法的发展，使AI具备了自主学习的能力</li>
            <li>2000年至今：深度学习的突破，AI在图像识别、自然语言处理等领域取得重大进展</li>
          </ul>
        </div>

        <div className="content-section">
          <Title level={2}>AI的核心原理</Title>
          <p>人工智能的核心原理包括：</p>
          <ul className="feature-list">
            <li>数据驱动：通过大量数据的学习来提升性能</li>
            <li>模式识别：从数据中发现和学习规律</li>
            <li>算法优化：不断调整和改进决策过程</li>
            <li>反馈学习：根据结果反馈来优化模型</li>
          </ul>
        </div>
      </Content>
    </Layout>
  );
};

export default IntroductionPage;