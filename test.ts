import { Terminal } from "./terminal.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";

const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = 8080;

const SYNTAX="deno --allow-env --allow-net test.ts host port";
const args = parse(Deno.args);
const host = args['_'][0] ?? DEFAULT_HOST;
const port = args['_'][1] ? Number(args['_'][1]) : DEFAULT_PORT;

async function terminal(host: string, port: number) {
  const terminal = new Terminal();
  console.log('Connecting to ' + host + ":" + port + " ...");
  await terminal.connect({ host: host, port: port });

  await terminal.io();

  console.log('Closing ' + host + ":" + port + " ...");
  await terminal.close();

  Deno.exit(1);
}

if (args['help'] || host == undefined || port == 0) {
  console.log("syntax: " + SYNTAX);
} else {
  terminal(host, port);
}
