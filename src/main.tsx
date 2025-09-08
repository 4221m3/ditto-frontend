import { createRoot } from 'react-dom/client'
import './index.css'
import Viewport from './Viewport/Viewport.tsx'
import { ReactFlowProvider } from '@xyflow/react';

createRoot(document.getElementById('root')!).render(
  <div style={{ width: '100vw', height: '100vh' }}>
    <ReactFlowProvider>
      <Viewport />
    </ReactFlowProvider>
  </div>
)
