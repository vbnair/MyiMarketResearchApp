// 'use client';

// import { useState, FormEvent } from 'react';

// interface InputFormProps {
//   onResults: (data: any) => void;
// }

// export default function InputForm({ onResults }: InputFormProps) {
//   const [seedKeywords, setSeedKeywords] = useState('');
//   const [geo, setGeo] = useState('');
//   const [timeframe, setTimeframe] = useState('');
//   const [topFeatures, setTopFeatures] = useState('5');

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [warnings, setWarnings] = useState<string[]>([]);

//   async function handleSubmit(e: FormEvent) {
//     e.preventDefault();
//     setError(null);
//     setWarnings([]);
//     setLoading(true);

//     try {
//       const resp = await fetch('/api/analyze', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ seedKeywords, geo, timeframe, topFeatures }),
//       });
//       const data = await resp.json();
//       setLoading(false);

//       if (!resp.ok) {
//         setError(data.error || 'Unknown error');
//         return;
//       }

//       if (data.warnings?.length) {
//         setWarnings(data.warnings);
//       } else {
//         setWarnings([]);
//       }

//       onResults(data);
//     } catch {
//       setError('Network error or server unavailable');
//       setLoading(false);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
//       <div style={{ marginBottom: 12 }}>
//         <label htmlFor="seedKeywords">Seed Keywords (comma separated)*</label>
//         <input
//           id="seedKeywords"
//           type="text"
//           value={seedKeywords}
//           onChange={e => setSeedKeywords(e.target.value)}
//           placeholder="e.g. AI marketing, travel apps"
//           required
//           style={{ width: '100%', padding: 8 }}
//         />
//       </div>

//       <div style={{ marginBottom: 12 }}>
//         <label htmlFor="geo">Google Trends Geo (optional)</label>
//         <input
//           id="geo"
//           type="text"
//           value={geo}
//           onChange={e => setGeo(e.target.value)}
//           placeholder="e.g. US, GB, worldwide"
//           style={{ width: '100%', padding: 8 }}
//         />
//       </div>

//       <div style={{ marginBottom: 12 }}>
//         <label htmlFor="timeframe">Google Trends Timeframe (optional)</label>
//         <input
//           id="timeframe"
//           type="text"
//           value={timeframe}
//           onChange={e => setTimeframe(e.target.value)}
//           placeholder="e.g. today 12-m, now 7-d"
//           style={{ width: '100%', padding: 8 }}
//         />
//       </div>

//       <div style={{ marginBottom: 12 }}>
//         <label htmlFor="topFeatures">Top Features To Show (optional)</label>
//         <input
//           id="topFeatures"
//           type="number"
//           min={1}
//           max={20}
//           value={topFeatures}
//           onChange={e => setTopFeatures(e.target.value)}
//           style={{ width: '100%', padding: 8 }}
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         style={{
//           padding: '0.75em 1.5em',
//           cursor: loading ? 'not-allowed' : 'pointer',
//           backgroundColor: '#3182ce',
//           color: 'white',
//           border: 'none',
//           borderRadius: 4,
//         }}
//       >
//         {loading ? 'Analyzing...' : 'Run Analysis'}
//       </button>

//       {error && <p style={{ color: 'red', marginTop: 12 }}>{error}</p>}

//       {warnings.length > 0 && (
//         <div
//           style={{
//             backgroundColor: '#fff3cd',
//             marginTop: 12,
//             padding: 12,
//             borderRadius: 4,
//             color: '#856404',
//           }}
//         >
//           <strong>Note:</strong>
//           <ul>
//             {warnings.map((w, i) => (
//               <li key={i}>{w}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </form>
//   );
// }


//new
'use client';

import { useState, FormEvent } from 'react';

interface InputFormProps {
  onResults: (data: any) => void;
}

export default function InputForm({ onResults }: InputFormProps) {
  const [seedKeywords, setSeedKeywords] = useState('');
  const [geo, setGeo] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [topFeatures, setTopFeatures] = useState('5');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setWarnings([]);
    setLoading(true);

    try {
      const resp = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seedKeywords, geo, timeframe, topFeatures }),
      });
      const data = await resp.json();
      setLoading(false);

      if (!resp.ok) {
        setError(data.error || 'Unknown error');
        return;
      }

      if (data.warnings?.length) {
        setWarnings(data.warnings);
      } else {
        setWarnings([]);
      }

      onResults(data);
    } catch {
      setError('Network error or server unavailable');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 420, margin: '1rem auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="seedKeywords" style={{ display: 'block', fontWeight: 'bold' }}>
          Seed Keywords (comma separated) *
        </label>
        <input
          id="seedKeywords"
          type="text"
          value={seedKeywords}
          onChange={e => setSeedKeywords(e.target.value)}
          placeholder="e.g. AI marketing, travel apps"
          required
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '1rem',
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
        />
        <small style={{ color: '#666' }}>
          Enter topics to research; this is mandatory.
        </small>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="geo" style={{ display: 'block', fontWeight: 'bold' }}>
          Google Trends Geo (optional)
        </label>
        <input
          id="geo"
          type="text"
          value={geo}
          onChange={e => setGeo(e.target.value)}
          placeholder="e.g. US, GB, worldwide"
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '1rem',
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
        />
        <small style={{ color: '#666' }}>
          Default: <em>worldwide</em>
        </small>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="timeframe" style={{ display: 'block', fontWeight: 'bold' }}>
          Google Trends Timeframe (optional)
        </label>
        <input
          id="timeframe"
          type="text"
          value={timeframe}
          onChange={e => setTimeframe(e.target.value)}
          placeholder="e.g. today 12-m, now 7-d"
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '1rem',
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
        />
        <small style={{ color: '#666' }}>Default: <em>today 12-m</em></small>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="topFeatures" style={{ display: 'block', fontWeight: 'bold' }}>
          Top Features To Show (optional)
        </label>
        <input
          id="topFeatures"
          type="number"
          min={1}
          max={20}
          value={topFeatures}
          onChange={e => setTopFeatures(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '1rem',
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
        />
        <small style={{ color: '#666' }}>
          Default: <em>5</em>
        </small>
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: '12px 24px',
          fontSize: '1rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          backgroundColor: '#3182ce',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          width: '100%',
          marginTop: 12,
        }}
      >
        {loading ? 'Analyzing...' : 'Run Analysis'}
      </button>

      {error && (
        <p style={{ color: 'red', marginTop: 12, fontWeight: 'bold' }}>
          {error}
        </p>
      )}

      {warnings.length > 0 && (
        <div
          style={{
            backgroundColor: '#fff3cd',
            color: '#856404',
            padding: 12,
            borderRadius: 4,
            marginTop: 12,
          }}
          role="alert"
        >
          <strong>Note:</strong>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
