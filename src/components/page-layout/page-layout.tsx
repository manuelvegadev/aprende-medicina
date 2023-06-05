// @ts-ignore
import { Button } from '@carbon/react';
// @ts-ignore
import { ArrowLeft, ArrowRight } from '@carbon/icons-react';

export type PageLayoutButtonOptions = {
  action: () => void;
  text?: string;
  disabled?: boolean;
  kind?: string;
};

export interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  backButton?: PageLayoutButtonOptions;
  nextButton?: PageLayoutButtonOptions;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  backButton,
  nextButton,
}) => {
  return (
    <div
      style={{
        display: 'grid',
        height: '100%',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '2rem calc(100% - 3rem)',
        padding: '1rem 0',
        gap: '1rem',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '20% auto 20%',
          gridTemplateRows: '1fr',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        {backButton ? (
          <Button
            renderIcon={ArrowLeft}
            style={{
              width: '100%',
            }}
            onClick={() => {
              backButton?.action();
            }}
            size={'sm'}
            kind={backButton.kind || 'tertiary'}
            disabled={backButton?.disabled || false}
          >
            {backButton?.text || 'Volver'}
          </Button>
        ) : (
          <div></div>
        )}
        <span style={{ fontSize: '1.75rem ', textAlign: 'center' }}>
          {title}
        </span>
        {nextButton ? (
          <Button
            renderIcon={ArrowRight}
            onClick={() => nextButton?.action()}
            size={'sm'}
            style={{
              width: '100%',
            }}
            kind={nextButton.kind || 'tertiary'}
            disabled={nextButton?.disabled || false}
          >
            {nextButton?.text || 'Continuar'}
          </Button>
        ) : (
          <div></div>
        )}
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
};
