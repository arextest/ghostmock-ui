import React, { useRef } from "react";
import { Button, Popconfirm, Tooltip } from "antd";
import { DownOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
import { ActivityService } from "../../services/ActivityService";
import { AirflowCodeService } from "../../services/AirflowCodeService";
import { useHistory } from "react-router-dom";
import { convertMongodbId } from "../../utils/util";
import "./index.less";
import { ActionService } from "../../services/ActionService";
import { JobService } from "../../services/JobService";

export type TableListItem = {
  id: string;
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};

const ActivityManager: React.FC = () => {
  const history = useHistory();
  const actionRef = useRef<any>();
  const reload = () => {
    console.log("reload");
    actionRef?.current?.reload();
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: "id",
      dataIndex: "id",
      render: (_, tableListItem) => {
        return <p>{tableListItem.id}</p>;
      },
    },
    {
      title: "名称",
      dataIndex: "name",
      render: (_, tableListItem) => (
        <a
          onClick={() => {
            history.push(`/airflow-code/${tableListItem.id}/edit`);
          }}
        >
          {_}
        </a>
      ),
    },
    {
      title: "actionId",
      dataIndex: "actionId",
    },
    {
      title: "删除",
      render(_, tableListItem) {
        return (
          <Popconfirm
            key={tableListItem.id}
            title="删除此行？"
            onConfirm={async () => {
              AirflowCodeService.deleteAirflowCode({
                id: tableListItem.id,
              }).then((res) => {
                reload();
              });
            }}
            okText="确定"
            cancelText="取消"
          >
            <a href="#">删除</a>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <ProTable<TableListItem>
      actionRef={actionRef}
      columns={columns}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        let params1 = {
          id: params.id,
          name: params.name,
          actionId: params.actionId,
        };
        return AirflowCodeService.findAirflowCode(params1).then((res) => {
          console.log(res);
          return {
            data: res,
            success: true,
          };
        });
        // return Promise.resolve({
        //   data: tableListDataSource,
        //   success: true,
        // });
      }}
      rowKey="id"
      pagination={{
        showQuickJumper: true,
      }}
      search={{
        optionRender: false,
        collapsed: false,
      }}
      dateFormatter="string"
      headerTitle="Airflow Code"
      toolBarRender={() => [
        // <Button key="show">查看日志</Button>,
        // <Button key="out">
        //   导出数据
        //   <DownOutlined />
        // </Button>,
        <Button
          type="primary"
          key="primary"
          onClick={() => history.push("/airflow-code/create")}
        >
          创建
        </Button>,
      ]}
    />
  );
};

export default ActivityManager;
