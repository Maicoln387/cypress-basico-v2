// commands.js

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
  cy.get('#firstName').type('Maicoln')
  cy.get('#lastName').type('Santana')
  cy.get('#email').type('maicoln_gs@hotmail.com')
  cy.get('#open-text-area').type('Teste')
  cy.contains('button', 'Enviar').click()
})
   