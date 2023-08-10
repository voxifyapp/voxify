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
  await exec('kill -9 $(lsof -ti:9099)');
  global.childProcess = exec('firebase emulators:start --only auth');

  await new Promise((resolve, reject) => {
    global.childProcess.stdout.on('data', (data) => {
      console.log(data);
      if (data.includes('All emulators ready!')) {
        resolve(true);
      }
    });

    global.childProcess.stderr.on('data', (data) => {
      // If there is an error, reject the promise and fail the tests
      if (data.includes('Error')) {
        global.childProcess.kill();
        reject(new Error('Failed to start Firebase emulator'));
      }
    });
  });
  console.log('Firebase emulator is up');
};
