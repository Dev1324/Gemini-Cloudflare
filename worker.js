import { GoogleGenerativeAI } from "google/generative-ai";

let API_KEY = "AIzaSyDgfjFAKlr8LdyBbM-FiWTkNxYBRpDmlcM";

export default {
  async fetch(request, env) {
    try {
      const key = env.key || API_KEY;
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = "Explain how AI works";
      const result = await model.generateContent(prompt);

      if (result && result.response) {
        return new Response(result.response.text, {
          status: 200,
          headers: { "Content-Type": "text/plain" },
        });
      } else {
        return new Response("No response received from the API.", { status: 500 });
      }
    } catch (error) {
      console.error("Error generating text:", error);
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  },
};
