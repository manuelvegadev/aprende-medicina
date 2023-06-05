import { useEffect } from 'react';
import {
  Column,
  GlobalTheme,
  Grid,
  // @ts-ignore
  Content,
  // @ts-ignore
  Accordion,
  // @ts-ignore
  AccordionItem,
  // @ts-ignore
  Tile,
  // @ts-ignore
  Stack,
  // @ts-ignore
  Layer,
} from '@carbon/react';
import { useTheme } from '@/contexts';
import { UIShell } from '@/components';
import contents from '@/contents.json';

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
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Grid>
          <Column sm={4} md={8} lg={{ offset: 4, span: 8 }}>
            <Tile>
              <Stack gap={5}>
                <h1
                  style={{
                    textAlign: 'center',
                    fontWeight: '500',
                    fontSize: '1.5rem',
                  }}
                >
                  👩‍⚕️ Instrumental Quirúrgico
                </h1>
                <Accordion isFlush>
                  {contents.map((content) => (
                    <AccordionItem
                      title={content.name}
                      key={content.number}
                      className={'accordion-item--flush'}
                    >
                      <Layer>
                        <Stack gap={5}>
                          {content.instrumentos.map((instrumento) => (
                            <Tile
                              key={instrumento.number}
                              style={{ padding: 0 }}
                            >
                              <img
                                src={instrumento.img}
                                alt={instrumento.name}
                                style={{
                                  width: '100%',
                                }}
                              />
                              <h5
                                style={{
                                  padding: '1rem',
                                }}
                              >
                                {instrumento.name}
                              </h5>
                            </Tile>
                          ))}
                        </Stack>
                      </Layer>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Stack>
            </Tile>
            <p
              style={{
                display: 'block',
                fontSize: '0.75rem',
                opacity: 0.5,
                paddingTop: '2rem',
              }}
            >
              <strong>
                Aviso de Uso de Contenido Educativo: Reconocimiento a Manual
                Moderno:
              </strong>
              <br />
              <br />
              Las imágenes y parte del texto presentes en este sitio web han
              sido obtenidos de la página web www.manualmoderno.com con fines
              educativos. Manual Moderno es una reconocida fuente de contenido
              educativo y nos complace utilizar su material para enriquecer
              nuestra plataforma.
              <br />
              <br />
              Queremos destacar que el uso de este contenido está estrictamente
              destinado a fines educativos y en ningún caso supone un respaldo o
              afiliación directa con Manual Moderno. Reconocemos y respetamos
              los derechos de autor de Manual Moderno sobre su contenido
              original.
              <br />
              <br />
              Si desea obtener información adicional sobre los materiales
              utilizados, le invitamos a visitar la página web oficial de Manual
              Moderno en www.manualmoderno.com. Agradecemos su comprensión y
              apoyo en el uso adecuado de los recursos educativos
              proporcionados.
            </p>
          </Column>
        </Grid>
      </Content>
    </GlobalTheme>
  );
}

export default App;
