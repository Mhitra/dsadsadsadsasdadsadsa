import { QuickDB } from 'quick.db';
const db = new QuickDB();

export default async function handler(req, res) {
  const { method, body } = req;
  
  switch (method) {
    case 'GET':
      try {
        const cooperatives = await db.get('cooperatives') || [];
        res.status(200).json(cooperatives);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    case 'POST':
      try {
        const { name, city, address, contact } = body;
        const image = "https://iatkv.tmgrup.com.tr/7f562d/616/321/9/0/642/330?u=https%3A%2F%2Fitkv.tmgrup.com.tr%2F2021%2F10%2F04%2Ftarim-kredi-kooperatifi-market-kimin-tarim-kredi-kooperatif-market-ucuz-mu-fiyatlari-nasil-hangi-urunler-satiliyor-1633335418196.jpg";
        const cooperatives = await db.get('cooperatives') || [];
        const newCooperative = { id: cooperatives.length + 1, name, city, address, contact, image };
        await db.push('cooperatives', newCooperative);
        res.status(201).json(newCooperative);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = body;
        const cooperatives = await db.get('cooperatives') || [];
        const updatedCooperatives = cooperatives.filter(coop => coop.id !== id);
        await db.set('cooperatives', updatedCooperatives);
        res.status(200).json({ message: 'Deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
