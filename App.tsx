import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import AppDrawer from "./src/navigation/navigation";
import { root } from "./src/store/store"

const App = () => {
  return (
    <Provider store={root}>
      <PaperProvider>
        <NavigationContainer>
          <AppDrawer />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;