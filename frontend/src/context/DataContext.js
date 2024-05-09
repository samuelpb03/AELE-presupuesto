import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});

  const saveData = (tabId, formData) => {
    setData(prevData => ({
      ...prevData,
      [tabId]: { ...formData }
    }));
  };

  return (
    <DataContext.Provider value={{ data, saveData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);