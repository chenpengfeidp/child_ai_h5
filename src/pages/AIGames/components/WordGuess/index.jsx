import React, { useState, useEffect } from 'react';
import { Button, Input, Card, message, Space } from 'antd';
import './index.css';

const WordGuess = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [hint, setHint] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  const words = [
    { word: '机器人', hint: '会动会说话的智能小伙伴', level: 1 },
    { word: '小度', hint: '百度公司的智能音箱助手', level: 1 },
    { word: '小爱同学', hint: '小米公司的智能音箱助手', level: 1 },
    { word: '智能家居', hint: '可以用手机控制的智能家电', level: 1 },
    { word: '人工智能', hint: '像人一样聪明的电脑程序', level: 2 },
    { word: '扫地机器人', hint: '自动帮你打扫房间的小机器', level: 2 },
    { word: '智能手表', hint: '有打电话、拍照、付款等多功能的聪明手表', level: 3 },
  ];

  const loadNewWord = () => {
    const availableWords = words.filter(w => w.level <= level);
    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    setCurrentWord(randomWord.word);
    setHint(randomWord.hint);
    setUserGuess('');
  };

  const checkAnswer = () => {
    if (userGuess === currentWord) {
      const points = level * 10;
      setScore(score + points);
      message.success(`答对了！获得${points}分`);
      if (score + points >= level * 30 && level < 3) {
        setLevel(level + 1);
        message.success('恭喜你升级了！');
      }
      loadNewWord();
    } else {
      message.error('答错了，请继续努力！');
    }
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    loadNewWord();
  };

  useEffect(() => {
    loadNewWord();
  }, []);

  return (
    <div className="word-guess">
      <div className="game-header">
        <h3>AI词语猜谜</h3>
        <p>得分: {score}</p>
        <p>当前等级: {level}</p>
        <Button type="primary" onClick={resetGame}>重新开始</Button>
      </div>
      <Card className="game-area">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div className="hint-section">
            <h4>提示：</h4>
            <p>{hint}</p>
          </div>
          <div className="input-section">
            <Input
              placeholder="请输入你的答案"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              onPressEnter={checkAnswer}
            />
            <Button type="primary" onClick={checkAnswer} style={{ marginTop: '10px' }}>
              提交答案
            </Button>
          </div>
        </Space>
      </Card>
      <div className="game-rules">
        <h4>游戏规则：</h4>
        <p>1. 根据提示猜出AI相关的词语</p>
        <p>2. 答对可以获得当前等级 × 10分</p>
        <p>3. 累计得分达到当前等级 × 30分可以升级</p>
        <p>4. 共有3个等级，等级越高词语难度越大</p>
      </div>
    </div>
  );
};

export default WordGuess;