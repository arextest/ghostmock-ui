import React, { useEffect, useRef, useState } from "react";
import { Alert, Descriptions, message, Table } from "antd";
import ProForm, {
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
} from "@ant-design/pro-form";
import PaddingCard from "../../components/PaddingCard";
// @ts-ignore
import CodeMirror from "codemirror";
import { AirflowCodeService } from "../../services/AirflowCodeService";
import { ActionService } from "../../services/ActionService";
import { convertMongodbId } from "../../utils/util";
import { useHistory } from "react-router-dom";
import { FooterToolbar } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
// defaultValue: null
// name: "default"
// path: "jsonPath"
// required: true
// type: "NUMBER"
const columns = [
  {
    title: "默认值",
    dataIndex: "defaultValue",
    render(_) {
      return String(_);
    },
  },
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "路径",
    dataIndex: "path",
  },
  {
    title: "必填",
    dataIndex: "required",
    render(_) {
      return String(_);
    },
  },
  {
    title: "类型",
    key: "type",
    dataIndex: "type",
  },
];

export default (props: any) => {
  const airflowCodeId = useRef<string>(props.match.params.id || "");
  const formRef = useRef<any>();
  const [code, setCode] = useState<any>("");
  const [actionOptions, setActionOptions] = useState<any>([]);
  const history = useHistory();
  const [actionDetail, setActionDetail] = useState<any>({});

  useEffect(() => {
    setTimeout(() => {
      MockService.findAction({}).then((res) => {
        setActionOptions(
          res.data.map((item: any) => ({
            label: item.name,
            value: convertMongodbId(item.id),
          }))
        );
      });

      AirflowCodeService.findAirflowCode({
        airflowCodeId: airflowCodeId.current,
      }).then((res: any) => {
        // 拉action信息
        const editor = CodeMirror.fromTextArea(
          document.getElementById("editor"),
          {
            lineNumbers: true, //是否在编辑器左侧显示行号
            matchBrackets: true, // 括号匹配
            mode: "text/x-python", //python++
            indentUnit: 4, // 缩进单位为4
            indentWithTabs: true, //
            smartIndent: true, //自动缩进，设置是否根据上下文自动缩进（和上一行相同的缩进量）。默认为true。
            styleActiveLine: true, // 当前行背景高亮
            theme: "darcula", // 编辑器主题
          }
        );

        if (airflowCodeId.current === "") {
        } else {
          MockService.findAction({ actionIds: [res[0].actionId] }).then(
            (resxx) => {
              setActionDetail(resxx.data[0]);
            }
          );

          formRef.current.setFieldsValue({
            name: res[0].name,
            actionId: res[0].actionId,
          });
          editor.setValue(
            res[0].imports.join("\n") + "\n# segmentation\n" + res[0].code
          );
          setCode(
            res[0].imports.join("\n") + "\n# segmentation\n" + res[0].code
          );
        }
        editor.setSize("100%", "600px"); //设置代码框大小
        editor.on("change", (coder: any) => {
          setCode(coder.getValue());
        });
      });
    }, 100);
  }, []);

  function onCopy(certB64: string) {
    let oInput = document.createElement("input");
    oInput.value = certB64;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    oInput.remove();
    message.success("已复制至剪切板");
  }
  return (
    <PaddingCard>
      <ProForm<{
        name: string;
        actionId: string;
        useMode?: string;
      }>
        onFinish={async (values) => {
          await waitTime(100);
          const rel = code.split("\n# segmentation\n");
          if (airflowCodeId.current === "") {
            const rel = code.split("\n# segmentation\n");
            AirflowCodeService.insertAirflowCode({
              actionId: values.actionId,
              code: rel[1],
              imports: rel[0].split("\n"),
              name: values.name,
            }).then((res) => {
              if (res.responseCode === 20000) {
                message.success("提交成功");
                setTimeout(() => {
                  history.push("/airflow-code");
                }, 500);
              } else {
                message.error("提交失败");
              }
            });
          } else {
            const rel = code.split("\n# segmentation\n");
            AirflowCodeService.updateAirflowCode({
              id: airflowCodeId.current,
              actionId: values.actionId,
              code: rel[1],
              imports: rel[0].split("\n"),
              name: values.name,
            }).then((res) => {
              if (res.responseCode === 20000) {
                message.success("提交成功");
                setTimeout(() => {
                  history.push("/airflow-code");
                }, 500);
              } else {
                message.error("提交失败");
              }
            });
          }
        }}
        submitter={{
          render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
        }}
        params={{}}
        formRef={formRef}
      >
        <p className="basic-info form-title">基础信息</p>
        <ProForm.Group>
          <ProFormText
            width="sm"
            name="name"
            label="名称"
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormSelect
            disabled={airflowCodeId.current !== ""}
            options={actionOptions}
            width="sm"
            name="actionId"
            label="Action"
            required={true}
            rules={[
              {
                required: true,
              },
            ]}
            fieldProps={{
              onChange: (e) => {
                MockService.findAction({ actionIds: [e] }).then((resxx) => {
                  setActionDetail(resxx.data[0]);
                });
              },
            }}
          />
        </ProForm.Group>
        <div
          style={{ display: airflowCodeId.current === "" ? "block" : "block" }}
        >
          <Descriptions title={"关联Action详情"}>
            <Descriptions.Item label="name">
              {actionDetail.name}
            </Descriptions.Item>
            <Descriptions.Item label="description">
              {actionDetail.description}
            </Descriptions.Item>
            <Descriptions.Item label="requestType">
              {actionDetail.requestType}
            </Descriptions.Item>
            <Descriptions.Item label="responseType">
              {actionDetail.responseType}
            </Descriptions.Item>
          </Descriptions>
          <Table
            rowKey="id"
            dataSource={actionDetail.variableTypes}
            columns={columns}
            pagination={false}
            size="small"
            bordered={false}
          />
          <div style={{ height: "20px" }}></div>
        </div>
        {/*<p>code</p>*/}
        <p className="code form-title">Code</p>
        <Alert
          message={
            <div>
              import 部分与 code 部分请用{" "}
              <a
                onClick={() => {
                  onCopy("# segmentation");
                }}
              >
                # segmentation
              </a>{" "}
              分隔
            </div>
          }
          type="info"
          showIcon
          style={{ marginBottom: "10px" }}
        />
        <textarea id="editor" name="editor" />
      </ProForm>
    </PaddingCard>
  );
};
