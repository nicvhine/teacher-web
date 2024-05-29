describe('Dashboard Component', () => {
    beforeEach(() => {
      cy.visit('/../../src/components/ClassesDashboard/Dashboard'); 
    });
  
    it('displays class navigation links', () => {
      cy.contains('Dashboard').should('exist');
      cy.contains('Student List').should('exist');
      cy.contains('Task Management').should('exist');
      cy.contains('Class Management').should('exist');
      cy.contains('Class List').should('exist');
      cy.contains('Logout').should('exist');
    });
  
    it('fetches class information when classId is provided', () => {
      cy.intercept('GET', `${SERVER_URL}/api/class/1`, { fixture: 'classInfo.json' }).as('getClassInfo');
  
      cy.wait('@getClassInfo');
  
      cy.contains('.dashboard-container', 'Class Name').should('exist');
      cy.contains('.dashboard-container', 'Teacher').should('exist');
    });
  
    it('navigates to class list when "Class List" link is clicked', () => {
      cy.contains('Class List').click();
  
      cy.url().should('include', '/class');
    });
  
  
  });
  