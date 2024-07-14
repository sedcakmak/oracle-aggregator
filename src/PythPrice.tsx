import React, { useState, useEffect } from "react";

interface PythPriceProps {
  callback: (price: number) => void;
}

const PythPrice: React.FC<PythPriceProps> = ({ callback }) => {
  const [price, setPrice] = useState<number | null>(null);
  const priceFeedId =
    "0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d";

  useEffect(() => {
    const fetchPrice = async () => {
      const url = `https://hermes.pyth.network/v2/updates/price/latest?ids%5B%5D=${encodeURIComponent(
        priceFeedId
      )}&encoding=base64&parsed=true`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          const errorMessage = `Error fetching price: ${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        }

        const data = await response.json();
        if (Array.isArray(data.parsed) && data.parsed.length > 0) {
          const latestPrice = parseFloat(data.parsed[0].price.price);
          if (!isNaN(latestPrice)) {
            setPrice(latestPrice);
            callback(latestPrice);
          } else {
            console.error(
              "Invalid price data received:",
              data.parsed[0].price.price
            );
          }
        } else {
          console.error("Price data not found in response.");
        }
      } catch (error: any) {
        console.error("Fetch error:", error.message);
      }
    };

    fetchPrice();

    const interval = setInterval(fetchPrice, 1000);

    return () => clearInterval(interval);
  }, [priceFeedId, callback]);

  return (
    <div>
      {/* <h2>Pyth Network</h2>
      {price !== null ? (
        <p>SOL/USD Price: ${price.toFixed(3)}</p>
      ) : (
        <p>Loading...</p>
      )} */}
    </div>
  );
};

export default PythPrice;
