import requset from "../utils/request";
import type { TypeAction } from "../pages/Action/typing";
import type { API } from "./typings";

export class ActionService {
  /**
   *
   * @param data 获取所有的分析结果
   * @returns
   */
  static async findALLMocks(): Promise<API.ResponseMocks> {
    return requset.get("/api/system/mocks");
  }

  static async executeRCAAnalysis(): Promise<API.ResponseRCAResult> {
    let data = {
      source: "MANUAL_ALERT",
      sourceJson: "string",
    };
    console.log(data);
    return requset.post("/rca/api/trigger.json", data);
  }

  /**
   * 获取所有action
   * @param data
   * @returns
   */
  static async findAction(data: API.PageParams): Promise<API.ResponseAction> {
    return requset.post("/shiiroapi/findAction", data);
  }

  static async findResources(): Promise<API.ResponseAction> {
    return requset.get("/api/system/resources");
  }

  /**
   * 删除指定id的action
   * @param data
   * @returns
   */
  static async deleteAction(data: any): Promise<any> {
    return requset.post("/shiiroapi/deleteAction", data);
  }

  /**
   * 添加新action
   * @param data
   * @returns
   */
  static async insertAction(data: any): Promise<any> {
    return requset.post("/shiiroapi/insertAction", data);
  }

  // 更新指定id的action
  static async updateAction(data: any): Promise<any> {
    return requset.post("/shiiroapi/updateAction", data);
  }
}
