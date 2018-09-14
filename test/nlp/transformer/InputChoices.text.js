"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const TestData_1 = __importDefault(require("../data/TestData"));
const InteractModelMapper_1 = __importDefault(require("../../../common/util/nlp/InteractModelMapper"));
const ChoiceModel_1 = __importDefault(require("../../../common/util/nlp/model/ChoiceModel"));
describe('Choices input should be identified by the mapper', () => {
    const testData = new TestData_1.default().testChoicesData;
    const mapper = new InteractModelMapper_1.default();
    const mappedData = mapper.translate(testData);
    it('Mapped Data should contain choices input', () => {
        let found = false;
        mappedData.interact.map((item) => {
            if (item.type === ChoiceModel_1.default.name) {
                found = true;
            }
        });
        chai_1.expect(found, 'Did not find a choices input mapped').to.be.true;
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5wdXRDaG9pY2VzLnRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJJbnB1dENob2ljZXMudGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtCQUE4QjtBQUM5QixpQkFBZTtBQUNmLGdFQUF3QztBQUV4Qyx1R0FBa0Y7QUFFbEYsNkZBQXFFO0FBRXJFLFFBQVEsQ0FBQyxrREFBa0QsRUFBRSxHQUFHLEVBQUU7SUFFaEUsTUFBTSxRQUFRLEdBQUcsSUFBSSxrQkFBUSxFQUFFLENBQUMsZUFBZSxDQUFDO0lBQ2hELE1BQU0sTUFBTSxHQUFHLElBQUksNkJBQXNCLEVBQUUsQ0FBQztJQUU1QyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTlDLEVBQUUsQ0FBQywwQ0FBMEMsRUFBRSxHQUFHLEVBQUU7UUFFbEQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRWxCLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7WUFDcEMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLHFCQUFXLENBQUMsSUFBSSxFQUFFO2dCQUNsQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2FBQ2Q7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILGFBQU0sQ0FBQyxLQUFLLEVBQUMscUNBQXFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztJQUVqRSxDQUFDLENBQUMsQ0FBQztBQUdMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhwZWN0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgJ21vY2hhJztcbmltcG9ydCBUZXN0RGF0YSBmcm9tIFwiLi4vZGF0YS9UZXN0RGF0YVwiO1xuXG5pbXBvcnQgSW50ZXJhY3Rpb25Nb2RlbE1hcHBlciBmcm9tICcuLi8uLi8uLi9jb21tb24vdXRpbC9ubHAvSW50ZXJhY3RNb2RlbE1hcHBlcic7XG5pbXBvcnQgVGV4dElucHV0TW9kZWwgZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi91dGlsL25scC9tb2RlbC9UZXh0SW5wdXRNb2RlbFwiO1xuaW1wb3J0IENob2ljZU1vZGVsIGZyb20gXCIuLi8uLi8uLi9jb21tb24vdXRpbC9ubHAvbW9kZWwvQ2hvaWNlTW9kZWxcIjtcblxuZGVzY3JpYmUoJ0Nob2ljZXMgaW5wdXQgc2hvdWxkIGJlIGlkZW50aWZpZWQgYnkgdGhlIG1hcHBlcicsICgpID0+IHtcblxuICBjb25zdCB0ZXN0RGF0YSA9IG5ldyBUZXN0RGF0YSgpLnRlc3RDaG9pY2VzRGF0YTtcbiAgY29uc3QgbWFwcGVyID0gbmV3IEludGVyYWN0aW9uTW9kZWxNYXBwZXIoKTtcblxuICBjb25zdCBtYXBwZWREYXRhID0gbWFwcGVyLnRyYW5zbGF0ZSh0ZXN0RGF0YSk7XG5cbiAgaXQoJ01hcHBlZCBEYXRhIHNob3VsZCBjb250YWluIGNob2ljZXMgaW5wdXQnLCAoKSA9PiB7XG5cbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcblxuICAgIG1hcHBlZERhdGEuaW50ZXJhY3QubWFwKChpdGVtOiBhbnkpID0+IHtcbiAgICAgIGlmIChpdGVtLnR5cGUgPT09IENob2ljZU1vZGVsLm5hbWUpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0KGZvdW5kLCdEaWQgbm90IGZpbmQgYSBjaG9pY2VzIGlucHV0IG1hcHBlZCcpLnRvLmJlLnRydWU7XG5cbiAgfSk7XG5cblxufSk7XG5cblxuIl19