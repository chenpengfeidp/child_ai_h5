import React, { useState } from 'react';
import { Layout, Typography, Button, Input, Slider, Space, Card } from 'antd';
import { HomeOutlined, ArrowLeftOutlined, PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

const SpeechSynthesisPage = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);

  const handleSpeak = () => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <Layout className="ai-experiments-container">
      <Content className="ai-experiments-content">
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
        <Title level={1} className="page-title">语音合成实验</Title>
        <div className="content-section">
          <Title level={2}>实验介绍</Title>
          <p>在这个实验中，你将体验AI如何将文字转换为自然流畅的语音。通过输入文本，AI系统将生成对应的语音输出，让你直观感受语音合成技术的魅力。</p>
          
          <Card title="语音合成控制面板" style={{ marginTop: 24 }}>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <div>
                <Text strong>输入文本：</Text>
                <TextArea
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="请输入要转换为语音的文字"
                  style={{ marginTop: 8 }}
                />
              </div>

              <div>
                <Text strong>语速调节：</Text>
                <Slider
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={rate}
                  onChange={setRate}
                  marks={{
                    0.5: '慢',
                    1: '正常',
                    2: '快'
                  }}
                />
              </div>

              <div>
                <Text strong>音调调节：</Text>
                <Slider
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={pitch}
                  onChange={setPitch}
                  marks={{
                    0.5: '低',
                    1: '正常',
                    2: '高'
                  }}
                />
              </div>

              <div>
                <Button
                  type="primary"
                  icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                  onClick={isPlaying ? handleStop : handleSpeak}
                  size="large"
                >
                  {isPlaying ? '停止播放' : '开始播放'}
                </Button>
              </div>
            </Space>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default SpeechSynthesisPage;