
import { GoogleGenAI, Type } from "@google/genai";
import type { CropData } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const schema = {
  type: Type.OBJECT,
  properties: {
    pests: {
      type: Type.ARRAY,
      description: "Lista de pragas comuns que afetam a cultura.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Nome popular da praga." },
          description: { type: Type.STRING, description: "Breve descrição da praga e os danos que causa." },
          control: { type: Type.STRING, description: "Métodos de controle (químico, biológico, cultural)." },
        },
        required: ["name", "description", "control"],
      },
    },
    pesticides: {
      type: Type.ARRAY,
      description: "Lista de pesticidas (venenos) recomendados para a cultura.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Nome comercial do produto." },
          active_ingredient: { type: Type.STRING, description: "Princípio ativo do produto." },
          recommendation: { type: Type.STRING, description: "Recomendação de uso, pragas-alvo e dosagem." },
        },
        required: ["name", "active_ingredient", "recommendation"],
      },
    },
    products: {
      type: Type.ARRAY,
      description: "Lista de outros produtos agrícolas relevantes (fertilizantes, adjuvantes, etc.).",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Nome do produto ou tipo." },
          type: { type: Type.STRING, description: "Tipo de produto (ex: Fertilizante NPK, Adubo Orgânico)." },
          usage: { type: Type.STRING, description: "Modo e época de aplicação." },
        },
        required: ["name", "type", "usage"],
      },
    },
  },
  required: ["pests", "pesticides", "products"],
};


export const fetchCropData = async (cropName: string): Promise<CropData> => {
  const prompt = `Aja como um agrônomo especialista. Forneça informações detalhadas sobre a cultura de "${cropName}". Retorne uma lista de 3 a 5 itens para cada categoria: pragas comuns, venenos (pesticidas) recomendados e outros produtos agrícolas importantes (como fertilizantes). As informações devem ser práticas e úteis para um profissional da área. Siga estritamente o schema JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
      throw new Error("A resposta da API está vazia.");
    }

    const parsedData = JSON.parse(jsonText);
    return parsedData as CropData;

  } catch (error) {
    console.error(`Erro ao buscar dados para ${cropName}:`, error);
    throw new Error(`Não foi possível obter os dados da cultura ${cropName}.`);
  }
};
