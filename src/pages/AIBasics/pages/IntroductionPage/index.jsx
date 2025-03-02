import React, { useState, useEffect } from 'react';
import { Layout, Typography, Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SoundOutlined, PauseOutlined } from '@ant-design/icons';
import NavButtons from '../../../../components/NavButtons';
import aiVideo from '../../../../assets/ai.mp4';
import '../../index.css';

const { Content } = Layout;
const { Title } = Typography;

const IntroductionPage = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechUtterance, setSpeechUtterance] = useState(null);

  const getAllText = () => {
    return `
    你好，开始为你朗读。

    什么是人工智能？
    人工智能（AI）是让计算机模仿人类思维和学习的科技。就像你的大脑可以学习新知识一样，AI也可以通过学习来完成各种任务。

    AI的发展历史。
    人工智能的发展历程可以追溯到20世纪50年代，经历了以下几个重要阶段：
    1950年代：图灵测试的提出，为AI的发展奠定了理论基础。
    1960-1970年代：专家系统的兴起，AI开始在特定领域展现能力。
    1980-1990年代：机器学习算法的发展，使AI具备了自主学习的能力。
    2000年至今：深度学习的突破，AI在图像识别、自然语言处理等领域取得重大进展。

    AI的核心原理。
    人工智能的核心原理包括：
    数据驱动：通过大量数据的学习来提升性能。
    模式识别：从数据中发现和学习规律。
    算法优化：不断调整和改进决策过程。
    反馈学习：根据结果反馈来优化模型。`;
  };

  const handlePlay = () => {
    if (!isPlaying) {
      // 开始播放
      const utterance = new SpeechSynthesisUtterance(getAllText());

      // 获取可用的语音列表
      const voices = window.speechSynthesis.getVoices();
      // 选择中文女声（如果有的话）
      const chineseVoice = voices.find(voice =>
        voice.lang.includes('zh') && voice.name.includes('Female')
      ) || voices.find(voice => voice.lang.includes('zh'));

      if (chineseVoice) {
        utterance.voice = chineseVoice;
      }

      utterance.lang = 'zh-CN';
      utterance.rate = 1.1;  // 稍微加快语速
      utterance.pitch = 1.2; // 提高音调
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

  // 路由变化时停止语音播放
  useEffect(() => {
    const handleRouteChange = () => {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setSpeechUtterance(null);
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [isPlaying]);

  return (
    <Layout className="ai-basics-container">
      <Content className="ai-basics-content">
        <NavButtons />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Title level={1} className="page-title" style={{ margin: 0 }}>AI简介</Title>
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

        {/* <div style={{ marginBottom: '48px', backgroundColor: '#f0f2f5' }}>
          <iframe src="https://www.bilibili.com/video/BV1ndi1YfEPs?t=114.5&p=6" width="100%" height="400px" frameBorder="0" allowFullScreen></iframe>
        </div> */}
        <Card title="欢迎来到AI世界" style={{
          width: '100%',
          margin: '0 auto 20px',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'relative',
            paddingTop: '56.25%', // 16:9 比例
            width: '100%',
            background: '#f0f2f5'
          }}>
            <video
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              controls
              controlsList="nodownload"
              poster="/path/to/poster.jpg"  // 可选：设置视频封面
            >
              <source src={aiVideo} type="video/mp4" />
              你的浏览器不支持 video 标签
            </video>
          </div>
        </Card>
        <div style={{ marginBottom: '48px', backgroundColor: '#f0f2f5', padding: '12px', borderRadius: '4px' }}>
          视频来源：
          <a
            href="https://www.bilibili.com/video/BV1ndi1YfEPs?t=114.5&p=6"
            target="_blank"
            rel="noopener noreferrer"
          >
            【科普动画】欢迎来到AI时代
          </a>
        </div>

        <div className="content-section" style={{ marginBottom: '48px' }}>  {/* 增加板块间距 */}
          <Title level={2} style={{ marginBottom: '24px' }}>什么是人工智能？</Title>
          <p>人工智能（AI）是让计算机模仿人类思维和学习的科技。就像你的大脑可以学习新知识一样，AI也可以通过学习来完成各种任务。</p>
        </div>

        <div className="content-section" style={{ marginBottom: '48px' }}>  {/* 增加板块间距 */}
          <Title level={2} style={{ marginBottom: '24px' }}>AI的发展历史</Title>
          <p>人工智能的发展历程可以追溯到20世纪50年代，经历了以下几个重要阶段：</p>
          <ul className="feature-list" style={{ marginTop: '16px' }}>
            <li>1950年代：图灵测试的提出，为AI的发展奠定了理论基础</li>
            <li>1960-1970年代：专家系统的兴起，AI开始在特定领域展现能力</li>
            <li>1980-1990年代：机器学习算法的发展，使AI具备了自主学习的能力</li>
            <li>2000年至今：深度学习的突破，AI在图像识别、自然语言处理等领域取得重大进展</li>
          </ul>
        </div>

        <div className="content-section" style={{ marginBottom: '48px' }}>  {/* 增加板块间距 */}
          <Title level={2} style={{ marginBottom: '24px' }}>AI的核心原理</Title>
          <p>人工智能的核心原理包括：</p>
          <ul className="feature-list" style={{ marginTop: '16px' }}>
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