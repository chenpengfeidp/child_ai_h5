import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const ErrorFallback = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="error"
      title="页面出错了"
      subTitle="抱歉，页面加载过程中出现了一些问题"
      extra={[
        <Button type="primary" key="home" onClick={() => navigate('/')}>
          返回首页
        </Button>,
        <Button key="back" onClick={() => navigate(-1)}>
          返回上一页
        </Button>,
      ]}
    />
  );
};

export default ErrorFallback;