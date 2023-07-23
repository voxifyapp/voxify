import * as compose from 'docker-compose';
import * as path from 'path';

export default async () => {
  // Start the docker container
  global.compose = compose;

  try {
    console.log(__dirname);
    await compose.upAll({
      cwd: path.join(__dirname),
      callback: (chunk: Buffer) => {
        console.log('job in progress: ', chunk.toString());
      },
    });
    console.log('Boot-up completed.');
  } catch (err) {
    console.error(err);
  }
};
