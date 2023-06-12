import requset from "../utils/request";
export class ActivityService {
  static async findActivityByConditions(data: any): Promise<any> {
    return requset.post("/findActivityByConditions", data);
  }
}

// export const findActivityByConditions = (params: any) => {
//   return axios.post(API + '/findActivityByConditions', params)
// }
