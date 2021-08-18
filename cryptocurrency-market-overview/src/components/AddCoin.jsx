import React, { useState, useContext } from "react";
import { WatchListContext } from "../context/watchListContext";
import coinGecko from "../apis/coinGecko";
import './AddCoin.css';

const AddCoin = () => {
  const [isActive, setIsActive] = useState(false);
  const { addCoin } = useContext(WatchListContext);
  
  const availableCoins = [
    "bitcoin",
    "ethereum",
    "ripple",
    "tether",
    "bitcoin-cash",
    "litecoin",
    "eos",
    "okb",
    "tezos",
    "cardano",
  ];

  const coins = []

  const fetchData = async () => {
    const response = await coinGecko.get("/coins/markets/", {
      params: {
        vs_currency: "isd",
        ids: availableCoins.join(","),
      },
    });
    console.log(response.data);
  };

  const handleClick = (coin) => {
    addCoin(coin);
    fetchData();
    setIsActive(false);
  };

  return (
    <div className="dropdown">
      <button
        onClick={() => setIsActive(!isActive)}
        className="btn"
        type="button"
      >
        Add Coin
      </button>
      <h3 className="center__heading">Currency(INR)</h3>
      <h3 className="right__heading"> Down by %</h3>
      <div className={isActive ? "dropdown-menu show" : "dropdown-menu"}>
        {availableCoins.map((el) => {
          return (
            <a
              onClick={() => handleClick(el)}
              href="#"
              className="dropdown-item"
            >
              {el}
            </a>
          );
        })}
      </div>
    </div>
    
  );
};

export default AddCoin;
