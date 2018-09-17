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
const lb_config_1 = require("../../lb.config");
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@johncasarrubias>
* @module LoggerService
* @license MIT
* @description
* Console Log wrapper that can be disabled in production mode
**/
let LoggerService = class LoggerService {
    log(...args) {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.log.apply(console, args);
    }
    info(...args) {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.info.apply(console, args);
    }
    error(...args) {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.error.apply(console, args);
    }
    count(arg) {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.count(arg);
    }
    group(arg) {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.count(arg);
    }
    groupEnd() {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.groupEnd();
    }
    profile(arg) {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.count(arg);
    }
    profileEnd() {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.profileEnd();
    }
    time(arg) {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.time(arg);
    }
    timeEnd(arg) {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.timeEnd(arg);
    }
};
LoggerService = __decorate([
    core_1.Injectable()
], LoggerService);
exports.LoggerService = LoggerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3Q0FBMkM7QUFDM0MsK0NBQWlEO0FBQ2pEOzs7Ozs7R0FNRztBQUVILElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFFeEIsR0FBRyxDQUFDLEdBQUcsSUFBVztRQUNoQixJQUFJLDBCQUFjLENBQUMsVUFBVSxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFBSSxDQUFDLEdBQUcsSUFBVztRQUNqQixJQUFJLDBCQUFjLENBQUMsVUFBVSxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUcsSUFBVztRQUNsQixJQUFJLDBCQUFjLENBQUMsVUFBVSxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQVc7UUFDZixJQUFJLDBCQUFjLENBQUMsVUFBVSxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFXO1FBQ2YsSUFBSSwwQkFBYyxDQUFDLFVBQVUsRUFBRTtZQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSwwQkFBYyxDQUFDLFVBQVUsRUFBRTtZQUMvQixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELE9BQU8sQ0FBQyxHQUFXO1FBQ2pCLElBQUksMEJBQWMsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksMEJBQWMsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLENBQUMsR0FBVztRQUNkLElBQUksMEJBQWMsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQsT0FBTyxDQUFDLEdBQVc7UUFDakIsSUFBSSwwQkFBYyxDQUFDLFVBQVUsRUFBRTtZQUMvQixPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7Q0FDRixDQUFBO0FBbkRZLGFBQWE7SUFEekIsaUJBQVUsRUFBRTtHQUNBLGFBQWEsQ0FtRHpCO0FBbkRZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvb3BCYWNrQ29uZmlnIH0gZnJvbSAnLi4vLi4vbGIuY29uZmlnJztcbi8qKlxuKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0d2l0dGVyOkBqb2huY2FzYXJydWJpYXM+IDxnaXRodWI6QGpvaG5jYXNhcnJ1Ymlhcz5cbiogQG1vZHVsZSBMb2dnZXJTZXJ2aWNlXG4qIEBsaWNlbnNlIE1JVFxuKiBAZGVzY3JpcHRpb25cbiogQ29uc29sZSBMb2cgd3JhcHBlciB0aGF0IGNhbiBiZSBkaXNhYmxlZCBpbiBwcm9kdWN0aW9uIG1vZGVcbioqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvZ2dlclNlcnZpY2Uge1xuXG4gIGxvZyguLi5hcmdzOiBhbnlbXSkge1xuICAgIGlmIChMb29wQmFja0NvbmZpZy5kZWJ1Z2dhYmxlKCkpXG4gICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJncyk7XG4gIH1cblxuICBpbmZvKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcbiAgICBjb25zb2xlLmluZm8uYXBwbHkoY29uc29sZSwgYXJncyk7XG4gIH1cblxuICBlcnJvciguLi5hcmdzOiBhbnlbXSkge1xuICAgIGlmIChMb29wQmFja0NvbmZpZy5kZWJ1Z2dhYmxlKCkpXG4gICAgY29uc29sZS5lcnJvci5hcHBseShjb25zb2xlLCBhcmdzKTtcbiAgfVxuXG4gIGNvdW50KGFyZzogc3RyaW5nKSB7XG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcbiAgICBjb25zb2xlLmNvdW50KGFyZyk7XG4gIH1cblxuICBncm91cChhcmc6IHN0cmluZykge1xuICAgIGlmIChMb29wQmFja0NvbmZpZy5kZWJ1Z2dhYmxlKCkpXG4gICAgY29uc29sZS5jb3VudChhcmcpO1xuICB9XG5cbiAgZ3JvdXBFbmQoKSB7XG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gIH1cblxuICBwcm9maWxlKGFyZzogc3RyaW5nKSB7XG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcbiAgICBjb25zb2xlLmNvdW50KGFyZyk7XG4gIH1cblxuICBwcm9maWxlRW5kKCkge1xuICAgIGlmIChMb29wQmFja0NvbmZpZy5kZWJ1Z2dhYmxlKCkpXG4gICAgY29uc29sZS5wcm9maWxlRW5kKCk7XG4gIH1cblxuICB0aW1lKGFyZzogc3RyaW5nKSB7XG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcbiAgICBjb25zb2xlLnRpbWUoYXJnKTtcbiAgfVxuXG4gIHRpbWVFbmQoYXJnOiBzdHJpbmcpIHtcbiAgICBpZiAoTG9vcEJhY2tDb25maWcuZGVidWdnYWJsZSgpKVxuICAgIGNvbnNvbGUudGltZUVuZChhcmcpO1xuICB9XG59XG4iXX0=