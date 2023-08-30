import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartitems, add, remove, removeAll } from "../slicers/cartslice";

const initialState = {
  createdby: "",
  totalprice: 0,
  items: [
    {
      mid: 0,
      amount: 0,
      ticketprice: 0,
    },
  ],
};

export default function Cart() {
  let name = sessionStorage.getItem("name");
  let role = sessionStorage.getItem("role");
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let cart = useSelector(cartitems);
  let purchase = initialState;

  const totalPrice = cart.reduce(
    (a, b) => a + b.amount * Number(b.ticketprice),
    0
  );

  const removeItem = (item) => {
    dispatch(remove(item));
  };

  const addItem = (item) => {
    dispatch(add(item));
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    purchase.createdby = name;
    purchase.totalprice = totalPrice;
    purchase.items = [];
    cart.map((item) => purchase.items.push({mid: item.mid, amount: item.amount, ticketprice: item.ticketprice}))
    fetch("http://localhost:8080/purchases/summary/add", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(purchase),
    }).then(async (response) => {
      if(response.ok) {
        dispatch(removeAll());
        navigate("/summary/" + await response.text());
      }
    });
  };

  return (
    <div className="container px-4 px-lg-5">
      <div className="row gx-4 gx-lg-5 align-items-center my-5">
        {cart.length === 0 && (
          <div>
            <h3 style={{ color: "#FF0000" }}> Your Cart Is Empty</h3>
            <p style={{ color: "#492000" }}>Please, check available movies first.</p>
          </div>
        )}
        {cart.length !== 0 && (
          <div>
            <h3 style={{ color: "#492000" }}>Your Cart</h3>
            <br></br>
          </div>
        )}
        {cart.map((movie) => (
          <div key={movie.mid} className="row mb-3 text-center">
            <div className="col-6">
              <b>{movie.moviename}</b> ({movie.language}, {movie.moviedate}{" "}
              {movie.movietime})
            </div>
            <div className="col-3">
              <button
                onClick={() => removeItem(movie)}
                className="remove text-center btn"
                style={{
                  backgroundColor: "#C20605",
                  color: "white",
                  width: "50px",
                }}
              >
                <b>-</b>
              </button>{" "}
              <button
                onClick={() => addItem(movie)}
                className="add text-center btn width:100px"
                style={{
                  backgroundColor: "#006400",
                  color: "white",
                  width: "50px",
                }}
              >
                <b>+</b>
              </button>
            </div>
            <div className="col-3 text-right">
              {movie.amount} x ${movie.ticketprice}
            </div>
          </div>
        ))}
        {cart.length !== 0 && (
          <div>
            <hr></hr>
            <div className="row text-center">
              <div className="col-6"></div>
              <div className="col-3">
                <strong style={{ color: "#492000" }}>Total Price</strong>
              </div>
              <div className="col-3 text-right">
                <strong>${totalPrice}</strong>
              </div>
            </div>
            <p></p>
            <div className="text-center">
            <p></p>
              <button
                onClick={handleConfirm}
                className="btn"
                style={{ backgroundColor: "#C20605", color: "white" }}
              >
                <b>Pay Your Order</b>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}