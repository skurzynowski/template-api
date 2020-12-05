import { Injectable } from '@nestjs/common';

import { FileSystemService } from '@shared/file-system/services/main/main';

@Injectable()
export class EnvParserService {
  public constructor(private readonly fileSystemService: FileSystemService) {}

  public async getAppVersionFromPackage(packageFilePath = 'package.json'): Promise<string> {
    const packageContent = await this.fileSystemService.parsePackageFile(packageFilePath);

    // version = x.y.z
    const appVersion: string = packageContent.version;

    if (!appVersion) {
      throw new Error(`Invalid app version (${appVersion}) found in package.json.`);
    }

    return appVersion;
  }
}
