import React, { useRef, useState, ReactText, useEffect } from "react";
import { Button, Space, Tag, Progress, Popconfirm, message } from "antd";

import { MockService } from "../../services/MockService";
import { convertMongodbId } from "../../utils/util";

import type { ProColumns, ActionType } from "@ant-design/pro-table";
import type { TypeMock, TypeVariableTypes } from "./typing";
import requset from "utils/request";
import { API } from "services/typings";
import { conversionSubmitValue } from "@ant-design/pro-utils";
import ProTable from "@ant-design/pro-table";
import InsertMockPanel from "./InsertMockPanel";

export default () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>(
    []
  );
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [allData, setAllData] = useState<any>();
  const actionRef = useRef<ActionType>();
  const reload = () => {
    console.log("reload");
    actionRef?.current?.reload();
  };

  const columns: ProColumns<TypeMock>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "Id",
      dataIndex: "_id",
      search: false,
      copyable: true,
      editable: false,
    },
    {
      title: "Namespace",
      dataIndex: "namespace",
      editable: false,
      sorter: true,
    },
    {
      title: "Request Type",
      dataIndex: "mocktype",
      search: false,
      ellipsis: true,
    },
    {
      title: "Short Mock URL",
      dataIndex: "mockurl",
      search: false,
    },
    {
      title: "Mock URL",
      dataIndex: "url",
      search: false,
      sorter: true,
    },
    {
      title: "Scripts",
      dataIndex: "mockscript",
      search: false,
      ellipsis: true,
    },
    {
      title: "Operation",
      valueType: "option",
      render: (text, record, _, action) => [
        <InsertMockPanel
          key={record._id}
          mockid={record._id}
          reload={reload}
          record={record}
          mocks={allData}
          title="Edit"
          mode="edit"
          style="link"
        />,
        <Popconfirm
          key={record._id}
          title="Delete the resource？"
          onConfirm={async () => {
            await MockService.deleteMOCK({ namespace: record.namespace });
            message.success("Delete success");
            reload();
          }}
          okText="OK"
          cancelText="Cacel"
        >
          <a href="#">Delete</a>
        </Popconfirm>,
      ],
    },
  ];
  return (
    <ProTable<TypeMock>
      columns={columns}
      actionRef={actionRef}
      rowKey="_id"
      // request={(params, sorter, filter) => {
      request={async (params = {}, sort, filter) => {
        const res = await MockService.findALLMocks();
        const dataSource = res.result.map((item: any) => {
          return {
            _id: item._id,
            namespace: item.namespace,
            mocktype: item.mocktype.toUpperCase(),
            mockurl: item.mockurl,
            url: "/" + item.namespace + item.mockurl,
            mockscript: item.script,
          };
        });

        setAllData(dataSource);
        return {
          data: dataSource,
          success: true,
        };
      }}
      editable={{}}
      search={{
        labelWidth: "auto",
      }}
      expandable={
        {
          // expandedRowRender: VariableTypesExpanded,
        }
      }
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      headerTitle="Mocks In All NameSpaces"
      toolBarRender={() => [
        <InsertMockPanel
          reload={reload}
          mode="insert"
          title="Update Mock Pattern"
          allNodes={allData}
        />,
      ]}
    />
  );
};
