import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Spacer from "../Spacer";
import text from "../../constants/text";
import type from "../../constants/type";
import { useNavigation } from "@react-navigation/core";
import fetchData from "../fetchData";
import { useFocusEffect } from "@react-navigation/native";
import exitAlert from "../exitAlert";
import StringifyAsyncStorage from "../StringifyAsyncStorage";
import storageKey from "../../constants/storageKey";
import pageName from "../../constants/pageName";
import colors from "../../constants/colors";

const AuthenticatorScreen = () => {
  const [changeAuthPage, setChangeAuthPage] = useState(type.LOGIN);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const emailTextInput = useRef();
  const passwordTextInput = useRef();
  const inputErrorMessage = useRef("");
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        exitAlert();
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const onPressButton = async (page) => {
    if (validationChecking()) {
      const details = {
        email: email.toLowerCase(),
        password: password,
      };
      setLoading(true);
      await fetchData(page, details)
        .then((response) => response.json())
        .then((responseJson) => {
          setLoading(false);
          if (responseJson.error) {
            Alert.alert(responseJson.error);
          } else {
            clearInput();
            if (page === type.LOGIN) {
              StringifyAsyncStorage.setItem(
                storageKey.TOKEN,
                responseJson?.token
              );
              navigation.navigate(pageName.userList);
            } else {
              Alert.alert(text.registerSuccessTitle, text.registerSuccessBody);
              setChangeAuthPage(type.LOGIN);
            }
          }
        })
        .catch((error) => {
          setLoading(false);
          Alert.alert(error);
          console.error(error);
        });
    } else {
      Alert.alert(inputErrorMessage.current);
    }
  };

  const changePage = () => {
    clearInput();
    setChangeAuthPage((prevState) => {
      if (prevState === type.LOGIN) {
        return type.REGISTER;
      }
      return type.LOGIN;
    });
  };

  const clearInput = () => {
    setEmail("");
    setPassword("");
    emailTextInput.current.clear();
    passwordTextInput.current.clear();
  };

  const validationChecking = () => {
    if (!email || !password) {
      inputErrorMessage.current = !email ? text.emptyEmail : text.emptyPassword;
      return false;
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      inputErrorMessage.current = text.invalidEmail;
      return false;
    }
    return true;
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{text.title}</Text>
      <Spacer height={44} />
      <View style={styles.inputContainer}>
        <View style={styles.inputIcon}>
          <Icon name="envelope" size={20} color={colors.black} />
        </View>
        <TextInput
          ref={emailTextInput}
          style={styles.input}
          placeholder={text.email}
          placeholderTextColor={colors.grey}
          keyboardType="email-address"
          onChangeText={(emailText) => setEmail(emailText)}
        />
      </View>
      <Spacer height={24} />
      <View style={styles.inputContainer}>
        <View style={styles.inputIcon}>
          <Icon name="lock" size={20} color={colors.black} />
        </View>
        <TextInput
          ref={passwordTextInput}
          style={styles.input}
          placeholder={text.password}
          placeholderTextColor={colors.grey}
          secureTextEntry={true}
          onChangeText={(passwordText) => setPassword(passwordText)}
        />
      </View>
      <Spacer height={40} />
      <TouchableOpacity
        onPress={() => onPressButton(changeAuthPage)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {changeAuthPage === type.LOGIN ? text.login : text.register}
        </Text>
      </TouchableOpacity>
      <Spacer height={56} />
      <View>
        <Text style={styles.footerText}>
          {changeAuthPage === type.LOGIN
            ? text.loginAccount
            : text.registerAccount}
          <Spacer width={12} />
          <Text style={styles.link} onPress={changePage}>
            {changeAuthPage === type.LOGIN ? text.register : text.login}
          </Text>
        </Text>
      </View>
      {loading && (
        <ActivityIndicator
          style={styles.loading}
          size={"large"}
          color={colors.blue}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: colors.white,
  },

  title: {
    fontSize: 24,
    marginTop: 56,
    color: colors.black,
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.grey,
    marginHorizontal: 48,
  },

  inputIcon: {
    padding: 12,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.grey,
  },

  input: {
    flex: 1,
    height: 44,
    paddingLeft: 12,
    color: colors.black,
  },

  button: {
    backgroundColor: colors.blue,
    width: 156,
    height: 44,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: colors.white,
    fontSize: 16,
  },

  footerText: {
    fontSize: 16,
    color: colors.black,
  },

  link: {
    color: colors.blue,
    textDecorationLine: "underline",
  },

  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    backgroundColor: colors.white,
    opacity: 0.7,
  },
});

export default AuthenticatorScreen;
