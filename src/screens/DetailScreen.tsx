import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { apiFetch } from "../services/api";

export default function DetailScreen({ route, navigation }: any) {
  const { libro } = route.params;
  const [fechaDevolucion, setFechaDevolucion] = useState("");

  const solicitarPrestamo = async () => {
    try {
      if (!fechaDevolucion) {
        alert("Selecciona una fecha de devolución");
        return;
      }

      await apiFetch("/api/loans/books", {
        method: "POST",
        body: JSON.stringify({
          bookId: libro.id,
          fechaDevolucionEstimada: fechaDevolucion,
        }),
      });

      alert("Solicitud de préstamo enviada correctamente");
      navigation.navigate("Principal", {
        screen: "Mis préstamos",
      });

    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        {libro.titulo}
      </Text>

      <Text>Autor: {libro.autor}</Text>
      <Text>ISBN: {libro.isbn}</Text>
      <Text>Categoría: {libro.categoria}</Text>
      <Text>Disponibles: {libro.stockDisponible}</Text>
      <Text>Fecha estimada de devolución:</Text>

      <TextInput
        placeholder="AAAA-MM-DD"
        value={fechaDevolucion}
        onChangeText={setFechaDevolucion}
      />

      <Pressable
        onPress={solicitarPrestamo}
        style={{
          backgroundColor: "#BD032D",
          padding: 15,
          marginTop: 20,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Solicitar préstamo
        </Text>
      </Pressable>

    </View>
  );
}
