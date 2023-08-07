import React from 'react';
import { useReactive } from 'react-vueable';

export default () => {
  const a = useReactive({
    b: /123/,
  });

  return <div>{a.b.test('321')}</div>;
};
