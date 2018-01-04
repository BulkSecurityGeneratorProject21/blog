import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Author e2e test', () => {

    let navBarPage: NavBarPage;
    let authorDialogPage: AuthorDialogPage;
    let authorComponentsPage: AuthorComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Authors', () => {
        navBarPage.goToEntity('author');
        authorComponentsPage = new AuthorComponentsPage();
        expect(authorComponentsPage.getTitle()).toMatch(/blogApp.author.home.title/);

    });

    it('should load create Author dialog', () => {
        authorComponentsPage.clickOnCreateButton();
        authorDialogPage = new AuthorDialogPage();
        expect(authorDialogPage.getModalTitle()).toMatch(/blogApp.author.home.createOrEditLabel/);
        authorDialogPage.close();
    });

    it('should create and save Authors', () => {
        authorComponentsPage.clickOnCreateButton();
        authorDialogPage.setFirstNameInput('firstName');
        expect(authorDialogPage.getFirstNameInput()).toMatch('firstName');
        authorDialogPage.setLastNameInput('lastName');
        expect(authorDialogPage.getLastNameInput()).toMatch('lastName');
        authorDialogPage.setDisplayNameInput('displayName');
        expect(authorDialogPage.getDisplayNameInput()).toMatch('displayName');
        authorDialogPage.save();
        expect(authorDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AuthorComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-author div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AuthorDialogPage {
    modalTitle = element(by.css('h4#myAuthorLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    firstNameInput = element(by.css('input#field_firstName'));
    lastNameInput = element(by.css('input#field_lastName'));
    displayNameInput = element(by.css('input#field_displayName'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setFirstNameInput = function (firstName) {
        this.firstNameInput.sendKeys(firstName);
    }

    getFirstNameInput = function () {
        return this.firstNameInput.getAttribute('value');
    }

    setLastNameInput = function (lastName) {
        this.lastNameInput.sendKeys(lastName);
    }

    getLastNameInput = function () {
        return this.lastNameInput.getAttribute('value');
    }

    setDisplayNameInput = function (displayName) {
        this.displayNameInput.sendKeys(displayName);
    }

    getDisplayNameInput = function () {
        return this.displayNameInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
