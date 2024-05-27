import React, { useState } from "react";
import Class from "./AddClassForm";

const ParentComponent = () => {
  // Define the function to be passed to the Class component
  const handleClassAdded = () => {
    console.log("Class added!");
    // You can include any necessary logic here
  };

  return (
    <div>
      {/* Render the Class component and pass the handleClassAdded function as a prop */}
      <Class onClassAdded={handleClassAdded} />
    </div>
  );
};

export default ParentComponent;
