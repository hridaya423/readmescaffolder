const fs = require('fs-extra');
const handlebars = require('handlebars');
const path = require('path');

async function generateREADME(answers) {
  try {
    const templatePath = path.join(__dirname, '../template/README.hbs');
    const templateContent = await fs.readFile(templatePath, 'utf-8');
    const template = handlebars.compile(templateContent);
    const readmeContent = template(answers);
    await fs.writeFile('README.md', readmeContent);
    console.log('README.md generated successfully!');
  } catch (error) {
    console.error('Error generating README:', error);
  }
}

module.exports = generateREADME;