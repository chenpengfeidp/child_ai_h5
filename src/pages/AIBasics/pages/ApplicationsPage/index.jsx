import React, { useState } from 'react';
import { Layout, Typography, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import NavButtons from '../../../../components/NavButtons';
import '../../index.css';
import './index.css';

const { Content } = Layout;
const { Title } = Typography;

const ApplicationsPage = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState(null);

  const fields = [
    {
      title: '医疗健康',
      description: 'AI在医疗领域的应用正在改变传统医疗模式',
      features: [
        '医学影像诊断：通过深度学习分析X光片、CT等医学影像',
        '药物研发：加速新药研发过程，预测药物效果',
        '个性化治疗：根据患者个人数据制定最佳治疗方案',
        '疾病预测：通过数据分析预测疾病风险'
      ]
    },
    {
      title: '教育领域',
      description: 'AI为教育带来了革命性的变化',
      features: [
        '个性化学习：根据学生的学习进度和风格调整教学内容',
        '智能评估：自动评估学生的作业和考试',
        '虚拟助教：24/7在线解答学生疑问',
        '教学管理：优化课程安排和资源分配'
      ]
    },
    {
      title: '金融服务',
      description: 'AI在金融领域的应用',
      features: [
        '风险评估：评估贷款申请和投资风险',
        '智能投顾：提供个性化投资建议',
        '欺诈检测：识别可疑交易和异常行为',
        '市场预测：分析市场趋势和投资机会'
      ]
    }
  ];

  const handleCardClick = (field) => {
    setSelectedField(field);
    setModalVisible(true);
  };

  return (
    <Layout className="ai-basics-container">
      <Content className="ai-basics-content">
        <NavButtons />
        <Title level={1} className="page-title">AI应用场景</Title>
        <div className="cloud-container">
          {fields.map((field, index) => (
            <div
              key={index}
              className={`cloud-card cloud-${index + 1}`}
              onClick={() => handleCardClick(field)}
            >
              <div className="cloud-content">
                <Title level={3}>{field.title}</Title>
                <p>{field.description}</p>
                <span className="surprise-text">点我有惊喜</span>
              </div>
            </div>
          ))}
          <div className="cloud-connections"></div>
        </div>

        <Modal
          title={selectedField?.title}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          width={600}
          className="field-modal"
        >
          {selectedField && (
            <div>
              <p className="modal-description">{selectedField.description}：</p>
              <ul className="feature-list">
                {selectedField.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </Modal>
      </Content>
    </Layout>
  );
};

export default ApplicationsPage;