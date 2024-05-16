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
  const [selectedOptionsI, setSelectedOptionsI] = useState({});
  const [selectedOptionsE2, setSelectedOptionsE2] = useState({});
  const [selectedOptionsE3, setSelectedOptionsE3] = useState({});

  const handleSelectChange = (tabId, optionId, optionName) => {
    setSelectedOptions(prev => ({ ...prev, [tabId]: { optionId, optionName } }));
  };
  
  const handleSelectChangeE = (tabId, optionId, optionName) => {
    setSelectedOptionsE(prev => ({ ...prev, [tabId]: { optionId, optionName } }));
  };
  
  const handleSelectChangeF = (tabId, optionId, optionName) => {
    setSelectedOptionsF(prev => ({ ...prev, [tabId]: { optionId, optionName } }));
  };
  
  const handleSelectChangeG = (tabId, optionId, optionName) => {
    setSelectedOptionsG(prev => ({ ...prev, [tabId]: { optionId, optionName } }));
  };
  
  const handleSelectChangeH = (tabId, optionId, optionName) => {
    setSelectedOptionsH(prev => ({ ...prev, [tabId]: { optionId, optionName } }));
  };
  const handleSelectChangeI = (tabId, optionId, optionName) => {
    setSelectedOptionsI(prev => ({ ...prev, [tabId]: { optionId, optionName } }));
  };
  const handleSelectChangeE2 = (tabId, optionId, optionName) => {
    setSelectedOptionsE2(prev => ({ ...prev, [tabId]: { optionId, optionName } }));
  };
  const handleSelectChangeE3 = (tabId, optionId, optionName) => {
    setSelectedOptionsE3(prev => ({ ...prev, [tabId]: { optionId, optionName } }));
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
      selectedOptionsI,
      handleSelectChangeI,
      selectedOptionsE2,
      handleSelectChangeE2,
      selectedOptionsE3,
      handleSelectChangeE3,
    }}>
      {children}
    </TabsContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useTabs = () => useContext(TabsContext);
