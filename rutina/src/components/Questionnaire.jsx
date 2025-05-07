import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import { GoogleGenerativeAI } from '@google/generative-ai';

const questions = [
  { question: '¿Tienes alguna lesión?', options: ['Sí', 'No'] },
  { question: '¿Dónde tienes la lesión?', options: ['Brazos', 'Piernas', 'Espalda', 'Cuello', 'Otro'] },
  { question: '¿Tienes problemas cardiovasculares o hipertensión?', options: ['Sí', 'No'] },
  { question: '¿Sufres de problemas articulares o musculares (rodillas, espalda, etc.)?', options: ['Sí', 'No'] },
  { question: '¿Estás actualmente tomando algún medicamento que pueda afectar tu rendimiento físico?', options: ['Sí', 'No'] },
  { question: '¿Tienes acceso a un gimnasio o equipo específico (pesas, bandas elásticas, bicicleta, etc.)?', options: ['Sí', 'No'] },
  { question: '¿Cuál de los siguientes equipos tienes disponible en casa?', options: ['Pesas', 'Bandas de resistencia', 'Máquina de correr', 'Bicicleta estática', 'Ninguno'] },
  { question: '¿Te interesa la tonificación muscular, aumento de fuerza o ambos?', options: ['Tonificación', 'Aumento de fuerza', 'Ambos'] },
  { question: '¿Cuántos días a la semana puedes dedicar a hacer ejercicio?', options: ['1-2 días', '3-4 días', '5-6 días', 'Más de 6 días'] },
  { question: '¿Cuál es tu objetivo principal con esta rutina?', options: ['Perder peso', 'Ganar músculo', 'Mejorar mi resistencia', 'Mantenerme en forma'] },
  { question: '¿Tienes alguna preferencia en cuanto a tipo de entrenamiento? (Ej. Cardio, fuerza, HIIT, etc.)', options: ['Cardio', 'Fuerza', 'HIIT', 'Mezcla de todos'] },
];

const Questionnaire = ({ onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const genAI = new GoogleGenerativeAI('AIzaSyBU7_VsTlpFsaMahaynoZwsgKQJRKzjoNI');

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (answer === 'No' && currentQuestionIndex === 0) {
      setCurrentQuestionIndex(currentQuestionIndex + 2);
    } else {
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
      } else {
        handleSubmit(newAnswers);
      }
    }
  };

  const handleSubmit = async (answers) => {
    setIsSubmitting(true);

    // Contexto detallado basado en las respuestas
    let detailedAnswers = '';

    // Respuesta a la pregunta en caso que tenga lesiones
    if (answers[0] === 'Sí') {
      const injuryLocation = answers[1] || 'Ubicación no especificada';
      detailedAnswers += `Lesión en el ${injuryLocation}. `;
    } else {
      detailedAnswers += 'No tiene lesiones. ';
    }

    // Respuesta a problemas cardiovasculares
    if (answers[2] === 'Sí') {
      detailedAnswers += 'Tiene problemas cardiovasculares o hipertensión. ';
    } else {
      detailedAnswers += 'No tiene problemas cardiovasculares o hipertensión. ';
    }

    // Respuesta a problemas articulares
    if (answers[3] === 'Sí') {
      detailedAnswers += 'Sufre problemas articulares o musculares. ';
    } else {
      detailedAnswers += 'No sufre problemas articulares o musculares. ';
    }

    // Respuesta a medicamentos
    if (answers[4] === 'Sí') {
      detailedAnswers += 'Está tomando medicamentos que afectan su rendimiento físico. ';
    } else {
      detailedAnswers += 'No está tomando medicamentos que afecten su rendimiento físico. ';
    }

    // Respuesta a gimnasio
    if (answers[5] === 'Sí') {
      detailedAnswers += 'Tiene acceso a un gimnasio o equipo específico. ';
    } else {
      detailedAnswers += 'No tiene acceso a un gimnasio o equipo específico. ';
    }

    // Respuesta a equipo disponible en casa
    if (answers[6] !== 'Ninguno') {
      detailedAnswers += `Tiene disponible en casa: ${answers[6]}. `;
    } else {
      detailedAnswers += 'No tiene equipo disponible en casa. ';
    }

    // Respuesta a tonificación muscular o fuerza
    detailedAnswers += `Quiere trabajar en: ${answers[7]}. `;

    // Respuesta a días disponibles para hacer ejercicio
    detailedAnswers += `Puede dedicar: ${answers[8]}. `;

    // Respuesta a objetivo principal
    detailedAnswers += `Su objetivo principal es: ${answers[9]}. `;

    // Respuesta a tipo de entrenamiento
    detailedAnswers += `Prefiere el tipo de entrenamiento: ${answers[10]}. `;

    // Crear el prompt
    const prompt = `Genera una rutina de ejercicios personalizada basada en estas respuestas: ${detailedAnswers} Incluye ejercicios específicos, series, repeticiones, descansos y cualquier recomendación especial.`;

    console.log('Prompt enviado:', prompt);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);

      const text = await result.response.text();
      onSubmit(text); 
    } catch (error) {
      console.error('Error:', error);
      onSubmit("Ocurrió un error al generar tu rutina. Por favor intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#AFEEEE',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        margin: '20px auto',
      }}
    >
      {isSubmitting ? (
        <div>
          <p>Generando tu rutina personalizada...</p>
        </div>
      ) : currentQuestionIndex < questions.length ? (
        <QuestionCard
          question={questions[currentQuestionIndex].question}
          options={questions[currentQuestionIndex].options}
          onAnswer={handleAnswer}
        />
      ) : (
        <div style={{ color: 'black' }}>
         
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
