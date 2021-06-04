import React from "react";
import { Redirect, Route } from "react-router";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";

const HomePage = () => {
  const loggedIn = false;
  return (
    <Route exact path="/">
      {loggedIn ? <Redirect to="/dashboard" /> : <DashboardPage />}
    </Route>
  );
  // return <div>Home page!!</div>;
};

export default HomePage;
