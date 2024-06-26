import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { TabsProvider } from './TabsContext';
import Frentes from './Frentes';
import Tiradores from './Tiradores';
import Interiores from './Interiores';
import Equipamiento3 from './Equipamiento3';
import Frentes2 from './Frentes2';
import Frentes3 from './Frentes3';  // Importa el nuevo componente
import Baldas from './Baldas';
import Remates from './Remates';
import Instalacion from './Instalacion';
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
            <Route path='/Baldas' element={<TabsProvider><Baldas></Baldas></TabsProvider>} />
            <Route path='/Frentes' element={<TabsProvider><Frentes/></TabsProvider>} />
            <Route path='/Frentes3' element={<TabsProvider><Frentes3/></TabsProvider>} />  {/* Nueva ruta */}
            <Route path='/Equipamiento3' element={<TabsProvider><Equipamiento3></Equipamiento3></TabsProvider>} />
            <Route path='/Remates' element={<TabsProvider><Remates/></TabsProvider>} />
            <Route path='Instalacion' element={<TabsProvider><Instalacion/></TabsProvider>} />
          </Routes>
        </BrowserRouter>
      </div>
    </DataProvider>
  );
}

export default App;

