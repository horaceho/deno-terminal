import { BufReader, BufWriter } from "https://deno.land/std/io/bufio.ts";
import { TextProtoReader } from "https://deno.land/std/textproto/mod.ts";
import { red, green } from "https://deno.land/std/fmt/colors.ts";
import { EOL } from "https://deno.land/std/fs/eol.ts";

export interface RemoteConfig {
  host: string;
  port: number;
}

export class Terminal {

  private conn: Deno.Conn;
  private input = new TextProtoReader(new BufReader(Deno.stdin));
  private reader: BufReader;
  private writer: BufWriter;

  private decoder = new TextDecoder();
  private encoder = new TextEncoder();

  async connect(config: RemoteConfig) {
    this.conn = await Deno.dial({ hostname: config.host, port: config.port });
    this.reader = new BufReader(this.conn);
    this.writer = new BufWriter(this.conn);
  }

  async io() {

    this.read();

    while (true) {
      const line = await this.input.readLine();
      if (line === Deno.EOF) {
        console.log(red('Bye!'));
        break;
      } else {
        this.write(line + EOL.CRLF);
      }
    }
  }

  async close() {
    this.conn.close();
  }

  private async read() {
    while (true) {
      const result = await this.reader.readLine();
      if (result === Deno.EOF) return null;
      const line = this.decoder.decode(result.line);
      console.log(green(line));
    }
  }

  private async write(line: string) {
    const data = this.encoder.encode(line);
    await this.writer.write(data);
    await this.writer.flush();
  }

}
