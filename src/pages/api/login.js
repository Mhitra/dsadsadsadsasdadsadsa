import { QuickDB } from 'quick.db';
const db = new QuickDB();

 

function handler(req, res) {
  if (req.method === 'POST') {
    const users = db.get('users') || [];
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}


export default handler;