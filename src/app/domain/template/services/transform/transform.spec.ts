import { TemplateTransformService } from './transform';
import {FileSystemService} from '@shared/file-system/services/main/main';
import {LoggerService} from '@shared/logger/services/main/main';

const fileSystem = jest.mock('@shared/file-system/services/main/main') as unknown;
const logger = jest.mock('@shared/logger/services/main/main') as unknown;

describe('CatsController', () => {
  let transformService: TemplateTransformService;

  beforeEach(async () => {
      transformService = new TemplateTransformService(fileSystem as FileSystemService,logger as LoggerService);
  });

  describe('replaceTagsInstrings', () => {
    it('single mark', async () => {
	const testString = "&lt;%= test %&gt;";
	const result = "<%= test %>";

	expect(transformService.replaceTagsInstrings(testString)).toBe(result);
    });

    it('more marks', async () => {
	const testString = `&lt;%= test %&gt;
             &lt;%= test %&gt;
	`;
	const result = `<%= test %>
             <%= test %>
	`;

	expect(transformService.replaceTagsInstrings(testString)).toBe(result);
    });

    it('more marks', async () => {
	const testString = `&lt;% 2 &gt; 5 %&gt;`;
	const result = `<% 2 > 5 %>`;

	expect(transformService.replaceTagsInstrings(testString)).toBe(result);
    });
  });
});
