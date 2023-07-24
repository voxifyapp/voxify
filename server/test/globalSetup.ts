import { exec } from 'child_process';
import * as compose from 'docker-compose';
import * as path from 'path';

export default async () => {
  // Start the docker container
  global.compose = compose;

  // Bring up docker dependencies
  try {
    await compose.upAll({
      cwd: path.join(__dirname),
    });
  } catch (err) {
    throw err;
  }
  console.log('Docker compose is up.');

  // start the firebase tools
  global.childProcess = await exec('firebase emulators:start --only auth');
  console.log('Firebase emulator is up');

  // We are waiting for the docker container and firebase to be ready
  await timeout(3000);
};

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
