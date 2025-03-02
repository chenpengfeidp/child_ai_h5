import React, { useState, useEffect } from 'react';
import { Layout, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import NavButtons from '../../../../components/NavButtons';
import '../../index.css';

const { Content } = Layout;
const { Title } = Typography;

const AnimationPage = () => {
  const navigate = useNavigate();
  const [currentFrame, setCurrentFrame] = useState(0);

  // 动画帧数据
  const frames = [
    { text: '数据收集', description: '收集大量数据作为AI学习的基础' },
    { text: '特征提取', description: 'AI从数据中提取关键特征' },
    { text: '模型训练', description: 'AI通过算法学习数据中的规律' },
    { text: '预测应用', description: 'AI将学到的知识应用到新的数据上' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Layout className="ai-basics-container">
      <Content className="ai-basics-content">
        <NavButtons />
        <Title level={1} className="page-title">AI动画演示</Title>
        <div className="content-section">
          <div className="animation-container" style={{
            textAlign: 'center',
            padding: '40px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: '12px',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div className="animation-frame" style={{
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'all 0.5s ease-in-out',
              animation: 'fadeInUp 0.5s ease-in-out'
            }}>
              <Title level={2} style={{ 
                color: '#1890ff',
                marginBottom: '24px',
                fontSize: '36px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
              }}>
                {frames[currentFrame].text}
              </Title>
              <p style={{
                fontSize: '18px',
                color: '#333',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                {frames[currentFrame].description}
              </p>
            </div>
            <div className="animation-progress" style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '12px'
            }}>
              {frames.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: index === currentFrame ? '#1890ff' : '#d9d9d9',
                    transition: 'background-color 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <style>{
          `@keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }`
        }</style>
      </Content>
    </Layout>
  );
};

export default AnimationPage;