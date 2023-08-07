import React, { useState } from 'react';

export const ComponentA = () => {
    const [a, setA] = useState(0);

    return <>
        <div>Current component: A</div>
        <div><span>a: {a}</span><button type='button' onClick={() => setA(prev => prev + 1)}>a+1</button></div>
        <input />
    </>
}

export const ComponentB = () => {
    const [b, setB] = useState(0);

    return <>
        <div>Current component: B</div>
        <div>{b}</div>
        <div>{[0, 1, 2].map(index => <input key={index} type='radio' checked={b === index} onChange={() => setB(index)} />)}</div>
        <button type='button' onClick={() => setB(prev => (prev >= 2 ? -1 : prev) + 1)}>b+1</button>
    </>
}
