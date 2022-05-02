import React from "react";
import Modal from "./modal";
const NotFound = () => {
  return (
    <div className="container">
      <Modal
        desc="You reached an empty planet."
        btnLabel="Go back"
        link="/campgrounds"
      />
    </div>
  );
};

export default NotFound;