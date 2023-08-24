import React, { useMemo, useState } from 'react';
import { AliveScope, KeepAlive } from 'react-vueable';
import Tabs, { Tab } from './Tabs';
import { ComponentA, ComponentB } from './TestComponent';

const TabContent = ({ groupName }: { groupName: string }) => {
  const [index, setIndex] = useState(0);
  const Component = useMemo(() => ({ 0: ComponentA, 1: ComponentB })[index]!, [index]);

  return (
    <div>
      <label>
        <input type="radio" checked={index === 0} onChange={() => setIndex(0)} />A
      </label>
      <label>
        <input type="radio" checked={index === 1} onChange={() => setIndex(1)} />B
      </label>
      <KeepAlive>
        <Component key={groupName + index} />
      </KeepAlive>
    </div>
  );
};

export default () => {
  const [groupDatas] = useState(['Group1', 'Group2']);

  const [group, setGroup] = useState(0);

  return (
    <div>
      <Tabs>
        {groupDatas.map((groupName, index) => (
          <Tab
            active={group === index}
            key={index}
            onActive={() => {
              setGroup(index);
            }}
          >
            {groupName}
          </Tab>
        ))}
      </Tabs>
      <AliveScope>
        <div style={{ padding: '8px' }}>
          {group === 0 && (
            <KeepAlive>
              <TabContent key={0} groupName={groupDatas[0]} />
            </KeepAlive>
          )}
          {group === 1 && (
            <KeepAlive>
              <TabContent key={1} groupName={groupDatas[1]} />
            </KeepAlive>
          )}
        </div>
      </AliveScope>
    </div>
  );
};
