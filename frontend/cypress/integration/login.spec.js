describe('LoginForm Component', () => {
    beforeEach(() => {
      cy.visit('/../../src/components/Auth/LoginForm'); 
    });
  
    it('displays form inputs and logs in a user', () => {
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('password123');
  
      cy.get('button[type="submit"]').click();
  
      cy.url().should('include', '/class');
    });
  
    it('displays error message when form is submitted with empty fields', () => {
      cy.get('button[type="submit"]').click();
  
      cy.contains('.error-message', 'Email and password cannot be empty.');
    });
  
    it('displays error message when login fails', () => {

      cy.intercept('POST', `${SERVER_URL}/api/login`, {
        statusCode: 401,
        body: { error: 'Invalid credentials' },
      }).as('login');
  
      cy.get('input[type="email"]').type('invalid@example.com');
      cy.get('input[type="password"]').type('incorrectpassword');
  
      cy.get('button[type="submit"]').click();
  
      cy.wait('@login');
  
      cy.contains('.error-message', 'Invalid credentials');
    });
  
    it('navigates to registration page when "Register Here" link is clicked', () => {
      cy.contains('Haven\'t registered yet?').click();
  
      cy.url().should('include', '/register');
    });
  
  });
  