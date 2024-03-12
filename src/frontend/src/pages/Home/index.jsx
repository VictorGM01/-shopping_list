import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
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
        {isLoading && <CircularProgress />}
        {error && <Typography>Ocorreu um erro ao buscar as listas</Typography>}
        <Box display="flex" flexDirection="column" gap={2}>
          {data &&
            data.map((lista) => (
              <Link to={`/lista/${lista.id}`} key={lista.id}>
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
