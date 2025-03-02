import { createHashRouter } from 'react-router-dom';
import Home from '../pages/Home';
import AIBasics from '../pages/AIBasics';
import AIGames from '../pages/AIGames';
import AIExperiments from '../pages/AIExperiments';
import MemoryGamePage from '../pages/AIGames/pages/MemoryGamePage';
import ScratchCardPage from '../pages/AIGames/pages/ScratchCardPage';
import WordGuessPage from '../pages/AIGames/pages/WordGuessPage';
import IntroductionPage from '../pages/AIBasics/pages/IntroductionPage';
import ApplicationsPage from '../pages/AIBasics/pages/ApplicationsPage';
import LearningPage from '../pages/AIBasics/pages/LearningPage';
import FuturePage from '../pages/AIBasics/pages/FuturePage';
import PanoramaPage from '../pages/AIBasics/pages/PanoramaPage';
import AIAnimationPage from '../pages/AIBasics/pages/AIAnimationPage';
import ImageRecognitionPage from '../pages/AIExperiments/pages/ImageRecognitionPage';
import SpeechSynthesisPage from '../pages/AIExperiments/pages/SpeechSynthesisPage';
import NLPPage from '../pages/AIExperiments/pages/NLPPage';
import MachineLearningPage from '../pages/AIExperiments/pages/MachineLearningPage';
import QRCodePage from '../pages/QRCodePage';
import ErrorFallback from '../components/ErrorBoundary';
import AIDrawingPage from '../pages/AIGames/pages/AIDrawingPage';
import EmotionRecognitionPage from '../pages/AIGames/pages/EmotionRecognitionPage';
import AIMazePage from '../pages/AIGames/pages/AIMazePage';

const router = createHashRouter([
  {
    errorElement: <ErrorFallback />
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/ai-basics',
    element: <AIBasics />,
  },
  {
    path: '/ai-games',
    element: <AIGames />,
  },
  {
    path: '/ai-experiments',
    element: <AIExperiments />,
  },
  {
    path: '/ai-games/memory',
    element: <MemoryGamePage />,
  },
  {
    path: '/ai-games/scratch-card',
    element: <ScratchCardPage />,
  },
  {
    path: '/ai-games/word-guess',
    element: <WordGuessPage />,
  },
  {
    path: '/ai-basics/introduction',
    element: <IntroductionPage />,
  },
  {
    path: '/ai-basics/applications',
    element: <ApplicationsPage />,
  },
  {
    path: '/ai-basics/learning',
    element: <LearningPage />,
  },
  {
    path: '/ai-basics/animation',
    element: <AIAnimationPage />,
  },
  {
    path: '/ai-basics/future',
    element: <FuturePage />,
  },
  {
    path: '/ai-experiments/image-recognition',
    element: <ImageRecognitionPage />,
  },
  {
    path: '/ai-experiments/speech-synthesis',
    element: <SpeechSynthesisPage />,
  },
  {
    path: '/ai-experiments/nlp',
    element: <NLPPage />,
  },
  {
    path: '/ai-experiments/machine-learning',
    element: <MachineLearningPage />,
  },
  {
    path: '/qrcode',
    element: <QRCodePage />
  },
  {
    path: '/ai-basics/panorama',
    element: <PanoramaPage />
  },
  {
    path: '/ai-games/drawing',
    element: <AIDrawingPage />,
  },
  {
    path: '/ai-games/emotion',
    element: <EmotionRecognitionPage />,
  },
  {
    path: '/ai-games/maze',
    element: <AIMazePage />,
  }
]);

export default router;