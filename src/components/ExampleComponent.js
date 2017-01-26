import React from 'react';

const ExampleComponent = ({text, handleClick}) => (
  <div>
    <h1>{text}</h1>
    <button onClick={handleClick}>Click me</button>
  </div>
);

export default ExampleComponent;