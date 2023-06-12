import React from "react";
import ProTable from "@ant-design/pro-table";
import type { TypeTemplate } from "./typing";

export default (record: TypeTemplate) => {
  let dataSource;
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
        { title: "可选参数名称", dataIndex: "name", key: "name", width: 200 },
        { title: "类型", dataIndex: "type", key: "type", width: 100 },
        {
          title: "必需",
          dataIndex: "required",
          key: "required",
          width: 60,
          valueType: "select",
          valueEnum: {
            true: {
              text: "是",
            },
            false: {
              text: "否",
            },
          },
        },
        { title: "路径", dataIndex: "path", key: "path" },
        {
          title: "默认值",
          dataIndex: "defaultValue",
          key: "defaultValue",
          copyable: true,
          ellipsis: true,
        },
      ]}
      headerTitle={false}
      search={false}
      options={false}
      dataSource={dataSource}
      pagination={false}
    />
  );
};
