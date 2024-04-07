import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { city } from "../utils";


function AdminPanel() {
    const [cooperatives, setCooperatives] = useState([]);
    const [users, setUsers] = useState([]);
    const [showAddCooperativeModal, setShowAddCooperativeModal] = useState(false);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const router = useRouter();
    const [şehirler] = useState(city);
    const [newCooperative, setNewCooperative] = useState({
        name: "",
        city: "",
        address: "",
        contact: ""
    });
    const [newUser, setNewUser] = useState({
        name: "",
        email: ""
    });
console.log(cooperatives)
    useEffect(() => {
        fetch('/api/cooperatives')
            .then(response => response.json())
            .then(data => setCooperatives(data));

        fetch('/api/user')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    const deleteUser = (userId) => {
        fetch(`/api/user?id=${userId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setUsers(users.filter(user => user.id !== userId));
            });
    };

    const deleteCooperative = (cooperativeId) => {
        fetch(`/api/cooperatives/${cooperativeId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setCooperatives(cooperatives.filter(cooperative => cooperative.id !== cooperativeId));
            });
    };

    const handleAddCooperative = () => {
        setShowAddCooperativeModal(true);
    };

    const handleAddUser = () => {
        setShowAddUserModal(true);
    };

    const handleCooperativeInputChange = (e) => {
        const { name, value } = e.target;
        setNewCooperative({ ...newCooperative, [name]: value });
    };

    const handleUserInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const usersave = (event) => {
        //post 
        event.preventDefault();
        fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
            .then(response => response.json())
            .then(data => {
                setUsers([...users, data]);
                setShowAddUserModal(false);
                setNewUser({
                    name: "",
                    email: ""
                });
            })
            .catch(error => console.error('Error adding user:', error));
    }

    const addCooperative = () => {
        fetch('/api/cooperatives', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCooperative),
        })
            .then(response => response.json())
            .then(data => {
                setCooperatives([...cooperatives, data]);
                setShowAddCooperativeModal(false);
                setNewCooperative({
                    name: "",
                    city: "",
                    address: "",
                    contact: ""
                });
            })
            .catch(error => console.error('Error adding cooperative:', error));
    };

    const addUser = () => {

        fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
            .then(response => response.json())
            .then(data => {
                setUsers([...users, data]);
                setShowAddUserModal(false);
                setNewUser({
                    name: "",
                    email: ""
                });
            })
            .catch(error => console.error('Error adding user:', error));
    };
    const handleCooperativeInputChangecity = (event) => {
        setNewCooperative({
          ...newCooperative,
          city: event.target.value
        });
      };
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-700">Admin Panel</h1>
            <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Kooperatifler</h2>
                {cooperatives.length > 0 && cooperatives.map((cooperative) => (
                    <div key={cooperative.id} className="bg-white shadow-lg rounded-lg overflow-hidden mb-4">
                        <div className="p-4">
                            <p className="text-lg font-semibold text-gray-700">{cooperative.name}</p>
                            <p className="text-sm text-gray-600">{cooperative.city}</p>
                        </div>
                        <div className="bg-gray-100 py-4 px-6 flex justify-between items-center">
                            <button onClick={() => deleteCooperative(cooperative.id)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out">Sil</button>
                        </div>
                    </div>
                ))}
                <div className="flex justify-center mt-4">
                    <button onClick={handleAddCooperative} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out">Yeni Kooperatif Ekle</button>
                </div>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Kullanıcılar</h2>
                {users.map((user) => (
                    <div key={user.id} className="bg-white shadow-lg rounded-lg overflow-hidden mb-4">
                        <div className="p-4">
                            <p className="text-lg font-semibold text-gray-700">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        <div className="bg-gray-100 py-4 px-6 flex justify-between items-center">
                            <button onClick={() => deleteUser(user.id)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out">Sil</button>
                        </div>
                    </div>
                ))}
                <div className="flex justify-center mt-4">
                    <button onClick={handleAddUser} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out">Yeni Kullanıcı Ekle</button>
                </div>
            </div>
            {showAddCooperativeModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                    <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
                    <div className="relative bg-white rounded-lg w-1/2 p-8">
                        <h2 className="text-2xl font-semibold mb-4">Yeni Kooperatif Ekle</h2>
                        <form onSubmit={addCooperative}>
                            <div className="mb-4">
                                <label htmlFor="cooperativeName" className="block text-gray-700">Kooperatif Adı</label>
                                <input type="text" id="cooperativeName" name="name" value={newCooperative.name} onChange={handleCooperativeInputChange} className="text-gray-700 border-2 border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-green-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="cooperativeCity" className="block text-gray-700">Şehir</label>
                                <select className="border p-2 text-black" value={newCooperative.city} onChange={handleCooperativeInputChangecity}>
                                    <option value="">Şehir Seçin</option>
                                    {Object.keys(şehirler).map((şehir, index) => (
                                        <option key={index} value={şehir}>
                                            {şehir}
                                        </option>
                                    ))}
                                </select>

                            </div>
                            <div className="mb-4">
                                <label htmlFor="cooperativeAddress" className="block text-gray-700">Adres</label>
                                <input type="text" id="cooperativeAddress" name="address" value={newCooperative.address} onChange={handleCooperativeInputChange} className="text-gray-700 border-2 border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-green-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="cooperativeContact" className="block text-gray-700">İletişim Bilgileri</label>
                                <input type="text" id="cooperativeContact" name="contact" value={newCooperative.contact} onChange={handleCooperativeInputChange} className="text-gray-700 border-2 border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-green-500" />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={() => setShowAddCooperativeModal(false)} className="mr-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out">İptal</button>
                                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out">Kaydet</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showAddUserModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                    <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
                    <div className="relative bg-white rounded-lg w-1/2 p-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Yeni Kullanıcı Ekle</h2>
                        <form onSubmit={addUser}>
                            <div className="mb-4">
                                <label htmlFor="userName" className="block text-gray-700">Kullanıcı Adı</label>
                                <input type="text" id="userName" name="name" value={newUser.name} onChange={handleUserInputChange} className="text-gray-700 border-2 border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-green-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="userEmail" className="block text-gray-700">Email</label>
                                <input type="email" id="userEmail" name="email" value={newUser.email} onChange={handleUserInputChange} className="text-gray-700 border-2 border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-green-500" />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={() => setShowAddUserModal(false)} className="mr-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out">İptal</button>
                                <button type="submit"
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out">Kaydet</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminPanel;
