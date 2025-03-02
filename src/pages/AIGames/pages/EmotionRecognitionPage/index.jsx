import React, { useState, useEffect, useRef } from 'react';
import { Layout, Typography, Button, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import NavButtons from '../../../../components/NavButtons';
import './index.css';

const { Content } = Layout;
const { Title } = Typography;

const EmotionRecognitionPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('未检测');

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setIsPlaying(true);
          message.success('摄像头启动成功');
        };
      }
    } catch (err) {
      message.error('无法访问摄像头，请确保已授予权限');
      console.error('摄像头访问错误:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsPlaying(false);
      setCurrentEmotion('未检测');
      message.info('摄像头已关闭');
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const simulateEmotionRecognition = () => {
    const emotions = ['开心', '悲伤', '惊讶', '生气', '平静'];
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    setCurrentEmotion(randomEmotion);
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(simulateEmotionRecognition, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const getEmotionClass = (emotion) => {
    const emotionMap = {
      '开心': 'happy',
      '悲伤': 'sad',
      '惊讶': 'surprised',
      '生气': 'angry',
      '平静': 'neutral'
    };
    return `emotion-status ${emotionMap[emotion] || ''}`;
  };

  return (
    <Layout className="ai-games-container">
      <Content className="ai-games-content">
        <NavButtons />
        <Title level={1} className="page-title">AI表情识别</Title>
        <div className="content-wrapper">
          <div className="content-section">
            <div className="camera-container">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="camera-view"
              />
              <div className="emotion-display">
                <Title level={3} className={getEmotionClass(currentEmotion)}>
                  当前表情：{currentEmotion}
                </Title>
              </div>
              <div className="camera-controls">
                <Button
                  type="primary"
                  onClick={isPlaying ? stopCamera : startCamera}
                  size="large"
                >
                  {isPlaying ? '停止摄像头' : '开启摄像头'}
                </Button>
              </div>
            </div>
            <Card className="instruction-card">
              <Title level={4}>游戏说明：</Title>
              <ol>
                <li>点击"开启摄像头"按钮启动摄像头</li>
                <li>保持自然表情，面对摄像头</li>
                <li>系统会自动识别你的表情变化</li>
                <li>尝试做出不同的表情，看看AI能否准确识别</li>
                <li>完成后点击"停止摄像头"按钮结束体验</li>
              </ol>
            </Card>
          </div>
        </div>
      </Content>
      <style>{`
        .ai-games-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }
        .ai-games-content {
          padding: 24px;
        }
        .content-wrapper {
          max-width: 800px;
          margin: 0 auto;
        }
        .content-section {
          background: white;
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .camera-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
        }
        .camera-view {
          width: 100%;
          max-width: 640px;
          height: 480px;
          background: #f0f0f0;
          border-radius: 8px;
          object-fit: cover;
        }
        .emotion-display {
          text-align: center;
        }
        .emotion-status {
          padding: 10px 20px;
          border-radius: 20px;
          display: inline-block;
        }
        .happy { color: #52c41a; }
        .sad { color: #1890ff; }
        .surprised { color: #faad14; }
        .angry { color: #f5222d; }
        .neutral { color: #595959; }
        .instruction-card {
          margin-top: 20px;
        }
        .page-title {
          text-align: center;
          margin-bottom: 40px;
        }
      `}</style>
    </Layout>
  );
};

export default EmotionRecognitionPage;