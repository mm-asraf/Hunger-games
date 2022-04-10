import React, { useEffect, useState } from "react";
import HungerList from "./HungerList";
import "../App.css";

const Hunger = () => {
  const [data, setData] = useState([]);
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [payment, setPayment] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://my-json-server.typicode.com/mm-asraf/hunger-games/hunger`
      );
      const getData = await res.json();
      setData(getData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const sortbylow_high = data.sort((a, b) => {
      if (price === "lower_to_high") {
        return a.price - b.price;
      } else if (price === "upper_to_low") {
        return b.price - a.price;
      } else {
        return 0;
      }
    });

    setPrice(sortbylow_high);
  }, [price]);

  useEffect(() => {
    const result = data
      .filter((d) => {
        if (rating === 4) {
          return d.rating >= rating;
        } else if (rating === 3) {
          return d.rating >= rating && d.rating <= 4;
        } else if (rating === 2) {
          return Math.floor(d.rating) >= rating && d.rating <= 3;
        } else {
          return 0;
        }
      })
      .sort((a, b) => b.rating - a.rating)
      .filter((d) => {
        if (payment === "all") {
          return true;
        }
        return d.payment_method[payment];
      });
    setData(result);
  }, [rating, payment]);

  const handlePayment = (obj) => {
    let ans = [];
    for (let key in obj) {
      if (obj[key] === true) {
        ans.push(key);
      }
    }
    return ans.join(",");
  };

  return (
    <>
      <button className="btn" onClick={() => setRating(1)}>
        1 star
      </button>
      <button className="btn" onClick={() => setRating(2)}>
        2 star
      </button>
      <button className="btn" onClick={() => setRating(3)}>
        3 star
      </button>
      <button className="btn" onClick={() => setRating(4)}>
        4 star
      </button>
      <button className="btn" onClick={() => setPrice("lower_to_high")}>
        low to high
      </button>
      <button className="btn" onClick={() => setPrice("upper_to_low")}>
        hight to low
      </button>
      <button className="btn" onClick={() => setPayment("cash")}>
        Cash
      </button>
      <button className="btn" onClick={() => setPayment("card")}>
        card
      </button>
      <button className="btn" onClick={() => setPayment("all")}>
        All
      </button>
      <div>
        <button onClick={() => setPage()} disabled={page === 1}>
          prev
        </button>
        <button onClick={() => setPage()}>next</button>
      </div>

      <div className="cards">
        {data.map((item, index) => {
          return (
            <HungerList item={item} key={index} handlePayment={handlePayment} />
          );
        })}
      </div>
    </>
  );
};

export default Hunger;
