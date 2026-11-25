import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
} from "react-native";
import { apiFetch } from "../services/api";

export default function LoansScreen() {
  const [prestamos, setPrestamos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarPrestamos = async () => {
    try {
      setCargando(true);

      const respuesta = await apiFetch("/api/loans/books");

      setPrestamos(respuesta);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPrestamos();
  }, []);

  return (
    <View>
      <Text>Mis préstamos</Text>
      {cargando && (
        <ActivityIndicator size="large" color="#BD032D" />
      )}

      {error !== "" && <Text>{error}</Text>}

      <FlatList
        data={prestamos}
        keyExtractor={(item) => item.loanId.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 15, margin: 10, borderWidth: 1, borderRadius: 8 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.libro}
            </Text>

            <Text>Autor: {item.autor}</Text>
            <Text>ISBN: {item.isbn}</Text>
            <Text>Fecha del préstamo: {item.fechaPrestamo}</Text>
            <Text>Fecha de devolución: {item.fechaDevolucionEstimada}</Text>
            <Text>Estado: {item.estatus}</Text>

            {item.vencido && <Text>Préstamo vencido</Text>}
          </View>
        )}
      />
    </View>
  );
}
