import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/Auth";
import Listas from "./pages/Home";
import CadastroLista from "./pages/CadastroLista";
import CadastroProduto from "./pages/CadastroProduto";

export default function AppRoute() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Listas />} />

          <Route path="/listas/nova" element={<CadastroLista />} />

          <Route path="/produtos/novo" element={<CadastroProduto />} />

          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
