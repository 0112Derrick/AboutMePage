const HTML_IDS = {
    PORTFOLIO_BTN: 'directory-portfolio-btn',
    CONTACT_BTN: 'directory-contact-btn',
    HOME_BTN: 'directory-logo',
    ABOUT_ME_SECTION: 'about-me-section',
    PORTFOLIO_SECTION: 'portfolio-section',
    CONTACT_SESSION: 'contact-section',
    PREV_BTN_SLIDESHOW: 'prev-btn-slideshow',
    NEXT_BTN_SLIDESHOW: 'next-btn-slideshow',
    HOMEWORK_BTN: 'directory-homework-btn',
    MODAL_HW: 'modalHW',
    MODAL_CONTENT_HW: 'modal-content-hw',
    HOME_WORK_ASSIGNMENTS_LIST: 'homework-assignments-list',
    USER_INPUT_MODAL: 'user_input',
    USER_INPUT_SUBMIT_BTN_MODAL: 'submit_user_input',
    DOT_1: 'dot1',
    DOT_2: 'dot2',
    DOT_3: 'dot3',
};
const HTML_IDS_CALENDAR = {
    DATE: 'date',
};
for (let prop in HTML_IDS) {
    Object.defineProperty(HTML_IDS, prop, { configurable: false, writable: false });
}
for (let prop in HTML_IDS_CALENDAR) {
    Object.defineProperty(HTML_IDS_CALENDAR, prop, { configurable: false, writable: false });
}
export { HTML_IDS, HTML_IDS_CALENDAR };
//# sourceMappingURL=htmlIds.js.map