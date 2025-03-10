import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreenComponent } from "./src/screens/SplashScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { QuizScreen } from "./src/screens/QuizScreen";
import { ResultScreen } from "./src/screens/ResultScreen";
import { SafeAreaView, StatusBar } from 'react-native'; // Added import

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}> {/* Added SafeAreaView */}
          <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={true}/> {/* Added StatusBar */}
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Splash" component={SplashScreenComponent} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Quiz" component={QuizScreen} />
              <Stack.Screen name="Result" component={ResultScreen} />
              <Stack.Screen name="Admin" component={AdminScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    </QueryClientProvider>
  );
}