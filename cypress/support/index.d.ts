/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Run bookmarklet from a given path
     */
    runBookmarklet(bookmarkletPath: string): Chainable<unknown>

    /**
     * Toggle browser's fullscreen mode
     */
    toggleFullscreen(isFullscreen: boolean): Chainable<unknown>
  }
}
