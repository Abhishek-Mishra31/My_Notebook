import React from "react";
import { Addnote } from "./Addnote";

export default function Home(props) {
  const {showAlert} = props;
  return (
    <div>
      This is Home section
      <Addnote/>
    </div>
  );
}
