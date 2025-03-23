import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import { UserProvider } from "./lib/providers/UserProvider";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto text-base-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
