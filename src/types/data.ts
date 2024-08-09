interface NativeName {
  [key: string]: {
    common: string;
    official: string;
  };
}

interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}

interface Flags {
  svg: string;
  png: string;
  alt?: string;
}

interface Currencies {
  [key: string]: {
    name: string;
    symbol: string;
  };
}

interface Languages {
  [key: string]: string;
}

export interface Data {
  name: Name;
  tld: string[];
  cca3: string;
  capital: string;
  subregion: string;
  region: string;
  population: number;
  borders: string[];
  flags: Flags;
  currencies: Currencies;
  languages: Languages;
  nativeName: string[];
  languagesName: string[];
  currenciesName: string[];
  bordersName: string[];
}
