// import dotenv from "dotenv";
// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// dotenv.config();

// console.log("START");

// const model = new ChatGoogleGenerativeAI({
//   model: "gemini-2.5-flash-lite",
//   apiKey: process.env.GEMINI_API_KEY,
// });


// console.log(process.env.GEMINI_API_KEY);
// console.log("MODEL CREATED");

// const timeoutPromise = new Promise((_, reject) =>
//   setTimeout(() => reject(new Error("TIMEOUT AFTER 30 SEC")), 30000)
// );

// try {
//   const response = await Promise.race([
//     model.invoke("Hello"),
//     timeoutPromise
//   ]);

//   console.log("RESPONSE RECEIVED");
//   console.log(response.content);

// } catch (err) {
//   console.log("ERROR:");
//   console.log(err);
// }
