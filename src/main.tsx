import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import {Provider} from 'react-redux';
import { store } from './store/store.ts';
import '@/styles/global.scss';
import App from './App.tsx'
import {ErrorBoundary} from '@/hoc/ErrorBoundary.tsx';




createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Router>
      <ErrorBoundary>

          <Provider store={store}>
    <App />
          </Provider>

      </ErrorBoundary>
      </Router>
  </StrictMode>,
)
