import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  password: "",
};

export default function AdminLogin() {
  const [admin, setAdmin] = useState(initialState);
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/login/admin", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(admin)    
    }).then((response) => {
      if(response.ok) {
        sessionStorage.setItem("name", admin.name);
        sessionStorage.setItem("role", "admin");
        navigate("/movies");
      }else{
        alert("Invalid credentials.");
      }
    });
  };

  return (
    <div className="container px-4 px-lg-5">
      <div className="row gx-4 gx-lg-5 align-items-center my-5">
        <h3 style={{ color: "#492000" }}>Log in as Admin to administrate the website</h3>
        <p></p>
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#492000" }}>Admin's Name:</label>{" "}
              <input
                type="text"
                className="form-control"
                name="name"
                value={admin.name}
                onChange={(e) => setAdmin({ ...admin, [e.target.name]: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#492000" }}>Password:</label>{" "}
              <input
                type="password"
                className="form-control"
                name="password"
                value={admin.password}
                onChange={(e) => setAdmin({ ...admin, [e.target.name]: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#C20605", color: "white" }}
              onClick={handleSubmit}
            >
              Log In
            </button>
          </form>
          <p style={{ color: "#FF0000" }}>if you do not remember the credentials contact web developer Pavel Rygl 777 777 777</p>
        </div>
      </div>
    </div>
  );
}