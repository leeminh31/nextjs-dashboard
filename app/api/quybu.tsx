import { SearchQuyBuRequest } from "../models/quybu/search-quybu-request";
import RestConnection from "./rest";

const QuyBuApi = {
  getQuyBu: async (data: SearchQuyBuRequest) => {
    const rest = new RestConnection();
    const payload: SearchQuyBuRequest = data;
    return rest.postAsync("QuyBu", JSON.stringify(payload));
  },
};

export default QuyBuApi;
