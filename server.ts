import { createRequestHandler } from "@remix-run/vercel";

// @ts-ignore
import * as build from "./build/server/index.js";

export default createRequestHandler({ build });