import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import LoginPage from "./pages/LoginPage";
import IndexRouting from "./IndexRouting";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <IndexRouting />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
