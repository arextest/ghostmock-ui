import requset from "../utils/request";
import type { API } from "./typings";

export class NamespaceService {
  // 获取所有namespace
  static async findNamespaces(): Promise<API.ResponseNamespace> {
    return requset.get("/api/system/namespaces");
  }

  // 删除指定id的template
  static async deleteNamespace(data: any): Promise<any> {
    return requset.delete("/api/system/namespace", data);
  }

  // 添加新template
  static async insertNamespace(data: any): Promise<any> {
    return requset.post("/api/system/namespace", data);
  }

  // 更新指定id的template
  static async updateNamespace(data: any): Promise<any> {
    return requset.post("/api/system/namespace", data);
  }
}
