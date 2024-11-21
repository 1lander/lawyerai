import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function translateToLegalese(text: string): Promise<{ response: string, isError: boolean }> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert legal translator that converts casual language into formal legal terminology while maintaining the original meaning."
        },
        {
          role: "user", 
          content: text
        }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
    });

    return { response: completion.choices[0].message.content || text, isError: false };
  } catch (error) {
    console.error('Error translating to legal terminology:', error);
    return { response: "Error translating to legal terminology", isError: true };
  }
}
