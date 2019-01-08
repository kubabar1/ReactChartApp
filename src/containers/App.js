import React from "react";
import { MenuNav } from "./MenuNav/MenuNav";
import MainContent from "./MainContent/MainContent";

export class App extends React.Component {

  render() {
    return (
      <main className="row m-0 p-0">
        <MenuNav/>
        <MainContent/>
      </main>
    );
  }
}
