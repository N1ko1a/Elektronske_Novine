import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import ArticalPrev from "./Routes/ArticalPrev";
import AddArticalPage from "./Routes/AddArticalPage";
import ApprovePage from "./Routes/ApprovePage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ArticalPrev/:id" element={<ArticalPrev />} />
      <Route path="/AddArticalPage" element={<AddArticalPage />} />
      <Route path="/ApprovePage" element={<ApprovePage />} />
    </Routes>
  );
}

export default App;
