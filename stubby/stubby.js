const fs = require('fs');
const path = require('path');

const yaml = require('js-yaml');
const { Stubby } = require('stubby');

const loadYaml = (filename) => yaml.load(fs.readFileSync(filename, 'utf8').trim());

const getConfig = () => {
  return fs
    .readdirSync('src/api')
    .map((name) => path.resolve('src/api', name, './stubbs/config.yaml'))
    .filter(fs.existsSync)
    .reduce((result, filename) => {
      const data = loadYaml(filename);

      if (!Array.isArray(data)) {
        throw new Error(`${filename} должен содержать массив значений!`);
      }

      const correctFilename = (config) => {
        if (config && config.file) {
          config.file = path.resolve(path.dirname(filename), config.file);
        }
        return config;
      };

      data.forEach((endpoint) => {
        correctFilename(endpoint.request);
        if (Array.isArray(endpoint.response)) {
          endpoint.response.map(correctFilename);
        } else {
          correctFilename(endpoint.response);
        }
        return endpoint;
      });

      return [...result, ...data];
    }, []);
};

const mockService = new Stubby();

const options = {
  stubs: 8080,
  quiet: true,
  data: getConfig(),
};

mockService.start(options, (errors) => {
  if (Array.isArray(errors)) {
    console.log('Stubby is being stopped because of errors:'); // eslint-disable-line no-console
    errors.forEach(console.log); // eslint-disable-line no-console
    process.exit(1);
  }
});

process.on('SIGHUP', () => {
  mockService.delete(() => {
    mockService.start(options);
  });
});
