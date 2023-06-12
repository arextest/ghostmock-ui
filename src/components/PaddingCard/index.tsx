import React, { FC } from "react";

const PaddingCard: FC<any> = (props) => {
  return (
    <div style={{ padding: "20px", background: "#fff" }}>{props.children}</div>
  );
};

export default PaddingCard;
