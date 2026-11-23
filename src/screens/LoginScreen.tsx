import { Pressable, Text, View } from "react-native";

export default function LoginScreen({ navigation }: any) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>INICIAR SESIÓN - UTR</Text>

      <Pressable
        onPress={() => navigation.navigate("Principal")}
        style={{
          backgroundColor: "#BD032D",
          padding: 15,
          marginTop: 20,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white" }}>Entrar</Text>
      </Pressable>
    </View>
  );
}