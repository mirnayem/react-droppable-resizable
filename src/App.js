import "./App.css";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDesign from "./pages/ProductDesign";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product-design" element={<ProductDesign />} />
    </Routes>
  );
}

export default App;
