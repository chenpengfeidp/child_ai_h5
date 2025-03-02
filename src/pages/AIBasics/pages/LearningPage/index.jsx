import React, { useState, useEffect } from 'react';
import { Layout, Typography, Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SoundOutlined, PauseOutlined } from '@ant-design/icons';
import NavButtons from '../../../../components/NavButtons';
import '../../index.css';


const { Content } = Layout;
const { Title } = Typography;

const LearningPage = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechUtterance, setSpeechUtterance] = useState(null);

  const getAllText = () => {
    return `
    你好，开始为你朗读。

    机器学习基础。
    机器学习是AI获取知识的核心方式，主要包括以下几种学习方式：
    监督学习：通过标记好的数据来学习，就像老师指导学生。
    无监督学习：自主发现数据中的规律和模式。
    强化学习：通过尝试和反馈来学习最优策略。
    迁移学习：将已学知识应用到新的领域。

    神经网络。
    神经网络是模仿人类大脑结构设计的计算模型：
    基本结构：由大量相互连接的神经元组成。
    深度学习：多层神经网络，能够学习复杂的特征。
    卷积神经网络：特别适合处理图像和视觉任务。
    循环神经网络：擅长处理序列数据，如文本和语音。

    训练过程。
    AI的训练过程包括以下关键步骤：
    数据收集：获取大量高质量的训练数据。
    特征提取：识别数据中的重要特征。
    模型训练：不断调整参数以提高性能。
    验证评估：测试模型在新数据上的表现。`;
  };

  const handlePlay = () => {
    if (!isPlaying) {
      const utterance = new SpeechSynthesisUtterance(getAllText());

      // 获取可用的语音列表
      const voices = window.speechSynthesis.getVoices();
      // 选择中文男声（如果有的话）
      const chineseVoice = voices.find(voice =>
        voice.lang.includes('zh') && voice.name.includes('Male')
      ) || voices.find(voice => voice.lang.includes('zh'));

      if (chineseVoice) {
        utterance.voice = chineseVoice;
      }

      utterance.lang = 'zh-CN';
      utterance.rate = 1;  // 正常语速
      utterance.pitch = 0.8; // 降低音调
      utterance.volume = 1;  // 最大音量

      utterance.onend = () => {
        setIsPlaying(false);
        setSpeechUtterance(null);
      };

      setSpeechUtterance(utterance);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    } else {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setSpeechUtterance(null);
    }
  };

  // 确保在组件加载时获取语音列表
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  // 组件卸载时停止语音播放
  useEffect(() => {
    return () => {
      if (isPlaying) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying]);

  return (
    <Layout className="ai-basics-container">
      <Content className="ai-basics-content">
        <NavButtons />
        <div style={{
          // display: 'flex',
          // alignItems: 'center',
          // justifyContent: 'space-between',
          marginBottom: '-40px'
        }}>
          <Title level={1} className="page-title" style={{ margin: 0 }}>AI学习原理</Title>
        </div>
        <div style={{
          // display: 'flex',
          // alignItems: 'center',
          // justifyContent: 'space-between',
          marginBottom: '40px'
        }}>
          <Button
            type="primary"
            icon={isPlaying ? <PauseOutlined /> : <SoundOutlined />}
            onClick={handlePlay}
            style={{
              marginLeft: 16,
              height: '40px',
              borderRadius: '20px',
              padding: '0 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '16px',
              background: isPlaying ? '#ff4d4f' : '#1890ff',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
            }}
          >
            {isPlaying ? '停止朗读' : '朗读全文'}
          </Button>
        </div>

        <div className="content-section" style={{ marginBottom: '48px' }}>
          <Title level={2}>机器学习基础</Title>
          <p>机器学习是AI获取知识的核心方式，主要包括以下几种学习方式：</p>
          <ul className="feature-list">
            <li>监督学习：通过标记好的数据来学习，就像老师指导学生</li>
            <li>无监督学习：自主发现数据中的规律和模式</li>
            <li>强化学习：通过尝试和反馈来学习最优策略</li>
            <li>迁移学习：将已学知识应用到新的领域</li>
          </ul>
        </div>

        
        <div className="content-section" style={{ marginBottom: '48px' }}>
          <Title level={2}>神经网络</Title>
          <p>神经网络是模仿人类大脑结构设计的计算模型：</p>
          <ul className="feature-list">
            <li>基本结构：由大量相互连接的神经元组成</li>
            <li>深度学习：多层神经网络，能够学习复杂的特征</li>
            <li>卷积神经网络：特别适合处理图像和视觉任务</li>
            <li>循环神经网络：擅长处理序列数据，如文本和语音</li>
          </ul>
        </div>
        <Card style={{
                width: '100%',
                margin: '0 auto 20px',
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

        <div className="content-section" style={{ marginBottom: '48px' }}>
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