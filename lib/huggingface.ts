const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

export async function callHuggingFaceModel(payload: object): Promise<any> {
  if (!HUGGINGFACE_API_TOKEN) {
    throw new Error('Hugging Face API token not set');
  }

  const response = await fetch('https://api-inference.huggingface.co/models/your-model-name', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Hugging Face API error: ${response.statusText}`);
  }

  return response.json();
}
