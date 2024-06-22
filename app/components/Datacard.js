"use client";

import { useEffect, useState } from "react";

function DataCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/mongo");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div key={item._id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{item.name}</h2>
            <p className="text-gray-700 mb-2">Price: {item.price}</p>
            <p className="text-gray-700 mb-2">Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataCard;
