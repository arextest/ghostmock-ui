import { Button, Result, Select } from "antd";
import React, { useState } from "react";
const { Option } = Select;

const ChartIframe: React.FC = () => {
  return (
    <div>
      <iframe
        src="http://elfinder.com/elFinder/files/bug.html"
        style={{ width: "100%", height: "70vh", border: "none" }}
      ></iframe>
    </div>
  );
};

export default ChartIframe;
