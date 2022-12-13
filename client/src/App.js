import './App.css';
import Header from './components/Header'
import HomeScreen from './Screens/HomeScreen';
import SignInScreen from './Screens/SignInScreen'
import SignUpScreen from './Screens/SignuUpScreen'
import UtilToast from './components/UtilToast';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Container } from 'react-bootstrap';
import { UserProvider, useUser } from './context/UserContext';


function App() {

  return (
    <UserProvider>
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
        <UtilToast />
      </Router>
    </UserProvider>
  );
}

export default App;
