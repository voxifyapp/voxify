"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = exports.ActivityType = void 0;
var ActivityType;
(function (ActivityType) {
    ActivityType["VIDEO"] = "VIDEO";
    ActivityType["FILL_IN_THE_BLANKS"] = "FILL_IN_THE_BLANKS";
    ActivityType["MULTIPLE_CHOICE"] = "MULTIPLE_CHOICE";
    ActivityType["PRONUNCIATION"] = "PRONUNCIATION";
    ActivityType["FORM_A_SENTENCE"] = "FORM_A_SENTENCE";
    ActivityType["TEXT"] = "TEXT";
})(ActivityType || (exports.ActivityType = ActivityType = {}));
class Activity {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
    /**
     * Returns the JSON representation of the activity. Save this to the database
     */
    getData() {
        return Object.assign(Object.assign({}, this.data), { type: this.type });
    }
    setData(data) {
        this.data = data;
    }
}
exports.Activity = Activity;
//# sourceMappingURL=activity.js.map