import React, { useState, useEffect } from 'react';
import { Layout, Typography, Button, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import NavButtons from '../../../../components/NavButtons';
import './index.css';
import { UpOutlined, DownOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;

const AIMazePage = () => {
  const [level, setLevel] = useState(1);
  const [steps, setSteps] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [hint, setHint] = useState('');
  const [currentMazeIndex, setCurrentMazeIndex] = useState(0);

  // 多个迷宫布局
  const mazeLayouts = [
    // 第一关
    [
      [0, 0, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 0, 0, 1],
      [1, 1, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 2],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ],
    // 第二关
    [
      [0, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 1, 1, 1, 0, 2],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ],
    // 第三关
    [
      [0, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 2],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ],
  ];

  const startGame = () => {
    setIsGameStarted(true);
    setPlayerPosition({ x: 0, y: 0 });
    setSteps(0);
    setHint('使用方向按钮移动角色到达终点');
  };

  const handleMove = (direction) => {
    if (!isGameStarted) return;

    let newPos = { ...playerPosition };
    const currentMaze = mazeLayouts[currentMazeIndex];

    switch (direction) {
      case 'up':
        newPos.y = Math.max(0, playerPosition.y - 1);
        break;
      case 'down':
        newPos.y = Math.min(currentMaze.length - 1, playerPosition.y + 1);
        break;
      case 'left':
        newPos.x = Math.max(0, playerPosition.x - 1);
        break;
      case 'right':
        newPos.x = Math.min(currentMaze[0].length - 1, playerPosition.x + 1);
        break;
      default:
        return;
    }

    // 检查是否可以移动到新位置
    if (currentMaze[newPos.y][newPos.x] !== 1) {
      setPlayerPosition(newPos);
      setSteps(steps + 1);

      // 检查是否到达终点
      if (currentMaze[newPos.y][newPos.x] === 2) {
        message.success('恭喜通关！');
        setIsGameStarted(false);

        // 切换到下一关
        if (currentMazeIndex < mazeLayouts.length - 1) {
          setCurrentMazeIndex(currentMazeIndex + 1);
          setLevel(level + 1);
          setTimeout(() => {
            message.info('准备开始下一关！');
          }, 1000);
        } else {
          message.success('恭喜通过所有关卡！');
          // 重置到第一关
          setCurrentMazeIndex(0);
          setLevel(1);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleMove);
    return () => {
      window.removeEventListener('keydown', handleMove);
    };
  }, [isGameStarted, playerPosition, steps]);

  const getAIHint = () => {
    const hints = [
      '向右走两步，然后向下',
      '注意避开死胡同',
      '当前位置距离终点还有几步',
      '试试其他路径',
    ];
    setHint(hints[Math.floor(Math.random() * hints.length)]);
  };

  return (
    <Layout className="ai-games-container">
      <Content className="ai-games-content">
        <NavButtons />
        <Title level={1} className="page-title">AI智能迷宫</Title>
        <div className="content-wrapper">
          <div className="content-section">
            <div className="game-info">
              <div>当前关卡: {level}</div>
              <div>步数: {steps}</div>
            </div>
            <div className="maze-container">
              {mazeLayouts[currentMazeIndex].map((row, y) => (
                <div key={y} className="maze-row">
                  {row.map((cell, x) => (
                    <div
                      key={`${x}-${y}`}
                      className={`maze-cell ${
                        cell === 1 ? 'wall' :
                        cell === 2 ? 'goal' :
                        'path'
                      } ${
                        playerPosition.x === x && playerPosition.y === y ? 'player' : ''
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="direction-controls">
              <Button
                className="direction-btn up"
                icon={<UpOutlined />}
                onClick={() => handleMove('up')}
                disabled={!isGameStarted}
              />
              <div className="horizontal-controls">
                <Button
                  className="direction-btn"
                  icon={<LeftOutlined />}
                  onClick={() => handleMove('left')}
                  disabled={!isGameStarted}
                />
                <Button
                  className="direction-btn"
                  icon={<RightOutlined />}
                  onClick={() => handleMove('right')}
                  disabled={!isGameStarted}
                />
              </div>
              <Button
                className="direction-btn down"
                icon={<DownOutlined />}
                onClick={() => handleMove('down')}
                disabled={!isGameStarted}
              />
            </div>
            <div className="game-controls">
              <Button
                type="primary"
                onClick={startGame}
                disabled={isGameStarted}
              >
                {isGameStarted ? '游戏中...' : '开始游戏'}
              </Button>
              <Button onClick={getAIHint}>
                获取AI提示
              </Button>
            </div>
            {hint && (
              <Card className="hint-card">
                <p>AI提示: {hint}</p>
              </Card>
            )}
            <Card className="instruction-card">
              <Title level={4}>游戏说明：</Title>
              <ol>
                <li>点击"开始游戏"按钮开始</li>
                <li>使用方向按钮移动角色</li>
                <li>避开墙壁，到达绿色终点即可通关</li>
                <li>遇到困难可以点击"获取AI提示"</li>
                <li>尽可能用最少的步数完成挑战</li>
              </ol>
            </Card>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default AIMazePage;