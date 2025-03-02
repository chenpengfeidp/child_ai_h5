import React from 'react';
import { Button } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './index.css';

const NavButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="nav-buttons">
      <Button 
        className="nav-button back-button"
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate(-1)}
      >
        返回上一页
      </Button>
      <Button 
        className="nav-button home-button"
        icon={<HomeOutlined />} 
        onClick={() => navigate('/')}
      >
        返回首页
      </Button>
    </div>
  );
};

export default NavButtons;