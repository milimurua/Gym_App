import React, { useState } from 'react';
import Header from './components/Header';
import Questionnaire from './components/Questionnaire';
import RoutineDisplay from './components/RoutineDisplay';

const App = () => {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data); // Guardar los datos de las respuestas
  };

  return (
    <div className="app-container">
      <Header />

      <div className="app-content">

      {!formData ? (
        <Questionnaire onSubmit={handleFormSubmit} />
      ) : (
        <RoutineDisplay data={formData} />
      )}
    </div>
    </div>
  );
};
export default App
