import { HTML_IDS_CALENDAR as $HTML_IDS_CALENDAR } from "../constants/htmlIds.js";
class MissingElementError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Missing Html Element';
    }
}
class VIEW_CALENDAR {
    DOM = [];
    constructor() {
        for (let elem_id in $HTML_IDS_CALENDAR) {
            let elem = document.getElementById($HTML_IDS_CALENDAR[elem_id]);
            console.log($HTML_IDS_CALENDAR);
            if (elem) {
                this.DOM[$HTML_IDS_CALENDAR[elem_id]] = elem;
            }
            else {
                console.log($HTML_IDS_CALENDAR);
                throw new MissingElementError(`Element id: ${$HTML_IDS_CALENDAR}: ${$HTML_IDS_CALENDAR[elem_id]} .`);
            }
        }
        this.method1();
    }
    method1() {
        console.log(document);
        const input = this.DOM[$HTML_IDS_CALENDAR.DATE];
        console.log(input);
        const submit = document.getElementsByClassName('submit');
        console.log(submit[0]);
        const h1 = document.querySelector('h1');
        console.log(h1);
    }
}
const VIEWCALENDAR = new VIEW_CALENDAR();
//# sourceMappingURL=View_Calendar.js.map