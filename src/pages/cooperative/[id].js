import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function Cooperative() {
    const router = useRouter();
    const { id } = router.query;
    const [cooperative, setCooperative] = useState(null);

    let name = id?.split("-").slice(1).join(" ");
    let city = id?.split("-")[0];

    useEffect(() => {
        if (!id) return;
        setCooperative({
            name,
            city,
            image: "https://iatkv.tmgrup.com.tr/7f562d/616/321/9/0/642/330?u=https%3A%2F%2Fitkv.tmgrup.com.tr%2F2021%2F10%2F04%2Ftarim-kredi-kooperatifi-market-kimin-tarim-kredi-kooperatif-market-ucuz-mu-fiyatlari-nasil-hangi-urunler-satiliyor-1633335418196.jpg",
            address: "Örnek Adres",
            phone: "123-456-7890",
            email: "example@example.com",
            reviews: ["Harika bir kooperatif!", "Çok yardımcı oldular."],
            prices: { wheat: 10, barley: 20, sunflower: 30 },
        });
    }, [id]);

    if (!cooperative) return <div>Loading...</div>;

    return (
        <div className="bg-cover" style={{ backgroundImage: "url('/images.jpg')" }}>
            <Link href="/">
                <button className="absolute top-4 left-4 px-4 py-2 rounded bg-gray-200 shadow-md text-gray-700">Geri</button>
            </Link>
            <div className="container mx-auto py-8 relative">
                <div className="bg-white rounded p-8 shadow-lg">
                    <h1 className="text-3xl font-bold mb-4 text-black">{name}</h1>
                    <p className="text-lg text-gray-600 mb-6">{city}</p>
                    <img src={cooperative.image} alt={name} className="w-full rounded mb-6" />
                    <div className="flex justify-between mb-6">
                        <div className="w-1/3 text-left">
                            <h2 className="text-lg font-semibold mb-2 text-black">Adres:</h2>
                            <p className="text-gray-700">{cooperative.address}</p>
                        </div>
                        <div className="w-1/3 text-left">
                            <h2 className="text-lg font-semibold mb-2 text-black">Telefon:</h2>
                            <p className="text-gray-700">{cooperative.phone}</p>
                        </div>
                        <div className="w-1/3 text-left">
                            <h2 className="text-lg font-semibold mb-2 text-black">Email:</h2>
                            <p className="text-gray-700">{cooperative.email}</p>
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold mb-4 text-black">Kullanıcı Yorumları:</h2>
                    {cooperative.reviews.map((review, index) => (
                        <p key={index} className="text-gray-700 mb-2">{review}</p>
                    ))}
                    <h2 className="text-xl font-semibold mb-4 text-black">Ortalama Ürün Fiyatları:</h2>
                    <p className="text-gray-700 mb-2">Buğday: {cooperative.prices.wheat}</p>
                    <p className="text-gray-700 mb-2">Arpa: {cooperative.prices.barley}</p>
                    <p className="text-gray-700 mb-2">Ayçiçeği: {cooperative.prices.sunflower}</p>
                </div>
            </div>
        </div>
    );
}

export default Cooperative;
