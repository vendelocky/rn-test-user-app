/**
 * @format
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import StringifyAsyncStorage from "../app/components/StringifyAsyncStorage";

const randomInteger = () => Math.floor(Math.random() * 1000);
const randomText = () =>
  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
const randomObject = () => ({ text: randomText(), integer: randomInteger() });

describe("setItem", () => {
  afterEach(async () => {
    await AsyncStorage.clear();
  });

  it("stores integer", async () => {
    const random = randomInteger();
    await StringifyAsyncStorage.setItem("integer", random);
    const integer = await StringifyAsyncStorage.getItem("integer");
    expect(integer).toBe(random);
  });

  it("stores string", async () => {
    const random = randomText();
    await StringifyAsyncStorage.setItem("text", random);
    const text = await StringifyAsyncStorage.getItem("text");
    expect(text).toBe(random);
  });

  it("stores object", async () => {
    const random = randomObject();
    await StringifyAsyncStorage.setItem("object", random);
    const object = await StringifyAsyncStorage.getItem("object");
    expect(object).toStrictEqual(random);
  });
});

describe("errors", () => {
  it("is error on setItem", () => {
    AsyncStorage.setItem.mockRejectedValueOnce("error");
    jest.spyOn(console, "error").mockImplementationOnce(() => {});
    const random = randomInteger();
    return expect(StringifyAsyncStorage.setItem("key", random)).rejects.toMatch("error");
  });

  it("is error on getItem", () => {
    AsyncStorage.getItem.mockRejectedValueOnce("error");
    jest.spyOn(console, "error").mockImplementationOnce(() => {});
    return expect(StringifyAsyncStorage.getItem("key")).rejects.toMatch("error");
  });
});
