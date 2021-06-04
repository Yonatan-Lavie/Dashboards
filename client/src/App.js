import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserSecret,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
// pages
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";

// componenets
import { Clock } from "./components/Clock";

const setToken = (userToken) => {
  sessionStorage.setItem("token", JSON.stringify(userToken));
};

const getToken = () => {};

const App = () => {
  const token = getToken();
  return (
    <>
      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">
            <FontAwesomeIcon icon={faUserSecret} /> Cyber Grapth
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Nav className="mr-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/login">
              <FontAwesomeIcon icon={faSignInAlt} />
            </Nav.Link>
            <Nav.Link href="/logout">
              <FontAwesomeIcon icon={faSignOutAlt} />
            </Nav.Link>
            <Nav></Nav>
            <Navbar.Brand>
              <Clock />
            </Navbar.Brand>
          </Nav>
        </Navbar>

        <Route path="/" exact component={HomePage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/login" component={LoginPage} />
      </Router>
    </>
  );
};
export default hot(module)(App);
