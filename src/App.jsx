import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<div></div>} />
        <Route path="/auth" element={<div></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
