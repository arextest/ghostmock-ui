import requset from "../utils/request";
import { convertMongodbId } from "../utils/util";
export class TaskService {
  static async findTask(data: any): Promise<any> {
    return requset.post("/shiiroapi/findTask", data).then((res: any) => {
      return res.data.map((item: any) => ({
        ...item,
        id: convertMongodbId(item.id),
      }));
    });
  }

  static async stopTask(data: any): Promise<any> {
    return requset.post("/shiiroapi/stopTask", data);
  }
}
