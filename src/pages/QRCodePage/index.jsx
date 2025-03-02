import React from 'react';
import { Layout, Typography, Button, QRCode } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import qrCodeImage from './child_h5.jpg';

const { Content } = Layout;
const { Title } = Typography;

const QRCodePage = () => {
  const navigate = useNavigate();
  const websiteUrl = 'https://chenpengfeidp.github.io/child_ai_h5/';

  return (
    <Layout className="qrcode-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
        animation: 'pulse 4s infinite'
      }} />
      <Content style={{
        padding: '24px',
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ marginBottom: '20px' }}>
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

        <div style={{
          textAlign: 'center',
          marginTop: '40px',
          padding: '40px',
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
        }}>
          <Title level={1} style={{ color: '#1a237e' }}>扫码访问</Title>
          <Title level={1} style={{ color: '#1a237e' }}>少儿AI启蒙</Title>
          <div style={{
            marginTop: '30px',
            marginBottom: '30px',
            display: 'inline-block',
            padding: '20px',
            background: 'white',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <img
              src={qrCodeImage}
              alt='扫码访问少儿AI启蒙'
              style={{
                maxWidth: '200px',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
          <Title level={3} style={{
            marginTop: '20px',
            color: '#1a237e',
            fontWeight: 'normal'
          }}>
            使用手机扫描上方二维码即可访问
          </Title>
        </div>
      </Content>
      <style>{
        `@keyframes pulse {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 0.6; }
        }
        @keyframes slide {
          0% { background-position: 0 0; }
          100% { background-position: 100px 0; }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }`
      }</style>
    </Layout>
  );
};

export default QRCodePage;