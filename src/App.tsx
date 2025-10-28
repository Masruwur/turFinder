import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TurFindPage from "./pages/turFind";

import { useUser } from "./util/user";
import { use, useEffect } from "react";
import { Suspense, lazy } from "react";
import HomePage from "./home";

const Slot = lazy(() => import("./pages/slot"));
const Games = lazy(() => import("./pages/games"));
const Payment = lazy(() => import("./pages/payment"));
const Contact = lazy(() => import("./pages/contact"));

export default function App() {
  const { setUser } = useUser();
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    setUser(savedUser ? JSON.parse(savedUser) : null);
  }, []);

  return (
    <Router>
      <Suspense fallback={null}>
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
            path="/slot"
            element={<Slot />}
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
            path="/contact"
            element={<Contact />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}
