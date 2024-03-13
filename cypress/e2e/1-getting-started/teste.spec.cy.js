// teste.spec.js

describe('Teste do formulário', () => {
    it('Preenche e envia o formulário usando um comando personalizado', () => {
      cy.visit('./src/index.html');
      cy.fillMandatoryFieldsAndSubmit(); // Chamada do comando personalizado
      cy.get('.success').should('be.visible'); // Verifica se a mensagem de sucesso está visível
    });
  });
  