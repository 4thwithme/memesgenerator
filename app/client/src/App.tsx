import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthProvider from "./context/AuthProvider/AuthProvider";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import Navbar from "./containers/Navbar/Navbar";
import MyMemesPage from "./pages/MyMemesPage/MyMemesPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/memes' component={MyMemesPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/signup' component={RegisterPage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
