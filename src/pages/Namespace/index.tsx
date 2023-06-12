import React, { useRef, useState } from "react";
import { Popconfirm, message } from "antd";
import ProTable from "@ant-design/pro-table";

import InsertEditPanel from "./InsertEditPanel";
import { convertMongodbId } from "../../utils/util";
import type { ProColumns, ActionType } from "@ant-design/pro-table";
import { NamespaceService } from "../../services/NamespaceService";
import { TypeNamespace } from "./typing";

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const actionRef = useRef<ActionType>();
  const reload = () => {
    console.log("reload");
    actionRef?.current?.reload();
  };

  const columns: ProColumns<TypeNamespace>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "Id",
      dataIndex: "_id",
      copyable: true,
      editable: false,
    },
    {
      title: "NameSpace",
      dataIndex: "namespace",
      copyable: true,
      editable: false,
    },
    {
      title: "操作",
      valueType: "option",
      render: (text, record, _, action) => [
        <Popconfirm
          key={record._id}
          title="删除此行？"
          onConfirm={async () => {
            await NamespaceService.deleteNamespace({ id: record._id });
            message.success("删除成功");
            reload();
          }}
          okText="确定"
          cancelText="取消"
        >
          <a href="#">删除</a>
        </Popconfirm>,
      ],
    },
  ];
  return (
    <ProTable<TypeNamespace>
      search={false}
      columns={columns}
      actionRef={actionRef}
      rowKey="_id"
      request={async (params = {}, sort, filter) => {
        const res = await NamespaceService.findNamespaces();
        const dataSource = res.namespaces.map((item: any) => {
          return {
            ...item,
            _id: item._id,
            // _id: convertMongodbId(item.id),
          };
        });
        return {
          data: dataSource,
          success: true,
        };
      }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      // headerTitle="Namespace"
      toolBarRender={() => [
        <InsertEditPanel
          reload={reload}
          mode="insert"
          title="Create Namespace"
        />,
      ]}
    />
  );
};
