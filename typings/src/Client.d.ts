/// <reference types="node" />
import { EventEmitter } from "stream";
import { User } from "./utils/dataTypes/User";
declare type clientOptions = {
    platform?: "desktop" | "web" | "mobile";
    intents?: number;
    token?: string;
    versionGateway?: number;
};
declare type statusOpt = {
    type?: string | number;
    afk?: boolean;
    platform?: "desktop" | "web" | "mobile";
};
/** The Client of WebSocket/Discord Bot */
export declare class Client extends EventEmitter {
    shards: any[];
    private token;
    users: any;
    guilds: any;
    channels: any;
    user: User;
    protected _rawdata: any;
    private resumeTimes;
    private _session_start_limit;
    readyTimestamp: number;
    intents: number;
    platform: string;
    application: any;
    constructor(options?: clientOptions);
    ping(): number;
    uptime(): number;
    login(token: string): void;
    interact(data: any, shard: string): any;
    processData(data: string): any;
    ready(data: object, first: boolean): void;
    create(type: any, data: any, ...add: any): any;
    resume(shardy: any): void;
    updateGuilds(): void;
    status(status: string, text: string, options?: statusOpt): void;
    reset(): void;
    commands: {
        set: (client: Client, array: any[], guild: string) => Promise<unknown>;
        get: (client: Client, guild: string) => void;
    };
    private set;
    private get;
    apiRequest(route: URL | string, method: "get" | "post" | "put" | "patch", options?: any): Promise<unknown>;
}
export {};
