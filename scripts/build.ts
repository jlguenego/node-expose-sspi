import childProcess from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

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

const projectDir = path.resolve(__dirname, '..');

async function main(): Promise<void> {
  try {
    console.log('start');
    await spawn(
      'cmd',
      ['/c', 'node-gyp', 'rebuild', '--verbose', '--arch=x64'],
      { stdio: 'inherit', cwd: projectDir }
    );
    console.log('about to copy');
    await fs.rename(
      path.resolve(projectDir, './build/Release/api.node'),
      path.resolve(projectDir, './lib/arch/x64/api.node')
    );
    await spawn(
      'cmd',
      ['/c', 'node-gyp', 'rebuild', '--verbose', '--arch=ia32'],
      { stdio: 'inherit', cwd: projectDir }
    );
    await fs.rename(
      path.resolve(projectDir, './build/Release/api.node'),
      path.resolve(projectDir, './lib/arch/ia32/api.node')
    );
  } catch (error) {
    console.error('error: ', error);
  }
}

main();
