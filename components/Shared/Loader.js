import React from "react";
import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        height: "100vh",
      }}
    >
      <BeatLoader color="#36d7b7" />
    </div>
  );
};

export default Loader;
