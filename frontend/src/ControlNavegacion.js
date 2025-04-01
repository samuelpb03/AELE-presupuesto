import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function NavigationController() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obtener la ruta actual

  const handleLinkClick = (path, event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    navigate(path);
  };

  return (
    <div className="tabs">
      <Link
        to="/Frentes"
        onClick={(event) => handleLinkClick('/Frentes', event)}
        className={location.pathname === '/Frentes' ? 'active' : ''}
      >
        Puertas
      </Link>
      <Link
        to="/Frentes2"
        onClick={(event) => handleLinkClick('/Frentes2', event)}
        className={location.pathname === '/Frentes2' ? 'active' : ''}
      >
        Puertas 2
      </Link>
      <Link
        to="/Frentes3"
        onClick={(event) => handleLinkClick('/Frentes3', event)}
        className={location.pathname === '/Frentes3' ? 'active' : ''}
      >
        Puertas 3
      </Link>
      <Link
        to="/Interiores"
        onClick={(event) => handleLinkClick('/Interiores', event)}
        className={location.pathname === '/Interiores' ? 'active' : ''}
      >
        Interiores
      </Link>
      <Link
        to="/Baldas"
        onClick={(event) => handleLinkClick('/Baldas', event)}
        className={location.pathname === '/Baldas' ? 'active' : ''}
      >
        Baldas
      </Link>
      <Link
        to="/Equipamiento3"
        onClick={(event) => handleLinkClick('/Equipamiento3', event)}
        className={location.pathname === '/Equipamiento3' ? 'active' : ''}
      >
        Equipamiento
      </Link>
      <Link
        to="/Tiradores"
        onClick={(event) => handleLinkClick('/Tiradores', event)}
        className={location.pathname === '/Tiradores' ? 'active' : ''}
      >
        Tiradores
      </Link>
      <Link
        to="/Remates"
        onClick={(event) => handleLinkClick('/Remates', event)}
        className={location.pathname === '/Remates' ? 'active' : ''}
      >
        Remates
      </Link>
      <Link
        to="/Instalacion"
        onClick={(event) => handleLinkClick('/Instalacion', event)}
        className={location.pathname === '/Instalacion' ? 'active' : ''}
      >
        Instalacion
      </Link>
    </div>
  );
}

export default NavigationController;

