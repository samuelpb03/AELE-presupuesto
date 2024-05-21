import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavigationController() {
  const navigate = useNavigate();

  const handleLinkClick = (path, event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    navigate(path);
  };

  return (
    <div className="tabs">
      {/* Utiliza <Link> para mantener el estilo pero maneja la navegación con estado */}
      <Link to="/Frentes" onClick={(event) => handleLinkClick('/Frentes', event)}>Frente</Link>
      <Link to="/Frentes2" onClick={(event) => handleLinkClick('/Frentes2', event)}>Frente 2</Link>
      <Link to="/Frentes3" onClick={(event) => handleLinkClick('/Frentes3', event)}>Frente 3</Link>
      <Link to="/Tiradores" onClick={(event) => handleLinkClick('/Tiradores', event)}>Tiradores</Link>
      <Link to="/Interiores" onClick={(event) => handleLinkClick('/Interiores', event)}>Interiores</Link>
      <Link to="/Baldas" onClick={(event) => handleLinkClick('/Baldas', event)}>Baldas</Link>
      <Link to="/Equipamiento3" onClick={(event) => handleLinkClick('/Equipamiento3', event)}>Equipamiento</Link>
    </div>
  );
}

export default NavigationController;

