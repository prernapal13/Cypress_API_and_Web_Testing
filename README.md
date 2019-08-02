# Cypress_API_and_Web_Testing

This project is implemented in Cypress, Javascript and Cucumber.
1. Writing E2E tests for a checkout process (tests/e2e)
- e2e_tests.feature - This file contains scenario and steps for GUI automation.
2. Testing some API endpoints (tests/api)
- api_tests.feature - This file contains scenarios and steps for testing API used cases.

# Pre-Requisites:
1. npm must be installed in execution machine.
2. Marvel API's public and private key is required.

# How to Ecexute Scripts:
1. Please add your public and private keys in below variables in api_tests.js file(./cypress/integration/api_tests/api_tests.js):
- const publicKey
- const privateKey

2. To install cypress and all dependencies, execute below mentioned command:
> `npm install`

3. To execute all scripts in headless mode, execute below mentioned command:
> `npm test`

4. To execute scripts from cypress playground, execute below command and click on desired feature file:
> `./node_modules/.bin/cypress open`
