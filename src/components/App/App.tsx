import { Routes, Route } from 'react-router-dom';
import { ReactFlowProvider } from '@xyflow/react';

import { TemplateForms } from '../Templates/TemplateForms/TemplateForms';

import { Viewport } from '../Viewport/Viewport';
import { Navbar } from '../NavBar/Navbar';
import { Library } from '../Library/Library';

import './App.css'

function App() {
  return (

    <ReactFlowProvider>
      <div className="app-container">

        <Navbar />
        
        <div className="routes-container">
          <Routes>
            <Route path="/login" element={<TemplateForms type="login" />} />
            <Route path="/signup" element={<TemplateForms type="signup" />} />
            
            <Route path="/jobs" element={<Library />} />
            <Route path="/sequence" element={<Viewport />} />
            {/*
              <Route path="/jobs/:job_id" element={} />
              <Route path="/jobs/:job_id/sequences" element={} />
              <Route path="/jobs/:job_id/sequences/:sequence_id" element={} />
            */}
          </Routes>
        </div>
      </div>

    </ReactFlowProvider>
  );
}

export default App;