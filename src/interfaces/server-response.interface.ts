export interface IServerResponse<T> {
    status: string;
    statusText: string;
    data?: T;
}