import RestConnection from './rest';
import qs from 'qs';

const CaLamViecApi = {
    getCaLamViec: async (maca:number | null) => {
        let rest = new RestConnection()
        return rest.getAsync("CaLamViec?"+ qs.stringify({maCa: maca}, {skipNulls:true}))
    },
};

export default CaLamViecApi;