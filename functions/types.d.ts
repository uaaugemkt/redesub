/**
 * Ambient types for Cloudflare Pages Functions.
 * Runtime is provided by Cloudflare; no frontend dependency.
 */
type PagesFunction<
  Env = unknown,
  Params extends string = string,
  Data extends Record<string, unknown> = Record<string, unknown>
> = (context: {
  request: Request;
  env: Env;
  params: Record<Params, string>;
  data: Data;
  waitUntil: (promise: Promise<unknown>) => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
}) => Response | Promise<Response>;
