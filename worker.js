import { AI } from "google/generative-ai";

const API_KEY = "AIzaSyDgfjFAKlr8LdyBbM-FiWTkNxYBRpDmlcM";

export default {
  async fetch(request) {
    try {
      const ai = new AI(API_KEY);
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = "Hi, How are you?";
      const result = await model.generateContent(prompt);

      // Ensure we have a valid response
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
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};
