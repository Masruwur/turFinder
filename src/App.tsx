import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./home";
import TurFindPage from "./pages/turFind";
import Games from "./pages/games";
import Payment from "./pages/payment";
import Slot from "./pages/slot";
import { useUser } from "./util/user";
import { use, useEffect } from "react";

export default function App() {
  const { setUser } = useUser();
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    setUser(savedUser ? JSON.parse(savedUser) : null);
  },[]);


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
        <Route
          path="/payment"
          element={<Payment />}
        />
        <Route
          path="/slot"
          element={<Slot />}
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
