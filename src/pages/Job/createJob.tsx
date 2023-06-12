import React, { useState, useEffect, useRef } from "react";
import { Button, message } from "antd";
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

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default (props: any) => {
  const [template, setTemplate] = useState<any>([]);
  const [nowtemplate, setNowTemplate] = useState<any>([]);
  const [options, setOptions] = useState<any>([]);
  const [variableTypes, setVariableTypes] = useState<any>([]);
  const formRef = useRef<ProFormInstance>();
  const restFormRef = useRef<ProFormInstance>();
  const [isShowCron, setIsShowCron] = useState<boolean>(true);
  const [isCron, setIsCron] = useState<string | null>(null);
  useEffect(() => {
    TemplateService.findTemplate({}).then((res) => {
      setTemplate(res.data);
      setOptions(
        res.data.map((item: any) => {
          return { value: convertMongodbId(item.id), label: item.name };
        })
      );
    });
  }, []);
  useEffect(() => {
    restFormRef.current?.setFieldsValue({ name: props.name });
  }, [props.name]);

  useEffect(() => {
    props.tableListItem &&
      setVariableTypes(props.tableListItem.variableInstance);
  }, [props.tableListItem]);

  const selectTemplate = (val: any) => {
    setVariableTypes(
      template.filter((item: any) => convertMongodbId(item.id) == val)[0]
        .variableTypes
    );
    setNowTemplate(
      template.filter((item: any) => convertMongodbId(item.id) == val)[0]
    );
  };
  const setCron = (e: string | null) => {
    setIsCron(e);
  };
  return (
    <>
      <ModalForm<{
        name: string;
        company: string;
      }>
        initialValues={
          props.tableListItem && props.name
            ? {
                // name:props.name,
                template: props.tableListItem.template.name,
              }
            : {}
        }
        title={props.name ? "修改Job" : "添加Job"}
        formRef={restFormRef}
        trigger={
          props.name ? (
            <a
              onClick={() => {
                setIsShowCron(false);
                if (props.tableListItem.schedules.length > 0)
                  setIsCron(props.tableListItem.schedules[0].cron);
                setNowTemplate(props.tableListItem.template);
              }}
            >
              {props.name}
            </a>
          ) : (
            <Button type="primary">
              <PlusOutlined />
              添加Job
            </Button>
          )
        }
        modalProps={{
          onCancel: () => {
            props.tableListItem && props.name ? "" : setVariableTypes([]);
            setIsShowCron(true);
            setIsCron(null);
            restFormRef.current?.resetFields();
          },
        }}
        onFinish={async (values: any) => {
          let name = values.name;
          let type = "AIRFLOW";
          let template = {
            updateTime: nowtemplate.updateTime,
            name: nowtemplate.name,
            id: convertMongodbId(nowtemplate.id),
          };
          let variableInstance = variableTypes.map((item: any) => {
            return {
              name: item.name,
              path: item.path,
              type: item.type,
              showForUser:
                props.tableListItem && props.name
                  ? item.showForUser
                  : item.required,
              value: values[item.name],
            };
          });
          let schedules: any[];
          if (isCron !== null) {
            schedules = [{ cron: isCron }];
          } else {
            schedules = [];
          }
          let chartInstance: any[] = [];
          let apiInstance: any[] = [];
          let jobConfig: any[] = [];
          let data = {
            name,
            type,
            template,
            variableInstance,
            chartInstance: [],
            apiInstance: [],
            schedules,
            jobConfig: [],
          };
          props.tableListItem && props.name
            ? await JobService.updateJob({
                ...data,
                id: props.tableListItem.id,
              }).then((res: any) => {
                if (res.responseCode == "20000") {
                  message.success("修改成功");
                  props.isAdd();
                } else {
                  message.error("修改失败");
                }
              })
            : await JobService.insertJob(data).then((res: any) => {
                if (res.responseCode == "20000") {
                  message.success("添加成功");
                  props.isAdd();
                } else {
                  message.error("添加失败");
                }
              });
          formRef.current?.setFieldsValue({ name: name });
          setVariableTypes([]);
          setIsShowCron(true);
          restFormRef.current?.resetFields();
          return true;
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="名称"
            placeholder="请输入名称"
            rules={[{ required: true, message: "请输入名称" }]}
            initialValue={props.tableListItem && props.name ? props.name : ""}
          />
          <ProFormSelect
            disabled={props.tableListItem !== undefined}
            options={options}
            width="md"
            name="template"
            label="Template"
            rules={[{ required: true, message: "请选择Template" }]}
            fieldProps={{
              //这里使用了select的onSelect方法，必须使用这样的写法来进行调用onSelect方法
              onSelect: (val) => selectTemplate(val),
            }}
          />
        </ProForm.Group>
        <label>Cron表达式和执行参数</label>
        <button
          type="button"
          style={{ display: isShowCron ? "block" : "none" }}
          onClick={() => {
            setIsShowCron(false);
            setIsCron("0 0 00 1/1 * ? *");
          }}
        >
          新增
        </button>
        <MyCron isShow={isShowCron} Crons={setCron} isCron={isCron}></MyCron>
        {variableTypes &&
          variableTypes.map((item: any) => {
            return (
              <ProFormText
                key={item.name}
                name={item.name}
                label={item.name}
                initialValue={
                  props.tableListItem && props.name
                    ? item.value
                    : item.defaultValue
                }
                rules={[
                  {
                    required:
                      props.tableListItem && props.name
                        ? item.showForUser
                        : item.required,
                    message: "请输入",
                  },
                ]}
              />
            );
          })}
      </ModalForm>
    </>
  );
};
