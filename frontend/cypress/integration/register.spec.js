describe('RegisterForm Component', () => {
    beforeEach(() => {
      cy.visit('../../src/components/Auth/RegisterForm'); 
    });
  
    it('displays form inputs and registers a user', () => {
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('password123');
  
      cy.get('button[type="submit"]').click();
  
      cy.contains('.success-message', 'User registered successfully!');
    });
  
    it('displays error message when form is submitted with empty fields', () => {
      cy.get('button[type="submit"]').click();
  
      cy.contains('.error-message', 'Email and password cannot be empty.');
    });
  
    it('displays error message when registration fails', () => {
   
      cy.intercept('POST', `${SERVER_URL}/api/users`, {
        statusCode: 409,
        body: { error: 'Email already taken' },
      }).as('registration');
  
      cy.get('input[type="email"]').type('existinguser@example.com');
      cy.get('input[type="password"]').type('password123');
  
      cy.get('button[type="submit"]').click();
  
      cy.wait('@registration');
  
      cy.contains('.error-message', 'This email is already registered. Please use a different email.');
    });
  
    it('navigates to login page when "Login Here" link is clicked', () => {
      cy.contains('Already registered?').click();
  
      cy.url().should('include', '/');
    });
  
  });
  