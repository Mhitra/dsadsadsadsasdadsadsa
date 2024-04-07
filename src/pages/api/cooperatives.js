import { QuickDB } from 'quick.db';
const db = new QuickDB();

export default async function handler(req, res) {
  const { method } = req;
  let cooperatives;
  switch (method) {
    case 'GET':
      cooperatives = await db.get('cooperatives') || [];
      res.status(200).json(cooperatives);
      break;
    case 'POST':
      const { name, city, address, contact } = req.body;
      let image = "https://iatkv.tmgrup.com.tr/7f562d/616/321/9/0/642/330?u=https%3A%2F%2Fitkv.tmgrup.com.tr%2F2021%2F10%2F04%2Ftarim-kredi-kooperatifi-market-kimin-tarim-kredi-kooperatif-market-ucuz-mu-fiyatlari-nasil-hangi-urunler-satiliyor-1633335418196.jpg"
      const newCooperative = { name, city, address, contact, image };
      db.push('cooperatives', newCooperative);
      res.status(201).json(newCooperative);
      break;
    case 'DELETE':
      const { id } = req.body;
      cooperatives = await db.get('cooperatives') || [];
      const updatedCooperatives = cooperatives.filter(coop => coop.id !== id);
      await db.set('cooperatives', []);
      res.status(200).json({ message: 'Deleted successfully' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}