import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI("AIzaSyBU7_VsTlpFsaMahaynoZwsgKQJRKzjoNI"); 


export const getRoutineFromAPI = async (prompt) => {
  try {
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    
    const result = await model.generateContent(prompt);

    
    const response = await result.response;
    const text = await response.text();

    
    return text.trim();
  } catch (error) {
    console.error("Error al generar la rutina:", error);
    throw new Error("Error al generar la rutina.");
  }
};
