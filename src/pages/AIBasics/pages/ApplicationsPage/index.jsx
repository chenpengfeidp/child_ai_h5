import React from 'react';
import { Layout, Typography, Button } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

const { Content } = Layout;
const { Title } = Typography;

const ApplicationsPage = () => {
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
        <Title level={1} className="page-title">AI应用场景</Title>
        <div className="content-section">
          <Title level={2}>医疗健康</Title>
          <p>AI在医疗领域的应用正在改变传统医疗模式：</p>
          <ul className="feature-list">
            <li>医学影像诊断：通过深度学习分析X光片、CT等医学影像</li>
            <li>药物研发：加速新药研发过程，预测药物效果</li>
            <li>个性化治疗：根据患者个人数据制定最佳治疗方案</li>
            <li>疾病预测：通过数据分析预测疾病风险</li>
          </ul>
        </div>

        <div className="content-section">
          <Title level={2}>教育领域</Title>
          <p>AI为教育带来了革命性的变化：</p>
          <ul className="feature-list">
            <li>个性化学习：根据学生的学习进度和风格调整教学内容</li>
            <li>智能评估：自动评估学生的作业和考试</li>
            <li>虚拟助教：24/7在线解答学生疑问</li>
            <li>教学管理：优化课程安排和资源分配</li>
          </ul>
        </div>

        <div className="content-section">
          <Title level={2}>金融服务</Title>
          <p>AI在金融领域的应用：</p>
          <ul className="feature-list">
            <li>风险评估：评估贷款申请和投资风险</li>
            <li>智能投顾：提供个性化投资建议</li>
            <li>欺诈检测：识别可疑交易和异常行为</li>
            <li>市场预测：分析市场趋势和投资机会</li>
          </ul>
        </div>
      </Content>
    </Layout>
  );
};

export default ApplicationsPage;