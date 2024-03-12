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
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../components/theme";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../api";

export default function CadastroProduto() {
  const [nome, setNome] = useState("");
  const [linkCompra, setLinkCompra] = useState("");
  const [preco, setPreco] = useState("");
  const [comprado, setComprado] = useState(false);
  const [listasSelecionadas, setListasSelecionadas] = useState([]);

  const { data: listas } = useQuery({
    queryKey: ["listas"],
    queryFn: async () => {
      const response = await api.get("/listas");
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (produto) => {
      const response = await api.post("/produtos", produto);
      return response.data;
    },
    onSuccess: () => {
      setNome("");
      setLinkCompra("");
      setPreco("");
      setComprado(false);
      setListasSelecionadas([]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      nome,
      link_compra: linkCompra,
      preco,
      comprado,
      listas: listasSelecionadas,
    });
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
          Cadastro de Produto
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
              label="Link de Compra"
              variant="outlined"
              value={linkCompra}
              onChange={(e) => setLinkCompra(e.target.value)}
            />
            <TextField
              fullWidth
              label="Preço"
              variant="outlined"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              type="number"
              required
            />
            <FormControlLabel
              control={
                <Switch
                  checked={comprado}
                  onChange={(e) => setComprado(e.target.checked)}
                />
              }
              label="Comprado"
            />
            <FormControl fullWidth>
              <InputLabel>Listas Associadas</InputLabel>
              <Select
                multiple
                value={listasSelecionadas}
                onChange={(e) => setListasSelecionadas(e.target.value)}
                input={<OutlinedInput label="Listas Associadas" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={
                          listas?.find((lista) => lista.id === Number(value))
                            ?.nome || value
                        }
                      />
                    ))}
                  </Box>
                )}
              >
                {listas?.map((lista) => (
                  <MenuItem key={lista.id} value={lista.id}>
                    {lista.nome}
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
