import React, { useRef, useState } from "react";
import { Popconfirm, message } from "antd";
import ProTable from "@ant-design/pro-table";

import InsertEditPanel from "./InsertEditPanel";
import VariableTypesExpanded from "./VariableTypesExpanded";

import { ActionService } from "../../services/ActionService";
import { convertMongodbId } from "../../utils/util";

import type { ProColumns, ActionType } from "@ant-design/pro-table";
import type { TypeAction, TypeVariableTypes } from "./typing";

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const actionRef = useRef<ActionType>();
  const reload = () => {
    //TODO 清空表单数据
    console.log("reload");
    actionRef?.current?.reload();
  };

  const columns: ProColumns<TypeAction>[] = [
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
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "描述",
      dataIndex: "description",
      search: false,
      ellipsis: true,
    },
    {
      title: "创建时间",
      key: "createTime",
      dataIndex: "createTime",
      valueType: "dateTime",
      sorter: true,
      hideInSearch: true,
      editable: false,
    },
    {
      title: "更新时间",
      key: "updateTime",
      dataIndex: "updateTime",
      valueType: "dateTime",
      sorter: true,
      hideInSearch: true,
      editable: false,
    },
    {
      title: "操作",
      valueType: "option",
      render: (text, record, _, action) => [
        <InsertEditPanel
          key={record._id}
          reload={reload}
          record={record}
          title="编辑"
          mode="edit"
          style="link"
        />,
        <Popconfirm
          key={record._id}
          title="删除此行？"
          onConfirm={async () => {
            await ActionService.deleteAction({ id: record._id });
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
    <ProTable<TypeAction>
      columns={columns}
      actionRef={actionRef}
      rowKey="_id"
      request={async (params = {}, sort, filter) => {
        const res = await ActionService.findAction(params);
        const dataSource = res.data.map((item) => {
          return {
            ...item,
            _id: convertMongodbId(item.id),
          };
        });
        return {
          data: dataSource,
          success: true,
        };
      }}
      editable={{
        type: "single",
        editableKeys,
        // onDelete: async (key, row) => {
        //   // delete action
        //   await ActionService.deleteAction({ id: key });
        //   message.success("删除成功");
        //   reload();
        // },
        onChange: setEditableRowKeys,
      }}
      search={{
        labelWidth: "auto",
      }}
      expandable={{
        expandedRowRender: VariableTypesExpanded,
      }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      headerTitle="Action"
      toolBarRender={() => [
        <InsertEditPanel reload={reload} mode="insert" title="添加Action" />,
      ]}
    />
  );
};
