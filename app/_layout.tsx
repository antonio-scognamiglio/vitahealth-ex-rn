import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/store";
import { StatusBar } from "expo-status-bar";
import { colors } from "../src/theme/colors";

export default function Layout() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.surface,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Attività" }} />
        <Stack.Screen name="[id]" options={{ title: "Dettaglio Attività" }} />
      </Stack>
    </Provider>
  );
}
