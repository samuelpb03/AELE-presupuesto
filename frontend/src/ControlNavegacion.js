import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavigationController() {
  const navigate = useNavigate();
  const [targetPath, setTargetPath] = useState('');

  const handleLinkClick = (path) => {
    // Almacenar la ruta objetivo
    setTargetPath(path);
  };

  const navigateSequentially = () => {
    // Función que simula la navegación por todas las pestañas antes de la destino
    if (targetPath) {
      const paths = ['/Frentes', '/Frentes2', '/Frentes3','/Tiradores', '/Interiores','/Equipamiento3','/Cerraduras','/Baldas'];
      const currentIndex = paths.indexOf(targetPath);
      const nextPath = paths.slice(0, currentIndex + 1);

      // Navegar por cada ruta antes de llegar a la ruta objetivo
      nextPath.forEach((path, index) => {
        setTimeout(() => {
          navigate(path);
          navigate(path);
        }, 55 * index); // Retraso para simular navegación
      });
    }
  };

  useEffect(() => {
    navigateSequentially();
  }, [targetPath]);

  return (
    <div className="tabs">
      {/* Utiliza <Link> para mantener el estilo pero maneja la navegación con estado */}
      <Link to="#" onClick={() => handleLinkClick('/Frentes')}>Frente</Link>
      <Link to="#" onClick={() => handleLinkClick('/Frentes2')}>Frente 2</Link>
      <Link to="#" onClick={() => handleLinkClick('/Frentes3')}>Frente 3</Link>
      <Link to="#" onClick={() => handleLinkClick('/Tiradores')}>Tiradores</Link>
      <Link to="#" onClick={() => handleLinkClick('/Cerraduras')}>Cerraduras</Link>
      <Link to="#" onClick={() => handleLinkClick('/Interiores')}>Interiores</Link>
      <Link to="#" onClick={() => handleLinkClick('/Baldas')}>Baldas</Link>
      <Link to="#" onClick={() => handleLinkClick('/Equipamiento3')}>Equipamiento</Link>
      
    </div>
  );
}

export default NavigationController;
