// API/src/Modules/Docker/Utils/runDocker.ts
import { docker } from 'API/Modules/Docker/Docker';
import pEvent from 'p-event';
import { Writable } from 'stream';
import { RunDockerInput } from './RunDockerInput';

export async function runDocker({
  image,
  cmd = [],
  env = [],
  hostConfig,
}: RunDockerInput): Promise<string> {
  const runStream = new Writable();
  runStream._write = (chunk: Buffer) =>
    runStream.emit('data', chunk.toString());

  const [, runResult] = await Promise.all([
    docker.run(image, cmd, runStream, {
      Env: env.map(({ key, value }) => `${key}=${value}`),
      HostConfig: hostConfig,
    }),
    pEvent<string, string>(runStream, 'data'),
  ]);

  return runResult;
}
