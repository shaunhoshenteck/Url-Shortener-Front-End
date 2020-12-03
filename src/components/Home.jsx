import React from "react";
import { Jumbotron } from "react-bootstrap";
import Create from "./Create";
// import "./Home.css";

const Home = () => {
  return (
    <>
      {/* <Jumbotron className="text-center">
        <h1>URL Shortener</h1>
        <h5>Customize your own branded URL!</h5>
      </Jumbotron> */}
      <Create />
    </>
  );
};
export default Home;
