import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import NavigationsContainer from "./app/navigations/NavigationsContainer";
import { Provider } from "react-redux";
import store from "./app/store";
import StringifyAsyncStorage from "./app/components/StringifyAsyncStorage";
import storageKey from "./app/constants/storageKey";
import type from "./app/constants/type";

const App = () => {
  const [render, setRender] = useState(false);
  StringifyAsyncStorage.getItem(storageKey.TOKEN).then((value) => {
    value ? store.dispatch({type: type.ISLOGGEDIN}) : store.dispatch({type: type.ISNOTLOGGEDIN});
    setRender(true);
  });
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.root}>
        {render && <NavigationsContainer />}
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
