'use client';
import { useEffect } from 'react';
// @ts-ignore
import { Header, HeaderGlobalAction, HeaderGlobalBar } from '@carbon/react';
// @ts-ignore
import { Asleep, Light, LogoGithub } from '@carbon/icons-react';
import { useTheme } from '@/contexts';

export const UIShell: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'white' || theme === 'g10';

  useEffect(() => {
    document.documentElement.setAttribute('data-carbon-theme', theme);
  }, [theme]);

  return (
    <Header aria-label="Aprende Medicina">
      <HeaderGlobalBar style={{ justifyContent: 'flex-start' }}>
        <a
          href="https://github.com/manuelvegadev/aprende-medicina"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'contents',
          }}
        >
          <HeaderGlobalAction aria-label="Github" tooltipAlignment="start">
            <LogoGithub size={20} />
          </HeaderGlobalAction>
        </a>
      </HeaderGlobalBar>
      <h6>Aprende Medicina</h6>
      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label="Cambiar tema"
          tooltipAlignment="end"
          onClick={() => toggleTheme(isLight ? 'g100' : 'white')}
        >
          {isLight ? <Asleep size={20} /> : <Light size={20} />}
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
};
