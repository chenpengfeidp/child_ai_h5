import React, { useState } from 'react';
import { Layout, Typography, Button, Row, Col, Card, Space, message } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

const { Content } = Layout;
const { Title, Text } = Typography;

const COLORS = [
  { name: '红色', value: '#ff4d4f', label: 'red' },
  { name: '蓝色', value: '#1890ff', label: 'blue' },
  { name: '绿色', value: '#52c41a', label: 'green' },
  { name: '黄色', value: '#faad14', label: 'yellow' },
];

const MachineLearningPage = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(null);
  const [trainingData, setTrainingData] = useState([]);
  const [isTraining, setIsTraining] = useState(false);
  const [model, setModel] = useState(null);

  // 添加训练数据
  const addTrainingData = (color) => {
    const newData = { color, timestamp: Date.now() };
    setTrainingData(prev => [...prev, newData]);
    message.success('成功添加训练数据', 0.3);
  };

  // 计算时间权重
  const calculateTimeWeight = (timestamp) => {
    const now = Date.now();
    const hoursDiff = (now - timestamp) / (1000 * 60 * 60);
    return Math.exp(-hoursDiff / 24); // 使用指数衰减，24小时后权重减半
  };

  // 测试模型
  const testColor = (color) => {
    if (!model || !model.trained) {
      message.warning('请先训练模型');
      return;
    }

    // 计算每种颜色的加权得分
    const colorScores = {};
    COLORS.forEach(c => {
      const colorData = trainingData.filter(data => data.color === c.label);
      const weightedScore = colorData.reduce((score, data) => {
        return score + calculateTimeWeight(data.timestamp);
      }, 0);
      colorScores[c.label] = weightedScore;
    });

    // 找出得分最高的颜色
    const predictedColor = Object.entries(colorScores).reduce(
      (max, [color, score]) => (score > max.score ? { color, score } : max),
      { color: null, score: -1 }
    ).color;

    const colorName = COLORS.find(c => c.label === color)?.name;
    const prediction = COLORS.find(c => c.label === predictedColor)?.name;

    // 计算预测的置信度
    const totalScore = Object.values(colorScores).reduce((sum, score) => sum + score, 0);
    const confidence = totalScore > 0 ? colorScores[predictedColor] / totalScore : 0;

    // 显示当前选择的颜色的预测结果
    message.success(`预测结果：${colorName}可能是${prediction}（置信度：${(confidence * 100).toFixed(1)}%）`, 1.3);
    return prediction;
  };

  // 开始训练模型
  const startTraining = () => {
    if (trainingData.length < 4) {
      message.warning('请至少添加4个训练样本');
      return;
    }
    setIsTraining(true);
    // 模拟训练过程
    setTimeout(() => {
      // 计算模型的准确率
      const totalWeightedSamples = trainingData.reduce((sum, data) => {
        return sum + calculateTimeWeight(data.timestamp);
      }, 0);

      const accuracy = 0.7 + (totalWeightedSamples / 20); // 样本越多，准确率越高，最高95%
      setModel({
        trained: true,
        accuracy: Math.min(accuracy, 0.95),
        trainedAt: Date.now(),
        samplesCount: trainingData.length
      });
      setIsTraining(false);
      message.success(`模型训练完成！准确率：${(Math.min(accuracy, 0.95) * 100).toFixed(1)}%`);
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
        <Title level={1} className="page-title">AI颜色识别实验</Title>

        <div className="content-section">
          <Title level={2}>实验介绍</Title>
          <p>在这个实验中，你将通过互动体验来了解AI是如何学习识别颜色的。通过选择不同的颜色进行训练，观察AI系统如何学习和预测颜色类别。系统会根据你最近的选择和训练数据的时间分布来做出更准确的预测。</p>
        </div>

        <div className="content-section">
          <Title level={2}>颜色识别实验</Title>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card title="训练区域">
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    {COLORS.map((color) => (
                      <div
                        key={color.label}
                        onClick={() => {
                          setSelectedColor(color.label);
                          addTrainingData(color.label);
                          if (model?.trained) {
                            testColor(color.label);
                          }
                        }}
                        style={{
                          backgroundColor: color.value,
                          height: '80px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          border: selectedColor === color.label ? '4px solid #000' : 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text strong style={{ color: '#fff', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                          {color.name}
                        </Text>
                      </div>
                    ))}
                  </div>
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
                    danger
                    onClick={() => {
                      setTrainingData([]);
                      setModel(null);
                      setSelectedColor(null);
                      message.success('已清除所有训练数据');
                    }}
                  >
                    清除训练数据
                  </Button>
                </Space>
              </Card>
            </Col>
            <Col span={24}>
              <Card title="测试区域">
                <div style={{ minHeight: '300px', padding: '20px', textAlign: 'center' }}>
                  {model ? (
                    <div>
                      <Title level={4} style={{ marginBottom: '20px' }}>模型已训练完成！</Title>
                      <p style={{ fontSize: '16px', marginBottom: '20px' }}>请在左侧选择颜色块，系统会根据你的训练数据和最近的选择进行智能识别。</p>
                      <div style={{ marginTop: '20px' }}>
                        <Text strong>当前训练数据：{trainingData.length} 个样本</Text>
                        <div style={{ marginTop: '10px', maxHeight: '150px', overflowY: 'auto' }}>
                          {trainingData.map((data, index) => {
                            const timeWeight = calculateTimeWeight(data.timestamp);
                            return (
                              <div key={index} style={{ padding: '5px', background: index % 2 ? '#fafafa' : '#fff' }}>
                                <Text>
                                  样本 {index + 1}: {COLORS.find(c => c.label === data.color)?.name}
                                  <span style={{ marginLeft: '10px', fontSize: '12px', color: '#888' }}>
                                    权重: {(timeWeight * 100).toFixed(1)}%
                                  </span>
                                </Text>
                              </div>
                            );
                          })}
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