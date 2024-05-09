import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { TabsProvider } from './TabsContext';
import { generatePDF } from './GeneratePDF'
import Frentes from './Frentes';
import Tiradores from './Tiradores';
import Interiores from './Interiores';
import Equipamiento from './Equipamiento';
import Frentes2 from './Frentes2';
import { DataProvider } from './context/DataContext';
import NavigationController from './ControlNavegacion';
import './App.css';

function App() {
    // Supongamos que estos son los datos que quieres incluir en el PDF
  return (
    <DataProvider>
    <div className='App'>
      <BrowserRouter>
      <NavigationController />
        <div className="tabs">
        </div>
        <Routes>
          <Route path='/Frentes' element={<TabsProvider><Frentes /></TabsProvider>} />
          <Route path='/Tiradores' element={<TabsProvider><Tiradores /></TabsProvider>} />
          <Route path='/Interiores' element={<TabsProvider><Interiores /></TabsProvider>} />
          <Route path='/Equipamiento' element={<TabsProvider><Equipamiento /></TabsProvider>} />
          <Route path='/Frentes2' element={<TabsProvider><Frentes2/></TabsProvider>} />
        </Routes>
      </BrowserRouter>
    </div>
    </DataProvider>
  );
}

export default App;
