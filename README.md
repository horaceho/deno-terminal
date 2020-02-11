# A Simple Deno Terminal

![(Deno)](https://img.shields.io/badge/deno-0.32.0-green.svg)
![GitHub](https://img.shields.io/github/license/horaceho/deno-terminal.svg)
![GitHub release](https://img.shields.io/github/release/horaceho/deno-terminal.svg)

### Getting Start

To test with the Deno Echo Server, open a shell window:

```shell
$ deno --allow-net https://deno.land/std/examples/echo_server.ts
Listening on 0.0.0.0:8080
```

Open another shell window:

```shell
$ deno --allow-env --allow-net test.ts

Connecting to 127.0.0.1:8080 ...
hello
hello
world
world
^C
```

Hit `ctrl-c` or `ctrl-d` to stop.

### Syntax
```shell
deno --allow-env --allow-net test.ts --help
syntax: deno --allow-env --allow-net test.ts host port
```

© 2020 Horace Ho
