import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  username: "",
  fname: "",
  lname: "",
  email: "",
  userpassword: "",
};

export default function Register() {
  let navigate = useNavigate();
  const [user, setUser] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/register", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(user),
    }).then((response) => {
      if(response.ok) {
        navigate("/login");
      }else{
        alert("Registration unsuccessful. Try different username.");
      }
    });
  };

  return (
    <div className="container px-4 px-lg-5">
      <div  className="row gx-4 gx-lg-5 align-items-center my-5">
        <h3 style={{ color: "#492000" }}>Create an Account</h3>
        <p></p>
        <div >
          <form>
            <div>
              <label style={{ color: "#492000" }}>
                Username (must be unique):
              </label>{" "}
              <input
                id="boxUsername"
                type="text"
                className="form-control"
                name="username"
                value={user.username}
                onChange={(e) =>
                  setUser({ ...user, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div>
              <label style={{ color: "#492000" }}>
                First Name:
              </label>{" "}
              <input
                id="boxFname"
                type="text"
                className="form-control"
                name="fname"
                value={user.fname}
                onChange={(e) =>
                  setUser({ ...user, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div>
              <label style={{ color: "#492000" }}>
                Last Name:
              </label>{" "}
              <input
                id="boxLname"
                type="text"
                className="form-control"
                name="lname"
                value={user.lname}
                onChange={(e) =>
                  setUser({ ...user, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div>
              <label style={{ color: "#492000" }}>
                Email:
              </label>{" "}
              <input
                id="boxEmail"
                type="email"
                className="form-control"
                name="email"
                value={user.email}
                onChange={(e) =>
                  setUser({ ...user, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div>
              <label style={{ color: "#492000" }}>
                Password:
              </label>{" "}
              <input
                id="boxPassword"
                type="password"
                className="form-control"
                name="userpassword"
                value={user.userpassword}
                onChange={(e) =>
                  setUser({ ...user, [e.target.name]: e.target.value })
                }
              />
            </div>
            <button
              id="btnRegister"
              type="submit"
              className="btn"
              style={{ backgroundColor: "#006400", color: "white" }}
              onClick={handleSubmit}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}