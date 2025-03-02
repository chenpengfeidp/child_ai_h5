import React, { useState } from 'react';
import { Layout, Typography, Button, Upload, Card, Spin, message, Row, Col } from 'antd';
import { HomeOutlined, ArrowLeftOutlined, InboxOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../../index.css';
import NavButtons from '../../../../components/NavButtons';

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
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

            // 分析颜色分布
            let colors = {
              red: 0,
              green: 0,
              blue: 0,
              yellow: 0,
              white: 0,
              black: 0
            };

            for (let i = 0; i < imageData.length; i += 4) {
              const r = imageData[i];
              const g = imageData[i + 1];
              const b = imageData[i + 2];

              // 放宽颜色判断条件
              if (r > 150 && g > 150 && b < 100) colors.yellow++;
              else if (r > 150 && g < 100 && b < 100) colors.red++;
              else if (r < 100 && g > 120 && b < 100) colors.green++;
              else if (r < 100 && g < 100 && b > 120) colors.blue++;
              else if (r > 180 && g > 180 && b > 180) colors.white++;
              else if (r < 60 && g < 60 && b < 60) colors.black++;
            }

            // 将颜色计数转换为百分比
            const totalPixels = imageData.length / 4;
            Object.keys(colors).forEach(key => {
              colors[key] = (colors[key] / totalPixels) * 100;
            });

            // 添加调试日志
            console.log('Color distribution:', colors);

            let result;

            // 降低判断阈值
            if (colors.yellow > 10 && colors.black > 3) {
              // 可能是动漫角色
              result = {
                objects: ['卡通人物', '动漫角色'],
                scene: '动画场景',
                confidence: 0.89
              };
            } else if (colors.blue > 15 && colors.white > 10) {
              // 天空或海洋场景
              result = {
                objects: ['天空', '云朵'],
                scene: '自然风光',
                confidence: 0.92
              };
            } else if (colors.green > 15) {
              // 自然景观
              result = {
                objects: ['树木', '草地', '植物'],
                scene: '自然环境',
                confidence: 0.87
              };
            } else if (colors.red > 10 || (colors.yellow > 8 && colors.red > 5)) {
              // 日落或热闹场景
              result = {
                objects: ['建筑', '灯光', '人群'],
                scene: '城市景观',
                confidence: 0.85
              };
            } else if (colors.black > 20 || (colors.black + colors.blue > 30)) {
              // 夜景
              result = {
                objects: ['夜空', '建筑剪影', '灯光'],
                scene: '夜景',
                confidence: 0.88
              };
            } else {
              // 添加更多默认场景判断
              if (colors.white > 30) {
                result = {
                  objects: ['室内物体', '白色调'],
                  scene: '室内场景',
                  confidence: 0.78
                };
              } else {
                result = {
                  objects: ['未能确定具体物体'],
                  scene: '普通场景',
                  confidence: 0.75
                };
              }
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
        <NavButtons />
        <Title level={1} className="page-title">图像识别</Title>
        <div className="content-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Title level={2}>实验介绍</Title>
          <p>在这个实验中，你将体验AI如何识别和分析图像内容。通过上传图片，AI系统将识别图像中的物体、场景和其他视觉元素。</p>

          <div style={{ marginTop: '30px', position: 'relative' }}>
            <div className="upload-hint">
              上传一张风景照试试
            </div>
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
            <div className="recognition-results" style={{ marginTop: '30px' }}>
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Card title="上传的图片" className="image-card">
                    <div className="image-container">
                      <img
                        alt="uploaded"
                        src={imageUrl}
                        className="preview-image"
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          objectFit: 'contain'
                        }}
                      />
                    </div>
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card title="识别结果" className="result-card">
                    {loading ? (
                      <div className="loading-container">
                        <Spin size="large" />
                        <p>正在进行AI识别分析...</p>
                      </div>
                    ) : recognitionResult ? (
                      <div className="result-content">
                        <p><Text strong>检测到的物体：</Text> {recognitionResult.objects.join('、')}</p>
                        <p><Text strong>场景描述：</Text> {recognitionResult.scene}</p>
                        <p><Text strong>置信度：</Text> {(recognitionResult.confidence * 100).toFixed(1)}%</p>
                      </div>
                    ) : null}
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default ImageRecognitionPage;