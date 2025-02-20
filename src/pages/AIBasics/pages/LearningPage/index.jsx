import React from 'react';
import { Layout, Typography, Button } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

const { Content } = Layout;
const { Title } = Typography;

const LearningPage = () => {
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
        <Title level={1} className="page-title">AI学习原理</Title>
        <div className="content-section">
          <Title level={2}>机器学习基础</Title>
          <p>机器学习是AI获取知识的核心方式，主要包括以下几种学习方式：</p>
          <ul className="feature-list">
            <li>监督学习：通过标记好的数据来学习，就像老师指导学生</li>
            <li>无监督学习：自主发现数据中的规律和模式</li>
            <li>强化学习：通过尝试和反馈来学习最优策略</li>
            <li>迁移学习：将已学知识应用到新的领域</li>
          </ul>
        </div>

        <div className="content-section">
          <Title level={2}>神经网络</Title>
          <p>神经网络是模仿人类大脑结构设计的计算模型：</p>
          <ul className="feature-list">
            <li>基本结构：由大量相互连接的神经元组成</li>
            <li>深度学习：多层神经网络，能够学习复杂的特征</li>
            <li>卷积神经网络：特别适合处理图像和视觉任务</li>
            <li>循环神经网络：擅长处理序列数据，如文本和语音</li>
          </ul>
        </div>

        <div className="content-section">
          <Title level={2}>训练过程</Title>
          <p>AI的训练过程包括以下关键步骤：</p>
          <ul className="feature-list">
            <li>数据收集：获取大量高质量的训练数据</li>
            <li>特征提取：识别数据中的重要特征</li>
            <li>模型训练：不断调整参数以提高性能</li>
            <li>验证评估：测试模型在新数据上的表现</li>
          </ul>
        </div>
      </Content>
    </Layout>
  );
};

export default LearningPage;