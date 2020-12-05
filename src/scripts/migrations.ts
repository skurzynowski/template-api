import dotenv from 'dotenv';
import { Connection, ConnectionOptions, createConnection, MigrationExecutor } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { entities } from '@shared/database/entities';
import { migrations } from '@shared/database/migrations';

dotenv.config();

async function closeDbConnectionWithTimeout(connection: Connection, timeout = 10000): Promise<void> {
  await Promise.race([connection.close(), new Promise((resolve) => setTimeout(resolve, timeout))]);
}

export async function run(connection: Connection): Promise<void> {
  await connection.runMigrations({
    transaction: 'each',
  });
}

export async function revert(connection: Connection): Promise<void> {
  const migrationExecutor = new MigrationExecutor(connection);

  const migrations = (migrationExecutor as any).getMigrations();

  await migrations.reduce(async (result: Promise<void>) => {
    await result;

    return migrationExecutor.undoLastMigration();
  }, Promise.resolve(null));
}

export enum MigrationCommand {
  RUN = 'RUN',
  REVERT = 'REVERT',
}

type CommandHandler = (connection: Connection) => Promise<void>;

const commandsMap = new Map<MigrationCommand, CommandHandler>()
  .set(MigrationCommand.RUN, run)
  .set(MigrationCommand.REVERT, revert);

export async function runCommand(command: string): Promise<void> {
  const commandHandler = commandsMap.get(command.toUpperCase() as MigrationCommand);

  if (!commandHandler) {
    throw new Error(`Command not specified, instead received: ${command}`);
  }

  const config: ConnectionOptions = {
    url: process.env.DATABASE_URL,
    type: 'postgres',
    logging: true,
    migrations,
    entities,
    namingStrategy: new SnakeNamingStrategy(),
  };

  console.log(`RUNNING MIGRATION COMMAND [${command}]...`);

  console.log(config);

  const connection = await createConnection(config);

  try {
    await commandHandler(connection);

    await closeDbConnectionWithTimeout(connection);
  } catch (error) {
    await closeDbConnectionWithTimeout(connection);

    throw error;
  }
}

export function testCommand(command: string): boolean {
  const commandHandler = commandsMap.get(command.toUpperCase() as MigrationCommand);

  return Boolean(commandHandler);
}
