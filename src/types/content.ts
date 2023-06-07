export type Contents = Content[];

export interface Content {
  name: string;
  number: number;
  instrumentos: Instrumento[];
}

export interface Instrumento {
  number: number;
  name: string;
  img: string;
}
