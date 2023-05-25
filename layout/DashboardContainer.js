import React from "react";
import { LayoutProvider } from "./context/layoutcontext";
import Layout from "./layout";

const DashboardContainer = ({ children }) => {
  return (
    <LayoutProvider>
      <Layout>
        {children}
      </Layout>
    </LayoutProvider>
  );
};

export default DashboardContainer;
