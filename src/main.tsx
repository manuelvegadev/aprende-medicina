import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@/contexts';
import App from './app.tsx';
import './scss/globals.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
