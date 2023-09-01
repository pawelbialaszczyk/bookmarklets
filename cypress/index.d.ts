/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Run bookmarklet from a given path
     */
    runBookmarklet(bookmarkletPath: string): Chainable<unknown>;

    /**
     * Set browser's fullscreen mode
     */
    setFullscreen(isFullscreen: boolean): Chainable<unknown>;
  }
}
