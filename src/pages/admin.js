import React, { useState, useEffect } from "react";
import { city } from "../utils";

function AdminPanel() {
  const [cooperatives, setCooperatives] = useState([]);
  const [users, setUsers] = useState([]);
  const [showAddCooperativeModal, setShowAddCooperativeModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
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

  useEffect(() => {
    fetchData('/api/cooperatives', setCooperatives);
    fetchData('/api/user', setUsers);
  }, []);

  const fetchData = async (endpoint, setState) => {
    const response = await fetch(endpoint);
    const data = await response.json();
    setState(data);
  };

  const handleDelete = async (endpoint, id, setState, state) => {
    await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
    setState(state.filter(item => item.id !== id));
  };

  const handleSubmit = async (event, endpoint, payload, setState, state, setModal, resetState) => {
    event.preventDefault();
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    setState([...state, data]);
    setModal(false);
    resetState();
  };

  const handleChange = (event, setState) => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (event, setState) => {
    setState(prevState => ({ ...prevState, city: event.target.value }));
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-700">Admin Panel</h1>

      <Section title="Kooperatifler" data={cooperatives} onDelete={(id) => handleDelete('/api/cooperatives', id, setCooperatives, cooperatives)} onAdd={() => setShowAddCooperativeModal(true)} />
      <Section title="Kullanıcılar" data={users} onDelete={(id) => handleDelete('/api/user', id, setUsers, users)} onAdd={() => setShowAddUserModal(true)} />

      {showAddCooperativeModal && (
        <Modal title="Yeni Kooperatif Ekle" onClose={() => setShowAddCooperativeModal(false)}>
          <form onSubmit={(e) => handleSubmit(e, '/api/cooperatives', newCooperative, setCooperatives, cooperatives, setShowAddCooperativeModal, () => setNewCooperative({ name: "", city: "", address: "", contact: "" }))}>
            <Input label="Kooperatif Adı" name="name" value={newCooperative.name} onChange={(e) => handleChange(e, setNewCooperative)} />
            <Select label="Şehir" name="city" value={newCooperative.city} options={Object.keys(şehirler)} onChange={(e) => handleSelectChange(e, setNewCooperative)} />
            <Input label="Adres" name="address" value={newCooperative.address} onChange={(e) => handleChange(e, setNewCooperative)} />
            <Input label="İletişim Bilgileri" name="contact" value={newCooperative.contact} onChange={(e) => handleChange(e, setNewCooperative)} />
            <ModalActions onCancel={() => setShowAddCooperativeModal(false)} />
          </form>
        </Modal>
      )}

      {showAddUserModal && (
        <Modal title="Yeni Kullanıcı Ekle" onClose={() => setShowAddUserModal(false)}>
          <form onSubmit={(e) => handleSubmit(e, '/api/user', newUser, setUsers, users, setShowAddUserModal, () => setNewUser({ name: "", email: "" }))}>
            <Input label="Kullanıcı Adı" name="name" value={newUser.name} onChange={(e) => handleChange(e, setNewUser)} />
            <Input label="Email" name="email" value={newUser.email} onChange={(e) => handleChange(e, setNewUser)} />
            <ModalActions onCancel={() => setShowAddUserModal(false)} />
          </form>
        </Modal>
      )}
    </div>
  );
}

const Section = ({ title, data, onDelete, onAdd }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-gray-700">{title}</h2>
    {data.map((item) => (
      <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden mb-4">
        <div className="p-4">
          <p className="text-lg font-semibold text-gray-700">{item.name || item.email}</p>
          <p className="text-sm text-gray-600">{item.city || item.email}</p>
        </div>
        <div className="bg-gray-100 py-4 px-6 flex justify-between items-center">
          <button onClick={() => onDelete(item.id)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out">Sil</button>
        </div>
      </div>
    ))}
    <div className="flex justify-center mt-4">
      <button onClick={onAdd} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out">Yeni Ekle</button>
    </div>
  </div>
);

const Modal = ({ title, onClose, children }) => (
  <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
    <div className="bg-gray-900 bg-opacity-50 absolute inset-0" onClick={onClose}></div>
    <div className="relative bg-white rounded-lg w-1/2 p-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">{title}</h2>
      {children}
    </div>
  </div>
);

const Input = ({ label, name, value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-gray-700">{label}</label>
    <input type="text" id={name} name={name} value={value} onChange={onChange} className="text-gray-700 border-2 border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-green-500" />
  </div>
);

const Select = ({ label, name, value, options, onChange }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-gray-700">{label}</label>
    <select id={name} name={name} value={value} onChange={onChange} className="border p-2 text-black w-full">
      <option value="">Şehir Seçin</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const ModalActions = ({ onCancel }) => (
  <div className="flex justify-end">
    <button type="button" onClick={onCancel} className="mr-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out">İptal</button>
    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out">Kaydet</button>
  </div>
);

export default AdminPanel;
