import childProcess from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

const projectDir = path.resolve(__dirname, '..');

function spawn(
  cmd: string,
  parameters: readonly string[],
  options: childProcess.SpawnOptions
): Promise<void> {
  return new Promise((resolve, reject) => {
    const batch = childProcess.spawn(cmd, parameters, options);
    batch.on('exit', (code) => {
      console.log(`Child exited with code ${code}`);
      if (code !== 0) {
        reject();
      }
      resolve();
    });
  });
}

// got inspired by https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
async function asyncForEach<T>(
  array: T[],
  callback: (n: T, index?: number, array?: T[]) => Promise<void>
): Promise<void> {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array);
  }
}

async function main(): Promise<void> {
  try {
    console.log('start');
    const array = ['ia32', 'x64'] as string[];
    await asyncForEach<string>(array, async (arch) => {
      await spawn('node-gyp.cmd', ['rebuild', '--verbose', `--arch=${arch}`], {
        stdio: 'inherit',
        cwd: projectDir,
      });
      const dest = path.resolve(projectDir, `./lib/arch/${arch}/node-expose-sspi.node`);
      console.log(`about to copy to ${dest}`);
      await fs.rename(
        path.resolve(projectDir, './build/Release/node_expose_sspi.node'),
        dest
      );
    });
  } catch (error) {
    console.error('error: ', error);
  }
}

main();
