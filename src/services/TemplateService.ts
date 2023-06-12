import requset from "../utils/request";
import type { API } from "./typings";

export class TemplateService {
  // 获取所有template
  static async findTemplate(
    data: API.PageParams
  ): Promise<API.ResponseTemplate> {
    return requset.post("/shiiroapi/findTemplate", data);
  }

  // 删除指定id的template
  static async deleteTemplate(data: any): Promise<any> {
    return requset.post("/shiiroapi/deleteTemplate", data);
  }

  // 添加新template
  static async insertTemplate(data: any): Promise<any> {
    return requset.post("/shiiroapi/insertTemplate", data);
  }

  // 更新指定id的template
  static async updateTemplate(data: any): Promise<any> {
    return requset.post("/shiiroapi/updateTemplate", data);
  }
}
