import React, { useState, useContext } from "react";
import { WatchListContext } from "../context/watchListContext";
import coinGecko from "../apis/coinGecko";

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
        className="btn btn-primary dropdown-toggle"
        type="button"
      >
        Add Coin
      </button>
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
