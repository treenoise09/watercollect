type RequestPaymentRecord = {
    date : Date,
    unit: number,
    payment: number,
    maintenence_fee:number,
    paid: boolean,
    house: string
}

export {type RequestPaymentRecord}