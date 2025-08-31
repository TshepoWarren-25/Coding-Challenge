export type Country = { name: string; flag: string };
export type CountryDetails = { name: string; population: number; capital: string; flag: string };

const ALL_URL = 'https://restcountries.com/v3.1/all?fields=name,flags';
const NAME_URL = (n: string) => `https://restcountries.com/v3.1/name/${encodeURIComponent(n)}?fullText=true&fields=name,flags,population,capital`;

async function fetchJson(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Upstream error ' + res.status);
  return res.json();
}

export async function getAllCountries(): Promise<Country[]> {
  type Rc = { name: { common: string }, flags: { svg?: string, png?: string } };
  const data: Rc[] = await fetchJson(ALL_URL);
  return data.map(c => ({ name: c.name.common, flag: c.flags.svg || c.flags.png || '' }))
             .sort((a,b) => a.name.localeCompare(b.name));
}

export async function getCountryByName(name: string): Promise<CountryDetails> {
  type Rc = { name: { common: string }, flags: { svg?: string, png?: string }, population?: number, capital?: string[] };
  const data: Rc[] = await fetchJson(NAME_URL(name));
  if (!data || !data.length) throw new Error('Not found');
  const c = data[0];
  return {
    name: c.name.common,
    population: c.population || 0,
    capital: (c.capital && c.capital[0]) || 'N/A',
    flag: c.flags.svg || c.flags.png || ''
  };
}
