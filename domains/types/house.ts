import type {paymentRecord} from "~/domains/types/paymentRecord";

type House = {
    name: string,
    owner: string,
    owner_name: string,
    address: string,
    meter_id: string,
    user: string,
    payment:paymentRecord[]
};

export {type House}