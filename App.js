import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/tabs/HomeScreen";
import DiscussionScreen from "./screens/tabs/DiscussionScreen";
import DiscoverScreen from "./screens/tabs/DiscoverScreen";
import SeasonalScreen from "./screens/tabs/SeasonalScreen";
import MyListScreen from "./screens/tabs/MyListScreen";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const TabsNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        const icons = {
          Home: "home",
          Discussion: "message-text",
          Discover: "compass",
          Seasonal: "leaf",
          MyList: "format-list-bulleted-square",
        };
        return (
          <MaterialCommunityIcons
            name={icons[route.name]}
            color={color}
            size={size}
          />
        );
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Discussion" component={DiscussionScreen} />
    <Tab.Screen name="Discover" component={DiscoverScreen} />
    <Tab.Screen name="Seasonal" component={SeasonalScreen} />
    <Tab.Screen name="MyList" component={MyListScreen} />
  </Tab.Navigator>
);

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null); // null = loading, true/false = known

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserLoggedIn(!!user); // true if user exists
    });

    return unsubscribe; // clean up listener on unmount
  }, []);

  if (isUserLoggedIn === null) {
    // Optional: show loading screen
    return null;
  }

  return (
    <NavigationContainer>
      {isUserLoggedIn ? <TabsNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}
