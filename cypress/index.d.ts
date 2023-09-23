/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Run bookmarklet from a given path
     */
    runBookmarklet(bookmarkletName: string): Chainable<unknown>;

    /**
     * Set browser's fullscreen mode
     */
    setFullscreen(isFullscreen: boolean): Chainable<unknown>;
  }
}
