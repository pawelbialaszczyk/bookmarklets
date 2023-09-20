/// <reference types="cypress" />
/// <reference types=".." />
// @ts-check

describe('Playback rate controls', () => {
  const media = () => cy.get('audio');
  const controls = () => cy.get('[data-test="playback-rate-controls"]');

  beforeEach(() => {
    cy.intercept('GET', '/', {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: `
        <audio
          controls
          muted
          src="https://www.w3schools.com/html/horse.ogg"
        >
      `,
    });

    cy.visit('/');

    cy.runBookmarklet('./dist/playback-rate-controls.bookmarklet');

    media().then($media => $media.get(0).play());
  });

  it('should display controls', () => {
    controls()
      .should('be.visible')
      .should('contain.text', 'Slower')
      .should('contain.text', '1.0')
      .should('contain.text', 'Faster');
  });

  it('should be able to decrease playback rate', () => {
    media().invoke('prop', 'playbackRate').should('equal', 1);

    controls().should('contain.text', '1.0');

    controls().contains('Slower').click();

    media().invoke('prop', 'playbackRate').should('equal', 0.9);

    controls().should('contain.text', '0.9');

    controls().contains('Slower').click();

    media().invoke('prop', 'playbackRate').should('equal', 0.8);

    controls().should('contain.text', '0.8');
  });

  it('should be able to increase playback rate', () => {
    media().invoke('prop', 'playbackRate').should('equal', 1);

    controls().should('contain.text', '1.0');

    controls().contains('Faster').click();

    media().invoke('prop', 'playbackRate').should('equal', 1.1);

    controls().should('contain.text', '1.1');

    controls().contains('Faster').click();

    media().invoke('prop', 'playbackRate').should('equal', 1.2);

    controls().should('contain.text', '1.2');
  });

  it('should subscribe to playback rate change', () => {
    media().invoke('prop', 'playbackRate').should('equal', 1);

    controls().should('contain.text', '1.0');

    media().invoke('prop', 'playbackRate', 1.5);

    controls().should('contain.text', '1.5');
  });

  it('should hide controls while in fullscreen mode', () => {
    cy.setFullscreen(true);

    controls().should('exist').and('not.be.visible');

    cy.setFullscreen(false);

    controls().should('exist').and('be.visible');
  });
});
