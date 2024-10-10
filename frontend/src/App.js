import React from 'react';
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
import './App.css';

/**
 * App
 * 
 * Este es el componente principal de la aplicaci n, 
 * el cual contiene todos los componentes de las diferentes secciones.
 * 
 * Se utiliza el contexto de DataProvider para proveer los datos
 * de los productos y los campos de usuario a los componentes,
 * y el contexto de TabsProvider para proveer las opciones de las secciones.
 * 
 * Se utiliza BrowserRouter para crear un enrutador para las diferentes secciones,
 * y NavigationController para controlar la navegaci n entre secciones.
 * 
 * Se incluyen los campos de usuario en el componente CamposUsuario.
 * 
 * Se utilizan los componentes de las diferentes secciones que se encuentran en el directorio ./src.
 * 
 * @returns {React.ReactElement} El componente principal de la aplicaci n.
 */
function App() {
  return (
    <DataProvider>
      <TabsProvider>
        <div className='App'>
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
              <Route path='Instalacion' element={<Instalacion />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TabsProvider>
    </DataProvider>
  );
}

export default App;
