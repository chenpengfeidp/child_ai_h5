import React, { useEffect, useRef, useState } from 'react';
import { Layout, Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import NavButtons from '../../../../components/NavButtons';
import '../../index.css';

const { Content } = Layout;
const { Title } = Typography;

const PanoramaPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  const panoramaImages = [
    'https://img1.baidu.com/it/u=2027290927,2409813069&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800',
    'https://p6.itc.cn/q_70/images03/20230111/5c8f6b958d4a4d54adfc0ffb64fe91cc.jpeg',
    'https://p4.itc.cn/q_70/images01/20211217/18f8483839f340ed9e140b3a5b3b0c23.jpeg'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImageUrl = panoramaImages[currentImageIndex];

  useEffect(() => {
    if (!containerRef.current) return;

    // 初始化场景
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 设置相机
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 0.1);

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // 创建材质
    const textureLoader = new THREE.TextureLoader();

    textureLoader.load(
      currentImageUrl,
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.minFilter = THREE.LinearFilter;

        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.BackSide
        });

        const geometry = new THREE.SphereGeometry(100, 60, 40);
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        renderer.render(scene, camera);
      },
      (xhr) => {
        console.log('Loading progress:', (xhr.loaded / xhr.total * 100) + '%');
      },
      (error) => {
        console.error('Error loading texture:', error.message);
      }
    );

    // 添加控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = 0.5;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // 处理窗口大小变化
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, true);
    };

    window.addEventListener('resize', handleResize);

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [currentImageUrl]);

  const handleImageChange = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % panoramaImages.length);
  };

  return (
    <Layout className="ai-basics-container">
      <Content className="ai-basics-content">
        <NavButtons />
        <Title level={1} className="page-title">AI全景探索</Title>
        <div className="content-section">
          <Title level={2}>沉浸式AI技术体验</Title>
          <p>欢迎来到AI全景探索空间。在这里，你可以通过360度全景视角，探索AI技术在各个领域的应用。</p>
          <div className="panorama-container">
            <div className="rotate-hint">
              <span>👆 拖动屏幕体验360°全景</span>
            </div>
            <div
              ref={containerRef}
              style={{
                width: '100%',
                height: '80vh',
                marginTop: '30px',
                marginBottom: '30px',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f5f5f5',
                position: 'relative'
              }}
            />
            <Button
              type="primary"
              onClick={handleImageChange}
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000
              }}
            >
              切换全景图片 ({currentImageIndex + 1}/3)
            </Button>
          </div>
        </div>
      </Content>
      <style>{`
        .panorama-container {
          position: relative;
          width: 100%;
          height: 80vh;
          margin-top: 30px;
          margin-bottom: 30px;
        }
        .rotate-hint {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 12px 30px;
          border-radius: 25px;
          z-index: 1000;
          animation: fadeInOut 3s ease-in-out;
          pointer-events: none;
          min-width: 250px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        .rotate-hint span {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </Layout>
  );
};

export default PanoramaPage;