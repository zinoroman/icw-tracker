export interface IWashingData {
    id?: number; //unique id of row in DB
    carID: number;
    carBrand: string;
    boxID: number;
    prices: IWashingDataPrice;
    totalPrice: number;
}

export interface IWashingDataPrice {
    [key: string]: string
}