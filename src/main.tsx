import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import {ErrorBoundary} from '@/hoc/ErrorBoundary.tsx';
import {Provider} from 'react-redux';
import { store } from './store/store.ts';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ErrorBoundary>
      <Router>
          <Provider store={store}>
    <App />
          </Provider>
      </Router>
      </ErrorBoundary>
  </StrictMode>,
)
