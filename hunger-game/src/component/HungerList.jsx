import React from "react";
import "../App.css";
import Hunger from "./Hunger";

const HungerList = ({ item, handlePayment }) => {
  return (
    <>
      <div className="container">
        <div className="image">
          <img src={item.img} alt="" />
        </div>
        <div className="name_stuff">
          <h2>{item.name}</h2>
          <h4>{item.categories}</h4>
          <p>{item.time_for_prep}</p>
          <p>{item.price}</p>
          <p>
            Accepts {handlePayment(item.payment_method)} online payments only
          </p>
        </div>
        <div className="rate_stuff">
          <h2>{item.rating}</h2>
          <p>{item.total_votes}</p>
          <p>{item.reviews}</p>
        </div>
      </div>
    </>
  );
};

export default HungerList;
