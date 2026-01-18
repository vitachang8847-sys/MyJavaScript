import { useState } from 'react';
import data from './data.js';

//let idx = 0;

export default function MyGallery() {
  const [idx, setIdx] = useState(0);
  const handlePrev = () => {
    console.log('prev');
    setIdx((idx) => (idx - 1 + data.length) % data.length);
  };

  const handleNext = () => {
    console.log('prev');
    setIdx((idx) => (idx + 1) % data.length);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '20px',
        border: '1px solid',
      }}
    >
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handlePrev}>prev</button>
        <button onClick={handleNext}>next</button>
      </div>
      <img src={data[idx].url} style={{ display: 'block' }} />
      <label>{data[idx].title}</label>
    </div>
  );
}
