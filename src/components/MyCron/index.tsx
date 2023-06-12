import { Button } from "antd";
import React, { Component, useState, useEffect } from "react";
import Cron from "react-cron-generator";
import "./cron-builder.css";
const Demo = (props: any) => {
  const [value, setValue] = useState<string | null>(null);
  const { isShow, Crons, isCron } = props;
  useEffect(() => {
    setValue(isCron);
  }, [props.isCron]);
  return (
    <div style={{ display: !isShow ? "block" : "none" }}>
      <Cron
        onChange={(e: any) => {
          setValue(e);
        }}
        value={value}
        showResultText={true}
        showResultCron={true}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
          marginTop: "4px",
        }}
      >
        <div style={{ fontWeight: "bold" }}>值：{isCron}</div>
        <div>
          <Button
            key="getValue"
            type="primary"
            onClick={() => {
              Crons(value);
            }}
          >
            生成
          </Button>
          <Button
            key="cencel"
            style={{ marginRight: 10 }}
            onClick={() => {
              setValue(null);
              Crons(null);
            }}
          >
            重置
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Demo;

// import { Input, Divider } from 'antd'
// import React, { useRef, useState, useCallback, useEffect } from 'react'
// import { Cron, CronError } from 'react-js-cron'
// import { InfoCircleOutlined } from "@ant-design/icons";
// const Demo = (props:any) => {
//   const inputRef = useRef<Input>(null)
//   const [value, setValue] = useState<string | null>(null);
//   const customSetValue = useCallback((newValue: string) => {
//     setValue(newValue)
//     Crons(newValue)
//     inputRef.current?.setValue(newValue)
//   }, [inputRef])
//   const [error, onError] = useState<CronError>()
//   const { isShow, Crons, isCron } = props
//   useEffect(() => {
//     setValue(isCron)
//   }, [props.isCron])
//   return <>
//   <div style={{ display: !isShow ? "block" : "none" }}>
//     <Input ref={inputRef}
//       onBlur={(event) => { setValue(event.target.value);Crons(event.target.value) }}
//       onPressEnter={() => { setValue(inputRef.current?.input.value || '');Crons(inputRef.current?.input.value || '') }}
//     />
//     <Divider>OR</Divider>
//     <Cron value={value} setValue={customSetValue} onError={onError} />
//     </div>
//     </>
// }

// export default Demo
// function MyCron(props: any) {
//   let cronFns: any;
//   let [value, setValue] = React.useState<string | null>(null);
//   const { isShow, Cron, isCron } = props;
//   useEffect(() => {
//     setValue(isCron)
//   }, [props.isCron])

//   return (
//     <div className="App" style={{ display: !isShow ? "block" : "none" }}>
//       <QnnReactCron
//         value={value}
//         onOk={(value: any) => {
//           console.log("cron:", value);
//         }}
//         getCronFns={(_cronFns: any) => {
//           cronFns = _cronFns;
//         }}
//         footer={[
//           <Button
//             key="cencel"
//             style={{ marginRight: 10 }}
//             onClick={() => {
//               setValue(null);
//               Cron(null);
//             }}
//           >
//             重置
//           </Button>,
//           <Button
//             key="getValue"
//             type="primary"
//             onClick={() => {
//               setValue(cronFns.getValue());
//               Cron(cronFns.getValue());
//             }}
//           >
//             生成
//           </Button>,
//         ]}
//       />
//       <div style={{ textAlign: "center" }}>值：{value}</div>
//     </div>
//   );
// }
