import type { House } from "./house"

type paymentRecord = {
    date : Date,
    unit: number,
    payment: number,
    maintenence_fee:number,
    paid: boolean,
    house:House
}


export {type paymentRecord}