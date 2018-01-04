import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Post e2e test', () => {

    let navBarPage: NavBarPage;
    let postDialogPage: PostDialogPage;
    let postComponentsPage: PostComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Posts', () => {
        navBarPage.goToEntity('post');
        postComponentsPage = new PostComponentsPage();
        expect(postComponentsPage.getTitle()).toMatch(/blogApp.post.home.title/);

    });

    it('should load create Post dialog', () => {
        postComponentsPage.clickOnCreateButton();
        postDialogPage = new PostDialogPage();
        expect(postDialogPage.getModalTitle()).toMatch(/blogApp.post.home.createOrEditLabel/);
        postDialogPage.close();
    });

    it('should create and save Posts', () => {
        postComponentsPage.clickOnCreateButton();
        postDialogPage.setTitleInput('title');
        expect(postDialogPage.getTitleInput()).toMatch('title');
        postDialogPage.setBodyInput('body');
        expect(postDialogPage.getBodyInput()).toMatch('body');
        postDialogPage.setCreatedInput('2000-12-31');
        expect(postDialogPage.getCreatedInput()).toMatch('2000-12-31');
        postDialogPage.authorSelectLastOption();
        postDialogPage.save();
        expect(postDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PostComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-post div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PostDialogPage {
    modalTitle = element(by.css('h4#myPostLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    bodyInput = element(by.css('input#field_body'));
    createdInput = element(by.css('input#field_created'));
    authorSelect = element(by.css('select#field_author'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTitleInput = function (title) {
        this.titleInput.sendKeys(title);
    }

    getTitleInput = function () {
        return this.titleInput.getAttribute('value');
    }

    setBodyInput = function (body) {
        this.bodyInput.sendKeys(body);
    }

    getBodyInput = function () {
        return this.bodyInput.getAttribute('value');
    }

    setCreatedInput = function (created) {
        this.createdInput.sendKeys(created);
    }

    getCreatedInput = function () {
        return this.createdInput.getAttribute('value');
    }

    authorSelectLastOption = function () {
        this.authorSelect.all(by.tagName('option')).last().click();
    }

    authorSelectOption = function (option) {
        this.authorSelect.sendKeys(option);
    }

    getAuthorSelect = function () {
        return this.authorSelect;
    }

    getAuthorSelectedOption = function () {
        return this.authorSelect.element(by.css('option:checked')).getText();
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
