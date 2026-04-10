export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // tipos permitidos
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'chore',
        'docs',
        'refactor',
        'test',
        'build',
        'ci',
        'perf',
        'style',
      ],
    ],

    // escopo obrigatório
    'scope-empty': [2, 'never'],

    // tipo obrigatório
    'type-empty': [2, 'never'],

    // formato do subject
    'subject-empty': [2, 'never'],
    'subject-case': [0], // libera PT-BR (sem forçar lowercase)

    // limite de tamanho
    'header-max-length': [2, 'always', 100],
  },
};
