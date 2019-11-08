#!/usr/bin/env node

const prompts = require('prompts');
const loadJsonFile = require('load-json-file');
const writeJsonFile = require('write-json-file');

const questions = [
  {
    type: 'text',
    name: 'name',
    message: 'Roaster name?',
  },
  {
    type: 'select',
    name: 'state',
    message: 'Roaster state?',
    choices: [
      {
        'name': 'Alabama',
        'value': 'Alabama',
      },
      {
        'name': 'Alaska',
        'value': 'Alaska',
      },
      {
        'name': 'Arizona',
        'value': 'Arizona',
      },
      {
        'name': 'Arkansas',
        'value': 'Arkansas',
      },
      {
        'name': 'California',
        'value': 'California',
      },
      {
        'name': 'Colorado',
        'value': 'Colorado',
      },
      {
        'name': 'Connecticut',
        'value': 'Connecticut',
      },
      {
        'name': 'Delaware',
        'value': 'Delaware',
      },
      {
        'name': 'Florida',
        'value': 'Florida',
      },
      {
        'name': 'Georgia',
        'value': 'Georgia',
      },
      {
        'name': 'Hawaii',
        'value': 'Hawaii',
      },
      {
        'name': 'Idaho',
        'value': 'Idaho',
      },
      {
        'name': 'Illinois',
        'value': 'Illinois',
      },
      {
        'name': 'Indiana',
        'value': 'Indiana',
      },
      {
        'name': 'Iowa',
        'value': 'Iowa',
      },
      {
        'name': 'Kansas',
        'value': 'Kansas',
      },
      {
        'name': 'Kentucky',
        'value': 'Kentucky',
      },
      {
        'name': 'Louisiana',
        'value': 'Louisiana',
      },
      {
        'name': 'Maine',
        'value': 'Maine',
      },
      {
        'name': 'Maryland',
        'value': 'Maryland',
      },
      {
        'name': 'Massachusetts',
        'value': 'Massachusetts',
      },
      {
        'name': 'Michigan',
        'value': 'Michigan',
      },
      {
        'name': 'Minnesota',
        'value': 'Minnesota',
      },
      {
        'name': 'Mississippi',
        'value': 'Mississippi',
      },
      {
        'name': 'Missouri',
        'value': 'Missouri',
      },
      {
        'name': 'Montana',
        'value': 'Montana',
      },
      {
        'name': 'Nebraska',
        'value': 'Nebraska',
      },
      {
        'name': 'Nevada',
        'value': 'Nevada',
      },
      {
        'name': 'New Hampshire',
        'value': 'New Hampshire',
      },
      {
        'name': 'New Jersey',
        'value': 'New Jersey',
      },
      {
        'name': 'New Mexico',
        'value': 'New Mexico',
      },
      {
        'name': 'New York',
        'value': 'New York',
      },
      {
        'name': 'North Carolina',
        'value': 'North Carolina',
      },
      {
        'name': 'North Dakota',
        'value': 'North Dakota',
      },
      {
        'name': 'Ohio',
        'value': 'Ohio',
      },
      {
        'name': 'Oklahoma',
        'value': 'Oklahoma',
      },
      {
        'name': 'Oregon',
        'value': 'Oregon',
      },
      {
        'name': 'Pennsylvania',
        'value': 'Pennsylvania',
      },
      {
        'name': 'Rhode Island',
        'value': 'Rhode Island',
      },
      {
        'name': 'South Carolina',
        'value': 'South Carolina',
      },
      {
        'name': 'South Dakota',
        'value': 'South Dakota',
      },
      {
        'name': 'Tennessee',
        'value': 'Tennessee',
      },
      {
        'name': 'Texas',
        'value': 'Texas',
      },
      {
        'name': 'Utah',
        'value': 'Utah',
      },
      {
        'name': 'Vermont',
        'value': 'Vermont',
      },
      {
        'name': 'Virginia',
        'value': 'Virginia',
      },
      {
        'name': 'Washington',
        'value': 'Washington',
      },
      {
        'name': 'West Virginia',
        'value': 'West Virginia',
      },
      {
        'name': 'Wisconsin',
        'value': 'Wisconsin',
      },
      {
        'name': 'Wyoming',
        'value': 'Wyoming',
      },
    ],
  },
  {
    type: 'text',
    name: 'address',
    message: 'Roaster address?',
  },
  {
    type: 'text',
    name: 'website',
    message: 'Roaster website?',
  },
];

(async () => {
  const data = await loadJsonFile('./_data/roasters.json');
  const response = await prompts(questions);
  data.push({
    'name': response.name,
    'state': response.state,
    'address': response.address,
    'website': response.website,
  });
  await writeJsonFile('./_data/roasters.json', data);
})();
