import { useId, useState } from 'react';
import {
  Checkbox,
  // @ts-ignore
  Stack,
  // @ts-ignore
  FormGroup,
  // @ts-ignore
  ModalBody,
  // @ts-ignore
  ModalFooter,
  // @ts-ignore
  Button,
} from '@carbon/react';
import {
  ArrowRight,
  ArrowLeft,
  CheckmarkOutline,
  MisuseOutline,
  // @ts-ignore
} from '@carbon/icons-react';
// @ts-ignore
import confetti from 'canvas-confetti';
import contents from '@/contents.json';

export type Shuffle = <T>(array: T[]) => T[];
const shuffle: Shuffle = (array) => array.sort(() => Math.random() - 0.5);

export type TestItem = {
  img: string;
  answers: {
    number: number;
    text: string;
    isCorrect: boolean;
  }[];
  chosenAnswer?: number;
};
function generateQuestions(questionContents: typeof contents): TestItem[] {
  const testItems: TestItem[] = [];

  questionContents.forEach(({ instrumentos: instrumentos }, index) => {
    instrumentos.map((item) => {
      const instrumento = instrumentos[index];

      const badAnswers = shuffle(
        instrumentos
          .filter((item) => item.number !== instrumento.number)
          .map((item) => ({
            number: item.number,
            text: item.name,
            isCorrect: false,
          })),
      ).slice(0, 2);

      testItems.push({
        img: item.img,
        answers: shuffle([
          {
            number: item.number,
            text: item.name,
            isCorrect: true,
          },
          ...badAnswers,
        ]),
      });
    });
  });

  return shuffle(testItems);
}

export const Practice = () => {
  const [step, setStep] = useState<number>(1);
  const [questions, setQuestions] = useState<TestItem[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const idPrefix = useId();

  return (
    <>
      {step === 1 ? (
        <form
          onSubmit={(event) => {
            const formData = new FormData(event.target as HTMLFormElement);
            const groups = formData
              .getAll('groups')
              .map((group) => Number(group));
            setQuestions(
              generateQuestions(
                contents.filter((content) => groups.includes(content.number)),
              ),
            );
            setStep(step + 1);
            event.preventDefault();
          }}
          style={{
            display: 'contents',
          }}
        >
          <ModalBody
            hasScrollingContent={step === 1}
            ariaLabel={'Cuerpo del modal'}
          >
            <FormGroup legendText={'Grupos'} tabIndex={0}>
              {contents.map(({ name, number }) => {
                return (
                  <Checkbox
                    id={idPrefix + number}
                    labelText={name}
                    key={number}
                    value={number}
                    name={'groups'}
                    defaultChecked
                  />
                );
              })}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type={'submit'} renderIcon={ArrowRight}>
              Comenzar
            </Button>
          </ModalFooter>
        </form>
      ) : null}
      {step === 2 ? (
        <>
          <ModalBody>
            <div
              style={{
                maxWidth: '380px',
                margin: '0 auto',
                height: '100%',
                width: '100%',
                display: 'grid',
                gridTemplateRows: 'auto 1fr auto',
                gap: '1rem',
                overflow: 'auto',
              }}
            >
              <p>Selecciona el instrumento que se muestra en la imagen</p>
              <img
                src={questions[currentQuestionIndex].img}
                alt={'Imagen del instrumento'}
                style={{
                  width: '100%',
                }}
              />
              <FormGroup legendText={'Opciones'}>
                <Stack gap={3}>
                  {questions[currentQuestionIndex].answers.map(
                    (answer, index) => (
                      <Button
                        key={index}
                        value={index}
                        kind={
                          !questions[currentQuestionIndex].chosenAnswer
                            ? 'tertiary'
                            : questions[currentQuestionIndex].chosenAnswer ===
                              answer.number
                            ? answer.isCorrect
                              ? 'success'
                              : 'danger'
                            : answer.isCorrect
                            ? 'success--tertiary'
                            : 'tertiary'
                        }
                        renderIcon={
                          questions[currentQuestionIndex].chosenAnswer ===
                          answer.number
                            ? answer.isCorrect
                              ? CheckmarkOutline
                              : MisuseOutline
                            : undefined
                        }
                        style={{
                          width: '100%',
                          maxWidth: '100%',
                        }}
                        onClick={() => {
                          if (!questions[currentQuestionIndex].chosenAnswer) {
                            if (answer.isCorrect) {
                              confetti({
                                particleCount: 100,
                                spread: 70,
                                origin: {
                                  y: 0.8,
                                },
                                zIndex: 10000,
                              });
                            }
                            setQuestions(
                              questions.map((question, questionIndex) => {
                                if (questionIndex === currentQuestionIndex) {
                                  return {
                                    ...question,
                                    chosenAnswer:
                                      question.answers[index].number,
                                  };
                                }
                                return question;
                              }),
                            );
                          }
                        }}
                      >
                        {answer.text}
                      </Button>
                    ),
                  )}
                </Stack>
              </FormGroup>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              kind={'secondary'}
              renderIcon={ArrowLeft}
              disabled={currentQuestionIndex === 0}
              onClick={() => {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
              }}
            >
              Anterior
            </Button>
            <Button
              renderIcon={ArrowRight}
              onClick={() => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              }}
              disabled={
                currentQuestionIndex === questions.length - 1 ||
                !questions[currentQuestionIndex].chosenAnswer
              }
            >
              Siguiente
            </Button>
          </ModalFooter>
        </>
      ) : null}
    </>
  );
};
