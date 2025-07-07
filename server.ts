import { createRequestHandler } from "@remix-run/vercel";

// Dinamically import the build to avoid TypeScript errors
const build = await import("./build/server/index.js");

export default createRequestHandler({ build });