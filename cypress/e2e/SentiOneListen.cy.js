import LoginPage from './pageObjects/LoginPage';
import ReportsPage from './pageObjects/ReportsPage';

describe('SentiOne Listen Tests', () => {
    context('Report generation', () => {
        it('"Brand Awareness 2.0" Report pdf generation test', () => {
            const loginPage = new LoginPage();
            const reportsPage = new ReportsPage();

            // log-in
            loginPage.navigate();
            loginPage.enterEmail('qa-recruitment-task@sentione.com');
            loginPage.enterPassword('KESPnjM9WvHR');
            loginPage.submit();

            // go to reports
            reportsPage.navigateToReports();

            // store initial number of reports
            reportsPage.getInitialNumberOfReports();

            // generate new report
            reportsPage.createReport();

            // verify report generation
            reportsPage.verifyReportGeneration();

            //TODO: ask ChatGPT to extract locators  ;)
        })
    })
});