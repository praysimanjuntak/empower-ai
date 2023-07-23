import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Vision from "./pages/Vision";
import Hearing from "./pages/Hearing";

function App() {
  return (
    <div style={{fontFamily: 'Poppins'}}>
      <Navbar />
      <div style={{marginTop: '100px'}}>
        <Routes>
          <Route index exact element={<Home />} />
          <Route path="vision" exact element={<Vision />} />
          <Route path="hearing" exact element={<Hearing />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
