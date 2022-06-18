export default class request {
    options: {
        host?: any;
        port?: any;
        path?: any;
        method?: any;
        headers?: {
            [x: string]: string;
        };
        body?: any;
    };
    url: URL;
    constructor(url: string | URL, options: {
        host?: any;
        port?: any;
        path?: any;
        method?: any;
        headers?: {
            [x: string]: string;
        };
    });
    eject(): Promise<unknown>;
    json(): this;
    get(): Promise<unknown>;
    post(): Promise<unknown>;
    put(): Promise<unknown>;
    patch(): Promise<unknown>;
    delete(): Promise<unknown>;
}
