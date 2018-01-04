import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Comment e2e test', () => {

    let navBarPage: NavBarPage;
    let commentDialogPage: CommentDialogPage;
    let commentComponentsPage: CommentComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Comments', () => {
        navBarPage.goToEntity('comment');
        commentComponentsPage = new CommentComponentsPage();
        expect(commentComponentsPage.getTitle()).toMatch(/blogApp.comment.home.title/);

    });

    it('should load create Comment dialog', () => {
        commentComponentsPage.clickOnCreateButton();
        commentDialogPage = new CommentDialogPage();
        expect(commentDialogPage.getModalTitle()).toMatch(/blogApp.comment.home.createOrEditLabel/);
        commentDialogPage.close();
    });

    it('should create and save Comments', () => {
        commentComponentsPage.clickOnCreateButton();
        commentDialogPage.setTitleInput('title');
        expect(commentDialogPage.getTitleInput()).toMatch('title');
        commentDialogPage.setBodyInput('body');
        expect(commentDialogPage.getBodyInput()).toMatch('body');
        commentDialogPage.setCreatedInput('2000-12-31');
        expect(commentDialogPage.getCreatedInput()).toMatch('2000-12-31');
        commentDialogPage.authorSelectLastOption();
        commentDialogPage.save();
        expect(commentDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CommentComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-comment div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CommentDialogPage {
    modalTitle = element(by.css('h4#myCommentLabel'));
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
