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
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=225&fit=crop', // AI助手/机器人
    'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=300&h=225&fit=crop', // 神经网络可视化
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=225&fit=crop', // AI艺术
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=225&fit=crop', // 智能机器
  ];

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';
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
    setLastPoint(null);
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
    if (percentScratched > 30 && score === 0) {
      setScore(score + 10);
      message.success('恭喜你发现了AI生成的图片！');
    }
  };

  const [lastPoint, setLastPoint] = useState(null);

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    let x, y;
    if (e.type.includes('touch')) {
      const touch = e.touches[0];
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
      e.preventDefault(); // 防止触摸时页面滚动
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.globalCompositeOperation = 'destination-out';

    if (!lastPoint) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y);
    } else {
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(x, y);
    }

    ctx.stroke();
    setLastPoint({ x, y });
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
    if (currentImage) {
      const img = new Image();
      img.src = currentImage;
      img.onload = () => {
        setImageLoaded(true);
        initCanvas();
      };
    }
  }, [currentImage]);

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
        {/* <p>得分: {score}</p> */}
        <Button type="primary" onClick={resetGame}>切换图片</Button>
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
            width={300}
            height={225}
            onMouseDown={handleStart}
            onMouseMove={draw}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={draw}
            onTouchEnd={handleEnd}
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