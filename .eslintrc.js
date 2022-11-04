module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:promise/recommended',
    'plugin:sonarjs/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'plugin:effector/recommended',
    'plugin:effector/scope',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    'promise',
    'sonarjs',
    'jsdoc',
    'import',
    '@typescript-eslint',
    'jsx-a11y',
    'effector',
  ],
  rules: {
    'effector/no-watch': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': 'error',
    '@typescript-eslint/await-thenable': 'warn', // TODO: enable
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
        enums: 'always-multiline',
        generics: 'always-multiline',
        tuples: 'always-multiline',
      },
    ],
    '@typescript-eslint/dot-notation': 'error',
    '@typescript-eslint/indent': 'off', // cause https://github.com/typescript-eslint/typescript-eslint/issues/1824
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/member-ordering': 'warn',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
      {
        selector: 'enum',
        format: ['StrictPascalCase'],
      },
      {
        selector: 'enumMember',
        format: ['StrictPascalCase'],
      },
    ],
    '@typescript-eslint/no-unsafe-argument': 'warn', // TODO: remove this line after fixing errors
    '@typescript-eslint/no-floating-promises': 'warn', // TODO: remove this line after fixing errors
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-invalid-this': ['error'],
    '@typescript-eslint/no-unsafe-return': 'warn', // TODO: remove this line after fixing errors
    '@typescript-eslint/no-throw-literal': 'warn', // TODO: remove this line after fixing errors
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-shadow': [
      'off',
      {
        hoist: 'all',
      },
    ],
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-misused-promises': 'warn', // TODO enable
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    '@typescript-eslint/restrict-template-expressions': [
      'warn',
      {
        allowNumber: true,
      },
    ], // TODO enable
    '@typescript-eslint/return-await': 'warn', // TODO enable
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/typedef': ['error', { parameter: true }],
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-unsafe-call': 'warn', // TODO enable
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    'array-callback-return': 'warn', // TODO enable
    'arrow-body-style': 'off',
    'brace-style': ['error', '1tbs'],
    'capitalized-comments': 'off',
    camelcase: ['off'],
    'class-methods-use-this': 'off',
    complexity: ['error', 20],
    'consistent-return': 'off',
    'constructor-super': 'error',
    curly: 'error',
    'eol-last': 'error',
    'default-case': 'warn', // TODO enable
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': 'off',
    eqeqeq: ['error', 'smart'],
    'function-paren-newline': ['off'],
    'func-names': ['error', 'always', { generators: 'never' }],
    'guard-for-in': 'error',
    'id-blacklist': [
      'error',
      'any',
      'Number',
      'String',
      'string',
      'Boolean',
      'boolean',
      'undefined',
    ],
    'id-match': 'error',
    'implicit-arrow-linebreak': 'off',
    'import/no-unassigned-import': [
      'error',
      { allow: ['core-js/stable', 'moment/locale/ru', '**/*.global.less'] },
    ],
    'import/extensions': 'off', // cause too slow
    'import/no-named-as-default-member': 'off', // cause too slow
    '@typescript-eslint/no-implied-eval': 'off', // cause too slow
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown'],
        // works via minimatch lib https://www.npmjs.com/package/minimatch
        // some group paths detects by eslint-import-plugin automatically,
        // see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md for more info
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '*.{scss,css}',
            group: 'sibling',
            position: 'after',
            patternOptions: {
              matchBase: true,
            },
          },
          {
            pattern: '*.json',
            group: 'unknown',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
          // caseInsensitive: true, // TODO: enable
        },
        'newlines-between': 'always',
      },
    ],
    'import/no-cycle': 'warn', // TODO: remove this line after fixing errors
    'import/no-extraneous-dependencies': ['off'],
    'import/no-named-as-default': ['off'],
    'import/no-useless-path-segments': [
      'error',
      {
        commonjs: true,
        noUselessIndex: true,
      },
    ],
    'import/prefer-default-export': ['off'],
    'jsdoc/check-alignment': 'error',
    'jsdoc/check-indentation': 'off',
    'jsdoc/newline-after-description': 'error',
    'jsx-a11y/anchor-is-valid': 'warn', // TODO: enable
    'jsx-a11y/no-noninteractive-element-interactions': 'warn', // TODO: remove this line after fixing errors
    'jsx-a11y/interactive-supports-focus': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn', // TODO: enable
    'jsx-a11y/click-events-have-key-events': 'off',
    'no-nested-ternary': 'warn', // TODO: remove this line after fixing errors
    'max-len': [
      'error',
      {
        code: 100,
        ignoreComments: true,
        ignorePattern: '^import .*',
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
      },
    ],
    'max-lines': ['error', 500],
    'max-lines-per-function': [
      'error',
      {
        max: 200,
        skipBlankLines: true,
        skipComments: true,
        IIFEs: true,
      },
    ],
    'no-bitwise': 'error',
    'no-extra-boolean-cast': 'warn', // TODO: enable
    'no-caller': 'error',
    'no-cond-assign': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'error',
    'no-empty': 'error',
    'no-eval': 'error',
    'no-extra-semi': 'error',
    'no-fallthrough': 'error',
    'no-invalid-this': 'off',
    'no-irregular-whitespace': 'warn', // TODO: enable
    'no-magic-numbers': 'off',
    'no-new-wrappers': 'error',
    'no-param-reassign': 'warn', // TODO: enable
    'no-plusplus': 'off',
    'no-prototype-builtins': 'warn', // TODO: enable
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'lodash',
            message: "Please use default import from 'lodash/<function_name>' instead",
          },
        ],
      },
    ],
    'no-restricted-syntax': 'warn', // TODO: enable, configure
    'no-restricted-globals': 'warn', // TODO: enable
    'no-return-assign': 'warn',
    'no-template-curly-in-string': 'error',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-underscore-dangle': 'error',
    'no-unused-labels': 'error',
    'no-useless-escape': 'warn', // TODO: enable
    'no-useless-return': 'off',
    'no-var': 'error',
    'one-var': ['error', 'never'],
    'operator-assignment': 'warn',
    'promise/always-return': 'off',
    'promise/catch-or-return': 'warn', // TODO: enable
    'prefer-destructuring': 'off',
    'prefer-const': 'error',
    'prefer-object-spread': 'warn',
    'prefer-promise-reject-errors': 'warn',
    'prefer-template': 'off',
    radix: 'error',
    'react/no-danger': 'error',
    'react/static-property-placement': 'off', // TODO: enable
    'react/prefer-stateless-function': 'off', // TODO: enable
    'react/button-has-type': 'off',
    'react/destructuring-assignment': 'off',
    'react/display-name': 'off',
    'react/jsx-boolean-value': 'off',
    'react/jsx-curly-spacing': [
      'error',
      {
        when: 'never',
      },
    ],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-fragments': 'off',
    'react/jsx-key': 'error',
    'react/jsx-no-bind': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/no-access-state-in-setstate': 'warn',
    'react/no-array-index-key': 'warn', // TODO: enable
    'react/no-children-prop': 'warn',
    'react/no-did-update-set-state': 'warn', // TODO: enable
    'react/no-unescaped-entities': 'warn',
    'react/no-unused-prop-types': 'warn', // TODO: enable
    'react/no-unused-state': 'warn', // TODO: enable
    'react/self-closing-comp': 'error',
    'react/state-in-constructor': 'off',
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 0,
    'react/sort-comp': 'warn',
    'sonarjs/cognitive-complexity': 'warn', // TODO: enable
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/'],
      },
    ],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
