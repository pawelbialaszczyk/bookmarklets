describe('Kill sticky', () => {

  const fixed = () => cy.get('[data-test="fixed-element"]');
  const sticky = () => cy.get('[data-test="sticky-element"]');

  beforeEach(() => {
    cy.intercept('GET', '/', {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: `
        <div data-test="fixed-element" style="position: fixed"></div>
        <div data-test="sticky-element" style="position: sticky"></div>
      `,
    });

    cy.visit('/');
  });

  it('should remove fixed elements from page', () => {
    fixed().should('exist');

    cy.runBookmarklet('./dist/kill-sticky.bookmarklet');

    fixed().should('not.exist');
  });

  it('should remove sticky elements from page', () => {
    sticky().should('exist');

    cy.runBookmarklet('./dist/kill-sticky.bookmarklet');

    sticky().should('not.exist');
  });

});
