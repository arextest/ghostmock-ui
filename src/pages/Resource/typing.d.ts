import { TypeAction, TypeActionEdge } from "../Action/typing";

export declare type TypeResource = {
  _id?: string;
  id?:
    | {
        counter: number;
        date: number;
        machineIdentifier: number;
        processIdentifier: number;
        time: number;
        timeSecond: number;
        timestamp: number;
      }
    | string;
  namespace: string;
  resource: string;
  context: string;
};

type TypeTemplate = {
  _id?: string;
  id?:
    | {
        counter: number;
        date: number;
        machineIdentifier: number;
        processIdentifier: number;
        time: number;
        timeSecond: number;
        timestamp: number;
      }
    | string;
  name: string;
  actionGroup: {
    actions: TypeAction[];
    actionEdges: TypeActionEdge[];
  };
  chartTypes?: [];
  apiTypes?: [];
  variableTypes: TypeVariableTypes[];
  createTime?: string;
  updateTime?: string;
};

export declare type TypeVariableTypes = {
  id: string;
  path?: string;
  defaultValue?: string;
  name: string;
  required?: boolean;
  type?: string;
};

export declare type DetailTemplateFormType = {
  mode?: "insert" | "edit";
  reload?: Function;
  record?: TypeResource;
  allNodes?: TypeResource[];
  title?: String;
  style?: "button" | "link";
  layout?: "horizontal" | "vertical" | "inline";
};

export declare type DetailResourceFormType = {
  mode?: "insert" | "edit";
  reload?: Function;
  record?: TypeResource;
  allNodes?: TypeResource[];
  title?: String;
  style?: "button" | "link";
  layout?: "horizontal" | "vertical" | "inline";
};

export declare type TypeSelectLineData = string[]; //分隔符 ^*^
