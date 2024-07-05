import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AppToaster from "./components/AppToaster/AppToaster";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Loading...</h1>}>
        <main>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<div></div>} />
          </Routes>
        </main>
        <AppToaster />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
