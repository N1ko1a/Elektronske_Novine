import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import ArticalPrev from "./Routes/ArticalPrev";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ArticalPrev" element={<ArticalPrev />} />
    </Routes>
  );
}

export default App;
