import ws from 'ws';
export declare type ShardOpt = {
    sessionId?: string;
};
export declare class shard extends ws {
    private shard_id;
    session_id: any;
    client: any;
    constructor(url: string, shardid: any, client: any, options?: ShardOpt, ...argument: any[]);
    get ping_pong(): (data?: any, mask?: boolean, cb?: (err: Error) => void) => void;
    get connected(): boolean;
    format(data: object, type?: string): void;
    stop(): void;
}
