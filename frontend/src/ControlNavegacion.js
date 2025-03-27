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
      <Link to="/Frentes" onClick={(event) => handleLinkClick('/Frentes', event)}>Puertas</Link>
      <Link to="/Frentes2" onClick={(event) => handleLinkClick('/Frentes2', event)}>Puertas 2</Link>
      <Link to="/Frentes3" onClick={(event) => handleLinkClick('/Frentes3', event)}>Puertas 3</Link>
      <Link to="/Interiores" onClick={(event) => handleLinkClick('/Interiores', event)}>Interiores</Link>
      <Link to="/Baldas" onClick={(event) => handleLinkClick('/Baldas', event)}>Baldas</Link>
      <Link to="/Equipamiento3" onClick={(event) => handleLinkClick('/Equipamiento3', event)}>Equipamiento</Link>
      <Link to="/Tiradores" onClick={(event) => handleLinkClick('/Tiradores', event)}>Tiradores</Link>
      <Link to="/Remates" onClick={(event) => handleLinkClick('/Remates', event)}>Remates</Link>
      <Link to="/Instalacion" onClick={(event) => handleLinkClick('/Instalacion', event)}>Instalacion</Link>
    </div>
  );
}

export default NavigationController;

