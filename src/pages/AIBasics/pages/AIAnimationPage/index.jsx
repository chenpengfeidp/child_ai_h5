import React from 'react';
import { Layout, Typography, Card, Row, Col } from 'antd';
import NavButtons from '../../../../components/NavButtons';
import '../../index.css';

const { Content } = Layout;
const { Title } = Typography;

const AIAnimationPage = () => {
  return (
    <Layout className="ai-basics-container">
      <Content className="ai-basics-content">
        <NavButtons />
        <Title level={1} className="page-title" style={{ marginBottom: '40px' }}>AI动画展示</Title>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <div className="content-section" style={{ marginBottom: '48px' }}>
              <Title level={2} style={{ marginBottom: '24px' }}>数据处理流程</Title>
              <Card style={{
                width: '100%',
                margin: '0 auto',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'relative',
                  paddingTop: '75%',
                  width: '100%',
                  background: '#f0f2f5'
                }}>
                  <iframe
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none'
                    }}
                    src="https://embed.lottiefiles.com/animation/63487"  // 更换为数据流处理动画
                    title="Data Processing Animation"
                    allowFullScreen
                  />
                </div>
              </Card>
              <div style={{ marginTop: '16px' }}>
                <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
                  这个动画展示了AI系统处理数据的基本流程：
                </p>
                <ul style={{ fontSize: '16px', lineHeight: '1.6', marginTop: '8px', paddingLeft: '20px' }}>
                  <li>输入数据：系统接收原始信息</li>
                  <li>数据转换：将数据转换为AI可理解的格式</li>
                  <li>特征提取：识别关键特征和模式</li>
                </ul>
              </div>
            </div>
          </Col>

          <Col xs={24} lg={12}>
            <div className="content-section" style={{ marginBottom: '48px' }}>
              <Title level={2} style={{ marginBottom: '24px' }}>AI学习过程</Title>
              <Card style={{
                width: '100%',
                margin: '0 auto',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'relative',
                  paddingTop: '75%',
                  width: '100%',
                  background: '#f0f2f5'
                }}>
                  <iframe
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none'
                    }}
                    src="https://embed.lottiefiles.com/animation/77323"  // 更换为神经网络学习动画
                    title="AI Learning Animation"
                    allowFullScreen
                  />
                </div>
              </Card>
              <div style={{ marginTop: '16px' }}>
                <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
                  这个动画展示了AI的学习和训练过程：
                </p>
                <ul style={{ fontSize: '16px', lineHeight: '1.6', marginTop: '8px', paddingLeft: '20px' }}>
                  <li>神经网络：模拟人脑的信息处理方式</li>
                  <li>权重调整：通过反馈不断优化网络连接</li>
                  <li>模式识别：学习识别数据中的规律</li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>

        <div className="content-section" style={{ marginBottom: '48px', maxWidth: '800px', margin: '0 auto' }}>
          <Title level={2} style={{ marginBottom: '24px' }}>总体说明</Title>
          <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            这两个动画展示了AI系统的核心工作原理。从数据的输入和处理，到神经网络的学习和进化，让我们能够直观地理解AI是如何"思考"和"学习"的。
          </p>
        </div>
      </Content>
    </Layout>
  );
};

export default AIAnimationPage;
