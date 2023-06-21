module.exports = {
    extends: [
        'mantine',
        'plugin:@next/next/recommended',
        'plugin:jest/recommended',
        'plugin:storybook/recommended',
    ],
    plugins: ['testing-library', 'jest'],
    overrides: [
        {
            files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
            extends: ['plugin:testing-library/react'],
        },
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-throw-literal': 'off',
        'no-console': 'off',
        'max-len': ['error', {code: 120}],
        "arrow-body-style": "off",
        "@next/next/no-server-import-in-page": "off"

    },
};
