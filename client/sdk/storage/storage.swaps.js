"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
/**
 * @module Storage
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * The InternalStorage class is used for dependency injection swapping.
 * It will be provided using factory method from different sources.
 **/
class BaseStorage {
    /**
     * @method get
     * @param {string} key Storage key name
     * @return {any}
     * @description
     * The getter will return any type of data persisted in storage.
     **/
    get(key) { }
    /**
     * @method set
     * @param {string} key Storage key name
     * @param {any} value Any value
     * @return {void}
     * @description
     * The setter will return any type of data persisted in localStorage.
     **/
    set(key, value, expires) { }
    /**
     * @method remove
     * @param {string} key Storage key name
     * @return {void}
     * @description
     * This method will remove a localStorage item from the client.
     **/
    remove(key) { }
}
exports.BaseStorage = BaseStorage;
/**
 * @module InternalStorage
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * The InternalStorage class is used for dependency injection swapping.
 * It will be provided using factory method from different sources.
 * This is mainly required because Angular Universal integration.
 * It does inject a CookieStorage instead of LocalStorage.
 **/
class InternalStorage extends BaseStorage {
}
exports.InternalStorage = InternalStorage;
/**
 * @module SDKStorage
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * The SDKStorage class is used for dependency injection swapping.
 * It will be provided using factory method according the right environment.
 * This is created for public usage, to allow persisting custom data
 * Into the local storage API.
 **/
class SDKStorage extends BaseStorage {
}
exports.SDKStorage = SDKStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5zd2Fwcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0b3JhZ2Uuc3dhcHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQkFBb0I7QUFDcEI7Ozs7Ozs7SUFPSTtBQUNKLE1BQWEsV0FBVztJQUN0Qjs7Ozs7O1FBTUk7SUFDSixHQUFHLENBQUMsR0FBVyxJQUFRLENBQUM7SUFDeEI7Ozs7Ozs7UUFPSTtJQUNKLEdBQUcsQ0FBQyxHQUFXLEVBQUUsS0FBVSxFQUFFLE9BQWMsSUFBUyxDQUFDO0lBQ3JEOzs7Ozs7UUFNSTtJQUNKLE1BQU0sQ0FBQyxHQUFXLElBQVMsQ0FBQztDQUM3QjtBQTFCRCxrQ0EwQkM7QUFDRDs7Ozs7Ozs7O0lBU0k7QUFDSixNQUFhLGVBQWdCLFNBQVEsV0FBVztDQUFHO0FBQW5ELDBDQUFtRDtBQUNuRDs7Ozs7Ozs7O0lBU0k7QUFDSixNQUFhLFVBQVcsU0FBUSxXQUFXO0NBQUc7QUFBOUMsZ0NBQThDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbi8qKlxuICrCoEBtb2R1bGUgU3RvcmFnZVxuICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gKiBAbGljZW5zZSBNSVRcbiAqIEBkZXNjcmlwdGlvblxuICogVGhlIEludGVybmFsU3RvcmFnZSBjbGFzcyBpcyB1c2VkIGZvciBkZXBlbmRlbmN5IGluamVjdGlvbiBzd2FwcGluZy5cbiAqIEl0IHdpbGwgYmUgcHJvdmlkZWQgdXNpbmcgZmFjdG9yeSBtZXRob2QgZnJvbSBkaWZmZXJlbnQgc291cmNlcy5cbiAqKi9cbmV4cG9ydCBjbGFzcyBCYXNlU3RvcmFnZSB7XG4gIC8qKlxuICAgKiBAbWV0aG9kIGdldFxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFN0b3JhZ2Uga2V5IG5hbWVcbiAgICogQHJldHVybiB7YW55fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhlIGdldHRlciB3aWxsIHJldHVybiBhbnkgdHlwZSBvZiBkYXRhIHBlcnNpc3RlZCBpbiBzdG9yYWdlLlxuICAgKiovXG4gIGdldChrZXk6IHN0cmluZyk6IGFueSB7fVxuICAvKipcbiAgICogQG1ldGhvZCBzZXRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBTdG9yYWdlIGtleSBuYW1lXG4gICAqIEBwYXJhbSB7YW55fSB2YWx1ZSBBbnkgdmFsdWVcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoZSBzZXR0ZXIgd2lsbCByZXR1cm4gYW55IHR5cGUgb2YgZGF0YSBwZXJzaXN0ZWQgaW4gbG9jYWxTdG9yYWdlLlxuICAgKiovXG4gIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgZXhwaXJlcz86IERhdGUpOiB2b2lkIHt9XG4gIC8qKlxuICAgKiBAbWV0aG9kIHJlbW92ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFN0b3JhZ2Uga2V5IG5hbWVcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgcmVtb3ZlIGEgbG9jYWxTdG9yYWdlIGl0ZW0gZnJvbSB0aGUgY2xpZW50LlxuICAgKiovXG4gIHJlbW92ZShrZXk6IHN0cmluZyk6IHZvaWQge31cbn1cbi8qKlxuICrCoEBtb2R1bGUgSW50ZXJuYWxTdG9yYWdlXG4gKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAqIEBsaWNlbnNlIE1JVFxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGUgSW50ZXJuYWxTdG9yYWdlIGNsYXNzIGlzIHVzZWQgZm9yIGRlcGVuZGVuY3kgaW5qZWN0aW9uIHN3YXBwaW5nLlxuICogSXQgd2lsbCBiZSBwcm92aWRlZCB1c2luZyBmYWN0b3J5IG1ldGhvZCBmcm9tIGRpZmZlcmVudCBzb3VyY2VzLlxuICogVGhpcyBpcyBtYWlubHkgcmVxdWlyZWQgYmVjYXVzZSBBbmd1bGFyIFVuaXZlcnNhbCBpbnRlZ3JhdGlvbi5cbiAqIEl0IGRvZXMgaW5qZWN0IGEgQ29va2llU3RvcmFnZSBpbnN0ZWFkIG9mIExvY2FsU3RvcmFnZS5cbiAqKi9cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbFN0b3JhZ2UgZXh0ZW5kcyBCYXNlU3RvcmFnZSB7fVxuLyoqXG4gKsKgQG1vZHVsZSBTREtTdG9yYWdlXG4gKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAqIEBsaWNlbnNlIE1JVFxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGUgU0RLU3RvcmFnZSBjbGFzcyBpcyB1c2VkIGZvciBkZXBlbmRlbmN5IGluamVjdGlvbiBzd2FwcGluZy5cbiAqIEl0IHdpbGwgYmUgcHJvdmlkZWQgdXNpbmcgZmFjdG9yeSBtZXRob2QgYWNjb3JkaW5nIHRoZSByaWdodCBlbnZpcm9ubWVudC5cbiAqIFRoaXMgaXMgY3JlYXRlZCBmb3IgcHVibGljIHVzYWdlLCB0byBhbGxvdyBwZXJzaXN0aW5nIGN1c3RvbSBkYXRhXG4gKiBJbnRvIHRoZSBsb2NhbCBzdG9yYWdlIEFQSS5cbiAqKi9cbmV4cG9ydCBjbGFzcyBTREtTdG9yYWdlIGV4dGVuZHMgQmFzZVN0b3JhZ2Uge31cbiJdfQ==