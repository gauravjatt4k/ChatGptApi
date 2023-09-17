import "dotenv/config";
import OpenAI from "openai";
const mySecret = process.env['OPENAI_API_KEY']
const openai = new OpenAI({ apiKey: mySecret });
// code is ai
async function main(userobj) {
  try {
    console.log("\n 😜 ai is running....");
    const start = Date.now();

    if (!userobj.language) {
      userobj.language = "english";
    }
    const mytext =
      userobj.message + ` - I want answer in ${userobj.language} in ${userobj.language}`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: mytext }],
      model: "gpt-3.5-turbo",
    });

    // thi is code for checking ai timing of responses
    console.log("\n 😍 ai is stopped.");
    const end = Date.now() - start;
    const sec = Math.floor((end / 1000) % 60); // milliseconds converted to seconds hello
    console.log(`\n 🕑 ai run in ${sec}s`);

    const message = {
      text: completion.choices[0].message.content,
      timeing: `${sec}s`,
    };

    return message;
  } catch (error) {
    console.log("\n 😢 error :", error);
  }
}

export default main;
