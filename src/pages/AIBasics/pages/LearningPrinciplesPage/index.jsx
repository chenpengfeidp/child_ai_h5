import React, { useState, useEffect } from 'react';
import { Layout, Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SoundOutlined, PauseOutlined } from '@ant-design/icons';
import NavButtons from '../../../../components/NavButtons';
import '../../index.css';

const { Content } = Layout;
const { Title } = Typography;

const LearningPrinciplesPage = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechUtterance, setSpeechUtterance] = useState(null);

  const getAllText = () => {
    return `AI学习原理。

    机器学习基础。
    机器学习是AI系统获取知识的核心方法。通过大量数据的训练，AI系统能够识别模式、总结规律，并在此基础上做出预测和决策。

    学习方式。
    AI的学习主要包括三种方式：
    监督学习：通过标记好的数据来学习，就像老师指导学生一样。
    无监督学习：自主发现数据中的规律和模式，类似于自学。
    强化学习：通过尝试和反馈来学习最优策略，像玩游戏时不断提高技巧。

    神经网络。
    神经网络是模仿人脑结构设计的数学模型：
    输入层接收原始数据。
    隐藏层进行特征提取和转换。
    输出层产生最终结果。
    通过不断调整网络参数，提高预测准确性。

    深度学习。
    深度学习是一种更复杂的学习方式：
    多层神经网络可以学习更复杂的特征。
    自动特征提取减少人工干预。
    在图像识别、语音处理等领域表现优异。`;
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
          // marginBottom: '40px'
        }}>
          <Title level={1} className="page-title" style={{ margin: 0 }}>AI学习原理</Title>
        </div>
        <div>

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
          <Title level={2} style={{ marginBottom: '24px' }}>机器学习基础</Title>
          <p>机器学习是AI系统获取知识的核心方法。通过大量数据的训练，AI系统能够识别模式、总结规律，并在此基础上做出预测和决策。</p>
        </div>

        <div className="content-section" style={{ marginBottom: '48px' }}>
          <Title level={2} style={{ marginBottom: '24px' }}>学习方式</Title>
          <p>AI的学习主要包括三种方式：</p>
          <ul className="feature-list" style={{ marginTop: '16px' }}>
            <li>监督学习：通过标记好的数据来学习，就像老师指导学生一样</li>
            <li>无监督学习：自主发现数据中的规律和模式，类似于自学</li>
            <li>强化学习：通过尝试和反馈来学习最优策略，像玩游戏时不断提高技巧</li>
          </ul>
        </div>

        <div className="content-section" style={{ marginBottom: '48px' }}>
          <Title level={2} style={{ marginBottom: '24px' }}>神经网络</Title>
          <p>神经网络是模仿人脑结构设计的数学模型：</p>
          <ul className="feature-list" style={{ marginTop: '16px' }}>
            <li>输入层接收原始数据</li>
            <li>隐藏层进行特征提取和转换</li>
            <li>输出层产生最终结果</li>
            <li>通过不断调整网络参数，提高预测准确性</li>
          </ul>
        </div>

        <div className="content-section" style={{ marginBottom: '48px' }}>
          <Title level={2} style={{ marginBottom: '24px' }}>深度学习</Title>
          <p>深度学习是一种更复杂的学习方式：</p>
          <ul className="feature-list" style={{ marginTop: '16px' }}>
            <li>多层神经网络可以学习更复杂的特征</li>
            <li>自动特征提取减少人工干预</li>
            <li>在图像识别、语音处理等领域表现优异</li>
          </ul>
        </div>
      </Content>
    </Layout>
  );
};

export default LearningPrinciplesPage;