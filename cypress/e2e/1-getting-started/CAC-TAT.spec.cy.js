/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.visit('./src/index.html')
  });
    it('verifica o título da aplicação', function() {
      cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
      const longText = 'maicon, maicon, maicon, maicon'
      cy.get('#firstName').type('Maicoln')
      cy.get('#lastName').type('Santana')
      cy.get('#email').type('maicoln_gs@hotmail.com')
      cy.get('#open-text-area').type(longText, {delay: 0})
      cy.contains('button', 'Enviar').click()

      cy.get('.success').should('be.visible');
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
      cy.get('#firstName').type('Maicoln')
      cy.get('#lastName').type('Santana')
      cy.get('#email').type('maicoln_gs@hotmail;com')
      cy.get('#open-text-area').type('Teste')
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible');
    })
    it('campo telefone continua vazio quando feito no formato não númerico',function(){
      cy.get('#phone')
        .type('msdmskdsdm')
        .should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
      cy.get('#firstName').type('Maicoln')
      cy.get('#lastName').type('Santana')
      cy.get('#email').type('maicoln_gs@hotmail.com')
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('Teste')
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible');   
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
      cy.get('#firstName')
        .type('Maicon')
        .should('have.value', 'Maicon')
        .clear()
        .should('have.value', '')
      cy.get('#lastName')
        .type('Gonçalves de Santana')
        .should('have.value', 'Gonçalves de Santana')
        .clear()
        .should('have.value', '')
      cy.get('#email')
        .type('maicoln_gs@hotmail.com')
        .should('have.value', 'maicoln_gs@hotmail.com')
        .clear()
        .should('have.value', '')
      cy.get('#phone')
        .type('1234567')
        .should('have.value', '1234567')
        .clear()
        .should('have.value', '')
    })

    it('clicando em campos',function(){
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')

    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
      cy.get('button[type="submit"]').click()

      cy.get('.error').should('be.visible')
 
    })
    it('clicando em campos',function(){
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')

    })
    it('envia o formuário com sucesso usando um comando customizado',function(){
      cy.fillMandatoryFieldsAndSubmit()
      
      cy.get('.success').should('be.visible');

    })
    it('seleciona um produto (YouTube) por seu texto',function(){
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)',function(){
      cy.get('#product')
      .select('mentoria')
      .should('have.value','mentoria')
    })

    it('seleciona um produto (Blog) por seu índice',function(){
      cy.get('#product')
      .select(1)
      .should('have.value','blog')
    })

    it('marca o tipo de atendimento "Feedback"',function(){
      cy.get('input[type="radio"][value="feedback"]').check()
        .should('have.value','feedback')
    })

    it('marca cada tipo de atendimento',function(){
      cy.get('input[type="radio"]')
        .should('have.length',3)//para contar quantos tem
        .each(function($radio){
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último',function(){
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures',function(){
      cy.get('input[type="file"]')//pegar o input do tipo file
        .should('not.have.value')//verifica que não tem nenhum valor ainda 
        .selectFile('./cypress/fixtures/example.json')//fazer upload de arquivos com cypress
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop',function(){
      cy.get('input[type="file"]')//pegar o input do tipo file
      .should('not.have.value')//verifica que não tem nenhum valor ainda 
      .selectFile('./cypress/fixtures/example.json',{ action:'drag-drop'})//fazer upload por debaixo dos panos, diferença não vista aos olhos
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
      cy.fixture('example.json').as('sampleFile')//pegar o example.json e o 'as' da o nome de sampleFile
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')//passa o alias(as) feito logo acima
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')//verificação para saber se pegou o certo
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank') //targetBlank= abrir em outra aba
        
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link',function(){
      cy.get('#privacy a')
        .invoke('removeAttr', 'target') //Attr=Atributo 
        .click()

      cy.contains('Talking About Testing').should('be.visible') // saber se a página está visivel 
    })
  })
   