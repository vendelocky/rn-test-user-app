/**
 * @format
 */

import React from "react";
import { cleanup, render } from "@testing-library/react-native";
import UserListScreen from "../app/components/screens/UserListScreen";
import MockedNavigator from "../app/navigations/MockedNavigator";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import type from "../app/constants/type";
import pageName from "../app/constants/pageName";
import renderer from "react-test-renderer";
import { FlatList } from "react-native";

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

describe("User List Component", () => {
  afterEach(cleanup);
  const mockStore = configureStore();
  const initialState = { status: type.ISNOTLOGGEDIN, initialPage: pageName.authenticator };
  const store = mockStore(initialState);

  it("should match the snapshot", () => {
    const { toJSON } = render(
      <Provider store={store}>
        <MockedNavigator component={UserListScreen} />
      </Provider>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly", () => {
    renderer.create(
      <Provider store={store}>
        <MockedNavigator component={UserListScreen} />
      </Provider>,
    );
  });

  const testRenderer = renderer.create(
    <Provider store={store}>
      <MockedNavigator component={UserListScreen} />
    </Provider>,
  );
  const testInstance = testRenderer.root;

  describe("Flat List Component", () => {
    const flatList = testInstance.findAllByType(FlatList);
    it("should be defined", () => {
      expect(flatList).toBeDefined();
    });

    it("has only 1 list", () => {
      expect(flatList).toHaveLength(1);
    });
  });
});
