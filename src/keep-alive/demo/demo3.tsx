import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { AliveScope, KeepAlive } from 'react-vueable';
import { ComponentA, ComponentB } from './TestComponent';

function KeepA() {
  return (
    <KeepAlive>
      <ComponentA key="a" />
    </KeepAlive>
  );
}

function KeepB() {
  return (
    <KeepAlive>
      <ComponentB key="b" />
    </KeepAlive>
  );
}

export default function () {
  return (
    <div>
      <BrowserRouter>
        <AliveScope>
          <Routes>
            <Route path="/" element={<KeepA />} />
            <Route path="/home" element={<KeepA />} />
            <Route path="/about" element={<KeepB />} />
          </Routes>
        </AliveScope>
        <div>
          <Link to="/home">home</Link>
        </div>
        <div>
          <Link to="/about">about</Link>
        </div>
      </BrowserRouter>
    </div>
  );
}
