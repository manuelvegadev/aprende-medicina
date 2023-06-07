import { useEffect } from 'react';
// @ts-ignore
import { Column, Content, GlobalTheme, Grid } from '@carbon/react';
import { useTheme } from '@/contexts';
import { UIShell } from '@/components';
import { Footer, InstrumentalQuirurgico } from '@/modules';

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-carbon-theme', theme);
  }, [theme]);

  return (
    <GlobalTheme theme={theme}>
      <UIShell />
      <Content
        style={{
          paddingTop: '1rem',
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Grid>
          <Column sm={4} md={8} lg={{ offset: 4, span: 8 }}>
            <InstrumentalQuirurgico />
            <Footer />
          </Column>
        </Grid>
      </Content>
    </GlobalTheme>
  );
}

export default App;
