import React from 'react';

const Header = () => {
  return (
    <header style={{
        backgroundColor: '#4a90e2',
        color: '#fff',
        padding: '20px 0',
        textAlign: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '0 0 10px 10px',
        marginBottom: '20px'
      }}>
        App de Rutinas de Ejercicio
      </header>
  );
};

export default Header;