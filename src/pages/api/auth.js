import { QuickDB } from 'quick.db';
const db = new QuickDB();

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, action } = req.body;

    if (action === 'login') {
      const users = await db.get('users') || [];
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        res.status(200).json({ success: true , user: user});
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } else if (action === 'register') {
      let id = await generateUserId();
      let users = await db.get('users');
      if (!Array.isArray(users)) {
        users = [];
      }
      const existingUser = users.find(user => user.email === email);

      if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
      } else {
        const newUser = { email, password, id };
        users.push(newUser);
        await db.set('users', users);
        res.status(200).json({ success: true, message: 'User registered successfully' , user: newUser});
      }
    } else {
      res.status(400).json({ message: 'Invalid action' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

async function generateUserId() {
  let data = await db.get('users') || [];
  let id = data.length > 0 ? data[data.length - 1].id + 1 : 1;
  return id;
}

export default handler;
