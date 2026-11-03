import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'material-design-lite/material.css';
import 'material-design-lite/material.js';
import 'getmdl-select/getmdl-select.min.css';
import 'getmdl-select/getmdl-select.min.js';
import './index.css';

createRoot(document.getElementById('root')).render(<App />);
