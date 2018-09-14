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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5wdXRUZXh0LnRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJJbnB1dFRleHQudGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtCQUE4QjtBQUM5QixpQkFBZTtBQUNmLGdFQUF3QztBQUV4Qyx1R0FBa0Y7QUFDbEYsbUdBQTJFO0FBRTNFLFFBQVEsQ0FBQyw4Q0FBOEMsRUFBRSxHQUFHLEVBQUU7SUFFNUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxrQkFBUSxFQUFFLENBQUMsYUFBYSxDQUFDO0lBQzlDLE1BQU0sTUFBTSxHQUFHLElBQUksNkJBQXNCLEVBQUUsQ0FBQztJQUU1QyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTlDLEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRSxHQUFHLEVBQUU7UUFFL0MsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRWxCLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7WUFDcEMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLHdCQUFjLENBQUMsSUFBSSxFQUFFO2dCQUNyQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2FBQ2Q7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILGFBQU0sQ0FBQyxLQUFLLEVBQUMsa0NBQWtDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztJQUU5RCxDQUFDLENBQUMsQ0FBQztBQUdMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhwZWN0IH0gZnJvbSAnY2hhaSc7XHJcbmltcG9ydCAnbW9jaGEnO1xyXG5pbXBvcnQgVGVzdERhdGEgZnJvbSBcIi4uL2RhdGEvVGVzdERhdGFcIjtcclxuXHJcbmltcG9ydCBJbnRlcmFjdGlvbk1vZGVsTWFwcGVyIGZyb20gJy4uLy4uLy4uL2NvbW1vbi91dGlsL25scC9JbnRlcmFjdE1vZGVsTWFwcGVyJztcclxuaW1wb3J0IFRleHRJbnB1dE1vZGVsIGZyb20gXCIuLi8uLi8uLi9jb21tb24vdXRpbC9ubHAvbW9kZWwvVGV4dElucHV0TW9kZWxcIjtcclxuXHJcbmRlc2NyaWJlKCdUZXh0SW5wdXQgc2hvdWxkIGJlIGlkZW50aWZpZWQgYnkgdGhlIG1hcHBlcicsICgpID0+IHtcclxuXHJcbiAgY29uc3QgdGVzdERhdGEgPSBuZXcgVGVzdERhdGEoKS50ZXN0SW5wdXREYXRhO1xyXG4gIGNvbnN0IG1hcHBlciA9IG5ldyBJbnRlcmFjdGlvbk1vZGVsTWFwcGVyKCk7XHJcblxyXG4gIGNvbnN0IG1hcHBlZERhdGEgPSBtYXBwZXIudHJhbnNsYXRlKHRlc3REYXRhKTtcclxuXHJcbiAgaXQoJ01hcHBlZCBEYXRhIHNob3VsZCBjb250YWluIHRleHQgaW5wdXQnLCAoKSA9PiB7XHJcblxyXG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcblxyXG4gICAgbWFwcGVkRGF0YS5pbnRlcmFjdC5tYXAoKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICBpZiAoaXRlbS50eXBlID09PSBUZXh0SW5wdXRNb2RlbC5uYW1lKSB7XHJcbiAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBleHBlY3QoZm91bmQsJ0RpZCBub3QgZmluZCBhIHRleHQgaW5wdXQgbWFwcGVkJykudG8uYmUudHJ1ZTtcclxuXHJcbiAgfSk7XHJcblxyXG5cclxufSk7XHJcblxyXG5cclxuIl19