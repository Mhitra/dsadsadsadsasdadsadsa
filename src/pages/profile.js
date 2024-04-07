import React, { useState } from "react";
import { useRouter } from "next/router";

function AddCooperative() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ name, image, address, contact });
    router.push("/profile");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="title">Kooperatif Ekle</h2>
        <div className="input-group">
          <label htmlFor="name" className="label ">Kooperatif İsmi</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="input text-black"  />
        </div>
        <div className="input-group">
          <label htmlFor="image" className="label">Kooperatif Resmi URL</label>
          <input id="image" type="text" value={image} onChange={(e) => setImage(e.target.value)} required className="input text-black" />
        </div>
        <div className="input-group">
          <label htmlFor="address" className="label">Adres</label>
          <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="input text-black" />
        </div>
        <div className="input-group">
          <label htmlFor="contact" className="label">İletişim Bilgileri</label>
          <input id="contact" type="text" value={contact} onChange={(e) => setContact(e.target.value)} required className="input text-black" />
        </div>
        <button type="submit" className="button">Kaydet</button>
      </form>
      <style jsx>{`
        .container {
          max-width: 500px;
          margin: auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .title {
          font-size: 24px;
          margin-bottom: 20px;
          color: #333;
          text-align: center;
        }

        .form {
          display: flex;
          flex-direction: column;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .label {
          font-size: 16px;
          color: #666;
          margin-bottom: 5px;
          display: block;
        }

        .input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
          width: 100%;
        }

        .button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
          width: 100%;
        }

        .button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}

export default AddCooperative;
