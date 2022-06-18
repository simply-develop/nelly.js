/// <reference types="node" />
import { EventEmitter } from "stream";
declare type clientOptions = {
    token?: string;
    versionGateway?: number;
};
export declare class Client extends EventEmitter {
    shards: any[];
    private token;
    users: any;
    guilds: any;
    channels: any;
    user: any;
    _rawdata: any;
    resumeTimes: any;
    constructor(options?: clientOptions);
    get ping(): number;
    login(token: string): void;
    interact(data: any, shard: string): any;
    processData(data: string): any;
    ready(data: object, first: boolean): void;
    create(type: any, data: any, ...add: any): any;
    resume(shard: any): void;
    apiRequest(route: URL | string, method: "get" | "post" | "put" | "patch", options: any): Promise<unknown>;
    updateGuilds(): void;
    updateStatus(status: string, type: any, text: string, options?: any): void;
}
export {};
