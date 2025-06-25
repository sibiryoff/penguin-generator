export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Only POST allowed" });
    return;
  }
  const { prompt } = req.body;

  const apiResponse = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + process.env.OPENAI_API_KEY, // Ключ хранится в Vercel ENV
    },
    body: JSON.stringify({
      prompt,
      n: 1,
      size: "256x256",
      response_format: "url",
    }),
  });
  const data = await apiResponse.json();
  res.status(200).json(data);
}
