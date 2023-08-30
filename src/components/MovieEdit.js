import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  mid: 0,
  moviename: "",
  language: "",
  ticketprice: 0,
  description: "",
  imageurl: "",
  genre: "",
  moviedate: "",
  movietime: "",
  movieenabled: true,
};

export default function MovieEdit() {
  let navigate = useNavigate();
  const [movie, setMovie] = useState(initialState);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  let { mid } = useParams();
  mid = Number(mid);

  useEffect(() => {
    fetch("http://localhost:8080/movies/" + mid)
      .then((res) => res.json())
      .then((result) => {
        setMovie(result);
      });
  }, [mid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/movies/edit/"+mid, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    }).then((response) => {
      if (response.ok) {
        navigate("/movies");
      }
    });
  };

  useEffect(() => {
    fetch("http://localhost:8080/movies/genres")
      .then((response) => response.json())
      .then((result) => {
        setGenres(result);
      });
    fetch("http://localhost:8080/movies/languages")
      .then((response) => response.json())
      .then((result) => {
        setLanguages(result);
      });
  }, []);

  return (
    <div className="container px-4 px-lg-5">
      <div className="row gx-4 gx-lg-5 my-5">
        <h3 style={{ color: "#492000" }}>Edit Movie</h3>
        <p></p>
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#eb0216" }}>
                Name:
              </label>{" "}
              <input
                type="text"
                className="form-control"
                name="moviename"
                value={movie.moviename}
                onChange={(e) =>
                  setMovie({ ...movie, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#eb0216" }}>
                Genre:
              </label>{" "}
              <select
                className="form-control"
                name="genre"
                onChange={(e) =>
                  setMovie({ ...movie, [e.target.name]: e.target.value })
                }
              >
                <option value={movie.genre}>{movie.genre}</option>
                {genres.map((g) => (
                  <option value={g.genre}>{g.genre}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#eb0216" }}>
                Description:
              </label>{" "}
              <input
                type="text"
                className="form-control"
                name="description"
                value={movie.description}
                onChange={(e) =>
                  setMovie({ ...movie, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#eb0216" }}>
                Language:
              </label>{" "}
              <select
                className="form-control"
                name="language"
                onChange={(e) =>
                  setMovie({ ...movie, [e.target.name]: e.target.value })
                }
              >
                <option value={movie.language}>{movie.language}</option>
                {languages.map((l) => (
                  <option value={l.language}>{l.language}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#eb0216" }}>
                Image URL:
              </label>{" "}
              <input
                type="text"
                className="form-control"
                name="imageurl"
                value={movie.imageurl}
                onChange={(e) =>
                  setMovie({ ...movie, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#eb0216" }}>
                Date:
              </label>{" "}
              <input
                type="date"
                className="form-control"
                name="moviedate"
                value={movie.moviedate}
                onChange={(e) =>
                  setMovie({ ...movie, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#eb0216" }}>
                Time:
              </label>{" "}
              <select
                className="form-control"
                name="movietime"
                onChange={(e) =>
                  setMovie({ ...movie, [e.target.name]: e.target.value })
                }
              >
                <option value={movie.movietime}>{movie.movietime}</option>
                <option value="14:00">14:00</option>
                <option value="17:00">17:00</option>
                <option value="20:00">20:00</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#eb0216" }}>
                Ticket Price:
              </label>{" "}
              <input
                type="number"
                className="form-control"
                name="ticketprice"
                value={movie.ticketprice}
                onChange={(e) =>
                  setMovie({ ...movie, [e.target.name]: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#006400", color: "white" }}
              onClick={handleSubmit}
            >
              Edit Movie
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}