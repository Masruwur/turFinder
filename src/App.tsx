import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./home";
import TurFindPage from "./pages/turFind";
import Games from "./pages/games";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/turfind"
          element={<TurFindPage />}
        />
        <Route
          path="/games"
          element={<Games />}
        />
        {/* Add more routes here as you create new pages */}
        {/* Example: */}
        {/* <Route path="/book" element={<BookingPage />} /> */}
        {/* <Route path="/games" element={<GamesPage />} /> */}
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
      </Routes>
    </Router>
  );
}
