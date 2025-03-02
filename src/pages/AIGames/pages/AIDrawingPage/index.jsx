import React, { useState, useRef, useEffect } from 'react';
import { Layout, Typography, Button, Card, Input, message } from 'antd';
import NavButtons from '../../../../components/NavButtons';
import './index.css';

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

const AIDrawingPage = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    // 设置白色背景
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (canvasRef.current) {
      initCanvas();
    }
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const generateAIArt = () => {
    if (!prompt.trim()) {
      message.warning('请输入创作描述');
      return;
    }
    setIsGenerating(true);
    // 模拟AI生成过程
    setTimeout(() => {
      message.success('AI艺术作品生成成功！');
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <Layout className="ai-games-container">
      <Content className="ai-games-content">
        <NavButtons />
        <Title level={1} className="page-title">AI绘画创作</Title>
        <div className="content-wrapper">
          <div className="content-section">
            <div className="drawing-container">
              <div className="canvas-area">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={400}
                  className="drawing-canvas"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
              </div>
              <div className="controls-area">
                <ol className="instruction-list">
                  <li>在画布上自由绘制你想要的图案</li>
                  <li>在文本框中输入对作品的描述或创作要求</li>
                  <li>点击"生成AI艺术作品"按钮，等待AI处理</li>
                  <li>如需重新创作，可点击"清除画布"按钮</li>
                </ol>
                <div className="action-controls">
                  <Button type="default" onClick={clearCanvas}>
                    清除画布
                  </Button>
                  <TextArea
                    placeholder="描述你想创作的艺术作品..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="prompt-input"
                    rows={4}
                  />
                  <Button
                    type="primary"
                    onClick={generateAIArt}
                    loading={isGenerating}
                    disabled={!prompt.trim()}
                  >
                    生成AI艺术作品
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <style>{`
        .ai-games-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }
        .ai-games-content {
          padding: 24px;
        }
        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }
        .content-section {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .drawing-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .canvas-area {
          width: 100%;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid #e8e8e8;
        }
        .drawing-canvas {
          width: 100%;
          height: 400px;
          cursor: crosshair;
          background: white;
          display: block;
        }
        .controls-area {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .instruction-list {
          background: #f5f5f5;
          padding: 20px 40px;
          border-radius: 8px;
          margin: 0;
        }
        .instruction-list li {
          margin-bottom: 12px;
          color: #666;
          font-size: 16px;
        }
        .action-controls {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .prompt-input {
          flex: 1;
          min-width: 300px;
          border-radius: 8px;
        }
        .page-title {
          text-align: center;
          margin-bottom: 40px;
          font-size: 32px !important;
        }
        .ant-btn {
          height: 40px;
          font-size: 16px;
          border-radius: 8px;
        }
      `}</style>
    </Layout>
  );
};

export default AIDrawingPage;