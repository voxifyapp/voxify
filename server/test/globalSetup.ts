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
    console.log('Docker compose is up.');
  } catch (err) {
    throw err;
  }
};
