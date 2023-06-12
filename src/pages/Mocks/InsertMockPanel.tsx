import React, { useState, useEffect, useRef } from "react";
import { Button, message, Input } from "antd";
import { TemplateService } from "../../services/TemplateService";
import { convertMongodbId } from "../../utils/util";
import type { ProFormInstance } from "@ant-design/pro-form";
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
} from "@ant-design/pro-form";
import { PlusOutlined } from "@ant-design/icons";
import Item from "antd/lib/list/Item";
import { NamespaceService } from "../../services/NamespaceService";
import { ResourceService } from "../../services/ResourceService";
import { MockService } from "../../services/MockService";
const { TextArea } = Input;

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default (props: any) => {
  const [namespaces, setNamespaces] = useState<any>([]);
  const [newMockID, setNowMockID] = useState<any>([]);

  const [mockscript, setMockscript] = useState<any>([]);
  const formRef = useRef<ProFormInstance>();
  const restFormRef = useRef<ProFormInstance>();

  useEffect(() => {
    NamespaceService.findNamespaces().then((res) => {
      setNamespaces(
        res.namespaces.map((item: any) => {
          return item.namespace;
        })
      );
    });
    props.record ? setMockscript(props.record.mockscript) : "";
  }, []);

  const handleChange = (e: any) => {
    setMockscript(e.target.value);
  };

  useEffect(() => {
    restFormRef.current?.setFieldsValue({ mockid: props.mockid });
  }, [props.mockid]);

  return (
    <>
      <ModalForm<{
        name: string;
      }>
        title={props.mockid ? "Update Mock Patterns" : "Append Mock Patterns"}
        formRef={restFormRef}
        trigger={
          props.mockid ? (
            <a
              onClick={() => {
                setNowMockID(props.mockid);
              }}
            >
              Edit
            </a>
          ) : (
            <Button type="primary">
              <PlusOutlined />
              Append Mock Pattern
            </Button>
          )
        }
        modalProps={{
          onCancel: () => {
            props.mockid ? "" : setNowMockID([]);
            restFormRef.current?.resetFields();
          },
        }}
        onFinish={async (values: any) => {
          let namespace = values.namespaceInput;
          let token = values.token;
          let mockurl = values.mockurl;
          let mocktype = values.mocktype;

          let data = {
            _id: newMockID,
            namespace: namespace,
            token: token,
            mocktype: mocktype,
            mockurl: mockurl,
            script: mockscript,
          };

          props.mockid
            ? await MockService.updateMock(data).then((res: any) => {
                if (res.responseCode == "20000") {
                  message.success("Update Success");
                  props.reload();
                } else {
                  message.error(" Update Fail. Code:" + res.responseCode);
                }
              })
            : await MockService.insertMock(data).then((res: any) => {
                if (res.responseCode == "20000") {
                  message.success("添加成功");
                  props.reload();
                } else {
                  message.error("添加失败");
                }
              });

          // restFormRef.current?.resetFields();
          return true;
        }}
      >
        <ProForm.Group>
          <ProFormSelect
            disabled={props.mockid !== undefined}
            options={namespaces}
            width="md"
            name="namespaceInput"
            label="Name Space"
            rules={[{ required: true, message: "请选择Namespace" }]}
            initialValue={props.record ? props.record.namespace : ""}
          />
          <ProFormText
            width="md"
            name="token"
            label="Namespace Token"
            placeholder="input token of namespace"
            rules={[{ required: true, message: "input namespace's Token" }]}
          />
          <ProFormSelect
            disabled={props.resourceid !== undefined}
            options={["POST", "GET"]}
            width="md"
            name="mocktype"
            label="request type"
            rules={[{ required: true, message: "请选择请求类型" }]}
            fieldProps={
              {
                //这里使用了select的onSelect方法，必须使用这样的写法来进行调用onSelect方法
                // onSelect: (val) => selectNamespace(val),
              }
            }
            initialValue={props.record ? props.record.mocktype : ""}
          />
          <ProFormText
            width="md"
            name="mockurl"
            label="URL INFO"
            placeholder="input short url. URL: /namespace/shorturl"
            rules={[{ required: true, message: "Input resource name" }]}
            // disabled={props.mockid !== undefined}
            initialValue={props.record ? props.record.mockurl : ""}
          />
        </ProForm.Group>
        <label>Script</label>
        <TextArea
          rows={4}
          style={{ height: 120, marginBottom: 4 }}
          onChange={handleChange}
          value={mockscript}
        />
      </ModalForm>
    </>
  );
};
