import React, { useEffect, useRef, useState } from "react";
import { Popconfirm, message } from "antd";
import ProTable from "@ant-design/pro-table";

import type { ProColumns, ActionType } from "@ant-design/pro-table";
import type { TypeResource } from "./typing";
import { ResourceService } from "../../services/ResourceService";
import InsertResourcePanel from "./InsertResourcePanel";
import Tooltip from "antd/es/tooltip";

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  const [allResources, setAllResources] = useState<TypeResource[]>([]);
  const actionRef = useRef<ActionType>();
  const reload = () => {
    actionRef?.current?.reload();
  };

  useEffect(() => {
    let resResources: TypeResource[];
    (async () => {
      resResources = (await ResourceService.findResources()).resources.map(
        (item) => {
          return {
            ...item,
            context: JSON.stringify(item.context),
          };
        }
      );
      setAllResources(resResources);
    })();
  }, []);

  const columns: ProColumns<TypeResource>[] = [
    {
      title: "ID",
      dataIndex: "_id",
      editable: false,
      width: 250,
    },
    {
      title: "Namespace",
      dataIndex: "namespace",
      copyable: true,
      editable: false,
      width: 200,
    },
    {
      title: "Resource Name",
      dataIndex: "resource",
      copyable: true,
      sorter: false,
      editable: false,
    },
    {
      title: "Content",
      dataIndex: "context",
      sorter: false,
      width: 301,
      editable: false,
      ellipsis: true,
      render: (value, record) => {
        return (
          <Tooltip title={record.context}>
            <div
              className="ellipsis"
              style={{ float: "left", maxWidth: "100%" }}
            >
              {record.context ? record.context.substring(0, 300) : ""}
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: "Operation",
      valueType: "option",
      render: (text, record, _, action) => [
        <InsertResourcePanel
          key={record._id}
          resourceid={record._id}
          reload={reload}
          record={record}
          resources={allResources}
          title="Edit"
          mode="edit"
          style="link"
        />,
        <Popconfirm
          key={record._id}
          title="Delete the resource？"
          onConfirm={async () => {
            await ResourceService.deleteResource({
              namespace: record.namespace,
              resouce: record.resource,
            });
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
    <ProTable<TypeResource>
      columns={columns}
      actionRef={actionRef}
      style={{ overflow: "hidden", wordWrap: "break-word" }}
      rowKey="_id"
      request={async (params = {}, sort, filter) => {
        const res = await ResourceService.findResources();
        const dataSource = res.resources.map((item) => {
          return {
            ...item,
            context: JSON.stringify(item.context),
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
        onChange: setEditableRowKeys,
      }}
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
      headerTitle="Resources"
      toolBarRender={() => [
        <InsertResourcePanel
          reload={reload}
          mode="insert"
          title="Update Resource"
          allNodes={allResources}
        />,
      ]}
    />
  );
};
