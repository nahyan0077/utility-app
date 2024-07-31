import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from "./pages/HomePage";
import { PasswordGeneratePage } from "./pages/PasswordGeneratePage";

function App() {
  return (
    <>
    <Router>
      <Routes >
        <Route path="/"  element={ <HomePage /> } />
        <Route path="/generate-password"  element={ <PasswordGeneratePage /> } />

      </Routes>

      
    </Router>

      {/* <PasswordGenerator /> */}
    </>
  );
}

export default App;
