import React from 'react';

const RoutineDisplay = ({ data }: { data: string }) => {
    return (
      <div style={{ 
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        maxWidth: '800px',
        textAlign: 'left',
        whiteSpace: 'pre-line' // Para mantener los saltos de línea de la IA
      }}>
        <h2 style={{ color: '#4ca287', textAlign: 'center' }}>Tu Rutina Personalizada</h2>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '5px',
          marginTop: '15px'
        }}>
          {data}
        </div>
      </div>
    );
  };

export default RoutineDisplay;
