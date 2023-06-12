import React from "react";
import { Button, Tooltip } from "antd";
import { DownOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
import { ActivityService } from "../../services/ActivityService";

const valueEnum = {
  0: "close",
  1: "running",
  2: "online",
  3: "error",
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ["付小小", "曲丽丽", "林东东", "陈帅帅", "兼某某"];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: "AppName",
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: "2",
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    memo:
      i % 2 === 1
        ? "很长很长很长很长很长很长很长的文字要展示但是要留下尾巴"
        : "简短备注文案",
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: "应用名称",
    width: 80,
    dataIndex: "name",
    render: (_) => <a>{_}</a>,
  },
  {
    title: "容器数量",
    dataIndex: "containers",
    align: "right",
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: "状态",
    width: 80,
    dataIndex: "status",
    initialValue: "all",
    valueEnum: {
      all: { text: "全部", status: "Default" },
      close: { text: "关闭", status: "Default" },
      running: { text: "运行中", status: "Processing" },
      online: { text: "已上线", status: "Success" },
      error: { text: "异常", status: "Error" },
    },
  },
  {
    title: "创建者",
    width: 80,
    dataIndex: "creator",
    valueEnum: {
      all: { text: "全部" },
      付小小: { text: "付小小" },
      曲丽丽: { text: "曲丽丽" },
      林东东: { text: "林东东" },
      陈帅帅: { text: "陈帅帅" },
      兼某某: { text: "兼某某" },
    },
  },
  {
    title: (
      <>
        创建时间
        <Tooltip placement="top" title="这是一段描述">
          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
        </Tooltip>
      </>
    ),
    width: 140,
    key: "since",
    dataIndex: "createdAt",
    valueType: "date",
    sorter: (a, b) => a.createdAt - b.createdAt,
  },
  {
    title: "备注",
    dataIndex: "memo",
    ellipsis: true,
    copyable: true,
  },
  {
    title: "操作",
    width: 180,
    key: "option",
    valueType: "option",
    render: () => [
      <a key="link">链路</a>,
      <a key="link2">报警</a>,
      <a key="link3">监控</a>,
      <TableDropdown
        key="actionGroup"
        menus={[
          { key: "copy", name: "复制" },
          { key: "delete", name: "删除" },
        ]}
      />,
    ],
  },
];

const ActivityManager: React.FC = () => {
  return (
    <ProTable<TableListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);

        let params1 = {
          current: 1,
          pageSize: 10,
          filter: {
            name: "",
            startTime: ["2021-02-28T08:49:21.390Z", "2022-02-28T08:49:21.391Z"],
            status: [0, 1, 2],
          },
        };

        return ActivityService.findActivityByConditions(params1).then((res) => {
          console.log(res);

          return {
            data: res.data.rows,
            success: true,
          };
        });

        // return Promise.resolve({
        //   data: tableListDataSource,
        //   success: true,
        // });
      }}
      rowKey="_id"
      pagination={{
        showQuickJumper: true,
      }}
      search={{
        optionRender: false,
        collapsed: false,
      }}
      dateFormatter="string"
      headerTitle="表格标题"
      toolBarRender={() => [
        <Button key="show">查看日志</Button>,
        <Button key="out">
          导出数据
          <DownOutlined />
        </Button>,
        <Button type="primary" key="primary">
          创建应用
        </Button>,
      ]}
    />
  );
};

export default ActivityManager;
