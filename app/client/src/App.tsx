import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import Navbar from "./containers/Navbar/Navbar";
import MyMemesPage from "./pages/MyMemesPage/MyMemesPage";
import ModalHub from "./containers/ModalHub/ModalHub";
import { AuthProvider } from "./context/AuthProvider/AuthProvider";
import { ModalProvider } from "./context/ModalProvider/ModalProvider";

function App() {
  return (
    <Router>
      <ModalProvider>
        <AuthProvider>
          <Navbar />
          <Suspense fallback={<div className='suspense'>Loading...</div>}>
            <ModalHub />
          </Suspense>

          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/memes' component={MyMemesPage} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/signup' component={RegisterPage} />
          </Switch>
        </AuthProvider>
      </ModalProvider>
    </Router>
  );
}

export default App;
