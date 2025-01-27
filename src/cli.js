#!/usr/bin/env node
const inquirer = require('inquirer');
const generateREADME = require('./generator');
    
const questions = [
    {
        type: 'input',
        name: 'projectName',
        message: 'Project name:',
        validate: input => {
            if (!input) return 'Project name is required';
            if (input.length < 1 || input.length > 214) return 'Project name must be between 1 and 214 characters';
            if (!/^[a-zA-Z0-9-_\.\s]+$/.test(input)) return 'Project name can only contain letters, numbers, hyphens, underscores, dots, and spaces';
            return true;
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Project description:',
        validate: input => {
            if (!input) return 'Description is required';
            if (input.length < 10) return 'Description should be at least 10 characters long';
            return true;
        }
    },
    {
        type: 'input',
        name: 'installCommand',
        message: 'Install command:',
        default: 'npm install',
        validate: input => input ? true : 'Install command is required'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Usage instructions:',
        validate: input => {
            if (!input) return 'Usage instructions are required';
            if (input.length < 10) return 'Usage instructions should be at least 10 characters long';
            return true;
        }
    },
    {
        type: 'confirm',
        name: 'includeLicense',
        message: 'Include license section?',
        default: true
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose license:',
        choices: ['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3-Clause', 'ISC', 'Unlicense', 'AGPL-3.0'],
        when: (answers) => answers.includeLicense
    },
    {
        type: 'confirm',
        name: 'includeTOC',
        message: 'Include table of contents?',
        default: true
    },
    {
        type: 'confirm',
        name: 'includeContributing',
        message: 'Include contributing section?',
        default: true
    },
    {
        type: 'confirm',
        name: 'includeAuthor',
        message: 'Include author section?',
        default: true
    },
    {
        type: 'input',
        name: 'authorName',
        message: 'Author name:',
        when: (answers) => answers.includeAuthor,
        validate: input => input ? true : 'Author name is required when including author section'
    },
    {
        type: 'input',
        name: 'githubUsername',
        message: 'GitHub username (optional):',
        when: (answers) => answers.includeAuthor
    },
    {
        type: 'input',
        name: 'email',
        message: 'Author email (optional):',
        when: (answers) => answers.includeAuthor,
        validate: input => {
            if (!input) return true
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) return 'Please enter a valid email address';
            return true;
        }
    },
    {
        type: 'input',
        name: 'testCommand',
        message: 'Test command:',
        default: 'npm test',
        validate: input => input ? true : 'Test command is required'
    }
];

async function main() {
    try {
      const answers = await inquirer.prompt(questions);
      await generateREADME(answers);
    } catch (error) {
      console.error('Error:', error);
    }
  }
main();