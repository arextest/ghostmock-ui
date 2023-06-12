import React, { useRef } from "react";
import { Button, Divider, message, Popconfirm, Tooltip } from "antd";
import { DownOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable, { ActionType, TableDropdown } from "@ant-design/pro-table";
import { ActivityService } from "../../services/ActivityService";
import { AirflowCodeService } from "../../services/AirflowCodeService";
import { useHistory } from "react-router-dom";
import { convertMongodbId } from "../../utils/util";
// import "./index.less";
import { ActionService } from "../../services/ActionService";
import { JobService } from "../../services/JobService";
import CreateJob from "./createJob";

export type TableListItem = {
  id: string;
  key: number;
  name: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
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
        <CreateJob
          name={_}
          tableListItem={tableListItem}
          isAdd={isAdd}
        ></CreateJob>
      ),
    },
    {
      title: "type",
      dataIndex: "type",
    },
    {
      title: "操作",
      render(_, tableListItem) {
        return (
          <>
            {tableListItem.valid == true ? (
              <Popconfirm
                // key={tableListItem.id}
                title="触发？"
                onConfirm={async () => {
                  JobService.triggerJob({ jobId: tableListItem.id }).then(
                    (res) => {
                      reload();
                    }
                  );
                }}
                okText="确定"
                cancelText="取消"
              >
                <a href="#">触发</a>
              </Popconfirm>
            ) : (
              <span style={{ color: "rgba(0, 0, 0, 0.25)" }}>触发</span>
            )}
            <Divider type="vertical" />
            <Popconfirm
              // key={tableListItem.id}
              title="删除此行？"
              onConfirm={async () => {
                JobService.deleteJob({ id: tableListItem.id }).then((res) => {
                  reload();
                });
              }}
              okText="确定"
              cancelText="取消"
            >
              <a href="#" style={{ color: "red" }}>
                删除
              </a>
            </Popconfirm>
          </>
        );
        // return <a style={{color:'red'}} onClick={()=>{AirflowCodeService.deleteAirflowCode({id:tableListItem.id}).then(res=>{console.log(res)})}}>删除</a>
      },
    },
  ];

  const isAdd = () => {
    reload();
  };

  return (
    <ProTable<TableListItem>
      columns={columns}
      actionRef={actionRef}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        let params1 = {
          id: params.id,
          name: params.name,
          actionId: params.actionId,
        };
        return JobService.findJob(params1).then((res) => {
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
      headerTitle="Job"
      toolBarRender={() => [
        // <Button key="show">查看日志</Button>,
        // <Button key="out">
        //   导出数据
        //   <DownOutlined />
        // </Button>,
        // <Button
        //   type="primary"
        //   key="primary"
        //   onClick={() => history.push("/airflow-code/create")}
        // >
        //   创建
        // </Button>,
        <CreateJob isAdd={isAdd}></CreateJob>,
      ]}
    />
  );
};

export default ActivityManager;
