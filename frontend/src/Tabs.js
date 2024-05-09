import React, { useState } from 'react';

function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div>
      <ul className="tabs">
        {children.map((tab) => (
          <li key={tab.props.label}
              className={tab.props.label === activeTab ? 'active' : ''}
              onClick={(e) => handleClick(e, tab.props.label)}>
            {tab.props.label}
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {children.map((one) => {
          if (one.props.label === activeTab) return <div key={one.props.label}>{one.props.children}</div>;
          else return null;
        })}
      </div>
    </div>
  );
}

function Tab({ label, children }) {
  return { children };
}

export { Tabs, Tab };