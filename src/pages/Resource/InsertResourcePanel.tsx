import React, { useState, useEffect, useRef } from "react";
import { Button, message, Input } from "antd";
import { TemplateService } from "../../services/TemplateService";
import { convertMongodbId } from "../../utils/util";
import type { ProFormInstance } from "@ant-design/pro-form";
import { JobService } from "../../services/JobService";
import MyCron from "../../components/MyCron";
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
  const [nowResourceID, setNowResourceID] = useState<any>([]);

  const [content, setContent] = useState<any>([]);
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
    props.record ? setContent(props.record.context) : "";
  }, []);

  const handleChange = (e: any) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    restFormRef.current?.setFieldsValue({ resourceid: props.resourceid });
  }, [props.resourceid]);

  return (
    <>
      <ModalForm<{
        name: string;
      }>
        // initialValues={
        //   props.resourceid
        //     ? {
        //         // name:props.name,
        //         resoure: props.record,
        //       }
        //     : {}
        // }

        title={props.resourceid ? "修改Resource" : "添加Resource"}
        formRef={restFormRef}
        trigger={
          props.resourceid ? (
            <a
              onClick={() => {
                setNowResourceID(props.resourceid);
              }}
            >
              Edit
            </a>
          ) : (
            <Button type="primary">
              <PlusOutlined />
              Add Resource
            </Button>
          )
        }
        modalProps={{
          onCancel: () => {
            props.resourceid ? "" : setNowResourceID([]);
            restFormRef.current?.resetFields();
          },
        }}
        onFinish={async (values: any) => {
          let namespace = values.namespaceInput;
          let token = values.token;
          let resourceName = values.name;

          let data = {
            _id: nowResourceID,
            namespace: namespace,
            token: token,
            resource: resourceName,
            context: content,
          };

          props.resourceid
            ? await ResourceService.updateResource(data).then((res: any) => {
                if (res.responseCode == "20000") {
                  message.success("Update Success");
                  props.reload();
                } else {
                  message.error(" Update Fail. Code:" + res.responseCode);
                }
              })
            : await ResourceService.insertResource(data).then((res: any) => {
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
            disabled={props.resourceid !== undefined}
            options={namespaces}
            width="md"
            name="namespaceInput"
            label="Name Space"
            rules={[{ required: true, message: "请选择Namespace" }]}
            fieldProps={
              {
                //这里使用了select的onSelect方法，必须使用这样的写法来进行调用onSelect方法
                // onSelect: (val) => selectNamespace(val),
              }
            }
            initialValue={props.record ? props.record.namespace : ""}
          />
          <ProFormText
            width="md"
            name="token"
            label="Namespace Token"
            placeholder="input token of namespace"
            rules={[{ required: true, message: "input namespace's Token" }]}
          />
          <ProFormText
            width="md"
            name="name"
            label="Resource Name"
            placeholder="input resource name e.g. namespace:resName"
            rules={[{ required: true, message: "Input resource name" }]}
            disabled={props.resourceid !== undefined}
            initialValue={props.record ? props.record.resource : ""}
          />
        </ProForm.Group>
        <label>Content</label>
        <TextArea
          rows={4}
          style={{ height: 120, marginBottom: 4 }}
          onChange={handleChange}
          value={content}
          // defaultValue={props.record ? props.record.context : ""}
        />
      </ModalForm>
    </>
  );
};
