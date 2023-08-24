import React from 'react';

export const Tab = ({
  children,
  active,
  onActive,
}: {
  children: React.ReactNode;
  active?: boolean;
  onActive: () => void;
}) => {
  return (
    <div
      onClick={onActive}
      style={{
        borderRadius: '8px 8px 0 0',
        border: '1px solid #f0f0f0',
        borderBottomColor: active ? 'white' : '#f0f0f0',
        padding: '8px 16px',
        marginRight: '2px',
        zIndex: 1,
        background: active ? undefined : 'rgba(0,0,0,.02)',
        cursor: 'pointer',
      }}
    >
      {children}
    </div>
  );
};

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
      }}
    >
      {children}
      <div
        style={{
          borderBottom: '1px solid #f0f0f0',
          width: '100%',
          position: 'absolute',
          bottom: 0,
          zIndex: 0,
        }}
      />
    </div>
  );
};
