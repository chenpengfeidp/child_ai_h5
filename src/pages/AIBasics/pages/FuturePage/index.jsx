import React from 'react';
import { Layout, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import NavButtons from '../../../../components/NavButtons';
import '../../index.css';

const { Content } = Layout;
const { Title } = Typography;

const FuturePage = () => {
  const navigate = useNavigate();

  return (
    <Layout className="ai-basics-container">
      <Content className="ai-basics-content">
        <NavButtons />
        <Title level={1} className="page-title">AI的未来</Title>
        <div className="content-section">
          <Title level={2}>技术发展趋势</Title>
          <p>AI技术正在朝着以下方向发展：</p>
          <ul className="feature-list">
            <li>通用人工智能：开发具有类人思维能力的AI系统</li>
            <li>可解释性AI：使AI的决策过程更透明、可理解</li>
            <li>边缘计算：将AI能力部署到终端设备</li>
            <li>自主学习：减少对人工标注数据的依赖</li>
          </ul>
        </div>

        <div className="content-section">
          <Title level={2}>未来应用领域</Title>
          <p>AI将在更多领域发挥重要作用：</p>
          <ul className="feature-list">
            <li>太空探索：辅助宇宙探测和星际旅行</li>
            <li>环境保护：优化资源利用，应对气候变化</li>
            <li>智慧城市：提升城市管理和服务效率</li>
            <li>生命科学：加速基因研究和药物开发</li>
          </ul>
        </div>

        <div className="content-section">
          <Title level={2}>社会影响</Title>
          <p>AI的发展将带来深远的社会影响：</p>
          <ul className="feature-list">
            <li>工作方式：改变就业结构，创造新的职业机会</li>
            <li>教育模式：个性化学习成为主流</li>
            <li>医疗健康：预防医学和精准治疗普及</li>
            <li>生活方式：智能化、自动化程度提升</li>
          </ul>
        </div>
      </Content>
    </Layout>
  );
};

export default FuturePage;