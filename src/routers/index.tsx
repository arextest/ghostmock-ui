import React from "react";
import Home from "../pages/Home";
import About from "../pages/About";
import TableList from "../pages/TableList";
import ActivityManager from "../pages/ActivityManager";
import MainBox from "../components/MainBox";
// () => import('../pages/User/Login')
import Login from "../pages/User/Login";
import Dashboard from "../pages/Dashboard";
import Feedback from "../pages/Feedback";
import AccountSettings from "../pages/Account/Settings";
import AccountCenter from "../pages/Account/Center";
import Mocks from "../pages/Mocks";
import Action from "../pages/Action";
import Resource from "../pages/Resource";
import Job from "../pages/Job";
import Task from "../pages/Task";
import AirflowCode from "../pages/AirflowCode";
import AirflowCodeCreateAndUpdate from "../pages/AirflowCode/CreateAndUpdate";
import Chart from "../pages/Chart";
import ChartIframe from "../pages/ChartIframe";
import Elfinder from "../pages/elfinder";
import Namespace from "../pages/Namespace";

export default [
  {
    path: "/user/login",
    component: Login,
  },
  {
    path: "/",
    component: MainBox,
    children: [
      {
        path: "/mocks",
        component: Mocks,
      },
      {
        path: "/resources",
        component: Resource,
      },
      {
        path: "/namespaces",
        component: Namespace,
      },
      // {
      //   path: "/action",
      //   component: Action,
      // },
      // {
      //   path: "/airflow-code/create",
      //   component: AirflowCodeCreateAndUpdate,
      // },
      // {
      //   path: "/airflow-code/:id/edit",
      //   component: AirflowCodeCreateAndUpdate,
      //   name: "AirflowCodeCreateAndUpdate",
      // },
      // {
      //   path: "/airflow-code",
      //   component: AirflowCode,
      // },
      // {
      //   path: "/job",
      //   component: Job,
      // },
      // {
      //   path: "/task",
      //   component: Task,
      // },
      // {
      //   path: "/chart",
      //   component: Chart,
      // },
      // {
      //   path: "/chart-iframe/:id",
      //   component: ChartIframe,
      // },
      // {
      //   path: "/elfinder",
      //   component: Elfinder,
      // },

      {
        path: "*",
        component: About,
      },
    ],
  },
];
