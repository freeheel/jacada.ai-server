"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const storage_swaps_1 = require("../../storage/storage.swaps");
const BaseModels_1 = require("../../models/BaseModels");
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module SocketConnection
* @license MIT
* @description
* This module handle socket connections and return singleton instances for each
* connection, it will use the SDK Socket Driver Available currently supporting
* Angular 2 for web, NativeScript 2 and Angular Universal.
**/
let LoopBackAuth = class LoopBackAuth {
    /**
     * @method constructor
     * @param {InternalStorage} storage Internal Storage Driver
     * @description
     * The constructor will initialize the token loading data from storage
     **/
    constructor(storage) {
        this.storage = storage;
        /**
         * @type {SDKToken}
         **/
        this.token = new BaseModels_1.SDKToken();
        /**
         * @type {string}
         **/
        this.prefix = '$LoopBackSDK$';
        this.token.id = this.load('id');
        this.token.user = this.load('user');
        this.token.userId = this.load('userId');
        this.token.created = this.load('created');
        this.token.ttl = this.load('ttl');
        this.token.rememberMe = this.load('rememberMe');
    }
    /**
     * @method setRememberMe
     * @param {boolean} value Flag to remember credentials
     * @return {void}
     * @description
     * This method will set a flag in order to remember the current credentials
     **/
    setRememberMe(value) {
        this.token.rememberMe = value;
    }
    /**
     * @method setUser
     * @param {any} user Any type of user model
     * @return {void}
     * @description
     * This method will update the user information and persist it if the
     * rememberMe flag is set.
     **/
    setUser(user) {
        this.token.user = user;
        this.save();
    }
    /**
     * @method setToken
     * @param {SDKToken} token SDKToken or casted AccessToken instance
     * @return {void}
     * @description
     * This method will set a flag in order to remember the current credentials
     **/
    setToken(token) {
        this.token = Object.assign({}, this.token, token);
        this.save();
    }
    /**
     * @method getToken
     * @return {void}
     * @description
     * This method will set a flag in order to remember the current credentials.
     **/
    getToken() {
        return this.token;
    }
    /**
     * @method getAccessTokenId
     * @return {string}
     * @description
     * This method will return the actual token string, not the object instance.
     **/
    getAccessTokenId() {
        return this.token.id;
    }
    /**
     * @method getCurrentUserId
     * @return {any}
     * @description
     * This method will return the current user id, it can be number or string.
     **/
    getCurrentUserId() {
        return this.token.userId;
    }
    /**
     * @method getCurrentUserData
     * @return {any}
     * @description
     * This method will return the current user instance.
     **/
    getCurrentUserData() {
        return (typeof this.token.user === 'string') ? JSON.parse(this.token.user) : this.token.user;
    }
    /**
     * @method save
     * @return {boolean} Whether or not the information was saved
     * @description
     * This method will save in either local storage or cookies the current credentials.
     * But only if rememberMe is enabled.
     **/
    save() {
        let today = new Date();
        let expires = new Date(today.getTime() + (this.token.ttl * 1000));
        this.persist('id', this.token.id, expires);
        this.persist('user', this.token.user, expires);
        this.persist('userId', this.token.userId, expires);
        this.persist('created', this.token.created, expires);
        this.persist('ttl', this.token.ttl, expires);
        this.persist('rememberMe', this.token.rememberMe, expires);
        return true;
    }
    ;
    /**
     * @method load
     * @param {string} prop Property name
     * @return {any} Any information persisted in storage
     * @description
     * This method will load either from local storage or cookies the provided property.
     **/
    load(prop) {
        return this.storage.get(`${this.prefix}${prop}`);
    }
    /**
     * @method clear
     * @return {void}
     * @description
     * This method will clear cookies or the local storage.
     **/
    clear() {
        Object.keys(this.token).forEach((prop) => this.storage.remove(`${this.prefix}${prop}`));
        this.token = new BaseModels_1.SDKToken();
    }
    /**
     * @method persist
     * @return {void}
     * @description
     * This method saves values to storage
     **/
    persist(prop, value, expires) {
        try {
            this.storage.set(`${this.prefix}${prop}`, (typeof value === 'object') ? JSON.stringify(value) : value, this.token.rememberMe ? expires : null);
        }
        catch (err) {
            console.error('Cannot access local/session storage:', err);
        }
    }
};
LoopBackAuth = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(storage_swaps_1.InternalStorage))
], LoopBackAuth);
exports.LoopBackAuth = LoopBackAuth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsd0NBQW1EO0FBQ25ELCtEQUE4RDtBQUM5RCx3REFBbUQ7QUFDbkQ7Ozs7Ozs7O0dBUUc7QUFFSCxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0lBU3ZCOzs7OztRQUtJO0lBQ0osWUFBK0MsT0FBd0I7UUFBeEIsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFkdkU7O1lBRUk7UUFDSSxVQUFLLEdBQWEsSUFBSSxxQkFBUSxFQUFFLENBQUM7UUFDekM7O1lBRUk7UUFDTSxXQUFNLEdBQVcsZUFBZSxDQUFDO1FBUXpDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFDRDs7Ozs7O1FBTUk7SUFDRyxhQUFhLENBQUMsS0FBYztRQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQztJQUNEOzs7Ozs7O1FBT0k7SUFDRyxP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SUFDTSxPQUFPLENBQUMsSUFBWSxFQUFFLEtBQVUsRUFBRSxPQUFjO1FBQ3hELElBQUk7WUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDZCxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxFQUFFLEVBQ3ZCLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFDM0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUEsQ0FBQyxDQUFBLE9BQU8sQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUNuQyxDQUFDO1NBQ0g7UUFDRCxPQUFPLEdBQUcsRUFBRTtZQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0NBQXNDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDNUQ7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQXBKWSxZQUFZO0lBRHhCLGlCQUFVLEVBQUU7SUFnQkUsV0FBQSxhQUFNLENBQUMsK0JBQWUsQ0FBQyxDQUFBO0dBZnpCLFlBQVksQ0FvSnhCO0FBcEpZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbnRlcm5hbFN0b3JhZ2UgfSBmcm9tICcuLi8uLi9zdG9yYWdlL3N0b3JhZ2Uuc3dhcHMnO1xuaW1wb3J0IHsgU0RLVG9rZW4gfSBmcm9tICcuLi8uLi9tb2RlbHMvQmFzZU1vZGVscyc7XG4vKipcbiogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dHdpdHRlcjpAam9obmNhc2FycnViaWFzPiA8Z2l0aHViOkBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiogQG1vZHVsZSBTb2NrZXRDb25uZWN0aW9uXG4qIEBsaWNlbnNlIE1JVFxuKiBAZGVzY3JpcHRpb25cbiogVGhpcyBtb2R1bGUgaGFuZGxlIHNvY2tldCBjb25uZWN0aW9ucyBhbmQgcmV0dXJuIHNpbmdsZXRvbiBpbnN0YW5jZXMgZm9yIGVhY2hcbiogY29ubmVjdGlvbiwgaXQgd2lsbCB1c2UgdGhlIFNESyBTb2NrZXQgRHJpdmVyIEF2YWlsYWJsZSBjdXJyZW50bHkgc3VwcG9ydGluZ1xuKiBBbmd1bGFyIDIgZm9yIHdlYiwgTmF0aXZlU2NyaXB0IDIgYW5kIEFuZ3VsYXIgVW5pdmVyc2FsLlxuKiovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9vcEJhY2tBdXRoIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtTREtUb2tlbn1cbiAgICoqL1xuICBwcml2YXRlIHRva2VuOiBTREtUb2tlbiA9IG5ldyBTREtUb2tlbigpO1xuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICoqL1xuICBwcm90ZWN0ZWQgcHJlZml4OiBzdHJpbmcgPSAnJExvb3BCYWNrU0RLJCc7XG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7SW50ZXJuYWxTdG9yYWdlfSBzdG9yYWdlIEludGVybmFsIFN0b3JhZ2UgRHJpdmVyXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGUgY29uc3RydWN0b3Igd2lsbCBpbml0aWFsaXplIHRoZSB0b2tlbiBsb2FkaW5nIGRhdGEgZnJvbSBzdG9yYWdlXG4gICAqKi9cbiAgY29uc3RydWN0b3IoQEluamVjdChJbnRlcm5hbFN0b3JhZ2UpIHByb3RlY3RlZCBzdG9yYWdlOiBJbnRlcm5hbFN0b3JhZ2UpIHtcbiAgICB0aGlzLnRva2VuLmlkID0gdGhpcy5sb2FkKCdpZCcpO1xuICAgIHRoaXMudG9rZW4udXNlciA9IHRoaXMubG9hZCgndXNlcicpO1xuICAgIHRoaXMudG9rZW4udXNlcklkID0gdGhpcy5sb2FkKCd1c2VySWQnKTtcbiAgICB0aGlzLnRva2VuLmNyZWF0ZWQgPSB0aGlzLmxvYWQoJ2NyZWF0ZWQnKTtcbiAgICB0aGlzLnRva2VuLnR0bCA9IHRoaXMubG9hZCgndHRsJyk7XG4gICAgdGhpcy50b2tlbi5yZW1lbWJlck1lID0gdGhpcy5sb2FkKCdyZW1lbWJlck1lJyk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0UmVtZW1iZXJNZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlIEZsYWcgdG8gcmVtZW1iZXIgY3JlZGVudGlhbHNcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgc2V0IGEgZmxhZyBpbiBvcmRlciB0byByZW1lbWJlciB0aGUgY3VycmVudCBjcmVkZW50aWFsc1xuICAgKiovXG4gIHB1YmxpYyBzZXRSZW1lbWJlck1lKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy50b2tlbi5yZW1lbWJlck1lID0gdmFsdWU7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0VXNlclxuICAgKiBAcGFyYW0ge2FueX0gdXNlciBBbnkgdHlwZSBvZiB1c2VyIG1vZGVsXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHVwZGF0ZSB0aGUgdXNlciBpbmZvcm1hdGlvbiBhbmQgcGVyc2lzdCBpdCBpZiB0aGVcbiAgICogcmVtZW1iZXJNZSBmbGFnIGlzIHNldC5cbiAgICoqL1xuICBwdWJsaWMgc2V0VXNlcih1c2VyOiBhbnkpIHtcbiAgICB0aGlzLnRva2VuLnVzZXIgPSB1c2VyO1xuICAgIHRoaXMuc2F2ZSgpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldFRva2VuXG4gICAqIEBwYXJhbSB7U0RLVG9rZW59IHRva2VuIFNES1Rva2VuIG9yIGNhc3RlZCBBY2Nlc3NUb2tlbiBpbnN0YW5jZVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgd2lsbCBzZXQgYSBmbGFnIGluIG9yZGVyIHRvIHJlbWVtYmVyIHRoZSBjdXJyZW50IGNyZWRlbnRpYWxzXG4gICAqKi9cbiAgcHVibGljIHNldFRva2VuKHRva2VuOiBTREtUb2tlbik6IHZvaWQge1xuICAgIHRoaXMudG9rZW4gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnRva2VuLCB0b2tlbik7XG4gICAgdGhpcy5zYXZlKCk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgZ2V0VG9rZW5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgc2V0IGEgZmxhZyBpbiBvcmRlciB0byByZW1lbWJlciB0aGUgY3VycmVudCBjcmVkZW50aWFscy5cbiAgICoqL1xuICBwdWJsaWMgZ2V0VG9rZW4oKTogU0RLVG9rZW4ge1xuICAgIHJldHVybiA8U0RLVG9rZW4+dGhpcy50b2tlbjtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBnZXRBY2Nlc3NUb2tlbklkXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIHRoZSBhY3R1YWwgdG9rZW4gc3RyaW5nLCBub3QgdGhlIG9iamVjdCBpbnN0YW5jZS5cbiAgICoqL1xuICBwdWJsaWMgZ2V0QWNjZXNzVG9rZW5JZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRva2VuLmlkO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIGdldEN1cnJlbnRVc2VySWRcbiAgICogQHJldHVybiB7YW55fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gdGhlIGN1cnJlbnQgdXNlciBpZCwgaXQgY2FuIGJlIG51bWJlciBvciBzdHJpbmcuXG4gICAqKi9cbiAgcHVibGljIGdldEN1cnJlbnRVc2VySWQoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy50b2tlbi51c2VySWQ7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgZ2V0Q3VycmVudFVzZXJEYXRhXG4gICAqIEByZXR1cm4ge2FueX1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIHRoZSBjdXJyZW50IHVzZXIgaW5zdGFuY2UuXG4gICAqKi9cbiAgcHVibGljIGdldEN1cnJlbnRVc2VyRGF0YSgpOiBhbnkge1xuICAgIHJldHVybiAodHlwZW9mIHRoaXMudG9rZW4udXNlciA9PT0gJ3N0cmluZycpID8gSlNPTi5wYXJzZSh0aGlzLnRva2VuLnVzZXIpIDogdGhpcy50b2tlbi51c2VyO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIHNhdmVcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIGluZm9ybWF0aW9uIHdhcyBzYXZlZFxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgd2lsbCBzYXZlIGluIGVpdGhlciBsb2NhbCBzdG9yYWdlIG9yIGNvb2tpZXMgdGhlIGN1cnJlbnQgY3JlZGVudGlhbHMuXG4gICAqIEJ1dCBvbmx5IGlmIHJlbWVtYmVyTWUgaXMgZW5hYmxlZC5cbiAgICoqL1xuICBwdWJsaWMgc2F2ZSgpOiBib29sZWFuIHtcbiAgICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICBsZXQgZXhwaXJlcyA9IG5ldyBEYXRlKHRvZGF5LmdldFRpbWUoKSArICh0aGlzLnRva2VuLnR0bCAqIDEwMDApKTtcbiAgICAgIHRoaXMucGVyc2lzdCgnaWQnLCB0aGlzLnRva2VuLmlkLCBleHBpcmVzKTtcbiAgICAgIHRoaXMucGVyc2lzdCgndXNlcicsIHRoaXMudG9rZW4udXNlciwgZXhwaXJlcyk7XG4gICAgICB0aGlzLnBlcnNpc3QoJ3VzZXJJZCcsIHRoaXMudG9rZW4udXNlcklkLCBleHBpcmVzKTtcbiAgICAgIHRoaXMucGVyc2lzdCgnY3JlYXRlZCcsIHRoaXMudG9rZW4uY3JlYXRlZCwgZXhwaXJlcyk7XG4gICAgICB0aGlzLnBlcnNpc3QoJ3R0bCcsIHRoaXMudG9rZW4udHRsLCBleHBpcmVzKTtcbiAgICAgIHRoaXMucGVyc2lzdCgncmVtZW1iZXJNZScsIHRoaXMudG9rZW4ucmVtZW1iZXJNZSwgZXhwaXJlcyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbiAgLyoqXG4gICAqIEBtZXRob2QgbG9hZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcCBQcm9wZXJ0eSBuYW1lXG4gICAqIEByZXR1cm4ge2FueX0gQW55IGluZm9ybWF0aW9uIHBlcnNpc3RlZCBpbiBzdG9yYWdlXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIGxvYWQgZWl0aGVyIGZyb20gbG9jYWwgc3RvcmFnZSBvciBjb29raWVzIHRoZSBwcm92aWRlZCBwcm9wZXJ0eS5cbiAgICoqL1xuICBwcm90ZWN0ZWQgbG9hZChwcm9wOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0KGAke3RoaXMucHJlZml4fSR7cHJvcH1gKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBjbGVhclxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgd2lsbCBjbGVhciBjb29raWVzIG9yIHRoZSBsb2NhbCBzdG9yYWdlLlxuICAgKiovXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLnRva2VuKS5mb3JFYWNoKChwcm9wOiBzdHJpbmcpID0+IHRoaXMuc3RvcmFnZS5yZW1vdmUoYCR7dGhpcy5wcmVmaXh9JHtwcm9wfWApKTtcbiAgICB0aGlzLnRva2VuID0gbmV3IFNES1Rva2VuKCk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgcGVyc2lzdFxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgc2F2ZXMgdmFsdWVzIHRvIHN0b3JhZ2VcbiAgICoqL1xuICBwcm90ZWN0ZWQgcGVyc2lzdChwcm9wOiBzdHJpbmcsIHZhbHVlOiBhbnksIGV4cGlyZXM/OiBEYXRlKTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuc3RvcmFnZS5zZXQoXG4gICAgICAgIGAke3RoaXMucHJlZml4fSR7cHJvcH1gLFxuICAgICAgICAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JykgPyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgOiB2YWx1ZSxcbiAgICAgICAgdGhpcy50b2tlbi5yZW1lbWJlck1lP2V4cGlyZXM6bnVsbFxuICAgICAgKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQ2Fubm90IGFjY2VzcyBsb2NhbC9zZXNzaW9uIHN0b3JhZ2U6JywgZXJyKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==