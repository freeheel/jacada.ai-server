"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// @ts-ignore
const LOG = require("../../../util/logging");
const log = LOG.log('Facebook Profile Helper');
class FacebookProfile {
    constructor(firstname, lastname, picUrl, id) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.picUrl = picUrl;
        this.id = id;
    }
}
class FacebookProfileHelper {
    constructor(apiToken) {
        this._endPointUrl = '';
        this._endPointUrl = 'https://graph.facebook.com/v2.6/%s?access_token=' + apiToken;
    }
    readProfile(id) {
        log.info('Getting profile for %s', id);
        return new Promise((resolve, reject) => {
            //const endPoint =
            axios_1.default.get(this._endPointUrl.replace('%s', id)).then(res => {
                log.info('Got fb profile: %s', res.data);
                resolve(new FacebookProfile(res.data.first_name, res.data.last_name, res.data.profile_pic, res.data.id));
            }).catch((err) => {
                reject(err);
            });
        });
    }
}
exports.default = FacebookProfileHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFjZWJvb2tQcm9maWxlSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRmFjZWJvb2tQcm9maWxlSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esa0RBQTBCO0FBQzFCLGFBQWE7QUFDYiw2Q0FBOEM7QUFDOUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBRS9DLE1BQU0sZUFBZTtJQU1uQixZQUFZLFNBQWlCLEVBQUUsUUFBZ0IsRUFBRSxNQUFjLEVBQUUsRUFBVTtRQUN6RSxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNmLENBQUM7Q0FFRjtBQUVELE1BQXFCLHFCQUFxQjtJQUl4QyxZQUFZLFFBQWdCO1FBRnBCLGlCQUFZLEdBQVksRUFBRSxDQUFDO1FBR2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsa0RBQWtELEdBQUcsUUFBUSxDQUFDO0lBQ3BGLENBQUM7SUFFRCxXQUFXLENBQUMsRUFBVTtRQUVwQixHQUFHLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXZDLE9BQU8sSUFBSSxPQUFPLENBQWtCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBRXRELGtCQUFrQjtZQUVsQixlQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFFeEQsR0FBRyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXpDLE9BQU8sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFM0csQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7UUFFTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQTVCRCx3Q0E0QkMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgTE9HID0gcmVxdWlyZSgnLi4vLi4vLi4vdXRpbC9sb2dnaW5nJyk7XG5jb25zdCBsb2cgPSBMT0cubG9nKCdGYWNlYm9vayBQcm9maWxlIEhlbHBlcicpO1xuXG5jbGFzcyBGYWNlYm9va1Byb2ZpbGUge1xuICBmaXJzdG5hbWU6IHN0cmluZztcbiAgbGFzdG5hbWU6IHN0cmluZztcbiAgcGljVXJsOiBzdHJpbmc7XG4gIGlkOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZmlyc3RuYW1lOiBzdHJpbmcsIGxhc3RuYW1lOiBzdHJpbmcsIHBpY1VybDogc3RyaW5nLCBpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5maXJzdG5hbWUgPSBmaXJzdG5hbWU7XG4gICAgdGhpcy5sYXN0bmFtZSA9IGxhc3RuYW1lO1xuICAgIHRoaXMucGljVXJsID0gcGljVXJsO1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZhY2Vib29rUHJvZmlsZUhlbHBlciB7XG5cbiAgcHJpdmF0ZSBfZW5kUG9pbnRVcmwgOiBzdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3RvcihhcGlUb2tlbjogc3RyaW5nKSB7XG4gICAgdGhpcy5fZW5kUG9pbnRVcmwgPSAnaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vdjIuNi8lcz9hY2Nlc3NfdG9rZW49JyArIGFwaVRva2VuO1xuICB9XG5cbiAgcmVhZFByb2ZpbGUoaWQ6IHN0cmluZyk6IFByb21pc2U8RmFjZWJvb2tQcm9maWxlPiB7XG5cbiAgICBsb2cuaW5mbygnR2V0dGluZyBwcm9maWxlIGZvciAlcycsIGlkKTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxGYWNlYm9va1Byb2ZpbGU+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgLy9jb25zdCBlbmRQb2ludCA9XG5cbiAgICAgIGF4aW9zLmdldCh0aGlzLl9lbmRQb2ludFVybC5yZXBsYWNlKCclcycsIGlkKSkudGhlbihyZXMgPT4ge1xuXG4gICAgICAgIGxvZy5pbmZvKCdHb3QgZmIgcHJvZmlsZTogJXMnLCByZXMuZGF0YSk7XG5cbiAgICAgICAgcmVzb2x2ZShuZXcgRmFjZWJvb2tQcm9maWxlKHJlcy5kYXRhLmZpcnN0X25hbWUsIHJlcy5kYXRhLmxhc3RfbmFtZSwgcmVzLmRhdGEucHJvZmlsZV9waWMsIHJlcy5kYXRhLmlkKSk7XG5cbiAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9KTtcblxuICAgIH0pO1xuICB9XG59XG4iXX0=