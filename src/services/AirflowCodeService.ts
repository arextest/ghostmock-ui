import requset from "../utils/request";
import { convertMongodbId } from "../utils/util";

export class AirflowCodeService {
  static async findAirflowCode(data: any): Promise<any> {
    return requset.post("/shiiroapi/findAirflowCode", data).then((res: any) => {
      return res.data.map((item: any) => ({
        ...item,
        id: convertMongodbId(item.id),
      }));
    });
  }

  static async updateAirflowCode(data: any): Promise<any> {
    return requset.post("/shiiroapi/updateAirflowCode", data);
  }
  static async deleteAirflowCode(data: any): Promise<any> {
    return requset.post("/shiiroapi/deleteAirflowCode", data);
  }
  static async insertAirflowCode(data: any): Promise<any> {
    return requset.post("/shiiroapi/insertAirflowCode", data);
  }
}
