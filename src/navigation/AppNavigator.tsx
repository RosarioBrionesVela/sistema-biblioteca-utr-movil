
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import CatalogScreen from "../screens/CatalogScreen";
import DetailScreen from "../screens/DetailScreen";
import LoansScreen from "../screens/LoansScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegación principal
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Catálogo" component={CatalogScreen} />
      <Tab.Screen name="Mis préstamos" component={LoansScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Navegación general
export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Registro"
        component={RegisterScreen}
        options={{ title: "Crear cuenta" }}
      />

      <Stack.Screen
        name="Principal"
        component={MainTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Detalle"
        component={DetailScreen}
      />
    </Stack.Navigator>
  );
}
