import React from "react";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/layout/layout.scss";
import "../styles/demo/Demos.scss";

export default function MyApp({ Component, pageProps }) {
  return (
  
    <Component {...pageProps} />

  );
}
