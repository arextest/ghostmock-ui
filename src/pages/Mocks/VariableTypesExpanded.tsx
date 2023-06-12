import React from "react";
import ProTable from "@ant-design/pro-table";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import type { TypeMock } from "./typing";

export default (record: TypeMock) => {
  let dataSource;
  console.log(record);
  if (!record.variableTypes) {
    record.variableTypes = [];
  } else {
    dataSource = record.variableTypes.map((item, index) => {
      return { ...item, key: index };
    });
  }
  return (
    <ProTable
      columns={[
        { title: "风险级别", dataIndex: "pclass", key: "pclass", width: 100 },
        { title: "风险度", dataIndex: "score", key: "score", width: 100 },
        {
          title: "异常应用",
          dataIndex: "app",
          key: "app",
          width: 200,
          copyable: true,
        },
        {
          title: "变更点",
          dataIndex: "description",
          key: "description",
          width: 200,
        },
        // {
        //   title: "必需",
        //   dataIndex: "required",
        //   key: "required",
        //   width: 60,
        //   valueType: "select",
        //   valueEnum: {
        //     true: {
        //       text: "是",
        //     },
        //     false: {
        //       text: "否",
        //     },
        //   },
        // },
        { title: "证据", dataIndex: "evidence", key: "evidence" },
        // {
        //   title: "默认值",
        //   dataIndex: "defaultValue",
        //   key: "defaultValue",
        //   copyable: true,
        //   ellipsis: true,
        // },
      ]}
      headerTitle={false}
      search={false}
      options={false}
      dataSource={dataSource}
      pagination={false}
    />
  );
};
