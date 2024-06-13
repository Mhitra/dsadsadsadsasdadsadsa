import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { city } from "../utils";

export default function Home() {
  const [form, setForm] = useState({ email: "", password: "", address: "" });
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cooperatives, setCooperatives] = useState([]);
  const [filteredCooperatives, setFilteredCooperatives] = useState([]);
  const [şehirler] = useState(city);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/cooperatives")
      .then((response) => response.json())
      .then((data) => {
        setCooperatives(data);
        setFilteredCooperatives(data);
      });
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = cooperatives.filter((cooperative) =>
      cooperative.name.toLowerCase().includes(query) ||
      cooperative.city.toLowerCase().includes(query)
    );
    setFilteredCooperatives(filtered);
  };

  const handleSelect = (e) => {
    const city = e.target.value;
    setSelectedCity(city);

    const filtered = cooperatives.filter((cooperative) =>
      cooperative.city.toLowerCase().includes(city.toLowerCase())
    );
    setFilteredCooperatives(filtered);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, address } = event.target.elements;

    try {
      const payload = { email: email.value, password: password.value };
      const action = showRegister ? 'register' : 'login';
      if (showRegister) {
        payload.address = address.value;
      }

      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...payload, action }),
      });
      const data = await response.json();
      if (data.success) {
        setUser({ email: data.user.email });
        setIsAdmin(true); // Varsayılan olarak admin yapıyoruz
        setShowLogin(false);
        setShowRegister(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <main>
      <div style={{ backgroundImage: "url('/images.jpg')" }} className="min-h-screen bg-cover">
        <h1 className="text-4xl text-center py-10">Tarım-Co</h1>

        <div className="flex justify-center items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Ara..."
            className="border p-2 text-black"
            value={searchQuery}
            onChange={handleSearch}
          />

          <select className="border p-2 text-black" value={selectedCity} onChange={handleSelect}>
            <option>Şehir Seçin</option>
            {Object.keys(şehirler).map((şehir, index) => (
              <option key={index} value={şehir}>
                {şehir}
              </option>
            ))}
          </select>
        </div>

        {user ? (
          <div className="flex flex-col items-center gap-4 mb-10">
            <h2 className="text-2xl">Hoşgeldiniz, {user.email}</h2>
            <p>Adres: {user.address}</p>
            <button className="border p-2" onClick={handleLogout}>Çıkış Yap</button>
            {isAdmin && (
              <button className="border p-2 bg-blue-500 text-white" onClick={() => router.push('/admin')}>
                Admin Paneline Git
              </button>
            )}
          </div>
        ) : (
          <div className="flex justify-end gap-4 mb-10 pr-10">
            <button className="border p-2" onClick={handleLogin}>Giriş</button>
            <button className="border p-2" onClick={handleRegister}>Kaydol</button>
          </div>
        )}

        {showLogin && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowLogin(false)}>&times;</span>
              <form className="flex flex-col items-center gap-4 mb-10" onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="E-posta" className="border p-2 text-black" />
                <input type="password" name="password" placeholder="Şifre" className="border p-2 text-black" />
                <button className="border p-2 text-black">Giriş Yap</button>
              </form>
            </div>
          </div>
        )}

        {showRegister && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowRegister(false)}>&times;</span>
              <form className="flex flex-col items-center gap-4 mb-10" onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="E-posta" className="border p-2 text-black" />
                <input type="password" name="password" placeholder="Şifre" className="border p-2 text-black" />
                <input type="text" name="address" placeholder="Adres" className="border p-2 text-black" />
                <button className="border p-2">Kaydol</button>
              </form>
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-center">
          {filteredCooperatives?.map((cooperative, index) => (
            <div key={index} className="bg-white p-4 m-4 rounded-lg text-black flex-auto">
              <img src={cooperative.image} alt={cooperative.name} className="w-64 h-64 object-cover rounded-lg" />
              <h2>{cooperative.name}</h2>
              <p>{cooperative.city}</p>
              <p>{cooperative.address}</p>
              <p>{cooperative.email}</p>
              <Link href="/cooperative/[id]" as={`/cooperative/${cooperative.name}-${cooperative.city}`}>
                <button className="border p-2">Detaylar</button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .modal {
          display: block;
          position: fixed;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgb(0,0,0);
          background-color: rgba(0,0,0,0.4);
        }

        .modal-content {
          background-color: #fefefe;
          margin: 15% auto;
          padding: 20px;
          border: 1px solid #888;
          width: 80%;
          max-width: 500px;
          text-align: center;
        }

        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }

        .close:hover,
        .close:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }
      `}</style>
    </main>
  );
}
