import React, { useState } from "react";
import { Button, message,  } from "antd";
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-components;
import { EditableProTable } from '@ant-design/pro-components;
import { PlusOutlined } from "@ant-design/icons";

import { ActionService } from "../../services/ActionService";

import type { ProColumns } from "@ant-design/pro-components";
import type {
  TypeAction,
  TypeVariableTypes,
  TypeDetailActionForm,
} from "./typing";

const columns: ProColumns<TypeVariableTypes>[] = [
  { title: "名称", dataIndex: "name", key: "name", width: 160 },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
    width: 120,
    valueType: "select",
    valueEnum: {
      STRING: {
        text: "STRING",
      },
      NUMBER: {
        text: "NUMBER",
      },
    },
  },
  {
    title: "必需",
    dataIndex: "required",
    width: 64,
    renderFormItem: (_: any, row: any) => (
      <Switch
        checked={row.record?.required}
        onChange={(checked: boolean, event: Event) => {
          console.log(checked, event, row);
        }}
      />
    ),
  },
  { title: "路径", dataIndex: "path", key: "path" },
  {
    title: "默认值",
    dataIndex: "defaultValue",
    key: "defaultValue",
    copyable: true,
    ellipsis: true,
  },
  {
    title: "操作",
    valueType: "option",
    width: 120,
    render: (text:any, record:any, _: any, action: any) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
    ],
  },
];

export default ({
  reload = () => {},
  record = { name: "", variableTypes: [] },
  title = "添加",
  style = "button",
  layout = "vertical",
  mode = "insert",
}: TypeDetailActionForm) => {
  record = Object.assign({}, record);
  record.variableTypes = record.variableTypes.map((e) => {
    return { ...e, id: (Math.random() * 10e10).toFixed(0) };
  });

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    record.variableTypes.map((item) => item.id)
  );
  return (
    <ModalForm<TypeAction>
      title={
        mode === "insert" ? "新建" : mode === "edit" ? "编辑" : "Unknow mode"
      }
      width={1000}
      layout={layout}
      trigger={
        style === "button" ? (
          <Button type="primary">
            <PlusOutlined />
            {title}
          </Button>
        ) : style === "link" ? (
          <a>{title}</a>
        ) : (
          <>{title}</>
        )
      }
      modalProps={{
        onCancel: () => {
          console.log("modalCancel");
        },
      }}
      onFinish={async (values:any) => {
        console.log(values);
        console.log(record);
        if (!values.variableTypes) values.variableTypes = [];
        if (mode === "insert") {
          await ActionService.insertAction(values);
          message.success("创建成功");
        } else if (mode === "edit") {
          await ActionService.updateAction({
            ...values,
            id: record._id,
            createTime: record.createTime,
          });
          message.success("编辑成功");
        }
        reload();
        return true;
      }}
      initialValues={record}
    >
      <ProForm.Group>
        <ProFormText
          name="name"
          label="名称"
          width="lg"
          placeholder="请输入名称"
          rules={[{ required: true, message: "请输入名称" }]}
        />

        <ProFormText
          name="description"
          label="描述"
          width="lg"
          placeholder="请输入描述"
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText
          name="requestType"
          label="请求类型"
          width="lg"
          placeholder="请输入requestType"
        />

        <ProFormText
          name="responseType"
          label="响应类型"
          width="lg"
          placeholder="请输入responseType"
        />
      </ProForm.Group>

      <ProForm.Item
        label="可选参数"
        name="variableTypes"
        trigger="onValuesChange"
      >
        <EditableProTable<TypeVariableTypes>
          rowKey="id"
          toolBarRender={false}
          columns={columns}
          recordCreatorProps={{
            newRecordType: "dataSource",
            position: "top",
            record: () => {
              return {
                id: (Math.random() * 10e10).toFixed(0),
                name: "",
                required: true,
              };
            },
          }}
          editable={{
            type: "multiple",
            editableKeys,
            actionRender: (row:any, _:any, dom:any) => {
              return [dom.delete];
            },
            onChange: setEditableRowKeys,
          }}
        />
      </ProForm.Item>
    </ModalForm>
  );
};
