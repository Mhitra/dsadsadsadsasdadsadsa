const cities = ["Istanbul", "Ankara", "Izmir", "Antalya", "Bursa"];
const names = ["Tarim Kooperatifi", "Ziraat Kooperatifi", "Çiftçi Kooperatifi", "Üretici Kooperatifi", "Tarla Kooperatifi"];
const addresses = ["Merkez Mah. No:1", "Cumhuriyet Cad. No:2", "Atatürk Bulv. No:3", "İnönü Sok. No:4", "Gazi Mah. No:5"];
const contacts = ["+90 212 123 45 67", "+90 312 765 43 21", "+90 232 234 56 78", "+90 242 987 65 43", "+90 224 876 54 32"];
const image = "https://iatkv.tmgrup.com.tr/7f562d/616/321/9/0/642/330?u=https%3A%2F%2Fitkv.tmgrup.com.tr%2F2021%2F10%2F04%2Ftarim-kredi-kooperatifi-market-kimin-tarim-kredi-kooperatif-market-ucuz-mu-fiyatlari-nasil-hangi-urunler-satiliyor-1633335418196.jpg";

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function createRandomCooperative() {
  return {
    name: getRandomElement(names),
    city: getRandomElement(cities),
    address: getRandomElement(addresses),
    contact: getRandomElement(contacts),
    image: image,
  };
}

async function loadRandomCooperatives(count) {
  for (let i = 0; i < count; i++) {
    const newCooperative = createRandomCooperative();
    await fetch('http://localhost:3000/api/cooperatives', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCooperative),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
  }
  console.log(`${count} random cooperatives loaded successfully.`);
}

// Kullanım: 10 rastgele kooperatif eklemek için
loadRandomCooperatives(10);
