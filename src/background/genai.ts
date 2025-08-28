// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

// export async function myAiRes(prompt: string) {
//   const instruction = `You are an Text Autocomplete helper, suggest text suggestions when person is trying to write email, search a query on google, trying to fill a form, or tryint to ask qs to any ai, Return a response in JAVASCRIPT object containg 5 responses(autocomplete suggestions) so that i can directrly map it`;
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: [
//       { text: instruction + " \nUser" + prompt }
//     ]
//   })
//   console.log(response);
//   return response;
// }

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function myAiRes(prompt: string) {
 
const instruction = `
You are a Text Autocomplete helper. 
Return **valid JSON only** which i can direclt parse maybe dont give the json writtten before, in this exact format:
{
  "suggestion1": "...",
  "suggestion2": "...",
  "suggestion3": "...",
  "suggestion4": "...",
  "suggestion5": "..."
}
Do not include any other text.
User prompt: ${prompt}
`;


  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ text: instruction }]
  });

  let finalRes;
  if(response.text) {
    finalRes = response.text.replace(/^```json\s*/, '').replace(/```$/, '');
    finalRes = JSON.parse(finalRes);
  }

  return finalRes;
}