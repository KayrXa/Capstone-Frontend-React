import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
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

export default function MovieAdd() {
  const [movie, setMovie] = useState(initialState);
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [language, setLanguage] = useState("");
  const [languages, setLanguages] = useState([]);
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/movies/add", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(movie),
    }).then((response) => {
      if(response.ok) {
        navigate("/movies");
      }
    });
  };

  const handleSubmitGenre = (e) => {
    e.preventDefault();
    let response = fetch("http://localhost:8080/movies/genres", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(genre),
    }).then((response) => {
      if(response.ok) {
        navigate("/movies");
      }
    });
  };

  const handleSubmitLanguage = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/movies/languages", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(language),
    }).then((response) => {
      if(response.ok) {
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
        <h3 style={{ color: "#492000" }}>Add New Movie</h3>
        <p></p>
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#492000" }}>
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
              <label className="form-label" style={{ color: "#492000" }}>
                Genre:
              </label>{" "}
              <select
                className="form-control"
                name="genre"
                onChange={(e) =>
                  setMovie({ ...movie, [e.target.name]: e.target.value })
                }
              >
                <option value="default">Select genre</option>
                {genres.map((g) => (
                  <option value={g.genre}>{g.genre}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#492000" }}>
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
              <label className="form-label" style={{ color: "#492000" }}>
                Language:
              </label>{" "}
              <select
                className="form-control"
                name="language"
                onChange={(e) =>
                  setMovie({ ...movie, [e.target.name]: e.target.value })
                }
              >
                <option value="default">Select language</option>
               {languages.map((l) => (
                  <option value={l.language}>{l.language}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#492000" }}>
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
              <label className="form-label" style={{ color: "#492000" }}>
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
              <label className="form-label" style={{ color: "#492000" }}>
                Time:
              </label>{" "}
              <select
                className="form-control"
                name="movietime"
                onChange={(e) =>
                  setMovie({ ...movie, [e.target.name]: e.target.value })
                }
              >
                <option value="default">Select time</option>
                <option value="14:00">14:00</option>
                <option value="17:00">17:00</option>
                <option value="20:00">20:00</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#492000" }}>
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
              Add Movie
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#492000" }}>
                <h4>Add New Genre</h4>
                
              </label>{" "}
              <input
                type="text"
                className="form-control"
                name="genre"
                value={genre.genre}
                onChange={(e) =>
                  setGenre({ ...genre, [e.target.name]: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#006400", color: "white" }}
              onClick={handleSubmitGenre}
            >
              Add Genre
            </button>
          </form>
          <br></br>
          <form>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#492000" }}>
                <h4>Add New Language</h4>
              </label>{" "}
              <input
                type="text"
                className="form-control"
                name="language"
                value={language.language}
                onChange={(e) =>
                  setLanguage({ ...language, [e.target.name]: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#006400", color: "white" }}
              onClick={handleSubmitLanguage}
            >
              Add Language
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}