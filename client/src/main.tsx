// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "react-auth-kit";

import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";

import {
  BaseProvider,
  styled,
  DarkTheme,
} from "baseui";

const engine = new Styletron();

const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <BaseProvider
        theme={DarkTheme}
        overrides={{
          AppContainer: { style: { width: "100%", height: "100%" } },
        }}
      >
        <AuthProvider
          authType={"cookie"}
          authName={"_auth"}
          cookieDomain={window.location.hostname}
          cookieSecure={false}
        >
          <Centered>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Centered>
        </AuthProvider>
      </BaseProvider>
    </StyletronProvider>
  </React.StrictMode>
);
