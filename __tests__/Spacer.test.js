/**
 * @format
 */

import React from "react";
import { create } from "react-test-renderer";
import Spacer from "../app/components/Spacer";
import { StyleSheet, View } from "react-native";

describe("Spacer Component:", () => {
  it("should have width of 16 and height of 24", () => {
    const testRenderer = create(<Spacer width={16} height={24} />);
    const testInstance = testRenderer.root;
    const flattenedStyle = StyleSheet.flatten(testInstance.findByType(View).props.style);

    expect(flattenedStyle.width).toBe(16);
    expect(flattenedStyle.height).toBe(24);
  });

  it("should be undefined", () => {
    const testRenderer = create(<Spacer width={0} />);
    const testInstance = testRenderer.root;
    const flattenedStyle = StyleSheet.flatten(testInstance.findByType(View).props.style);

    expect(flattenedStyle.width).toBeUndefined();
  });
});
