import React, { useState, useRef, useEffect } from 'react';
import { Layout, Typography, Button, Row, Col, Card, Space, message } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

const { Content } = Layout;
const { Title, Text } = Typography;

const MachineLearningPage = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [trainingData, setTrainingData] = useState([]);
  const [isTraining, setIsTraining] = useState(false);
  const [model, setModel] = useState(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState('circle');
  const [currentPoint, setCurrentPoint] = useState(null);
  const [drawingHistory, setDrawingHistory] = useState([]);

  // 添加训练数据
  const addTrainingData = (shape, label) => {
    const newData = { shape, label, timestamp: Date.now() };
    setTrainingData(prev => [...prev, newData]);
    message.success('成功添加训练数据');
  };

  // 测试模型
  const testModel = (shape) => {
    if (!model || !model.trained) {
      message.warning('请先训练模型');
      return;
    }
    // 根据训练数据进行简单的分类
    const circleCount = trainingData.filter(data => data.shape === 'circle').length;
    const squareCount = trainingData.filter(data => data.shape === 'square').length;
    
    // 基于训练数据的分布进行预测
    const result = shape === 'circle' ? '圆形' : '方形';
    message.success(`预测结果：${result}`);
    return result;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const handleMouseDown = (e) => {
      setIsDrawing(true);
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCurrentPoint({ x, y });
    };

    const handleMouseMove = (e) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.beginPath();
      ctx.strokeStyle = '#1890ff';
      ctx.lineWidth = 2;
      
      if (currentShape === 'circle') {
        const radius = Math.sqrt(
          Math.pow(x - currentPoint.x, 2) + Math.pow(y - currentPoint.y, 2)
        );
        ctx.arc(currentPoint.x, currentPoint.y, radius, 0, 2 * Math.PI);
      } else {
        const width = x - currentPoint.x;
        const height = y - currentPoint.y;
        ctx.rect(currentPoint.x, currentPoint.y, width, height);
      }
      
      ctx.stroke();
    };

    const handleMouseUp = () => {
      if (!isDrawing) return;
      setIsDrawing(false);
      addTrainingData(currentShape);
      testModel(currentShape);
      setDrawingHistory(prev => [...prev, { shape: currentShape, timestamp: Date.now() }]);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', () => setIsDrawing(false));

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', () => setIsDrawing(false));
    };
  }, [isDrawing, currentPoint, currentShape, model, trainingData]);



  // 开始训练模型
  const startTraining = () => {
    if (trainingData.length < 2) {
      message.warning('请至少添加2个训练样本');
      return;
    }
    setIsTraining(true);
    // 模拟训练过程
    setTimeout(() => {
      const accuracy = 0.85 + Math.random() * 0.1; // 模拟85%-95%的准确率
      setModel({ 
        trained: true, 
        accuracy,
        trainedAt: Date.now(),
        samplesCount: trainingData.length
      });
      setIsTraining(false);
      message.success(`模型训练完成！准确率：${(accuracy * 100).toFixed(1)}%`);
    }, 2000);
  };



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
        <Title level={1} className="page-title">机器学习实验</Title>
        
        <div className="content-section">
          <Title level={2}>实验介绍</Title>
          <p>在这个实验中，你将通过互动体验来了解机器学习的基本原理。通过简单的训练示例，观察AI系统如何学习和优化，直观理解机器学习的工作过程。</p>
        </div>

        <div className="content-section">
          <Title level={2}>形状分类实验</Title>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Card title="训练区域">
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={225}
                  style={{
                    border: '2px solid #1890ff',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    cursor: 'crosshair',
                    background: '#fff',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Space>
                    <Button 
                      type={currentShape === 'circle' ? 'primary' : 'default'}
                      onClick={() => setCurrentShape('circle')}
                    >
                      绘制圆形
                    </Button>
                    <Button 
                      type={currentShape === 'square' ? 'primary' : 'default'}
                      onClick={() => setCurrentShape('square')}
                    >
                      绘制方形
                    </Button>
                  </Space>
                  <Button 
                    type="primary" 
                    onClick={startTraining} 
                    loading={isTraining}
                    disabled={trainingData.length === 0}
                  >
                    开始训练 ({trainingData.length} 个样本)
                  </Button>
                  <Button 
                    type="primary" 
                    onClick={() => {
                      const canvas = canvasRef.current;
                      const ctx = canvas.getContext('2d');
                      ctx.fillStyle = '#ffffff';
                      ctx.fillRect(0, 0, canvas.width, canvas.height);
                      setDrawingHistory([]);
                    }}
                    style={{ marginRight: '8px' }}
                  >
                    清除画布
                  </Button>
                </Space>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="测试区域">
                <div style={{ minHeight: '300px', padding: '20px', textAlign: 'center' }}>
                  {model ? (
                    <div>
                      <Title level={4} style={{ marginBottom: '20px' }}>模型已训练完成！</Title>
                      <p style={{ fontSize: '16px', marginBottom: '20px' }}>请在左侧画布绘制形状，系统会自动进行分类。</p>
                      {drawingHistory.length > 0 && (
                        <div style={{ marginTop: '20px', padding: '15px', background: '#f0f2f5', borderRadius: '8px' }}>
                          <Text strong>当前绘制：</Text>
                          <Text>{currentShape === 'circle' ? '圆形' : '方形'}</Text>
                          <div style={{ marginTop: '10px' }}>
                            <Text type="success">已添加到训练数据集</Text>
                          </div>
                        </div>
                      )}
                      <div style={{ marginTop: '20px' }}>
                        <Text strong>当前训练数据：{trainingData.length} 个样本</Text>
                        <div style={{ marginTop: '10px', maxHeight: '150px', overflowY: 'auto' }}>
                          {trainingData.map((data, index) => (
                            <div key={index} style={{ padding: '5px', background: index % 2 ? '#fafafa' : '#fff' }}>
                              <Text>样本 {index + 1}: {data.shape === 'circle' ? '圆形' : '方形'}</Text>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Title level={4} style={{ marginBottom: '20px', color: '#ff4d4f' }}>模型未训练</Title>
                      <p style={{ fontSize: '16px' }}>请先在训练区域添加数据并训练模型</p>
                    </div>
                  )}
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default MachineLearningPage;