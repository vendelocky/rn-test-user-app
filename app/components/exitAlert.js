import { Alert, BackHandler } from "react-native";
import text from "../constants/text";

const exitAlert = () => {
  Alert.alert(text.exitTitle, text.exitBody, [
    {
      text: text.no,
      onPress: () => null,
    },
    { text: text.yes, onPress: () => BackHandler.exitApp() },
  ]);
};

export default exitAlert;
