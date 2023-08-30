import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Movie from "./Movie";

export default function MoviesList() {
  let name = sessionStorage.getItem("name");
  let role = sessionStorage.getItem("role");
  const [movies, setMoviesList] = useState([]);
  const [movieSearch, setMovieSearch] = useState({ search: "" });
  const [movieFilter, setMovieFilter] = useState({ genre: "", language: "" });
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    if (role === "admin") {
      fetch("http://localhost:8080/movies/all")
        .then((response) => response.json())
        .then((result) => {
          setMoviesList(result);
        });
    } else {
      fetch("http://localhost:8080/movies/available")
        .then((response) => response.json())
        .then((result) => {
          setMoviesList(result);
        });
    }
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
    <div>
      <section class="page-section cta">
        <div className="container">
          <div class="row">
            <div class="col-xl-9 mx-auto">
            
            < div className="row gx-4 gx-lg-5 align-items-center my-5">
              <h2 class="section-heading mb-5">Movie List</h2>
              {role === "admin" && (
                <div className="text-center">
                  <NavLink
                    className="btn btn-sm"
                    style={{ backgroundColor: "#C20605", color: "white" }}
                    to={`add`}
                  >
                    <b>ADD NEW MOVIE, GENRE OR LANGUAGE</b>
                  </NavLink>
                  <p></p>
                </div>
              )}
              <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-1 row-cols-lg-2 justify-content-center">
                <div className="col-sm-12 col-md-6">
                  <form>
                    <label className="form-label">
                      <h5>Search Movies:</h5>
                    </label>{" "}
                    <input
                      type="text"
                      className="form-control"
                      name="search"
                      value={movieSearch.search}
                      onChange={(e) => [
                        setMovieSearch({
                          [e.target.name]: e.target.value,
                        }),
                      ]}
                    />
                  </form>
                  <br></br>
                  <form>
                    <div className="col-sm-12 col-md-6">
                      <label className="form-label">
                        <h5>Sort Movies:</h5>
                        <input
                          type="radio"
                          name="sort"
                          value="byAlpha"
                          onChange={() => [
                            setMoviesList(
                              [...movies].sort((a, b) =>
                                a.moviename > b.moviename ? 1 : -1
                              )
                            ),
                          ]}
                        />
                          <label for="byAlpha">Alphabetically</label>  {" "}
                        <input
                          type="radio"
                          name="sort"
                          value="byDate"
                          onChange={() => [
                            setMoviesList(
                              [...movies].sort((a, b) =>
                                a.moviedate > b.moviedate ? 1 : -1
                              )
                            ),
                          ]}
                        />
                          <label for="byDate">By Date</label>
                      </label>{" "}
                    </div>
                  </form>
                </div>
                <form>
                  <div className="col-sm-12 col-md-6">
                    <label className="form-label">
                      <h5>Filter Movies:</h5>
                    </label>{" "}
                    <div className="mb-3">
                      <select
                        className="form-control"
                        name="genre"
                        onChange={(e) =>
                          setMovieFilter({
                            ...movieFilter,
                            [e.target.name]: e.target.value,
                          })
                        }
                      >
                        <option value="">All genres</option>
                        {genres.map((g) => (
                          <option value={g.genre}>{g.genre}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <select
                        className="form-control"
                        name="language"
                        onChange={(e) =>
                          setMovieFilter({
                            ...movieFilter,
                            [e.target.name]: e.target.value,
                          })
                        }
                      >
                        <option value="">All languages</option>
                        {languages.map((l) => (
                          <option value={l.language}>{l.language}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-1 row-cols-lg-2 justify-content-center">
                {movies.map(
                  (movie) =>
                    movie.moviename
                      .toLowerCase()
                      .includes(movieSearch.search.toLowerCase()) &&
                    movie.genre.includes(movieFilter.genre) &&
                    movie.language.includes(movieFilter.language) && (
                      <Movie key={movie.mid} movie={movie} />
                    )
                )}
              </div>
            </div>
          </div>
          </div>
          
          
        </div>
      </section>
    </div>
  );
}
