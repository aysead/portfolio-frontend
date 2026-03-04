/* eslint-disable */
/// <reference types="cypress" />
import { } from 'cypress';
describe('Portfolio Frontend E2E Tests', () => {
  beforeEach(() => {
    // Mocking the API request
    cy.intercept('GET', '**/api/notes', {
      statusCode: 200,
      body: [
        { _id: '1', question: 'Test?', description: 'Test Desc', category: 'React', color: '#000' },
        { _id: '2', question: 'Cypress?', description: 'Works!', category: 'Test', color: '#fff' }
      ]
    }).as('getNotes');

    cy.visit('http://localhost:5173'); 
  });

  it('Main page must load successfully', () => {
    cy.contains('AYSE A. DAGCI').should('be.visible');
    cy.contains('FULL STACK DEVELOPER').should('be.visible');
  });

  it('TR/EN must work properly', () => {
    cy.get('button').contains(/🇬🇧|🇹🇷/).click();
    // check sm word from translation ex: 'Notlar' or 'Notes')
    cy.contains(/NOTLAR|NOTES/i).should('be.visible');
  });

  it('When api data comes into play notes should be replaced', () => {
    cy.wait('@getNotes');
    cy.contains('2').should('be.visible'); 
  });

  it('Notes routing should work', () => {
    cy.contains('NOTES').click();
    cy.url().should('include', '/notes');
    cy.contains('Test?').should('be.visible');
  });
});