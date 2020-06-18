import React from "react";
import { YellowBox } from "react-native";
import Routes from "./src/routes";

YellowBox.ignoreWarnings(["Unrecognized WebSocket", "Cannot connect"]);

export default function App() {
  return <Routes />;
}
