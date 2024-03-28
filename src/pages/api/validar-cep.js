import cepPromise from 'cep-promise';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { cep } = req.body;
  if (cep === '78890000' || cep === '78890-000') {
    return res.status(200).json({
      success: true,
      result: {
        cep: '75555000',
        state: 'MT',
        city: 'Sorriso',
        neighborhood: '',
        street: '',
      },
    })
  }

  try {
    const result = await cepPromise(cep);
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}
