import { spawn } from 'child_process';

export async function run(
  command: string,
  options: { cwd?: string } = {},
): Promise<string> {
  return new Promise((resolve, reject) => {
    const args = command.split(' ');
    const bin = args.shift() as string;

    console.log(`Executing...\n${bin} ${args.join(' ')}`);

    spawn(bin, args, {
      stdio: 'ignore',
      cwd: options.cwd || process.cwd(),
      shell: true,
    }).on('close', (code: number) => {
      if (code === 0) {
        console.log('Complete');
        resolve();
      } else {
        reject(new Error(`return code ${code}`));
      }
    });
  });
}
