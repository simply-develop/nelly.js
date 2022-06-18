const https = require("https");
const http = require("http");
const userAgent = "Nelly.js (discord, 0.0.1)"

function parse(json: string) {
    try {
        return JSON.parse(json)
    } catch (e) {
        return json
    }
}

export default class request {
  options: { host?: any; port?: any; path?: any; method?: any; headers?: { [x: string]: string; }; body?: any; };
  url: URL;

    constructor(url: string | URL, options: { host?: any; port?: any; path?: any; method?: any; headers?: { [x: string]: string; }; }) {
        options = typeof options == "object" ? options : {};
        url = new URL(url);
        options.host = typeof options.host == "string" ? options.host : url.host;
        options.port = (options.port ? options.port : url.port) || "443";
        options.path = options.path ? options.path : url.pathname;
        options.method = options.method ? options.method : "GET";
        options.headers = typeof options.headers == "object" ? options.headers : {}
        options.headers["user-agent"] = userAgent

        this.options = options
        this.url = url
      
      function get(url: URL, options: object) {
        return new request(url, options).get()
      }

      function post(url: URL, options: object) {
        return new request(url, options).post()
      }
    }
    

    eject() {
        return new Promise((resolve, reject) => {
            const req = (this.url.protocol == "http:" ? http : https).request(this.url.href, this.options, (res: any) => {
                res.setEncoding('utf8');
                var body = '';
                res.on('data', (data: any) => {
                    body += data;
                });
                res.on('end', () => {
                    return resolve(this.options.headers["content-type"] == "application/json" ? parse(body) : body)
                });
                res.on('error', (e: any) => {
                    return reject(e)
                })
            });

            req.on('error', (err: any) => {
                return reject(err);
            });
            req.end(this.options.body || "");
        });
    }

    json() {
        this.options.headers["content-type"] = "application/json"
        return this
    }

    get() {
        this.options.method = "GET";
        return this.eject()
    }

    post() {
        this.options.method = "POST";
        return this.eject()
    }

    put() {
        this.options.method = "PUT";
        return this.eject()
    }

    patch() {
        this.options.method = "PATCH";
        return this.eject()
    }

    delete() {
        this.options.method = "DELETE";
        return this.eject()
    }
}
