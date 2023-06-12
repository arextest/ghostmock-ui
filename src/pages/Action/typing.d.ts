export declare type TypeAction = {
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
  description?: string;
  variableTypes: TypeVariableTypes[];
  nextActions?: any; // toComfirm
  createTime?: string;
  updateTime?: string;
};

export declare type TypeActionNode = {
  id: string;
  label: string;
  name?: string;
};

export declare type TypeActionEdge = {
  fromId: string;
  fromName?: string;
  toId: string;
  toName?: string;
  source: string;
  target: string;
  sourceName?: string;
  targetName?: string;
};

export declare type TypeVariableTypes = {
  id: string;
  path?: string;
  defaultValue?: string;
  name: string;
  required?: boolean;
  type?: string;
};

export declare type TypeDetailActionForm = {
  mode?: "insert" | "edit";
  reload?: Function;
  record?: TypeAction;
  title?: String;
  style?: "button" | "link";
  layout?: "horizontal" | "vertical" | "inline";
};
