import * as React from "react";
import { useState } from "react";

function MyBasicComponent(props) {
  const [name, setName] = useState(() => "Foo");

  return (
    <div>
      {props.message || "Hello"}
      {name}! I can run in React, Vue, Solid or Svelte!
    </div>
  );
}

export default MyBasicComponent;
