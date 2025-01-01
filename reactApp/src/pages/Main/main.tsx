import React from "react";
import "./main.scss";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

const Main: React.FC = () => {
  return (
    <>
      <Nav />
      <h1>Main</h1>
      <Footer />
    </>
  );
};

export default Main;