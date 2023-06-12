import requset from "../utils/request";
import type { API } from "./typings";

export class MockService {
  /**
   *
   * @param data 获取所有的分析结果
   * @returns
   */
  static async findALLMocks(): Promise<API.ResponseMocks> {
    return requset.get("/api/system/mocks");
  }

  /**
   * 获取所有action
   * @param data
   * @returns
   */
  static async findMock(data: API.PageParams): Promise<API.MockItem> {
    return requset.post("/api/system/mock", data);
  }

  /**
   * 删除指定id的action
   * @param data
   * @returns
   */
  static async deleteMOCK(data: any): Promise<any> {
    return requset.delete("/api/system/mock", data);
  }

  /**
   * 添加新action
   * @param data
   * @returns
   */
  static async insertMock(data: any): Promise<any> {
    return requset.post("/api/system/mock", data);
  }

  // 更新指定id的action
  static async updateMock(data: any): Promise<any> {
    return requset.post("/api/system/mock", data);
  }
}
