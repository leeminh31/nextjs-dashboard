import qs from "qs";
import { CreateCaLamViecRequest } from "../models/calamviec/create-calamviec-request";
import { UpdateCaLamViecRequest } from "../models/calamviec/update-calamviec-request";
import RestConnection from "./rest";

const CaLamViecApi = {
  getCaLamViec: async (maca: number | null, tenCa: string | null) => {
    const rest = new RestConnection();
    return rest.getAsync(
      "CaLamViec?" +
        qs.stringify({ maCa: maca, tenCa: tenCa }, { skipNulls: true }),
    );
  },

  addCaLamViec: async (data: CreateCaLamViecRequest) => {
    const rest = new RestConnection();
    const payload: CreateCaLamViecRequest = data;
    return rest.postAsync("CaLamViec/create", JSON.stringify(payload));
  },

  updateCaLamViec: async (data: UpdateCaLamViecRequest) => {
    const rest = new RestConnection();
    const payload: UpdateCaLamViecRequest = data;
    return rest.postAsync("CaLamViec/update", JSON.stringify(payload));
  },

  deleteCaLamViec: async (data: string) => {
    const rest = new RestConnection();
    return rest.deleteAsync(`CaLamViec?id=` + data);
  },
};

export default CaLamViecApi;
