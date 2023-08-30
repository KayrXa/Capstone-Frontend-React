import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const initialUser = {
  uid: "",
  username: "",
  fname: "",
  lname: "",
  email: "",
};

export default function Profile() {
  const [user, setUser] = useState(initialUser);
  const [purchases, setPurchases] = useState([]);
  let name = sessionStorage.getItem("name");
  let role = sessionStorage.getItem("role");

  useEffect(() => {
    fetch("http://localhost:8080/profile/" + name)
      .then((res) => res.json())
      .then((result) => {
        setUser(result);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/purchases/" + name)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPurchases(data);
      });
  }, []);

  return (
    <div>
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 align-items-center my-5">
          <h3 style={{ color: "#492000" }}> Hello, {user.fname}!</h3>
          <p></p>
          <div>
            <p></p>
            <div className="row">
              <div className="col-lg-3 col-md-12">
                <h5 style={{ color: "#492000" }}>Account Details:</h5>
                <p>
                  <b style={{ color: "#492000" }}>User ID: </b>
                  {user.uid}
                </p>
                <p>
                  <b style={{ color: "#492000" }}>Username: </b>
                  {user.username}
                </p>
                <p>
                  <b style={{ color: "#492000" }}>Name: </b>
                  {user.fname} {user.lname}
                </p>
                <p>
                  <b style={{ color: "#492000" }}>Email: </b>
                  {user.email}
                </p>
              </div>
              <div className="col-lg-9 col-md-12">
                <h5 style={{ color: "#492000" }}>Purchase History:</h5>
                <p></p>
                <div className="row gx-4 gx-lg-5 align-items-center my-5">
                  <table className="table table-striped table-secondary">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Date</th>
                        <th scope="col">Total Price</th>
                        <th scope="col" >Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchases.map((purchase) => (
                        <tr>
                          <th scope="row">{purchase.pid}</th>
                          <td>{purchase.purchasedate}</td>
                          <td>${purchase.totalprice}</td>
                          <td>
                            <NavLink
                              className="btn btn-sm"
                              style={{ backgroundColor: "#006400", color: "white" }}
                              to={"/order/" + purchase.pid}
                            >
                              Detail
                            </NavLink>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}