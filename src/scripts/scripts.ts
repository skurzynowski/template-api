import * as migrations from './migrations';

export function runCommand(command: string): Promise<void> {
  if (migrations.testCommand(command)) {
    return migrations.runCommand(command);
  }

  throw new Error('Unsupported command');
}

runCommand(process.argv[2])
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
