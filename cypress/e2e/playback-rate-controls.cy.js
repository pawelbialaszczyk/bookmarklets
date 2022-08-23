describe('Playback rate controls', () => {

  const media = () => cy.get('video, audio');
  const controls = () => cy.get('#47c18cbd1f46');

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
    media().should($media => {
      expect($media.get(0).playbackRate).to.equal(1);
    });

    controls().should('contain.text', '1.0');

    controls().contains('Slower').click();

    media().should($media => {
      expect(+$media.get(0).playbackRate.toFixed(1)).to.equal(0.9);
    });

    controls().should('contain.text', '0.9');

    controls().contains('Slower').click();

    media().should($media => {
      expect(+$media.get(0).playbackRate.toFixed(1)).to.equal(0.8);
    });

    controls().should('contain.text', '0.8');
  });

  it('should be able to increase playback rate', () => {
    media().should($media => {
      expect($media.get(0).playbackRate).to.equal(1);
    });

    controls().should('contain.text', '1.0');

    controls().contains('Faster').click();

    media().should($media => {
      expect(+$media.get(0).playbackRate.toFixed(1)).to.equal(1.1);
    });

    controls().should('contain.text', '1.1');

    controls().contains('Faster').click();

    media().should($media => {
      expect(+$media.get(0).playbackRate.toFixed(1)).to.equal(1.2);
    });

    controls().should('contain.text', '1.2');
  });

  it('should subscribe to playback rate change', () => {
    media().should($media => {
      expect($media.get(0).playbackRate).to.equal(1);
    });

    controls().should('contain.text', '1.0');

    media().then($media => {
      $media.get(0).playbackRate = 1.5;
    });

    controls().should('contain.text', '1.5');
  });

  it('should hide controls while in fullscreen mode', () => {
    cy.toggleFullscreen(true);

    controls().should('exist').and('not.be.visible');

    cy.toggleFullscreen(false);

    controls().should('exist').and('be.visible');
  });

});
