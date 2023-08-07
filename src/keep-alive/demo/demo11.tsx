import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export const ShadowView: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const attachShadow = (host: HTMLDivElement) => {
    if (!host || host.shadowRoot) return;

    const shadowRoot = host.attachShadow({ mode: 'open' });
    [].slice.call(host.children).forEach((child) => {
      shadowRoot.appendChild(child);
    });
  };
  return <div ref={attachShadow}>{children}</div>;
};

export const ShadowView2: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const attachShadow = (host: HTMLDivElement) => {
    if (!host || host.shadowRoot) return;

    const shadowRoot = host.attachShadow({ mode: 'open' });
    ReactDOM.render(children as any, shadowRoot);
  };
  return <div ref={attachShadow}></div>;
};

export default () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log('lp:click');
    setCount(count + 1);
  };
  return (
    <div>
      {count}
      <ShadowView>
        <div>{count}</div>
        <button type="button" onClick={handleClick}>
          内部单击
        </button>
      </ShadowView>
      <button type="button" onClick={handleClick}>
        外部单击
      </button>
    </div>
  );
};
