class ReportsPage {
    navigateToReports() {
      cy.get("#sidebar-reports").click();
    }
  
    getInitialNumberOfReports() {
      cy.get(".tile-list").children().its('length').then(numberOfReports => {
        cy.wrap(numberOfReports).as('initialNumberOfReports');
      });
    }
  
    createReport() {
      cy.get("a[data-test-id='create-button']").click();
      cy.get("button[data-test-id='report-template-select-świadomość-marki 2.0']").click();
      this.selectLast7Days();
      this.selectAnalysisType();
      cy.get("button[data-test-id='submit-button']").click();
    }
  
    selectLast7Days() {
      cy.get(".input-wrapper.with-left-icon.with-caret").click();
      cy.get("li[data-range-key='Ostatnie 7 dni']").click();
    }
  
    selectAnalysisType() {
      cy.get(".with-toggle__activator.with-toggle__activator--with-beacon").click();
      cy.get("label[for='resultsTypeField-ar']").click();
      cy.xpath("(//div)[55]").click(); // unique data-test-id should be added to html // Note: Using XPath is not recommended; prefer data-test-id or similar.
    }
  
    verifyReportGeneration() {
      // check if number of reports is increased
      cy.get('@initialNumberOfReports').then((numberOfReports) => {
        cy.get(".tile-list").children().its('length').should('eq', numberOfReports + 1);
      });
      // check if new report is created and generating pdf (assuming it it always first on the list, no unique identifier available)
      cy.get(".tile-list").children().first().get('div[class="report-box__status report-box__status--generating dots-loading"]').should('be.visible');
      // check if new report have visible pdf download link
      cy.get(".tile-list").children().first().find('a', { timeout: 30000 }).should('be.visible').contains('pdf');
    }
  }
  
  export default ReportsPage;
  