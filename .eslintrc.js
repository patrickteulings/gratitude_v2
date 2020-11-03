module.exports = {
  'root': true,

  'env': {
    node: true
  },

  'extends': [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],

  'parserOptions': {
    ecmaVersion: 2020
  },

  'rules': {
    'no-console': 'off',
    'no-debugger': 'off',
    'space-before-function-paren': [
      'error',
      'always'
    ],
    'func-call-spacing': [
      'error',
      'never'
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
        maxEOF: 0
      }
    ],
    "interface-name-prefix": [true, "always-prefix"],
    'quotes': [
      'error',
      'single',
      {
        allowTemplateLiterals: true
      }
    ],
    'quote-props': [
      'error',
      'consistent'
    ],
    'vue/html-closing-bracket-spacing': 'warn'
  },

  'overrides': [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ],

  'extends': [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ]
}
