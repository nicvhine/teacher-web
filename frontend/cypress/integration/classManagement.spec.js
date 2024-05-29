describe('Settings Component', () => {
    beforeEach(() => {
        cy.visit('/../../src/components/Navigation/Settings'); 
    });
  
    it('displays class details and updates them', () => {
      cy.get('input[name="name"]').clear().type('New Class Name');
      cy.get('input[name="description"]').clear().type('New Class Description');
      cy.get('input[name="startYear"]').clear().type('2024');
      cy.get('input[name="endYear"]').clear().type('2025');
  
      cy.get('.add-task-button').click();
      cy.contains('.success-message', 'Class updated successfully');
    });
  
    it('displays error message when form is submitted with empty fields', () => {
      cy.get('.add-task-button').click();
  
      cy.contains('.error-message', 'Fields cannot be empty.');
    });
  
    it('deletes class when "Delete Class" button is clicked', () => {
      cy.contains('Delete Class').click();
  
      cy.url().should('eq', '/class');
    });
  
  });
  