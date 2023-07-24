import * as path from 'path';

export default async () => {
  // Bring up docker dependencies
  try {
    await global.compose.down({
      cwd: path.join(__dirname),
    });
    console.log('Docker compose is down.');
  } catch (err) {
    throw err;
  }

  // Stop firebase emulator
  if (global.childProcess) {
    await global.childProcess.kill();
    console.log('Firebase tools are down');
  }
};
