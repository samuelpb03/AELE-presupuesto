import React, { createContext, useState, useContext } from 'react';
// Crea el contexto
const TabsContext = createContext();
// Crea un componente proveedor
export const TabsProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('/Frentes'); // Ruta inicial
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedOptionsE, setSelectedOptionsE] = useState({});
  const [selectedOptionsF, setSelectedOptionsF] = useState({});
  const [selectedOptionsG, setSelectedOptionsG] = useState({});
  const [selectedOptionsH, setSelectedOptionsH] = useState({}); 
  const [selectedOptionsI, setSelectedOptionsI] = useState({});
  const [selectedOptionsE2, setSelectedOptionsE2] = useState({});
  const [selectedOptionsE3, setSelectedOptionsE3] = useState({});
  const [selectedOptionsC, setSelectedOptionsC] = useState({});
  const [selectedOptionsB, setSelectedOptionsB] = useState({});
  const [selectedOptionsZ, setSelectedOptionsZ] = useState({});
  const [selectedOptionsInstalacion, setSelectedOptionsInstalacion] = useState({});
  const [userInfo, setUserInfo] = useState({
    tienda: '',
    cliente: '',
    telefono: '',
  });
  const [colorAdjustment, setColorAdjustment] = useState({
    isAdjusted: false,
    adjustedPoints: 0,
  });
  const restoreUserInfo = (cliente, telefono, email) => {
    setUserInfo({
      cliente: cliente || "",
      telefono: telefono || "",
      email: email || "", // Aseguramos que email sea opcional
    });
  };
  const handleUserInfoChange = (field, value) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };
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

  const handleSelectChangeC = (tabId, optionId, optionName) => {
    setSelectedOptionsC(prev => ({ ...prev, [tabId]: { optionId, optionName } }));
  };

  const handleSelectChangeB = (tabId, optionId, optionName) => {
    setSelectedOptionsB(prev => ({ ...prev, [tabId]: { optionId, optionName } }));
  };
  
  const handleSelectChangeZ = (tabId, optionId, optionName) => {
    setSelectedOptionsZ(prev => ({ ...prev, [tabId]: { optionId, optionName } }));
  };

  const handleSelectChangeInstalacion = (tabId, optionId, optionName) => {
    setSelectedOptionsInstalacion(prev => ({ ...prev, [tabId]: { optionId, optionName } }));
  };
  const handleColorAdjustment = (isAdjusted, adjustedPoints) => {
    setColorAdjustment({ isAdjusted, adjustedPoints });
  };
  return (
    <TabsContext.Provider value={{
      activeTab,
      setActiveTab,
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
      selectedOptionsC,
      handleSelectChangeC,
      selectedOptionsB,
      handleSelectChangeB,
      selectedOptionsZ,
      handleSelectChangeZ,
      selectedOptionsInstalacion,
      handleSelectChangeInstalacion,
      userInfo,
      handleUserInfoChange,
      restoreUserInfo,
      colorAdjustment,
      handleColorAdjustment,
    }}>
      {children}
    </TabsContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useTabs = () => useContext(TabsContext);

