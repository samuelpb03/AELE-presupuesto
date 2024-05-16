import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { TabsProvider } from './TabsContext';
import Frentes from './Frentes';
import Tiradores from './Tiradores';
import Interiores from './Interiores';
import Equipamiento from './Equipamiento';
import Equipamiento2 from './Equipamiento2';
import Equipamiento3 from './Equipamiento3';
import Frentes2 from './Frentes2';
import Frentes3 from './Frentes3';  // Importa el nuevo componente
import { DataProvider } from './context/DataContext';
import NavigationController from './ControlNavegacion';
import './App.css';

function App() {
  return (
    <DataProvider>
      <div className='App'>
        <BrowserRouter>
          <NavigationController />
          <div className="tabs">
          </div>
          <Routes>
            <Route path='/Frentes2' element={<TabsProvider><Frentes2/></TabsProvider>} />
            <Route path='/Tiradores' element={<TabsProvider><Tiradores /></TabsProvider>} />
            <Route path='/Interiores' element={<TabsProvider><Interiores /></TabsProvider>} />
            <Route path='/Equipamiento' element={<TabsProvider><Equipamiento /></TabsProvider>} />
            <Route path='/Frentes' element={<TabsProvider><Frentes/></TabsProvider>} />
            <Route path='/Frentes3' element={<TabsProvider><Frentes3/></TabsProvider>} />  {/* Nueva ruta */}
            <Route path='/Equipamiento2' element={<TabsProvider><Equipamiento2></Equipamiento2></TabsProvider>} />
            <Route path='/Equipamiento3' element={<TabsProvider><Equipamiento3></Equipamiento3></TabsProvider>} />
          </Routes>
        </BrowserRouter>
      </div>
    </DataProvider>
  );
}

export default App;

