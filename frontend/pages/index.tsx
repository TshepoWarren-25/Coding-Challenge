import { useEffect, useState } from 'react';
import Link from 'next/link';

type Country = { name: string; flag: string };

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,flags')
      .then(r => r.json())
      .then((data: any[]) => {
        const mapped = data.map(c => ({ name: c.name.common, flag: c.flags.svg || c.flags.png }));
        setCountries(mapped.sort((a,b)=>a.name.localeCompare(b.name)));
      })
      .catch(()=>{})
      .finally(()=>setLoading(false));
  }, []);
  if (loading) return <p>Loading…</p>;
  return (
    <div style={{ padding: 24 }}>
      <h1>Flag Explorer (Next.js)</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 12 }}>
        {countries.map(c=>(
          <Link key={c.name} href={`/country/${encodeURIComponent(c.name)}`}>
            <a style={{ textDecoration:'none', color:'inherit' }}>
              <div style={{ border:'1px solid #ddd', padding:8, borderRadius:8 }}>
                <img src={c.flag} alt={`${c.name} flag`} style={{ width:'100%', height:80, objectFit:'cover' }} />
                <div style={{ marginTop:8, fontWeight:600 }}>{c.name}</div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
