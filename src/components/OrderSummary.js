import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  pid: 0,
  purchasedate: "",
  createdby: "",
  totalprice: 0,
  items: [],
};

export default function OrderSummary() {
  let name = sessionStorage.getItem("name");
  let role = sessionStorage.getItem("role");
  let navigate = useNavigate();
  const [order, setOrder] = useState(initialState);
  const [movies, setMovies] = useState([]);
  let { pid } = useParams();
  pid = Number(pid);

  useEffect(() => {
    fetch("http://localhost:8080/purchases/detail/" + pid)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setOrder(data);
      });
  }, []);

  useEffect(() => {
    order.items.map(
      async (item) =>
        await fetch("http://localhost:8080/movies/" + item.mid)
          .then((res) => res.json())
          .then((result) => {
            setMovies((prevState) => [...prevState, result]);
          })
    );
  }, [order]);

  if (movies.length > 0 && order !== undefined && order.createdby === name) {
    return (
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 align-items-center my-5">
          <div className="text-center">
            <h3 style={{ color: "#492000" }}>Thank You for Your Order!</h3>
            <br></br>
            <h5 style={{ color: "#492000" }}>
                Your order with ID: {order.pid} has been created successfully.
                You can find the order details also in your profile.
            </h5>
            <p></p>
          </div>
          <div class="cta-inner bg-faded text-center rounded">
          <div className="col-12">
            <br></br>
            {order.items.map((item) => {
              const movie = movies.find((movie) => movie.mid === item.mid);
              return movie ? (
                <div key={item.iid} className="row mb-3 text-center">
                  <div className="col-6">
                    <b>{movie.moviename}</b> ({movie.language},{" "}
                    {movie.moviedate} {movie.movietime})
                  </div>
                  <div className="col-3 text-right">
                    {item.amount}x${item.ticketprice}
                  </div>
                </div>
              ) : null;
            })}
            <hr></hr>
            <div className="row mb-3 text-center">
              <div className="col-6">
                <strong>Total Price</strong>
              </div>
              <div className="col-3 text-right">
                <strong>${order.totalprice}</strong>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}