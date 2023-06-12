import React, { useState } from "react";
import { Button, message, Switch } from "antd";
import ProForm, { ModalForm, ProFormText } from "@ant-design/pro-form";
import { EditableProTable } from "@ant-design/pro-table";
import { PlusOutlined } from "@ant-design/icons";

import { ActionService } from "../../services/ActionService";

import type { ProColumns } from "@ant-design/pro-table";
import type { TypeNamespace } from "./typing";
import { NamespaceService } from "../../services/NamespaceService";

const columns: ProColumns<TypeNamespace>[] = [
  {
    title: "namespace Name",
    dataIndex: "namespace",
    key: "namespace",
    width: 160,
  },
];

export default ({
  reload = () => {},
  record = { name: "", variableTypes: [] },
  title = "Create",
  style = "button",
  layout = "vertical",
  mode = "insert",
}) => {
  return (
    <ModalForm<TypeNamespace>
      title={
        mode === "insert"
          ? "create namespace"
          : mode === "edit"
          ? "edit"
          : "Unknow mode"
      }
      width={1000}
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
      onFinish={async (values) => {
        if (mode === "insert") {
          const token = await NamespaceService.insertNamespace(values);
          message.success("create success. token:  " + token.token);
        }
        reload();
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          name="namespace"
          label="namespace"
          width="lg"
          placeholder="please input namespace"
          rules={[{ required: true, message: "please input namespace" }]}
        />
      </ProForm.Group>
    </ModalForm>
  );
};
