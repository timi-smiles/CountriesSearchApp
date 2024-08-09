import { Data } from "@/types/data";

const COUNTRIES_PER_PAGE = 12;

export async function getAllCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,borders,cca3",
    );
    const data = await res.json();

    if (!res.ok) console.error("Algum erro ocorreu");

    return data as Data[];
  } catch (error) {
    console.error(error);
  }
}

export async function getCountriesPage(
  page: number,
  search: string,
  region: string,
) {
  const countries = await getAllCountries();
  if (countries) {
    const filteredCountries = countries.filter((country) => {
      const regex = new RegExp(search, "i");
      const nameMatches = !search || regex.test(country.name.common);
      const regionMateches = !region || country.region === region;
      return nameMatches && regionMateches;
    });
    const totalPages = Math.ceil(filteredCountries.length / COUNTRIES_PER_PAGE);

    return {
      data: filteredCountries.slice(
        (page - 1) * COUNTRIES_PER_PAGE,
        page * COUNTRIES_PER_PAGE,
      ),
      totalPages,
    } as { data: Data[]; totalPages: number };
  }
}

export async function getCountryDetails(country: string) {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${country}?fullText=true&fields=flags,name,population,region,subregion,capital,tld,currencies,languages,borders`,
    );
    const data = (await res.json()) as Data[];

    if (!res.ok) {
      console.error("Algum erro ocorreu.");
    }

    const {
      flags,
      name,
      population,
      region,
      subregion,
      capital,
      tld,
      currencies,
      languages,
      borders,
    } = data[0];

    const nativeNameKeys = Object.keys(name.nativeName);
    const nativeName = nativeNameKeys.map((nnk) => name.nativeName[nnk].common);

    const currenciesKeys = Object.keys(currencies);
    const currenciesName = currenciesKeys.map(
      (isocode) => currencies[isocode].name,
    );

    const languagesKeys = Object.keys(languages);
    const languagesName = languagesKeys.map((lang) => languages[lang]);

    const bordersName = await getBorderCountries(borders);

    return {
      flags,
      name,
      population,
      region,
      subregion,
      capital,
      tld,
      currencies,
      languages,
      nativeName,
      currenciesName,
      languagesName,
      bordersName,
    };
  } catch (error) {
    console.error(error);
  }
}

async function getBorderCountries(borders: string[]) {
  const allCountries = await getAllCountries();
  const allBorders = allCountries?.filter((country) => {
    if (borders) return borders.some((border) => border === country.cca3);
    else false;
  });

  if (typeof allBorders === "undefined" || allBorders.length <= 0) {
    return undefined;
  }

  return allBorders.map((border) => border.name.common);
}
