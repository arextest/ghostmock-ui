import requset from "../utils/request";
import { convertMongodbId } from "../utils/util";
export class JobService {
  static async findJob(data: any): Promise<any> {
    return requset.post("/shiiroapi/findJob", data).then((res: any) => {
      return res.data.map((item: any) => ({
        ...item,
        id: convertMongodbId(item.id),
      }));
    });
  }

  static async deleteJob(data: any): Promise<any> {
    return requset.post("/shiiroapi/deleteJob", data);
  }

  static async triggerJob(data: any): Promise<any> {
    return requset.post("/shiiroapi/triggerJob", data);
  }

  static async insertJob(data: any): Promise<any> {
    return requset.post("/shiiroapi/insertJob", data);
  }

  static async updateJob(data: any): Promise<any> {
    return requset.post("/shiiroapi/updateJob", data);
  }
}
