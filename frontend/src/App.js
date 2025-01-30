import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TabsProvider } from './TabsContext';
import Frentes from './Frentes';
import Tiradores from './Tiradores';
import Interiores from './Interiores';
import Equipamiento3 from './Equipamiento3';
import Frentes2 from './Frentes2';
import Frentes3 from './Frentes3';
import Baldas from './Baldas';
import Remates from './Remates';
import Instalacion from './Instalacion';
import { DataProvider } from './context/DataContext';
import NavigationController from './ControlNavegacion';
import CamposUsuario from './CamposUsuario';  // Importamos el nuevo componente
import './AELColors.css';
import './App.css';
import './LerColors.css';
function App() {
  const [styleSheet, setStyleSheet] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const centro = user?.tienda || 'Centro no especificado';
    const empresa = user?.empresa || 'Empresa no especificada';
    
    if (empresa == 5) {
      setStyleSheet('LerColors.css');
    } else {
      setStyleSheet('AELColors.css');
    }
  }, []);  // Solo se ejecuta una vez cuando el componente se monta
  return (
    <DataProvider>
      <TabsProvider>
      <div className={`App ${styleSheet === 'LerColors.css' ? 'ler-colors' : styleSheet === 'AELColors.css' ? 'ael-colors' : ''}`}>
          <BrowserRouter>
            <NavigationController />
            {/* Incluimos los campos de usuario */}
            <CamposUsuario />  
            <Routes>
              <Route path='/Frentes2' element={<Frentes2 />} />
              <Route path='/Tiradores' element={<Tiradores />} />
              <Route path='/Interiores' element={<Interiores />} />
              <Route path='/Baldas' element={<Baldas />} />
              <Route path='/Frentes' element={<Frentes />} />
              <Route path='/Frentes3' element={<Frentes3 />} />
              <Route path='/Equipamiento3' element={<Equipamiento3 />} />
              <Route path='/Remates' element={<Remates />} />
              <Route path='/Instalacion' element={<Instalacion />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TabsProvider>
    </DataProvider>
  );
}
export default App;