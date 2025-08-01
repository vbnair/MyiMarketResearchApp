// 'use client';

// import { useState } from 'react';
// import InputForm from '../components/InputForm';

// export default function Home() {
//   const [results, setResults] = useState<null | {
//     insights: { topKeyword: string | null; message: string };
//     opportunities: {
//       keyword: string;
//       score: number;
//       demand: number;
//       monetization: number;
//       competitionGap: number;
//     }[];
//   }>(null);

//   return (
//     <main
//       style={{
//         padding: '1rem',
//         fontFamily: 'Arial, sans-serif',
//         maxWidth: 900,
//         margin: '0 auto',
//       }}
//     >
//       <h1>Market Research Tool</h1>
//       <p>Enter seed keywords and optional parameters to get trending insights and opportunities.</p>

//       <InputForm onResults={setResults} />

//       {results && (
//         <section style={{ marginTop: '2rem' }}>
//           <h2>Key Insights</h2>
//           <p>
//             <strong>Top Keyword:</strong> {results.insights.topKeyword ?? 'N/A'}
//           </p>
//           <p>{results.insights.message}</p>

//           <h3>Opportunities</h3>
//           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//             <thead>
//               <tr style={{ backgroundColor: '#eee' }}>
//                 <th style={{ border: '1px solid #ccc', padding: 8 }}>Keyword</th>
//                 <th style={{ border: '1px solid #ccc', padding: 8 }}>Score</th>
//                 <th style={{ border: '1px solid #ccc', padding: 8 }}>Demand</th>
//                 <th style={{ border: '1px solid #ccc', padding: 8 }}>Monetization</th>
//                 <th style={{ border: '1px solid #ccc', padding: 8 }}>Competition Gap</th>
//               </tr>
//             </thead>
//             <tbody>
//               {results.opportunities.map((opp, idx) => (
//                 <tr
//                   key={idx}
//                   style={{ backgroundColor: idx % 2 === 0 ? '#fafafa' : 'white' }}
//                 >
//                   <td style={{ border: '1px solid #ccc', padding: 8 }}>{opp.keyword}</td>
//                   <td style={{ border: '1px solid #ccc', padding: 8 }}>
//                     {opp.score.toFixed(2)}
//                   </td>
//                   <td style={{ border: '1px solid #ccc', padding: 8 }}>
//                     {(opp.demand * 100).toFixed(1)}%
//                   </td>
//                   <td style={{ border: '1px solid #ccc', padding: 8 }}>
//                     {(opp.monetization * 100).toFixed(1)}%
//                   </td>
//                   <td style={{ border: '1px solid #ccc', padding: 8 }}>
//                     {(opp.competitionGap * 100).toFixed(1)}%
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>
//       )}
//     </main>
//   );
// }

//new

'use client';

import { useState } from 'react';
import InputForm from '../components/InputForm';

export default function Home() {
  const [results, setResults] = useState<null | {
    insights: { topKeyword: string | null; message: string };
    opportunities: {
      keyword: string;
      score: number;
      demand: number;
      monetization: number;
      competitionGap: number;
    }[];
  }>(null);

  return (
    <main
      style={{
        padding: '1rem',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        maxWidth: 960,
        margin: '0 auto',
        color: '#202020',
      }}
    >
      <h1 style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '0.25rem' }}>
        Market Research Tool
      </h1>
      <p style={{ color: '#555', marginBottom: '1.5rem' }}>
        Enter your keywords and optional parameters. System applies intelligent defaults for optional fields to simplify your research.
      </p>

      {/* Minimal banner/note about system defaults */}
      <div
        style={{
          backgroundColor: '#eef6fc',
          borderLeft: '4px solid #3182ce',
          padding: '12px 16px',
          marginBottom: '1.5rem',
          borderRadius: 4,
          color: '#2c5282',
          fontSize: '0.95rem',
          fontStyle: 'italic',
          userSelect: 'none',
        }}
        role="note"
      >
        Optional inputs (Geo, Timeframe, Top Features) will use default values if left blank.
      </div>

      {/* Input form */}
      <InputForm onResults={setResults} />

      {/* Results Display */}
      {results && (
        <section
          style={{
            marginTop: '2.5rem',
            borderTop: '1px solid #ddd',
            paddingTop: '1.5rem',
          }}
        >
          <h2 style={{ fontWeight: '600', marginBottom: '0.75rem' }}>Key Insights</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
            <strong>Top Keyword:</strong>{' '}
            <span style={{ color: '#3182ce' }}>{results.insights.topKeyword ?? 'N/A'}</span>
          </p>
          <p style={{ marginBottom: '1.5rem', lineHeight: 1.4 }}>{results.insights.message}</p>

          {/* Explanation box */}
          <div
            style={{
              backgroundColor: '#f9f9f9',
              borderLeft: '4px solid #666',
              padding: '12px 16px',
              marginBottom: '1.5rem',
              borderRadius: 4,
              color: '#444',
              fontSize: '0.95rem',
              lineHeight: 1.5,
            }}
            role="region"
            aria-label="Score interpretation"
          >
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>How to interpret the results:</h3>
            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
              <li>
                <strong>Score:</strong> Overall opportunity score (0 to 1), combines demand, monetization potential, and competition gap.
              </li>
              <li>
                <strong>Demand:</strong> Indicates search interest and trending popularity for the keyword.
              </li>
              <li>
                <strong>Monetization:</strong> Estimates how commercially viable or profitable the opportunity could be.
              </li>
              <li>
                <strong>Competition Gap:</strong> Represents how underserved or less competitive the space is — higher values mean less competition.
              </li>
            </ul>
            <p style={{ marginTop: 8, fontStyle: 'italic' }}>
              Use these metrics collectively to prioritize market opportunities that are popular, financially attractive, and less saturated.
            </p>
          </div>

          <h3 style={{ fontWeight: '600', marginBottom: '0.75rem' }}>Opportunities</h3>
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.95rem',
                minWidth: 600,
              }}
            >
              <thead style={{ backgroundColor: '#f7f9fb' }}>
                <tr>
                  <th style={tableHeaderCellStyle}>Keyword</th>
                  <th style={tableHeaderCellStyle}>Score</th>
                  <th style={tableHeaderCellStyle}>Demand</th>
                  <th style={tableHeaderCellStyle}>Monetization</th>
                  <th style={tableHeaderCellStyle}>Competition Gap</th>
                </tr>
              </thead>
              <tbody>
                {results.opportunities.map((opp, idx) => (
                  <tr
                    key={idx}
                    style={{
                      backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fbfcfd',
                    }}
                  >
                    <td style={tableBodyCellStyle}>{opp.keyword}</td>
                    <td style={tableBodyCellStyle}>{opp.score.toFixed(2)}</td>
                    <td style={tableBodyCellStyle}>{(opp.demand * 100).toFixed(1)}%</td>
                    <td style={tableBodyCellStyle}>{(opp.monetization * 100).toFixed(1)}%</td>
                    <td style={tableBodyCellStyle}>{(opp.competitionGap * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  );
}

const tableHeaderCellStyle: React.CSSProperties = {
  borderBottom: '2px solid #ddd',
  textAlign: 'left',
  padding: '10px 12px',
  color: '#555',
  fontWeight: 600,
};

const tableBodyCellStyle: React.CSSProperties = {
  borderBottom: '1px solid #eee',
  padding: '10px 12px',
  color: '#333',
};

