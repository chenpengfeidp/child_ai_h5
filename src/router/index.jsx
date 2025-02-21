import { createHashRouter } from 'react-router-dom';
import Home from '../pages/Home';
import AIBasics from '../pages/AIBasics';
import AIGames from '../pages/AIGames';
import AIExperiments from '../pages/AIExperiments';
import MemoryGamePage from '../pages/AIGames/pages/MemoryGamePage';
import ScratchCardPage from '../pages/AIGames/pages/ScratchCardPage';
import IntroductionPage from '../pages/AIBasics/pages/IntroductionPage';
import ApplicationsPage from '../pages/AIBasics/pages/ApplicationsPage';
import LearningPage from '../pages/AIBasics/pages/LearningPage';
import FuturePage from '../pages/AIBasics/pages/FuturePage';
import ImageRecognitionPage from '../pages/AIExperiments/pages/ImageRecognitionPage';
import SpeechSynthesisPage from '../pages/AIExperiments/pages/SpeechSynthesisPage';
import NLPPage from '../pages/AIExperiments/pages/NLPPage';
import MachineLearningPage from '../pages/AIExperiments/pages/MachineLearningPage';

const router = createHashRouter([
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
    path: '/ai-games/scratch',
    element: <ScratchCardPage />,
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
]);

export default router;