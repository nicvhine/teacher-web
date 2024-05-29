describe('Class Component', () => {
    beforeEach(() => {
      cy.visit('../../src/components/Landing/AddClassForm'); 
    });

    it('displays form inputs and adds a class', () => {
      cy.get('input[placeholder="Class Name"]').type('Test Class');
      cy.get('textarea[placeholder="Description"]').type('This is a test class');
      cy.get('textarea[placeholder="Group Number"]').type('Test Group');
      cy.get('input[placeholder="Start Year"]').type('2024');
      cy.get('input[placeholder="End Year"]').type('2025');
  
      cy.get('button[type="submit"]').click();
  
      cy.contains('.success-message-container', 'Class added successfully');
    });
  
    it('displays error message when form is submitted with empty fields', () => {
      cy.get('button[type="submit"]').click();
  
      cy.contains('.error-message-container', 'All fields are required');
    });
  
    it('navigates to class details page when class item is clicked', () => {
      cy.get('.class-item').first().click();
  
      cy.url().should('include', '/dashboard/');
    });
  
  });
  