import React, { FunctionComponent } from "react";
import Header from "./Header";

const Layout: FunctionComponent = (props) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};

export default Layout;
