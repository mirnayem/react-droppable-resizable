import "./App.css";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDesign from "./pages/ProductDesign";

function App() {
  return (
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-design" element={<ProductDesign />} />
      </Routes>
    </main>
  );
}

export default App;
