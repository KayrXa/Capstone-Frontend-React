import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function MovieDetail() {
  let navigate = useNavigate();
  const [movie, setMovie] = useState();
  let { mid } = useParams();
  mid = Number(mid);

  useEffect(() => {
    fetch("http://localhost:8080/movies/" + mid)
      .then((res) => res.json())
      .then((result) => {
        setMovie(result);
      });
  }, [mid]);

  let pageContent = "";
  if (movie !== undefined) {
    pageContent = (
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 align-items-center my-5">
          <h3 style={{ color: " #FFA500" }}>{movie.moviename}</h3>
          <div className="row mt-5">
            <div className="col-xs-12 col-sm-3 col-md-3">
              <p>
                <img
                  src={movie.imageurl}
                  style={{ height: 300 }}
                  className="img-fluid rounded mb-4 mb-lg-0"
                />
              </p>
            </div>
            <div class="cta-inner bg-faded rounded">
              <p>
                <b style={{ color: "#964B00" }}>Date:</b> {movie.moviedate},{" "}
                {movie.movietime}
              </p>
              <p>
                <b style={{ color: "#964B00" }}>Language:</b> {movie.language}
              </p>
              <p>
                <b style={{ color: "#964B00" }}>Genre:</b> {movie.genre}
              </p>
              <p>
                <b style={{ color: "#964B00" }}>Description:</b>{" "}
                {movie.description}
              </p>
              <p>
                <b style={{ color: "#964B00" }}>Ticket Price:</b> $
                {movie.ticketprice}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          type="button"
          style={{ backgroundColor: "#006400", color: "white" }}
          className="btn btn-sm"
        >
          Go Back
        </button>
      </div>
    );
  } else {
    pageContent = <div>There is no existing movie with this ID.</div>;
  }

  return <div>{pageContent}</div>;
}