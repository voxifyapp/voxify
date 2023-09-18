"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
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