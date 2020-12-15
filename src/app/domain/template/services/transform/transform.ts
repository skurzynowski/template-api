import { Injectable } from '@nestjs/common';
import { LoggerService } from '@shared/logger/services/main/main';
import { TemplateNotFoundException } from '@template/exceptions/template-not-found';
import { Template } from '@template/model/entity';
import { exec } from 'child_process';
import path from 'path';
import util from 'util';
import { FileSystemService } from '@shared/file-system/services/main/main';
import fs from 'fs';
import ejs from 'ejs';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const promisedExec = util.promisify(exec);

//TODO create separate class for this
const libreofficeCommandCreatePdf = (file: string): string =>
  `libreoffice --headless --invisible --convert-to pdf ${file} --print-to-file`;
const fullName = (name: string): string => path.join('/tmp', name);

export class TemplateTransformServiceFake {}
@Injectable()
export class TemplateTransformService {
    public constructor(private readonly fileSystemService: FileSystemService, private readonly loggerService: LoggerService) {}
  public async generatePdf(template: Template): Promise<Template> {
    if (!template) {
      throw new TemplateNotFoundException();
    }
    const originalName = `${template.id}.${template.fileType}`;
    const pdfName = `${template.id}.pdf`;
    await this.fileSystemService.saveFile(fullName(originalName), template.file);

    await promisedExec(libreofficeCommandCreatePdf(fullName(originalName)));

    this.loggerService.info('PDF generated');

    template.fileType = 'PDF';
    template.file = await this.fileSystemService.readFile(`/usr/src/app/${pdfName}`);
    await this.fileSystemService.deleteFile(`/usr/src/app/${pdfName}`);

    this.loggerService.info('PDF deleted from file system');

    return template;
  }


  public async fillWithData(template: Template, params: Record<string, any>): Promise<Template> {
    if (!template) {
      throw new TemplateNotFoundException();
    }

    this.loggerService.info('Create folder');
    await promisedExec(`cd /tmp && mkdir -p ${template.id} `);

    this.loggerService.info('save file in folder');
    await this.fileSystemService.saveFile(`/tmp/${template.id}/${template.id}.${template.fileType}`, template.file)

    this.loggerService.info('unzip file');
    await promisedExec(`cd /tmp/${template.id}/ && unzip "${template.id}.${template.fileType}"`);

    this.loggerService.info('remove original');
    const removeOriginal = `rm /tmp/${template.id}/${template.id}.${template.fileType}`
    await promisedExec(removeOriginal);

    try{
    //fill template
    if(template.fileType === "PPTX"){
      await this.renderPttx(template, params);
    }else{
      await this.renderDocx(template, params);
    }
    }catch(e){
      console.log(e);
    }

    //zip file
    this.loggerService.info('zip file');
    const zipFile = `cd /tmp/${template.id} && zip -r ${template.id}.${template.fileType} .` 
    await promisedExec(zipFile);

      //read file
    const zippedFile = `/tmp/${template.id}/${template.id}.${template.fileType}`;
    template.file = await this.fileSystemService.readFile(zippedFile);

    await this.cleanUpFiles(template.id);

    return template;
  }

    public replaceTagsInstrings(content:string):string{
     const openTag = /&lt;/g
     const closeTag = /&gt;/g

     return content.replace(openTag, "<").replace(closeTag, ">");
    }  


    public async renderFile(fileName : string, params: Record<string, any> ): Promise<void>{
       const file = await readFile(fileName);
       const preparedFile = this.replaceTagsInstrings(file.toString());
       const content = await ejs.render(preparedFile, params, { async: true });
       await writeFile(fileName, content);
   }

    private async cleanUpFiles(templateId: string):Promise<void>{
    const removeDir = `rm -rf /tmp/${templateId}`
    this.loggerService.info('remove dir');
    await promisedExec(removeDir);
   }
   

   public async renderEveryFile(files: string[], dir: string, params: Record<string,any>):Promise<void>{
     for (const file of files) {
       await this.renderFile(`${dir}${file}`, params);
     }
   }

    public async renderPttx(template: Template, params: Record<string,any>):Promise<void>{
    //read all files from folder
    this.loggerService.info('get files from dir');
    const foundedFiles =  await this.fileSystemService.readDir(`/tmp/${template.id}/ppt/slides/`);
      
    // filter out not slides
    const filterSlides = (file : string):boolean => file.includes("slide");

    this.loggerService.info('filter files to inject variables');
    const filteredFiles = foundedFiles.filter(filterSlides);

    await this.renderEveryFile(filteredFiles, `/tmp/${template.id}/ppt/slides/`, params);
   }

    public async renderDocx(template: Template, params: Record<string,any>):Promise<void>{
    const wordDir = `/tmp/${template.id}/word/`;
    //read all files from folder
    this.loggerService.info('get files from dir');
    const foundedFiles =  await this.fileSystemService.readDir(wordDir);
      
    // filter out not slides
    const filterSlides = (file : string):boolean => file.includes("document");

    this.loggerService.info('filter files to inject variables');
    const filteredFiles = foundedFiles.filter(filterSlides);

    await this.renderEveryFile(filteredFiles, wordDir, params);
   }
}
