import { Inject, Injectable } from '@nestjs/common';

import { EnvVariables } from '@shared/env/providers/env-variables/interfaces/env-variables';
import { ENV_SYNTAX_PARSER_TOKEN } from '@shared/file-system/providers/env-syntax-parser/constants';
import { EnvSyntaxParser } from '@shared/file-system/providers/env-syntax-parser/interfaces/env-syntax-parser';
import { NATIVE_FILE_SYSTEM_TOKEN } from '@shared/file-system/providers/native-file-system/constants';
import { NativeFileSystem } from '@shared/file-system/providers/native-file-system/interfaces/native-file-system';
import { promises as fsPromised } from 'fs';

@Injectable()
export class FileSystemService {
  public constructor(
    @Inject(NATIVE_FILE_SYSTEM_TOKEN) private readonly nativeFileSystem: NativeFileSystem,
    @Inject(ENV_SYNTAX_PARSER_TOKEN) private readonly envSyntaxParser: EnvSyntaxParser,
  ) {}

  public async parseEnvFile(envFilePath = '.env'): Promise<EnvVariables> {
    try {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      const envContentBuffer = await this.nativeFileSystem.readFile(envFilePath);

      return this.envSyntaxParser.parse(envContentBuffer.toString());
    } catch {
      return {};
    }
  }

  public async parsePackageFile(packageFilePath = 'package.json'): Promise<Record<string, any>> {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const packageContentBuffer = await this.nativeFileSystem.readFile(packageFilePath);

    return JSON.parse(packageContentBuffer.toString());
  }

  public async saveFile(fullName: string, content: Buffer): Promise<void> {
    await fsPromised.writeFile(fullName, content);
  }

  public async readFile(fullName: string): Promise<Buffer> {
    return await fsPromised.readFile(fullName);
  }

  public async deleteFile(fullName: string): Promise<void> {
    return await fsPromised.unlink(fullName);
  }

  public async readDir(dir: string): Promise<string[]> {
    return await fsPromised.readdir(dir);
  }
}
