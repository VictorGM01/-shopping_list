import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Link,
} from "@mui/material";
import api from "../api";
import theme from "../components/theme";
import { ThemeProvider } from "@mui/material/styles";

export default function ListagemProdutos() {
  const { listaId } = useParams();
  const {
    isLoading,
    error,
    data: produtos,
  } = useQuery({
    queryKey: ["produtos", listaId],
    queryFn: async () =>
      await api.get(`/listas/${listaId}/produtos`).then((res) => res.data),
  });

  const { data: lista } = useQuery({
    queryKey: ["lista", listaId],
    queryFn: async () =>
      await api.get(`/listas/${listaId}`).then((res) => res.data),
  });

  if (isLoading) return <Typography>Carregando...</Typography>;
  if (error)
    return <Typography>Ocorreu um erro ao buscar os produtos.</Typography>;

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100vw",
          overflow: "hidden",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          {lista.nome}
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          {lista.descricao}
        </Typography>
        <TableContainer component={Paper} sx={{ width: "90%" }}>
          <Table sx={{ minWidth: 650 }} aria-label="tabela de produtos">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Preço</TableCell>
                <TableCell align="right">Comprado</TableCell>
                <TableCell>Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {produtos.map((produto) => (
                <TableRow
                  key={produto.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {produto.nome}
                  </TableCell>
                  <TableCell align="right">R$ {produto.preco}</TableCell>
                  <TableCell align="right">
                    {produto.comprado ? "Sim" : "Não"}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={produto.link_compra}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Comprar
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
}
