
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View
} from "react-native";
import { apiFetch } from "../services/api";

export default function CatalogScreen({ navigation }: any) {
  const [libros, setLibros] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarLibros = async () => {
    try {
      setCargando(true);

      const respuesta = await apiFetch("/api/books");

      setLibros(respuesta);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  return (
    <View>
      <Text>Catálogo de libros</Text>
      {cargando && <ActivityIndicator size="large" color="#BD032D" />}

      {error !== "" && <Text>{error}</Text>}

      <FlatList
        data={libros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("Detalle", { libro: item })}
            style={{ padding: 15, margin: 10, borderWidth: 1, borderRadius: 8 }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.titulo}
            </Text>

            <Text>Autor: {item.autor}</Text>
            <Text>ISBN: {item.isbn}</Text>
            <Text>Categoría: {item.categoria}</Text>
            <Text>Disponibles: {item.stockDisponible}</Text>
          </Pressable>)}
      />
    </View>
  );
}
