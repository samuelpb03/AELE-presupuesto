// TabsContext.js
import React, { createContext, useState, useContext } from 'react';

// Crea el contexto
const TabsContext = createContext();


// Crea un componente proveedor
export const TabsProvider = ({ children }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedOptionsE, setSelectedOptionsE] = useState({});
  const [selectedOptionsF, setSelectedOptionsF] = useState({});
  const [selectedOptionsG, setSelectedOptionsG] = useState({});
  const [selectedOptionsH, setSelectedOptionsH] = useState({});

  const handleSelectChange = (tabId, optionId) => {
    setSelectedOptions(prev => ({ ...prev, [tabId]: optionId }));
  
  };
  const handleSelectChangeE = (tabId, optionId) => {
    setSelectedOptionsE(prev => ({ ...prev, [tabId]: optionId}));
  };
  const handleSelectChangeF = (tabId, optionId) => {
    setSelectedOptionsF(prev => ({ ...prev, [tabId]: optionId}));
  };
  const handleSelectChangeG = (tabId, optionId) => {
    setSelectedOptionsG(prev => ({ ...prev, [tabId]: optionId}));
  };
  const handleSelectChangeH = (tabId, optionId) => {
    setSelectedOptionsH(prev => ({ ...prev, [tabId]: optionId}));
  };
  return (
    <TabsContext.Provider value={{
      selectedOptions,
      handleSelectChange,
      selectedOptionsE,
      handleSelectChangeE,
      selectedOptionsF,
      handleSelectChangeF,
      selectedOptionsG,
      handleSelectChangeG,
      selectedOptionsH,
      handleSelectChangeH,
    }}>
      {children}
    </TabsContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useTabs = () => useContext(TabsContext);