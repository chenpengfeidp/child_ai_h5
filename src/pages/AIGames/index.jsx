import React from 'react';
import { Layout, Typography, Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  PlayCircleOutlined,
  EditOutlined,
  SmileOutlined,
  CompassOutlined,
  // ... 其他图标
} from '@ant-design/icons';
import NavButtons from '../../components/NavButtons';
import './index.css';

const { Content } = Layout;
const { Title } = Typography;

const AIGames = () => {
  const navigate = useNavigate();

  const games = [
    {
      title: 'AI配对游戏',
      icon: <PlayCircleOutlined />,
      description: '考验记忆力的趣味配对游戏',
      path: '/ai-games/memory'
    },
    {
      title: 'AI图片刮刮乐',
      icon: <PlayCircleOutlined />,
      description: '刮开图层，发现AI生成的图片',
      path: '/ai-games/scratch-card'
    },
    {
      title: 'AI智能迷宫',
      icon: <CompassOutlined />,
      description: '在AI的指引下探索迷宫世界',
      path: '/ai-games/maze'
    },
    {
      title: 'AI表情识别',
      icon: <SmileOutlined />,
      description: '让AI识别你的面部表情',
      path: '/ai-games/emotion'
    },
    {
      title: 'AI词语猜谜',
      icon: <PlayCircleOutlined />,
      description: '根据提示猜出AI相关的词语，考验你的AI知识',
      path: '/ai-games/word-guess'
    }
  ];

  return (
    <Layout className="ai-games-container">
      <Content className="ai-games-content">
        <NavButtons />
        <Title level={1} className="page-title">AI趣味游戏</Title>
        <div className="content-section">
          <Title level={2}>AI游戏体验</Title>
          <p>在这里，你可以通过有趣的游戏来了解AI的工作原理。我们准备了多个互动小游戏，让你在玩乐中学习AI知识。</p>
          <Row gutter={[24, 24]}>
            {games.map((game, index) => (
              <Col xs={24} sm={12} md={12} lg={12} key={index}>
                <Card
                  hoverable
                  className="game-card"
                  onClick={() => navigate(game.path)}
                >
                  <div className="card-icon">{game.icon}</div>
                  <Title level={3}>{game.title}</Title>
                  <p>{game.description}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default AIGames;