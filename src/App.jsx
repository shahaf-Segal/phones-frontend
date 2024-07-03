import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <BrowserRouter>
      <main>
        <NavBar />
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="/auth" element={<div></div>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
