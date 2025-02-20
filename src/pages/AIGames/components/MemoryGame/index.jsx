import React, { useState, useEffect } from 'react';
import { Card, Button, message } from 'antd';
import './index.css';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);

  const images = [
    { id: 1, src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop', hint: '智能助手', matched: false },
    { id: 2, src: 'https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=400&h=400&fit=crop', hint: '机器学习', matched: false },
    { id: 3, src: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=400&fit=crop', hint: '神经网络', matched: false },
    { id: 4, src: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=400&fit=crop', hint: '深度学习', matched: false },
  ];

  const shuffleCards = () => {
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, uniqueId: index }));
    setCards(shuffledCards);
    setFlipped([]);
    setMatched([]);
    setScore(0);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleClick = (uniqueId) => {
    if (flipped.length === 1 && flipped[0].uniqueId !== uniqueId) {
      setFlipped([...flipped, cards.find(card => card.uniqueId === uniqueId)]);
    } else if (flipped.length === 0) {
      setFlipped([cards.find(card => card.uniqueId === uniqueId)]);
    }
  };

  useEffect(() => {
    if (flipped.length === 2) {
      setDisabled(true);
      setTimeout(() => {
        if (flipped[0].id === flipped[1].id) {
          setMatched([...matched, flipped[0].id]);
          setScore(score + 10);
          message.success('配对成功！');
          resetTurn();
        } else {
          setTimeout(resetTurn, 1000);
        }
      }, 600);
    }
  }, [flipped]);

  const resetTurn = () => {
    setFlipped([]);
    setDisabled(false);
  };

  return (
    <div className="memory-game">
      <div className="game-header">
        <h3>AI图片连连看</h3>
        <p>得分: {score}</p>
        <Button type="primary" onClick={shuffleCards}>重新开始</Button>
      </div>
      <div className="cards-grid">
        {cards.map((card) => (
          <Card
            key={card.uniqueId}
            className={`memory-card ${flipped.find(f => f.uniqueId === card.uniqueId) ? 'flipped' : ''} 
                      ${matched.includes(card.id) ? 'matched' : ''}`}
            onClick={() => !disabled && !matched.includes(card.id) && 
                    !flipped.find(f => f.uniqueId === card.uniqueId) && handleClick(card.uniqueId)}
          >
            <div className="card-inner">
              <div className="card-front">{card.hint}</div>
              <div className="card-back">
                <img src={card.src} alt="card" />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="game-rules">
        <h4>游戏规则：</h4>
        <p>1. 点击卡片翻开图片</p>
        <p>2. 找到两张相同的图片可以得10分</p>
        <p>3. 全部配对完成即可获胜</p>
      </div>
    </div>
  );
};

export default MemoryGame;