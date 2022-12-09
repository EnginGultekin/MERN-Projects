import './App.css';
import React from "react";
import Header from './components/Header'
import HomeScreen from './Screens/HomeScreen';
import SignInScreen from './Screens/SignInScreen'
import SignUpScreen from './Screens/SignuUpScreen'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Container } from 'react-bootstrap';


function App() {
  return (
    <div>
      <Router>
        <Header />
        <main>
          <Container>
            <Routes>
              <Route path="/" exact element={<HomeScreen />} />
              <Route path="/signIn" element={<SignInScreen />} />
              <Route path="/signUp" element={<SignUpScreen />} />
            </Routes>
          </Container>
        </main>
      </Router>

    </div>
  );
}

export default App;
