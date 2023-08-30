import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  pid: 0,
  purchasedate: "",
  createdby: "",
  totalprice: 0,
  items: [],
};

export default function OrderDetail() {
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
          <div className="col-12">
            <h5 style={{ color: "#492000" }}>Order ID: {order.pid}</h5>
            <br></br>
            <p>
              <b style={{ color: "#492000" }}>Purchase Date:</b> {order.purchasedate}
            </p>
            <div class="cta-inner bg-faded text-center rounded">
            <p>
              <b>Purchased Items:</b>
            </p>
            {order.items.map((item) => {
              const movie = movies.find((movie) => movie.mid === item.mid);
              return movie ? (
                <div key={item.iid} className="row mb-3 text-center">
                  <div className="col-6">
                    <b>{movie.moviename}</b> ({movie.language}, {movie.moviedate}{" "}
                    {movie.movietime})
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
        <button
          onClick={() => navigate(-1)}
          type="button"
          style={{ backgroundColor: "#C20605", color: "white" }}
          className="btn btn-sm"
        >
          Go Back
        </button>
      </div>
    );
  }
  return <div>There is no existing order with this ID.</div>;
}