import { useState } from 'react';

export default function FirstState() {
  const [count, setCount] = useState(0); // 初始值為 0
  console.log('render 渲染', count);


  return (
    <div>
      <p>count is {count}</p>
      <button onClick={() => setCount(count + 1)}>點擊觸發狀態</button>
    </div>
  );
}
