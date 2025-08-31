import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Details = { name:string, population:number, capital:string, flag:string };

export default function CountryPage() {
  const router = useRouter();
  const { name } = router.query;
  const [d, setD] = useState<Details | null>(null);
  useEffect(() => {
    if (!name) return;
    fetch(`/api/proxy?name=${encodeURIComponent(String(name))}`)
      .then(r=>r.json())
      .then(setD)
      .catch(()=>{});
  }, [name]);
  if (!d) return <p>Loading...</p>;
  return (
    <div style={{ padding:24 }}>
      <button onClick={()=>router.back()}>← Back</button>
      <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:16, marginTop:12 }}>
        <img src={d.flag} alt={`${d.name} flag`} style={{ width:200 }} />
        <div>
          <h2>{d.name}</h2>
          <p><strong>Capital:</strong> {d.capital}</p>
          <p><strong>Population:</strong> {d.population.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
