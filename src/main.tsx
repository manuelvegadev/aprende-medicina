import ReactDOM from 'react-dom/client';
import { ModalContextProvider, ThemeProvider } from '@/contexts';
import App from './app.tsx';
import './scss/globals.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider>
    <ModalContextProvider>
      <App />
    </ModalContextProvider>
  </ThemeProvider>,
);
