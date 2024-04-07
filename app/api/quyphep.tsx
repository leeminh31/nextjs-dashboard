import { SearchQuyPhepRequest } from "../models/quyphep/search-quyphep-request";
import RestConnection from "./rest";

const QuyPhepApi = {
  getQuyPhep: async (data: SearchQuyPhepRequest) => {
    const rest = new RestConnection();
    const payload: SearchQuyPhepRequest = data;
    return rest.postAsync("QuyPhep", JSON.stringify(payload));
  },
};

export default QuyPhepApi;
