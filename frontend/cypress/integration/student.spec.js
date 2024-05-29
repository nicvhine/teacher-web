describe('StudentList Component', () => {
    beforeEach(() => {
      cy.visit('/../../src/components/Navigation/StudentList'); 
    });
  
    it('displays form inputs and adds a new student', () => {
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="email"]').type('john@example.com');
  
      cy.get('form').submit();
  
      cy.contains('.success-message', 'Student added successfully!');
    });
  
    it('displays error message when form is submitted with empty fields', () => {
      cy.get('form').submit();
  
      cy.contains('.error-message', 'Name and email cannot be empty.');
    });
  
    it('filters students based on search query', () => {
      cy.get('input[type="text"]').type('john');
  
      cy.get('tbody').find('tr').should('have.length', 1);
    });
  
    it('toggles student status when clicked', () => {
    
      cy.get('tbody tr:first-child td:nth-child(4) span').click();
  
      cy.get('tbody tr:first-child td:nth-child(4) span').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  
  });
  