import requset from "../utils/request";
export class UserService {
  static async login(data: any): Promise<any> {
    return requset.post("/auth/login", data);
  }
}
