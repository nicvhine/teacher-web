describe('TaskManagement Component', () => {
    beforeEach(() => {
      cy.visit('/../../src/components/Navigation/Tasks');
    });
  
    it('displays form inputs and adds a new task', () => {
      cy.get('input[name="title"]').type('New Task');
      cy.get('input[name="description"]').type('This is a new task');
      cy.get('input[name="due_date"]').type('2024-06-01');
  
      cy.get('.add-task-button').click();
  
      cy.contains('.success-message', 'Task added successfully');
    });
  
    it('displays error message when form is submitted with empty fields', () => {
      cy.get('.add-task-button').click();
  
      cy.contains('.error-message', 'Fields cannot be empty.');
    });
  
    it('filters tasks based on search query', () => {
      cy.get('input[type="text"]').type('new');
  
      cy.get('tbody').find('tr').should('have.length', 1);
    });
  
    it('toggles task status when clicked', () => {

      cy.get('tbody tr:first-child td:nth-child(4) span').click();
  
      cy.get('tbody tr:first-child td:nth-child(4) span').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  
  });
  