import React, { useRef, useState, useEffect } from 'react';
import { Button, message } from 'antd';
import './index.css';

const ScratchCard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [score, setScore] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  const images = [
    'https://picsum.photos/400/300?random=1',
    'https://picsum.photos/400/300?random=2',
    'https://picsum.photos/400/300?random=3',
    'https://picsum.photos/400/300?random=4',
  ];

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#CCCCCC';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 40;
  };

  const loadNewImage = () => {
    setImageLoaded(false);
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setCurrentImage(randomImage);
  };

  const handleStart = (e) => {
    setIsDrawing(true);
    draw(e);
  };

  const handleEnd = () => {
    setIsDrawing(false);
    checkProgress();
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] === 0) {
        transparentPixels++;
      }
    }

    const percentScratched = (transparentPixels / (canvas.width * canvas.height)) * 100;
    if (percentScratched > 50 && score === 0) {
      setScore(score + 10);
      message.success('恭喜你发现了AI生成的图片！');
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const resetGame = () => {
    setScore(0);
    loadNewImage();
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.globalCompositeOperation = 'source-over';
      initCanvas();
    }
  };

  useEffect(() => {
    loadNewImage();
  }, []);

  useEffect(() => {
    if (imageLoaded) {
      initCanvas();
    }
  }, [imageLoaded]);

  return (
    <div className="scratch-card">
      <div className="game-header">
        <h3>AI图片刮刮乐</h3>
        <p>得分: {score}</p>
        <Button type="primary" onClick={resetGame}>重新开始</Button>
      </div>
      <div className="game-area">
        <div className="canvas-container">
          {currentImage && (
            <img
              src={currentImage}
              alt="刮刮乐图片"
              className="hidden-image"
              onLoad={() => setImageLoaded(true)}
            />
          )}
          <canvas
            ref={canvasRef}
            width={400}
            height={300}
            onMouseDown={handleStart}
            onMouseMove={draw}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
          />
        </div>
      </div>
      <div className="game-rules">
        <h4>游戏规则：</h4>
        <p>1. 用鼠标在灰色区域涂抹，发现下面隐藏的AI生成图片</p>
        <p>2. 刮开超过50%的区域可以得10分</p>
        <p>3. 点击重新开始可以换新图片</p>
      </div>
    </div>
  );
};

export default ScratchCard;