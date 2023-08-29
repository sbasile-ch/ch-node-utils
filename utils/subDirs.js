import fs   from 'fs';
import path from 'path';

export function getSubDirs (dirPath) {
  // Read the contents of the directory
  const contents = fs.readdirSync(dirPath);

  // Filter out only the directories
  const subDirectories = contents.filter((item) => {
    const itemPath = path.join(dirPath, item);
    return fs.statSync(itemPath).isDirectory();
  });

  return subDirectories;
}
