import { QuickDB } from 'quick.db';
const db = new QuickDB();

export default async function handler(req, res) {
    const { method } = req;
    let users;
    let id;
    console.log('req.body', req.body);
    switch (method) {
        case 'GET':
            users = await db.get('users') || [];
            console.log('users', users);
            res.status(200).json(users);
            break;
        case 'POST':
            const { name, email } = req.body;
            const newUserId = await generateUserId();
            const newUser = { id: newUserId, name: name, email: email };
            await db.push('users', newUser);
            let data = await db.get('users');
            console.log('data', data);
            res.status(201).json(newUser);
            break;
        case 'DELETE':
            let id = Number(req.query.id);
            console.log('id', id);
            if (id == NaN) { id = null; }
            users = await db.get('users') || [];
            console.log('users', users);
            // const updatedUsers = users.filter(user => user.id !== id);
            //id si null olanları silmek için
            const updatedUsers = users.filter(user => user.id !== id && user.id !== null);
            console.log('updatedUsers', updatedUsers);
            await db.set('users', updatedUsers);
            res.status(200).json({ message: 'Deleted successfully' });
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

async function generateUserId() {
    let data = await db.get('users') || [];
    let id = data.length > 0 ? data[data.length - 1].id + 1 : 1;
    return id;
}
