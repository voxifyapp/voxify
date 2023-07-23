import * as compose from 'docker-compose';
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
};
