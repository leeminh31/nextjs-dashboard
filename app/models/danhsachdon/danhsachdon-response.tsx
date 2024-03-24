import { DonBuResponse } from "../donbu/donbu-response";
import { DonConNhoResponse } from "../donconnho/donconnho-response";
import { DonPhepResponse } from "../donphep/donphep-response";
import { DonTangCaResponse } from "../dontangca/dontangca-response";

export interface DanhSachDonResponse {
  listDonConNho: DonConNhoResponse[];
  listDonTangCa: DonTangCaResponse[];
  listDonBu: DonBuResponse[];
  listDonPhep: DonPhepResponse[];
}
