import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from "./pages/HomePage";
import { PasswordGeneratePage } from "./pages/PasswordGeneratePage";
import { UrlShortnerPage } from "./pages/UrlShortenerPage";
import { WeatherInfoPage } from "./pages/WeatherInfoPage";

function App() {
  return (
    <>
    <Router>
      <Routes >
        <Route path="/"  element={ <HomePage /> } />
        <Route path="/generate-password"  element={ <PasswordGeneratePage /> } />
        <Route path="/url-shortener" element={ <UrlShortnerPage /> } />
        <Route path="/weather-info" element={ <WeatherInfoPage /> } />
      </Routes>

      
    </Router>

      {/* <PasswordGenerator /> */}
    </>
  );
}

export default App;
