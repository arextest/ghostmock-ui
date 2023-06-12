import { Button, Col, Result, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "antd";
import { codeDemo1 } from "./code";

const TextArea = Input.TextArea;

const Chart = () => {
  const chartRef = useRef();

  const [code, setCode] = useState(codeDemo1);

  useEffect(() => {
    eval(code);
  }, []);

  return (
    <div>
      <Row>
        <Col span={12}>
          <Button
            onClick={() => {
              eval(code);
            }}
          >
            运行
          </Button>
          <TextArea
            onChange={(val) => {
              setCode(val.target.value);
            }}
            autoSize={true}
            value={code}
          />
        </Col>
        <Col span={12}>
          <div
            ref={chartRef}
            className="asss"
            style={{ width: "100%", height: "500px" }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Chart;
