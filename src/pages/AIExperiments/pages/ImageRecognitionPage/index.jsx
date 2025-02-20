import React, { useState } from 'react';
import { Layout, Typography, Button, Upload, Card, Spin, message } from 'antd';
import { HomeOutlined, ArrowLeftOutlined, InboxOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Dragger } = Upload;

const ImageRecognitionPage = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState(null);

  const handleImageUpload = async (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      const url = URL.createObjectURL(info.file.originFileObj);
      setImageUrl(url);
      
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // 根据图片类型返回不同的识别结果
        const file = info.file.originFileObj;
        const reader = new FileReader();
        
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            // 基于图片的宽高比和颜色分布来模拟不同场景的识别结果
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            const aspectRatio = img.width / img.height;
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            
            // 计算图片的明暗度
            let brightness = 0;
            for (let i = 0; i < imageData.length; i += 4) {
              brightness += (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3;
            }
            brightness = brightness / (imageData.length / 4);
            
            let result;
            if (aspectRatio > 1.5) { // 宽幅图片
              result = {
                objects: ['山脉', '天空', '云彩'],
                scene: '自然风景',
                confidence: 0.92
              };
            } else if (aspectRatio < 0.8) { // 竖幅图片
              result = {
                objects: ['建筑物', '窗户', '玻璃幕墙'],
                scene: '现代建筑',
                confidence: 0.88
              };
            } else if (brightness > 128) { // 明亮的图片
              result = {
                objects: ['沙滩', '海水', '椰子树'],
                scene: '海滩度假',
                confidence: 0.95
              };
            } else { // 暗色图片
              result = {
                objects: ['星空', '月亮', '山峦'],
                scene: '夜景',
                confidence: 0.85
              };
            }
            
            setRecognitionResult(result);
            setLoading(false);
          };
          img.src = reader.result;
        };
        
        reader.readAsDataURL(file);
        
      } catch (error) {
        message.error('识别失败，请重试');
        setLoading(false);
      }
    }
  };

  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: 'image/*',
    onChange: handleImageUpload,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('只能上传图片文件！');
      }
      return isImage || Upload.LIST_IGNORE;
    },
    customRequest: ({ onSuccess }) => {
      setTimeout(() => {
        onSuccess('ok');
      }, 0);
    }
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
        <Title level={1} className="page-title">图像识别实验</Title>
        <div className="content-section">
          <Title level={2}>实验介绍</Title>
          <p>在这个实验中，你将体验AI如何识别和分析图像内容。通过上传图片，AI系统将识别图像中的物体、场景和其他视觉元素。</p>
          
          <div style={{ marginTop: '30px' }}>
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽图片到此区域上传</p>
              <p className="ant-upload-hint">
                支持单个图片上传，请确保上传清晰的图片以获得最佳识别效果
              </p>
            </Dragger>
          </div>

          {imageUrl && (
            <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
              <Card
                title="上传的图片"
                style={{ flex: 1 }}
                cover={<img alt="uploaded" src={imageUrl} style={{ maxHeight: '300px', objectFit: 'contain' }} />}
              />
              <Card title="识别结果" style={{ flex: 1 }}>
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <Spin size="large" />
                    <p style={{ marginTop: '10px' }}>正在进行AI识别分析...</p>
                  </div>
                ) : recognitionResult ? (
                  <div>
                    <p><Text strong>检测到的物体：</Text> {recognitionResult.objects.join('、')}</p>
                    <p><Text strong>场景描述：</Text> {recognitionResult.scene}</p>
                    <p><Text strong>置信度：</Text> {(recognitionResult.confidence * 100).toFixed(1)}%</p>
                  </div>
                ) : null}
              </Card>
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default ImageRecognitionPage;