import React, { useState, useEffect } from "react";
// import { NumericFormat } from "react-number-format";

interface DiaPriceProps {
  callback: (price: number) => void;
}

const DiaPrice: React.FC<DiaPriceProps> = ({ callback }) => {
  const [price, setPrice] = useState<number | null>(null);
  const diaApiUrl = `https://api.diadata.org/v1/quotation/SOL`;

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(diaApiUrl);

        if (!response.ok) {
          const errorMessage = `Error fetching price: ${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        }

        const data = await response.json();

        if (typeof data === "object" && data.hasOwnProperty("Price")) {
          const latestPrice = parseFloat(data.Price) * 100000000; // Convert to cents or match Pyth's scale
          setPrice(latestPrice);
          callback(latestPrice);
        } else {
          console.error("Invalid price data received:", data);
        }
      } catch (error: any) {
        console.error("Fetch error:", error.message);
      }
    };

    fetchPrice();

    const interval = setInterval(fetchPrice, 1000);

    return () => clearInterval(interval);
  }, [diaApiUrl, callback]);

  return (
    <div>
      {/* <h2>DIA</h2>
      {price !== null ? (
        <p>
          {" "}
          SOL/USD Price:{" "}
          <NumericFormat
            displayType="text"
            prefix={"$"}
            value={price}
            thousandSeparator=","
            decimalScale={0}
            fixedDecimalScale
          />
        </p>
      ) : (
        <p>Loading...</p>
      )} */}
    </div>
  );
};

export default DiaPrice;
