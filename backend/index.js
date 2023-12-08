import OpenAI from "openai";
import dotenv from 'dotenv'

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.apiKey, // defaults to process.env["OPENAI_API_KEY"]
});
  
async function main() {
    const stream = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: 'Tell me about london' }],
      });
      console.log(stream)
      console.log(stream.choices[0])
}
main();
console.log(process.env.apiKey);
