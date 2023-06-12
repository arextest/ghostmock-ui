import React, { useRef } from "react";
import { Button, message, Popconfirm, Tooltip } from "antd";
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
import { TaskService } from "../../services/TaskService";

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

  //   endTime: null
  // id: {timestamp: 1631075529, counter: 6391025, machineIdentifier: 3057696, processIdentifier: 6736,…}
  // jobRecord: {,…}
  // log: null
  // startTime: "2021-08-20 17:02:15.51"
  // state: "SUCCESS"
  // userName: ""

  const columns: ProColumns<TableListItem>[] = [
    {
      title: "Id",
      dataIndex: "id",
      render: (_, tableListItem) => {
        return <p>{tableListItem.id}</p>;
      },
    },
    {
      title: "日志",
      dataIndex: "log",
    },
    {
      title: "Job",
      // dataIndex: "jobRecord.id.date",
      render(_, item) {
        return (
          <span>
            {item.jobRecord.name} ({convertMongodbId(item.jobRecord.id)})
          </span>
        );
      },
    },
    {
      title: "状态",
      dataIndex: "state",
    },
    {
      title: "邮箱",
      dataIndex: "userName",
    },
    {
      title: "开始时间",
      dataIndex: "startTime",
    },
    {
      title: "结束时间",
      dataIndex: "endTime",
    },
    {
      title: "操作",
      render(_, tableListItem) {
        // console.log(tableListItem.id)
        return (
          <Popconfirm
            key={tableListItem.id}
            title="停止task?"
            onConfirm={async () => {
              TaskService.stopTask({ taskId: tableListItem.id }).then((res) => {
                console.log(res);
                message.success("已停止");
                reload();
              });
            }}
            okText="确定"
            cancelText="取消"
          >
            <a href="#" style={{ color: "red" }}>
              停止
            </a>
          </Popconfirm>
        );
        // return <a style={{color:'red'}} onClick={()=>{AirflowCodeService.deleteAirflowCode({id:tableListItem.id}).then(res=>{console.log(res)})}}>删除</a>
      },
    },
  ];

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
        return TaskService.findTask(params1).then((res) => {
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
      headerTitle="Task"
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
      ]}
    />
  );
};

export default ActivityManager;
