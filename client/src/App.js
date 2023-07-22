import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route index exact element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
