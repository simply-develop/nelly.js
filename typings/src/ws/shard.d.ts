import ws from "ws";
export declare class shard extends ws {
    shard_id: string;
    session_id: any;
    client: any;
    constructor(url: string, shardid: any, client: any, options?: any, ...argument: any[]);
    get ping_pong(): (data?: any, mask?: boolean, cb?: (err: Error) => void) => void;
    get connected(): boolean;
    format(data: object, type?: string): void;
    stop(): void;
}
