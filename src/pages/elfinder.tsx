import { Alert, Button, Result } from "antd";
import React from "react";

const Elfinder: React.FC = () => (
  <div>
    <Alert type="info" message="选择文件右击查看详情" showIcon></Alert>
    <iframe
      src="http://.com/elFinder/elfinder.src.html"
      style={{ width: "100%", height: "70vh", border: "none" }}
    ></iframe>
  </div>
);

export default Elfinder;
