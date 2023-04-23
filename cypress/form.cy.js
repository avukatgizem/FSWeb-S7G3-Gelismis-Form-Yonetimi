describe('Form Testi', () => {
    it('Formu doldur ve gönder', () => {
      cy.visit('http://ornek.com/form');
      cy.get('#isim').type('John Doe');
      cy.get('#isim').should('have.value', 'Gizem Güzel');
      cy.get('#email').type('av.gizemguze@gmail.com');
      cy.get('#sifre').type('123456');
      cy.get('#kosullar').check();
      cy.get('#gonder').click();
      cy.url().should('include', '/form-tesekkurler');
      cy.get('#isim').clear();
      cy.get('#email').clear();
      cy.get('#sifre').clear();
      cy.get('#gonder').click();
      cy.get('#isim:invalid').should('exist');
      cy.get('#email:invalid').should('exist');
      cy.get('#sifre:invalid').should('exist');
    });
  });
  