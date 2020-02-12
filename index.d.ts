import * as express from "express";

export as namespace nodeExposeSspi;

export interface Options {
    [key:string]:any;
}

export function ssoAuth(options?: Options): express.RequestHandler;

export interface Request extends express.Request {
    user: string;
    owner: string;
}
