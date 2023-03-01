/// <reference types="cypress" />
/// <reference types=".." />
// @ts-check

describe('Eat my shorts', () => {
  it('should redirect from shorts player to normal player', () => {
    cy.intercept('GET', '/**/*', {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: '',
    });

    cy.visit('/shorts/Pow-kqk0Cr8');

    cy.runBookmarklet('./dist/eat-my-shorts.bookmarklet');

    cy.url().should('contain', '/watch?v=Pow-kqk0Cr8');
  });
});
