import React from "react";

export default function Contact() {
  let pageContent = "";
  pageContent = (
    <div className="container px-4 px-lg-5">
      <div class="cta-inner bg-faded rounded">
        <h3 style={{ color: "#492000" }}>Contact</h3>
        <br />
        <p><b style={{ color: "#964B00" }}>Address:</b> Space 143, Rakovnik 269 01</p>
        <br />
        <h5 style={{ color: "#492000" }}>For More Information</h5>
        <p><b style={{ color: "#964B00" }}>E-mail:</b> info@fancymovies.com</p>
        <p><b style={{ color: "#964B00" }}>Phone Number:</b> 666 666 666</p>
      </div>
    </div>
  );
  return <div>{pageContent}</div>;
}