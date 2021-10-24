import React from "react";
import { View } from "react-native";

const Spacer = ({ width, height }) => {
  return (
    <View
      style={[width ? { width } : null, height ? { height } : null]}
    />
  );
};

export default Spacer;
