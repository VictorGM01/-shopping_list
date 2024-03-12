import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/Auth";

export default function AppRoute() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
