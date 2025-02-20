import React, { useState } from 'react';
import { Layout, Typography, Button, Input, Card, Space, Tag } from 'antd';
import { HomeOutlined, ArrowLeftOutlined, SendOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

// 预设的问答对
const QA_PAIRS = {
  '你好': '你好！很高兴和你聊天。',
  '你是谁': '我是一个AI助手，可以和你聊天。',
  '今天天气怎么样': '抱歉，我不能实时获取天气信息，但我可以和你聊聊别的。',
  '1+1等于几': '1+1等于2。这是一个简单的数学问题。',
  '你会做什么': '我可以回答问题、分析文字的情感倾向，和你进行简单的对话。',
};

// 情感分析函数
const analyzeEmotion = (text) => {
  const positiveWords = ['喜欢', '开心', '快乐', '好', '棒', '优秀', '感谢'];
  const negativeWords = ['不喜欢', '讨厌', '难过', '糟糕', '差', '烦', '生气'];
  
  let score = 0;
  positiveWords.forEach(word => {
    if (text.includes(word)) score += 1;
  });
  negativeWords.forEach(word => {
    if (text.includes(word)) score -= 1;
  });
  
  if (score > 0) return '积极';
  if (score < 0) return '消极';
  return '中性';
};

const NLPPage = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [emotion, setEmotion] = useState(null);

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
        <Title level={1} className="page-title">自然语言处理实验</Title>
        <div className="content-section">
          <Title level={2}>实验介绍</Title>
          <p>在这个实验中，你将体验AI如何理解和处理人类语言。通过输入文本，AI系统将展示简单的对话系统和情感分析功能。</p>
          
          <Card title="对话系统" style={{ marginTop: 24 }}>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #d9d9d9', borderRadius: '4px', padding: '16px', marginBottom: '16px' }}>
                {conversation.map((msg, index) => (
                  <div key={index} style={{ marginBottom: '12px' }}>
                    <Text strong>{msg.role === 'user' ? '你：' : 'AI：'}</Text>
                    <Text>{msg.content}</Text>
                    {msg.emotion && (
                      <Tag color={msg.emotion === '积极' ? 'green' : msg.emotion === '消极' ? 'red' : 'blue'} style={{ marginLeft: '8px' }}>
                        情感：{msg.emotion}
                      </Tag>
                    )}
                  </div>
                ))}
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <TextArea
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setEmotion(analyzeEmotion(e.target.value));
                  }}
                  placeholder="请输入你想说的话"
                  autoSize={{ minRows: 2, maxRows: 4 }}
                  style={{ flex: 1 }}
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={() => {
                    if (!input.trim()) return;
                    
                    const userMessage = { role: 'user', content: input, emotion };
                    let response = '对不起，我不太明白你的意思。';
                    
                    // 查找预设问答
                    Object.entries(QA_PAIRS).forEach(([q, a]) => {
                      if (input.includes(q)) {
                        response = a;
                      }
                    });
                    
                    const aiMessage = { role: 'ai', content: response };
                    
                    setConversation([...conversation, userMessage, aiMessage]);
                    setInput('');
                    setEmotion(null);
                  }}
                >
                  发送
                </Button>
              </div>
              
              {emotion && input && (
                <div>
                  <Text type="secondary">当前输入的情感倾向：</Text>
                  <Tag color={emotion === '积极' ? 'green' : emotion === '消极' ? 'red' : 'blue'}>
                    {emotion}
                  </Tag>
                </div>
              )}
            </Space>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default NLPPage;