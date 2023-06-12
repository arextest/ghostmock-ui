import requset from "../utils/request";
import type { API } from "./typings";

export class ResourceService {
  static async findResources(): Promise<API.ResponseResources> {
    return requset.get("/api/system/resources");
  }

  // TODO Search one resource or one namspace's resources
  static async findResource(): Promise<API.ResponseResources> {
    return requset.get("/api/system/resources");
  }

  // 删除指定id的Resource
  // TODO IMPLY DELETE ACTION
  static async deleteResource(data: any): Promise<any> {
    return requset.delete("/api/system/resource", data);
  }

  // 添加新Resource
  static async insertResource(data: any): Promise<any> {
    return requset.post("/api/system/resource", data);
  }

  // 更新指定id的Resource
  static async updateResource(data: any): Promise<any> {
    return requset.post("/api/system/resource", data);
  }
}
