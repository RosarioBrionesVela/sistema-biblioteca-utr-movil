
import { useState } from "react";
import {
    Pressable,
    Text,
    TextInput,
    View
} from "react-native";
import { apiFetch } from "../services/api";

export default function RegisterScreen({ navigation }: any) {
    const [nombre, setNombre] = useState("");
    const [matricula, setMatricula] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");


    const handleSubmit = async () => {
        setError("");
        setMensaje("");

        if (!nombre || !matricula || !email || !password) {
            setError("Completa todos los campos");
            return;
        }

        try {
            setCargando(true);

            const respuesta = await apiFetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify({
                    nombre,
                    matricula,
                    email,
                    password,
                    rol: "USER",
                }),
            });

            setMensaje(respuesta.message);

        } catch (error: any) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    };


    return (
        <View>
            <Text>REGISTRO - UTR</Text>


            <TextInput
                placeholder="Nombre completo"
                value={nombre}
                onChangeText={setNombre}
            />

            <TextInput
                placeholder="Matrícula"
                value={matricula}
                onChangeText={setMatricula}
            />

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

            {mensaje !== "" && (
                <Text style={{ color: "green" }}>{mensaje}</Text>
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
                    {cargando ? "Registrando..." : "Crear cuenta"}
                </Text>
            </Pressable>


        </View>
    );
}
