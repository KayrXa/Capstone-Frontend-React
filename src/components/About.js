import React from "react";

export default function About() {
  let pageContent = "";
  pageContent = (
    <div className="container px-4 px-lg-5">
      <section class="page-section clearfix">
            <div class="container">
                <div class="intro">
                    <img class="intro-img img-fluid mb-3 mb-lg-0 rounded" src="https://style.shockvisual.net/wp-content/uploads/2020/06/movie-theater-with-cinema-blank-screen-and-rows-of-4CTFEHS.jpg" alt="Cinema" />
                    <div class="intro-text left-0 text-center bg-faded p-5 rounded">
                        <h2 class="section-heading mb-4">
                            <span class="section-heading-upper">Welcome to Fancy Movies</span>
                            <span class="section-heading-lower">Extra deal!</span>
                        </h2>
                        <p class="mb-3">Hi and welcome to the Fancy movies, you can search here for movies and visit us in most famous home made cinemy! Since this is a starter you can find here movies for fantastics prices!</p>
                        <div class="intro-button mx-auto"><a style={{ backgroundColor: "#006400", color: "white" }}class="btn btn-primary btn-xl" href="/login">Visit Us Today!</a></div>
                    </div>
                </div>
            </div>
        </section>
        <section class="page-section cta">
            <div class="container">
                <div class="row">
                    <div class="col-xl-9 mx-auto">
                        <div class="cta-inner bg-faded text-center rounded">
                            <h2 class="section-heading mb-4">
                                <span class="section-heading-upper">Our Promise</span>
                                <span class="section-heading-lower">To You</span>
                            </h2>
                            <p class="mb-0">We would like to have most happy customers ever. So if you will be so kind and if you have any questions or posibilities how to improve just inform us and we will try to do our best. Thank you!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

  </div>
  );
  
  return <div>{pageContent}</div>;
}