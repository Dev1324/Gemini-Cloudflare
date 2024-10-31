import { AI } from "google/generative-ai";

let API_KEY = "AIzaSyDgfjFAKlr8LdyBbM-FiWTkNxYBRpDmlcM";

export default {
  async fetch(request, env) {
    try {
      const key = env.key || API_KEY;
      const ai = new AI(key);
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = "Hi, How are you?";
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
