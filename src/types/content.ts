export interface Contents {
  name: string;
  number: number;
  instrumentos: Instrumento[];
}

export interface Instrumento {
  number: string;
  name: string;
  img: string;
}
