/// <reference types="cypress" />
/// <reference types=".." />
// @ts-check

describe('Kill sticky', () => {
  it('should remove fixed elements from page', () => {
    const fixed = () => cy.get('[data-test="fixed-element"]');

    cy.intercept('GET', '/', {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: '<div data-test="fixed-element" style="position: fixed"></div>',
    });

    cy.visit('/');

    fixed().should('exist');

    cy.runBookmarklet('./dist/kill-sticky.bookmarklet');

    fixed().should('not.exist');
  });

  it('should remove sticky elements from page', () => {
    const sticky = () => cy.get('[data-test="sticky-element"]');

    cy.intercept('GET', '/', {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: '<div data-test="sticky-element" style="position: sticky"></div>',
    });

    cy.visit('/');

    sticky().should('exist');

    cy.runBookmarklet('./dist/kill-sticky.bookmarklet');

    sticky().should('not.exist');
  });
});
