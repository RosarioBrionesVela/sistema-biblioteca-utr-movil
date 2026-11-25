import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { apiFetch } from "../services/api";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async () => {
    setError("");

    if (!email || !password) {
      setError("Completa todos los campos");
      return;
    }

    try {
      setCargando(true);

      const respuesta = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      await SecureStore.setItemAsync("user_jwt_token", respuesta.token);
      
      await SecureStore.setItemAsync(
        "usuario",
        JSON.stringify(respuesta.user)
      );

      navigation.navigate("Principal");

    } catch (error: any) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>INICIAR SESIÓN - UTR</Text>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error !== "" && (
        <Text style={{ color: "red" }}>{error}</Text>
      )}

      <Pressable
        onPress={handleSubmit}
        disabled={cargando}
        style={{
          backgroundColor: "#BD032D",
          padding: 15,
          marginTop: 20,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white" }}>
          {cargando ? "Iniciando sesión..." : "Entrar"}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Registro")}
        style={{ marginTop: 15 }}
      >
        <Text>¿No tienes cuenta? Regístrate</Text>
      </Pressable>
    </View>
  );
}