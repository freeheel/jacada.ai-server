"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const TestData_1 = __importDefault(require("../data/TestData"));
const InteractModelMapper_1 = __importDefault(require("../../../common/util/nlp/InteractModelMapper"));
const TextInputModel_1 = __importDefault(require("../../../common/util/nlp/model/TextInputModel"));
describe('TextInput should be identified by the mapper', () => {
    const testData = new TestData_1.default().testInputData;
    const mapper = new InteractModelMapper_1.default();
    const mappedData = mapper.translate(testData);
    it('Mapped Data should contain text input', () => {
        let found = false;
        mappedData.interact.map((item) => {
            if (item.type === TextInputModel_1.default.name) {
                found = true;
            }
        });
        chai_1.expect(found, 'Did not find a text input mapped').to.be.true;
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5wdXRUZXh0LnRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJJbnB1dFRleHQudGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtCQUE4QjtBQUM5QixpQkFBZTtBQUNmLGdFQUF3QztBQUV4Qyx1R0FBa0Y7QUFDbEYsbUdBQTJFO0FBRTNFLFFBQVEsQ0FBQyw4Q0FBOEMsRUFBRSxHQUFHLEVBQUU7SUFFNUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxrQkFBUSxFQUFFLENBQUMsYUFBYSxDQUFDO0lBQzlDLE1BQU0sTUFBTSxHQUFHLElBQUksNkJBQXNCLEVBQUUsQ0FBQztJQUU1QyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTlDLEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRSxHQUFHLEVBQUU7UUFFL0MsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRWxCLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7WUFDcEMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLHdCQUFjLENBQUMsSUFBSSxFQUFFO2dCQUNyQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2FBQ2Q7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILGFBQU0sQ0FBQyxLQUFLLEVBQUMsa0NBQWtDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztJQUU5RCxDQUFDLENBQUMsQ0FBQztBQUdMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhwZWN0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgJ21vY2hhJztcbmltcG9ydCBUZXN0RGF0YSBmcm9tIFwiLi4vZGF0YS9UZXN0RGF0YVwiO1xuXG5pbXBvcnQgSW50ZXJhY3Rpb25Nb2RlbE1hcHBlciBmcm9tICcuLi8uLi8uLi9jb21tb24vdXRpbC9ubHAvSW50ZXJhY3RNb2RlbE1hcHBlcic7XG5pbXBvcnQgVGV4dElucHV0TW9kZWwgZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi91dGlsL25scC9tb2RlbC9UZXh0SW5wdXRNb2RlbFwiO1xuXG5kZXNjcmliZSgnVGV4dElucHV0IHNob3VsZCBiZSBpZGVudGlmaWVkIGJ5IHRoZSBtYXBwZXInLCAoKSA9PiB7XG5cbiAgY29uc3QgdGVzdERhdGEgPSBuZXcgVGVzdERhdGEoKS50ZXN0SW5wdXREYXRhO1xuICBjb25zdCBtYXBwZXIgPSBuZXcgSW50ZXJhY3Rpb25Nb2RlbE1hcHBlcigpO1xuXG4gIGNvbnN0IG1hcHBlZERhdGEgPSBtYXBwZXIudHJhbnNsYXRlKHRlc3REYXRhKTtcblxuICBpdCgnTWFwcGVkIERhdGEgc2hvdWxkIGNvbnRhaW4gdGV4dCBpbnB1dCcsICgpID0+IHtcblxuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuXG4gICAgbWFwcGVkRGF0YS5pbnRlcmFjdC5tYXAoKGl0ZW06IGFueSkgPT4ge1xuICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gVGV4dElucHV0TW9kZWwubmFtZSkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QoZm91bmQsJ0RpZCBub3QgZmluZCBhIHRleHQgaW5wdXQgbWFwcGVkJykudG8uYmUudHJ1ZTtcblxuICB9KTtcblxuXG59KTtcblxuXG4iXX0=