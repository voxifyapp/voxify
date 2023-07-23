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

  // We are waiting for the docker container to be ready
  await timeout(2000);
  console.log('Docker compose is up.');
};

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
