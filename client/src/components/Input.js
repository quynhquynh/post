import React from "react";

export default ({ value, name, type = "text", handleInput, placeholder }) => (
  <input
    type={type}
    value={value}
    name={name}
    onChange={e => handleInput(e)}
    placeholder={placeholder}
  />
);
