import React, { useState, useEffect } from "react";
import "./App.css";
import PythPrice from "./PythPrice";
import DiaPrice from "./DiaPrice";
import { NumericFormat } from "react-number-format";
import logoSVG from "./solana-sol-logo.svg";

const App: React.FC = () => {
  const [pythPrice, setPythPrice] = useState<number | null>(null);
  const [diaPrice, setDiaPrice] = useState<number | null>(null);
  const [averagePrice, setAveragePrice] = useState<number | null>(null);

  useEffect(() => {
    if (pythPrice !== null && diaPrice !== null) {
      const average = (pythPrice + diaPrice) / 200000; // Divide by 200000 to adjust for display in millions
      setAveragePrice(average);
    }
  }, [pythPrice, diaPrice]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Oracle Aggregator</h1>
      </header>
      <main>
        <div className="card">
          <div className="flexbox">
            <img
              className="logosvg"
              src={logoSVG}
              alt="Solana Logo"
            />
            <h2>SOL/USD Average: </h2>
            <div className="wrapper">
              {averagePrice !== null ? (
                <p>
                  <NumericFormat
                    value={averagePrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={0}
                  />
                </p>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
        <div>
          <PythPrice callback={setPythPrice} />
          <DiaPrice callback={setDiaPrice} />
        </div>
      </main>
    </div>
  );
};

export default App;
