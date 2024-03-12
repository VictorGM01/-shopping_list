import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import api from "../../api";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../components/theme";
import styles from "./home.module.css";
import { Link } from "react-router-dom";

function Listas() {
  const { isLoading, error, data } = useQuery({
    queryKey: "listas",
    queryFn: async () => {
      const response = await api.get("/listas");
      return response.data;
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box className={styles.container}>
        <Box display="flex" justifyContent="center" gap={2}>
          <Link to="/listas/nova">
            <Button variant="outlined" color="primary">
              Nova Lista
            </Button>
          </Link>
          <Link to="/produtos/novo">
            <Button variant="outlined" color="primary">
              Novo Produto
            </Button>
          </Link>
        </Box>
        {isLoading && <CircularProgress />}
        {error && <Typography>Ocorreu um erro ao buscar as listas</Typography>}
        <Box display="flex" flexDirection="column" gap={2}>
          {data &&
            data.map((lista) => (
              <Link to={`/listas/${lista.id}`} key={lista.id}>
                <Card
                  key={lista.id}
                  sx={{
                    minWidth: 275,
                    borderColor: lista.cor,
                    borderWidth: 2,
                    borderStyle: "solid",
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {lista.nome}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {lista.descricao}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Listas;
