"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
const core_1 = require("@angular/core");
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module CookieBrowser
* @license MIT
* @description
* This module handle cookies, it will be provided using DI Swapping according the
* SDK Socket Driver Available currently supporting Angular 2 for web and NativeScript 2.
**/
let CookieBrowser = class CookieBrowser {
    /**
    * @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
    * @module CookieBrowser
    * @license MIT
    * @description
    * This module handle cookies, it will be provided using DI Swapping according the
    * SDK Socket Driver Available currently supporting Angular 2 for web and NativeScript 2.
    **/
    constructor() {
        /**
         * @type {CookieInterface}
         **/
        this.cookies = {};
    }
    /**
     * @method get
     * @param {string} key Cookie key name
     * @return {any}
     * @description
     * The getter will return any type of data persisted in cookies.
     **/
    get(key) {
        if (!this.cookies[key]) {
            let cookie = window.document
                .cookie.split('; ')
                .filter((item) => item.split('=')[0] === key).pop();
            if (!cookie) {
                return null;
            }
            this.cookies[key] = this.parse(cookie.split('=').slice(1).join('='));
        }
        return this.cookies[key];
    }
    /**
     * @method set
     * @param {string} key Cookie key name
     * @param {any} value Any value
     * @param {Date=} expires The date of expiration (Optional)
     * @return {void}
     * @description
     * The setter will return any type of data persisted in cookies.
     **/
    set(key, value, expires) {
        this.cookies[key] = value;
        let cookie = `${key}=${encodeURI(value)}; path=/${expires ? `; expires=${expires.toUTCString()}` : ''}`;
        window.document.cookie = cookie;
    }
    /**
     * @method remove
     * @param {string} key Cookie key name
     * @return {void}
     * @description
     * This method will remove a cookie from the client.
     **/
    remove(key) {
        document.cookie = key + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        delete this.cookies[key];
    }
    /**
     * @method parse
     * @param {any} value Input data expected to be JSON
     * @return {void}
     * @description
     * This method will parse the string as JSON if possible, otherwise will
     * return the value itself.
     **/
    parse(value) {
        try {
            return JSON.parse(decodeURI(value));
        }
        catch (e) {
            return value;
        }
    }
};
CookieBrowser = __decorate([
    core_1.Injectable()
], CookieBrowser);
exports.CookieBrowser = CookieBrowser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLmJyb3dzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb29raWUuYnJvd3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3Q0FBMkM7QUFFM0M7Ozs7Ozs7R0FPRztBQUVILElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFUMUI7Ozs7Ozs7T0FPRztJQUNIO1FBRUU7O1lBRUk7UUFDSSxZQUFPLEdBQW9CLEVBQUUsQ0FBQztJQThEeEMsQ0FBQztJQTdEQzs7Ozs7O1FBTUk7SUFDSixHQUFHLENBQUMsR0FBVztRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRO2lCQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2lCQUNsQixNQUFNLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDNUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWCxPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3RFO1FBRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDRDs7Ozs7Ozs7UUFRSTtJQUNKLEdBQUcsQ0FBQyxHQUFXLEVBQUUsS0FBVSxFQUFFLE9BQWM7UUFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLE9BQU8sQ0FBQyxDQUFDLENBQUMsYUFBYyxPQUFPLENBQUMsV0FBVyxFQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDMUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ2xDLENBQUM7SUFDRDs7Ozs7O1FBTUk7SUFDSixNQUFNLENBQUMsR0FBVztRQUNoQixRQUFRLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxtREFBbUQsQ0FBQztRQUM1RSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNEOzs7Ozs7O1FBT0k7SUFDSSxLQUFLLENBQUMsS0FBVTtRQUN0QixJQUFJO1lBQ0EsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3ZDO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNILENBQUM7Q0FDRixDQUFBO0FBbEVZLGFBQWE7SUFEekIsaUJBQVUsRUFBRTtHQUNBLGFBQWEsQ0FrRXpCO0FBbEVZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmV4cG9ydCBpbnRlcmZhY2UgQ29va2llSW50ZXJmYWNlIHsgW2tleTogc3RyaW5nXTogYW55IH1cbi8qKlxuKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0d2l0dGVyOkBqb2huY2FzYXJydWJpYXM+IDxnaXRodWI6QG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuKiBAbW9kdWxlIENvb2tpZUJyb3dzZXJcbiogQGxpY2Vuc2UgTUlUXG4qIEBkZXNjcmlwdGlvblxuKiBUaGlzIG1vZHVsZSBoYW5kbGUgY29va2llcywgaXQgd2lsbCBiZSBwcm92aWRlZCB1c2luZyBESSBTd2FwcGluZyBhY2NvcmRpbmcgdGhlXG4qIFNESyBTb2NrZXQgRHJpdmVyIEF2YWlsYWJsZSBjdXJyZW50bHkgc3VwcG9ydGluZyBBbmd1bGFyIDIgZm9yIHdlYiBhbmQgTmF0aXZlU2NyaXB0IDIuXG4qKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb29raWVCcm93c2VyIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtDb29raWVJbnRlcmZhY2V9XG4gICAqKi9cbiAgcHJpdmF0ZSBjb29raWVzOiBDb29raWVJbnRlcmZhY2UgPSB7fTtcbiAgLyoqXG4gICAqIEBtZXRob2QgZ2V0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgQ29va2llIGtleSBuYW1lXG4gICAqIEByZXR1cm4ge2FueX1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoZSBnZXR0ZXIgd2lsbCByZXR1cm4gYW55IHR5cGUgb2YgZGF0YSBwZXJzaXN0ZWQgaW4gY29va2llcy5cbiAgICoqL1xuICBnZXQoa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgIGlmICghdGhpcy5jb29raWVzW2tleV0pIHtcbiAgICAgIGxldCBjb29raWUgPSB3aW5kb3cuZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAuY29va2llLnNwbGl0KCc7ICcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoaXRlbTogYW55KSA9PiBpdGVtLnNwbGl0KCc9JylbMF0gPT09IGtleSkucG9wKCk7XG4gICAgICBpZiAoIWNvb2tpZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb29raWVzW2tleV0gPSB0aGlzLnBhcnNlKGNvb2tpZS5zcGxpdCgnPScpLnNsaWNlKDEpLmpvaW4oJz0nKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29va2llc1trZXldO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldFxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IENvb2tpZSBrZXkgbmFtZVxuICAgKiBAcGFyYW0ge2FueX0gdmFsdWUgQW55IHZhbHVlXG4gICAqIEBwYXJhbSB7RGF0ZT19IGV4cGlyZXMgVGhlIGRhdGUgb2YgZXhwaXJhdGlvbiAoT3B0aW9uYWwpXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGUgc2V0dGVyIHdpbGwgcmV0dXJuIGFueSB0eXBlIG9mIGRhdGEgcGVyc2lzdGVkIGluIGNvb2tpZXMuXG4gICAqKi9cbiAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBleHBpcmVzPzogRGF0ZSk6IHZvaWQge1xuICAgIHRoaXMuY29va2llc1trZXldID0gdmFsdWU7XG4gICAgbGV0IGNvb2tpZSA9IGAke2tleX09JHtlbmNvZGVVUkkodmFsdWUpfTsgcGF0aD0vJHtleHBpcmVzID8gYDsgZXhwaXJlcz0keyBleHBpcmVzLnRvVVRDU3RyaW5nKCkgfWAgOiAnJ31gO1xuICAgIHdpbmRvdy5kb2N1bWVudC5jb29raWUgPSBjb29raWU7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVtb3ZlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgQ29va2llIGtleSBuYW1lXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHJlbW92ZSBhIGNvb2tpZSBmcm9tIHRoZSBjbGllbnQuXG4gICAqKi9cbiAgcmVtb3ZlKGtleTogc3RyaW5nKSB7XG4gICAgZG9jdW1lbnQuY29va2llID0ga2V5ICsgJz07IHBhdGg9LzsgZXhwaXJlcz1UaHUsIDAxIEphbiAxOTcwIDAwOjAwOjAxIEdNVDsnO1xuICAgIGRlbGV0ZSB0aGlzLmNvb2tpZXNba2V5XTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBwYXJzZVxuICAgKiBAcGFyYW0ge2FueX0gdmFsdWUgSW5wdXQgZGF0YSBleHBlY3RlZCB0byBiZSBKU09OXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHBhcnNlIHRoZSBzdHJpbmcgYXMgSlNPTiBpZiBwb3NzaWJsZSwgb3RoZXJ3aXNlIHdpbGxcbiAgICogcmV0dXJuIHRoZSB2YWx1ZSBpdHNlbGYuXG4gICAqKi9cbiAgcHJpdmF0ZSBwYXJzZSh2YWx1ZTogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGVjb2RlVVJJKHZhbHVlKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG59XG4iXX0=