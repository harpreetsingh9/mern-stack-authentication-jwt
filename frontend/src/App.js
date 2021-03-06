import React from "react";
import "./App.css";
import { BrowserRouter, Link, Route } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen";
import SigninScreen from "./screens/SigninScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  return (
    <BrowserRouter>
      <h1>Login and Register user</h1>
      <main>
        <Route path="/signin" exact component={SigninScreen}></Route>
        <Route path="/register" exact component={RegisterScreen}></Route>
        <Route path="/profile" exact component={ProfileScreen}></Route>
        {/* <Route path="/" component={HomeScreen} exact></Route> */}
      </main>
    </BrowserRouter>
  );
}

export default App;
