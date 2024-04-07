import {
  useState,
  useEffect

} from "react";
import Link from "next/link";
import { city } from "../utils";
export default function Home() {
  const [form, setForm] = useState({ name: "", surname: "", address: "", email: "" });
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [input, setInput] = useState("");
  const [cooperatives, setCooperatives] = useState();
  let [filteredCooperatives, setFilteredCooperatives] = useState(cooperatives);

  const [şehirler] = useState(city)
  useEffect(() => {
    fetch("/api/cooperatives")
      .then((response) => response.json())
      .then((data) => {
        setCooperatives(data);
        setFilteredCooperatives(data);
      });
  }
    , []);



  const handleChange = (e) => {
    if (e.target.name == "Şehir Seçin") {
      setSelectedCity("");
      return;
    }
    setSearchQuery(e.target.value);

  };
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = cooperatives.filter((cooperative) =>
      cooperative.name.toLowerCase().includes(query) ||
      cooperative.city.toLowerCase().includes(query)
    );
    setFilteredCooperatives(filtered);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, surname, address, email } = event.target.elements;
  
    try {
      if (showLogin) {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: name.value, surname: surname.value }),
        });
        const data = await response.json();
        console.log(data);
      } else if (showRegister) {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: name.value, surname: surname.value, address: address.value, email: email.value }),
        });
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };  const handleSelect = (e) => {
    const city = e.target.value;
    setSelectedCity(city);

    const filtered = cooperatives.filter((cooperative) =>
      cooperative.city.toLowerCase().includes(city.toLowerCase())
    );
    setFilteredCooperatives(filtered);
  }

  const handleLogin = () => {
    if (showLogin) {
      setShowLogin(false);
    } else {
      setShowLogin(true);
      setShowRegister(false);
    }
  };

  const handleRegister = () => {
    if (showRegister) {
      setShowRegister(false);
    } else {
      setShowRegister(true);
      setShowLogin(false);
    }
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

          <select className="border p-2 text-black" value={searchQuery} onChange={handleSelect}>
            <option>Şehir Seçin</option>
            {Object.keys(şehirler).map((şehir, index) => (
              <option key={index} value={şehir}>
                {şehir}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-4 mb-10 pr-10">
          <button className="border p-2" onClick={handleLogin}>Giriş</button>
          <button className="border p-2" onClick={handleRegister}>Kaydol</button>
        </div>

        {showLogin && (
          <form className="flex flex-col items-center gap-4 mb-10" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Ad" onChange={handleChange} className="border p-2 text-black" />
            <input type="text" name="surname" placeholder="Soyad" onChange={handleChange} className="border p-2 text-black" />
            <button className="border p-2">Giriş Yap</button>
          </form>
        )}

        {showRegister && (
          <form className="flex flex-col items-center gap-4 mb-10" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Ad" onChange={handleChange} className="border p-2 text-black" />
            <input type="text" name="surname" placeholder="Soyad" onChange={handleChange} className="border p-2 text-black" />
            <input type="text" name="address" placeholder="Adres" onChange={handleChange} className="border p-2 text-black" />
            <input type="email" name="email" placeholder="E-posta" onChange={handleChange} className="border p-2 text-black" />
            <button className="border p-2">Kaydol</button>


          </form>
        )}
        <div className="flex flex-wrap justify-center">
          {
            filteredCooperatives?.map((cooperative, index) => (
              <div key={index} className="bg-white p-4 m-4 rounded-lg text-black flex-auto">
                < img src={cooperative.image} alt={cooperative.name} className="w-64 h-64 object-cover rounded-lg" />
                <h2>{cooperative.name}</h2>
                <p>{cooperative.city}</p>
                <p>{cooperative.address}</p>
                <p>{cooperative.email}</p>
                <Link href="/cooperative/[id]" as={`/cooperative/${cooperative.name}-${cooperative.city}`}>
                  <button className="border p-2">Detaylar</button>
                </Link>

              </div>
            ))
          }
        </div>

      </div>
    </main>
  );
}

