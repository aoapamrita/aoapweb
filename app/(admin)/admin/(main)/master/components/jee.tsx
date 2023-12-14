import React from "react";
import JeeCrud from "./jeecrud";
import JeeList from "./jeelist";

const Jee = () => {
  return (
    <div>
      <JeeCrud />
      <div className="h-10"></div>
      <JeeList />
    </div>
  );
};

export default Jee;
