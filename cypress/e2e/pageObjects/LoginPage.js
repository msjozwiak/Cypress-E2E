class LoginPage {
    navigate() {
      cy.visit('https://sentione.com/app/login');
    }
  
    enterEmail(email) {
      cy.get("div[class='react-signin-form'] input[name='email']").type(email, { delay: 100 });
    }
  
    enterPassword(password) {
      cy.get("div[class='input-with-label'] input[name='password']").type(password, { delay: 100 });
    }
  
    submit() {
      cy.get("div[class='react-signin-form'] button[data-test-id='submit-button']").click();
    }
  }
  
  export default LoginPage;
  