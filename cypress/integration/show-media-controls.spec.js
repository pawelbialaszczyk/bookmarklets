describe('Show media controls', () => {

  const media = () => cy.get('video, audio');

  beforeEach(() => {
    cy.intercept('GET', '/', {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: `
        <audio
          style="visibility: hidden"
          muted
          src="https://www.w3schools.com/html/horse.ogg"
        >
      `,
    });

    cy.visit('/');
  });

  it('should display controls', () => {
    media().should('not.be.visible');

    cy.runBookmarklet('./dist/show-media-controls.bookmarklet');

    media().should('be.visible');
  });

});
