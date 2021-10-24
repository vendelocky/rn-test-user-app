/**
 * @format
 */

import React from "react";
import { cleanup, render } from "@testing-library/react-native";
import AuthenticatorScreen from "../app/components/screens/AuthenticatorScreen";
import MockedNavigator from "../app/navigations/MockedNavigator";
import renderer from "react-test-renderer";
import { TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const mockedNavigation = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useFocusEffect: () => mockedNavigation,
    useNavigation: () => ({
      navigate: mockedNavigation,
    }),
  };
});

describe("Authenticator Component", () => {
  afterEach(cleanup);

  it("should match the snapshot", () => {
    const { toJSON } = render(<MockedNavigator component={AuthenticatorScreen} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly", () => {
    renderer.create(<MockedNavigator component={AuthenticatorScreen} />);
  });

  const testRenderer = renderer.create(<MockedNavigator component={AuthenticatorScreen} />);
  const testInstance = testRenderer.root;

  describe("Text Input Component", () => {
    const textInput = testInstance.findAllByType(TextInput);
    it("should be defined", () => {
      expect(textInput).toBeDefined();
    });

    it("has 2 text inputs", () => {
      expect(textInput).toHaveLength(2);
    });
  });

  describe("Icon Component", () => {
    const icon = testInstance.findAllByType(Icon);
    it("has 2 icons", () => {
      expect(icon).toHaveLength(2);
    });
  });

  describe("Button Component", () => {
    const button = testInstance.findByType(TouchableOpacity);
    it("should be defined", () => {
      expect(button).toBeDefined();
    });

    it("has text", () => {
      const buttonText = button.children;
      expect(buttonText).not.toBeNull();
    });
  });
});
