import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../components/theme";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../api";

export default function CadastroLista() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [cor, setCor] = useState("#ffffff");
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);

  const { data: produtos } = useQuery({
    queryKey: ["produtos"],
    queryFn: async () => {
      const response = await api.get("/produtos");
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (newLista) => {
      const response = await api.post("/listas", newLista);
      return response.data;
    },
    onSuccess: () => {
      setNome("");
      setDescricao("");
      setAtivo(true);
      setCor("#ffffff");
      setProdutosSelecionados([]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLista = {
      nome,
      descricao,
      cor,
      ativo,
      produtos: produtosSelecionados.map(Number),
    };
    mutation.mutate(newLista);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Typography variant="h4" component="h1" marginBottom={2}>
          Nova Lista de Compras
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{ width: "40%" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              label="Nome"
              variant="outlined"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Descrição"
              variant="outlined"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <Box display="flex" justifyContent="space-between">
              <FormControlLabel
                control={
                  <Switch
                    checked={ativo}
                    onChange={(e) => setAtivo(e.target.checked)}
                  />
                }
                label="Ativo"
              />
              <TextField
                type="color"
                variant="outlined"
                value={cor}
                onChange={(e) => setCor(e.target.value)}
                sx={{ width: "40%" }}
              />
            </Box>
            <FormControl fullWidth>
              <InputLabel>Produtos</InputLabel>
              <Select
                multiple
                value={produtosSelecionados}
                onChange={(e) => setProdutosSelecionados(e.target.value)}
                input={<OutlinedInput label="Produtos" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={
                          produtos?.find((prod) => prod.id === Number(value))
                            ?.nome || value
                        }
                      />
                    ))}
                  </Box>
                )}
              >
                {produtos?.map((produto) => (
                  <MenuItem key={produto.id} value={produto.id}>
                    {produto.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" variant="outlined" color="primary">
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
