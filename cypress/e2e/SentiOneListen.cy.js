describe('SentiOne Listen Tests', () => {
    context('Report generation', () => {
        it('"Brand Awareness 2.0" Report pdf generation test', () => {
            // log-in
            cy.visit('https://sentione.com/app/login');
            cy.get("div[class='react-signin-form'] input[name='email']").type('qa-recruitment-task@sentione.com'), { delay: 100 };
            cy.get("div[class='input-with-label'] input[name='password']").type('KESPnjM9WvHR'), { delay: 100 };
            cy.get("div[class='react-signin-form'] button[data-test-id='submit-button']").click();

            // go to reports
            cy.get("#sidebar-reports").click();

            // store initial number of reports
            cy.get(".tile-list").children().its('length').then(numberOfReports => {
                cy.wrap(numberOfReports).as('initialNumberOfReports');
            })

            // generate new report
            cy.get("a[data-test-id='create-button']").click();
            cy.get("button[data-test-id='report-template-select-świadomość-marki 2.0']").click();
            cy.get(".input-wrapper.with-left-icon.with-caret").click();
            cy.get("li[data-range-key='Ostatnie 7 dni']").click();
            cy.get(".with-toggle__activator.with-toggle__activator--with-beacon").click();
            cy.get("label[for='resultsTypeField-ar']").click();
            cy.xpath("(//div)[55]").click(); // unique data-test-id should be added to html for clarity
            cy.get("button[data-test-id='submit-button']").click();

            // check if number of reports is increased
            cy.get('@initialNumberOfReports').then((numberOfReports) => {
                cy.get(".tile-list").children().its('length').should('eq', numberOfReports + 1);
            });

            // check if new report is created and generating pdf (assuming it it always first on the list, no unique identifier available)
            cy.get(".tile-list").children().first().get('div[class="report-box__status report-box__status--generating dots-loading"]').should('be.visible');

            // check if new report have visible pdf download link
            cy.get(".tile-list").children().first().find('a', { timeout: 30000 }).should('be.visible').contains('pdf');

            //TODO: refactor to Page Object Pattern
            //TODO: extract selectors and 
        })
    })
});