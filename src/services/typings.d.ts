// @ts-ignore
/* eslint-disable */
import type { TypeAction } from "../pages/Action/typing";
import type { TypeResource, TypeTemplate } from "../pages/Resource/typing";
export declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = "notification" | "message" | "event";

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  type ResponseAction = {
    data: Array<TypeAction>;
    id: null | number;
    responseCode: number;
    responseDesc: string | null;
  };

  type ResponseResources = {
    resources: Array<TypeResource>;
  };

  type ResponseTemplate = {
    data: Array<TypeTemplate>;
    id: null | number;
    responseCode: number;
    responseDesc: string | null;
  };

  type ResponseRCAResult = {
    ResponseStatus: ResponseStatus;
    analysisResult: AnalysisResult;
  };

  type ResponseNamespace = {
    namespaces: Array<TypeNamespace>;
  };

  type TypeNamespace = {
    id: null | string;
    namespace: string;
  };

  type ResponseMocks = {
    result: Array<MockItem>;
    responseCode: String;
  };

  type MockItem = {
    id: string;
    namespace: string;
    mockurl: string;
    mocktype: string;
    script: string;
  };

  type ResponseStatus = {
    Timestamp: string;
    Ack: string;
    Errors: Array<string>;
  };

  type AnalysisResult = {
    messageJson: string;
    triggerUUID: string;
  };
}
