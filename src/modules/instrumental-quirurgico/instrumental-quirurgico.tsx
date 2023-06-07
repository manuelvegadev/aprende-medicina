import {
  // @ts-ignore
  Accordion,
  // @ts-ignore
  AccordionItem,
  // @ts-ignore
  Button,
  // @ts-ignore
  Layer,
  // @ts-ignore
  Stack,
  // @ts-ignore
  Tile,
} from '@carbon/react';
// @ts-ignore
import { TestTool } from '@carbon/icons-react';
import contents from '@/contents.json';
import { useModal } from '@/contexts';
import { Practice } from './sub-components';

export const InstrumentalQuirurgico: React.FC = () => {
  const { openModal, setModal } = useModal();

  return (
    <Stack gap={5}>
      <Button
        renderIcon={TestTool}
        iconDescription="Practicar"
        tooltipPosition={'left'}
        size={'sm'}
        kind={'tertiary'}
        style={{
          display: 'block',
          marginLeft: 'auto',
        }}
        onClick={() => {
          setModal({
            label: 'Instrumental Quirúrgico',
            heading: 'Practicar 💪',
            form: <Practice />,
          });
          openModal();
        }}
      >
        Practicar
      </Button>
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
                className={'accordion-item--flush accordion-item--sticky'}
              >
                <Layer>
                  <Stack gap={5}>
                    {content.instrumentos.map((instrumento) => (
                      <Tile key={instrumento.number}>
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
    </Stack>
  );
};
