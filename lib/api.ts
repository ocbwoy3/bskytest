"use client";

import { XRPC, CredentialManager } from '@atcute/client';
import { AtpAgent } from "@atproto/api";

export const manager = new CredentialManager({ service: 'https://bsky.social' });
export const xrpc = new XRPC({ handler: manager });

export const agent = new AtpAgent({
  service: "https://api.bsky.app",
});
