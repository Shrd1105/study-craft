"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CShraddha%5CClgProj%5Cstudy-craft%5Cfrontend%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CShraddha%5CClgProj%5Cstudy-craft%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CShraddha%5CClgProj%5Cstudy-craft%5Cfrontend%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CShraddha%5CClgProj%5Cstudy-craft%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/../node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/../node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/../node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_Shraddha_ClgProj_study_craft_frontend_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"D:\\\\Shraddha\\\\ClgProj\\\\study-craft\\\\frontend\\\\src\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_Shraddha_ClgProj_study_craft_frontend_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9idWlsZC93ZWJwYWNrL2xvYWRlcnMvbmV4dC1hcHAtbG9hZGVyLmpzP25hbWU9YXBwJTJGYXBpJTJGYXV0aCUyRiU1Qi4uLm5leHRhdXRoJTVEJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZS50cyZhcHBEaXI9RCUzQSU1Q1NocmFkZGhhJTVDQ2xnUHJvaiU1Q3N0dWR5LWNyYWZ0JTVDZnJvbnRlbmQlNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUQlM0ElNUNTaHJhZGRoYSU1Q0NsZ1Byb2olNUNzdHVkeS1jcmFmdCU1Q2Zyb250ZW5kJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUMwQztBQUN2SDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL21pbmQtbWVudG9yLz9jOTdjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkQ6XFxcXFNocmFkZGhhXFxcXENsZ1Byb2pcXFxcc3R1ZHktY3JhZnRcXFxcZnJvbnRlbmRcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkQ6XFxcXFNocmFkZGhhXFxcXENsZ1Byb2pcXFxcc3R1ZHktY3JhZnRcXFxcZnJvbnRlbmRcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CShraddha%5CClgProj%5Cstudy-craft%5Cfrontend%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CShraddha%5CClgProj%5Cstudy-craft%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.ts":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/../node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./src/lib/auth.ts\");\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBaUM7QUFDUTtBQUV6QyxNQUFNRSxVQUFVRixnREFBUUEsQ0FBQ0Msa0RBQVdBO0FBRU8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9taW5kLW1lbnRvci8uL3NyYy9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cz8wMDk4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCBmcm9tIFwibmV4dC1hdXRoXCI7XHJcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSBcIkAvbGliL2F1dGhcIjtcclxuXHJcbmNvbnN0IGhhbmRsZXIgPSBOZXh0QXV0aChhdXRoT3B0aW9ucyk7XHJcblxyXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH07ICJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsImF1dGhPcHRpb25zIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth.ts":
/*!*************************!*\
  !*** ./src/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/../node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./src/lib/mongodb.ts\");\n/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/models/user */ \"(rsc)/./src/models/user.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/../node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                try {\n                    await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_1__.connectMongoDB)();\n                    const user = await _models_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].findOne({\n                        email: credentials.email\n                    });\n                    if (!user) {\n                        return null;\n                    }\n                    const passwordsMatch = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().compare(credentials.password, user.password);\n                    if (!passwordsMatch) {\n                        return null;\n                    }\n                    return {\n                        id: user._id.toString(),\n                        name: user.name,\n                        email: user.email\n                    };\n                } catch (error) {\n                    console.error(\"Error during authentication:\", error);\n                    return null;\n                }\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/signin\"\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2F1dGgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ2tFO0FBQ25CO0FBQ2Q7QUFDSDtBQWtCdkIsTUFBTUksY0FBMkI7SUFDdENDLFdBQVc7UUFDVEwsMkVBQW1CQSxDQUFDO1lBQ2xCTSxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQVE7Z0JBQ3ZDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekIsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVU7b0JBQ2pELE9BQU87Z0JBQ1Q7Z0JBRUEsSUFBSTtvQkFDRixNQUFNViw0REFBY0E7b0JBQ3BCLE1BQU1ZLE9BQU8sTUFBTVgsb0RBQUlBLENBQUNZLE9BQU8sQ0FBQzt3QkFBRU4sT0FBT0QsWUFBWUMsS0FBSztvQkFBQztvQkFFM0QsSUFBSSxDQUFDSyxNQUFNO3dCQUNULE9BQU87b0JBQ1Q7b0JBRUEsTUFBTUUsaUJBQWlCLE1BQU1aLHVEQUFjLENBQUNJLFlBQVlJLFFBQVEsRUFBRUUsS0FBS0YsUUFBUTtvQkFFL0UsSUFBSSxDQUFDSSxnQkFBZ0I7d0JBQ25CLE9BQU87b0JBQ1Q7b0JBRUEsT0FBTzt3QkFDTEUsSUFBSUosS0FBS0ssR0FBRyxDQUFDQyxRQUFRO3dCQUNyQmIsTUFBTU8sS0FBS1AsSUFBSTt3QkFDZkUsT0FBT0ssS0FBS0wsS0FBSztvQkFDbkI7Z0JBQ0YsRUFBRSxPQUFPWSxPQUFPO29CQUNkQyxRQUFRRCxLQUFLLENBQUMsZ0NBQWdDQTtvQkFDOUMsT0FBTztnQkFDVDtZQUNGO1FBQ0Y7S0FDRDtJQUNERSxXQUFXO1FBQ1QsTUFBTUMsS0FBSSxFQUFFQyxLQUFLLEVBQUVYLElBQUksRUFBRTtZQUN2QixJQUFJQSxNQUFNO2dCQUNSVyxNQUFNUCxFQUFFLEdBQUdKLEtBQUtJLEVBQUU7WUFDcEI7WUFDQSxPQUFPTztRQUNUO1FBQ0EsTUFBTUMsU0FBUSxFQUFFQSxPQUFPLEVBQUVELEtBQUssRUFBRTtZQUM5QixJQUFJQyxRQUFRWixJQUFJLEVBQUU7Z0JBQ2hCWSxRQUFRWixJQUFJLENBQUNJLEVBQUUsR0FBR08sTUFBTVAsRUFBRTtZQUM1QjtZQUNBLE9BQU9RO1FBQ1Q7SUFDRjtJQUNBQyxPQUFPO1FBQ0xDLFFBQVE7SUFDVjtJQUNBRixTQUFTO1FBQ1BHLFVBQVU7UUFDVkMsUUFBUSxLQUFLLEtBQUssS0FBSztJQUN6QjtJQUNBQyxRQUFRQyxRQUFRQyxHQUFHLENBQUNDLGVBQWU7QUFDckMsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL21pbmQtbWVudG9yLy4vc3JjL2xpYi9hdXRoLnRzPzY2OTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXV0aE9wdGlvbnMsIERlZmF1bHRTZXNzaW9uIH0gZnJvbSBcIm5leHQtYXV0aFwiO1xyXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiO1xyXG5pbXBvcnQgeyBjb25uZWN0TW9uZ29EQiB9IGZyb20gXCJAL2xpYi9tb25nb2RiXCI7XHJcbmltcG9ydCBVc2VyIGZyb20gXCJAL21vZGVscy91c2VyXCI7XHJcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCI7XHJcblxyXG4vLyBFeHRlbmQgdGhlIGJ1aWx0LWluIHNlc3Npb24gdHlwZXNcclxuZGVjbGFyZSBtb2R1bGUgXCJuZXh0LWF1dGhcIiB7XHJcbiAgaW50ZXJmYWNlIFNlc3Npb24ge1xyXG4gICAgdXNlcjogRGVmYXVsdFNlc3Npb25bXCJ1c2VyXCJdICYge1xyXG4gICAgICBpZDogc3RyaW5nO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gRXh0ZW5kIEpXVCB0eXBlXHJcbmRlY2xhcmUgbW9kdWxlIFwibmV4dC1hdXRoL2p3dFwiIHtcclxuICBpbnRlcmZhY2UgSldUIHtcclxuICAgIF9pZDogc3RyaW5nO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBBdXRoT3B0aW9ucyA9IHtcclxuICBwcm92aWRlcnM6IFtcclxuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xyXG4gICAgICBuYW1lOiBcImNyZWRlbnRpYWxzXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiB7XHJcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6IFwiRW1haWxcIiwgdHlwZTogXCJlbWFpbFwiIH0sXHJcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6IFwiUGFzc3dvcmRcIiwgdHlwZTogXCJwYXNzd29yZFwiIH1cclxuICAgICAgfSxcclxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XHJcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgYXdhaXQgY29ubmVjdE1vbmdvREIoKTtcclxuICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwgfSk7XHJcblxyXG4gICAgICAgICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IHBhc3N3b3Jkc01hdGNoID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoY3JlZGVudGlhbHMucGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xyXG5cclxuICAgICAgICAgIGlmICghcGFzc3dvcmRzTWF0Y2gpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaWQ6IHVzZXIuX2lkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcclxuICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZHVyaW5nIGF1dGhlbnRpY2F0aW9uOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIGNhbGxiYWNrczoge1xyXG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xyXG4gICAgICBpZiAodXNlcikge1xyXG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG9rZW47XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcclxuICAgICAgaWYgKHNlc3Npb24udXNlcikge1xyXG4gICAgICAgIHNlc3Npb24udXNlci5pZCA9IHRva2VuLmlkIGFzIHN0cmluZztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc2Vzc2lvbjtcclxuICAgIH0sXHJcbiAgfSxcclxuICBwYWdlczoge1xyXG4gICAgc2lnbkluOiBcIi9zaWduaW5cIixcclxuICB9LFxyXG4gIHNlc3Npb246IHtcclxuICAgIHN0cmF0ZWd5OiBcImp3dFwiLFxyXG4gICAgbWF4QWdlOiAzMCAqIDI0ICogNjAgKiA2MCwgLy8gMzAgZGF5c1xyXG4gIH0sXHJcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVQsXHJcbn07Il0sIm5hbWVzIjpbIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJjb25uZWN0TW9uZ29EQiIsIlVzZXIiLCJiY3J5cHQiLCJhdXRoT3B0aW9ucyIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJ1c2VyIiwiZmluZE9uZSIsInBhc3N3b3Jkc01hdGNoIiwiY29tcGFyZSIsImlkIiwiX2lkIiwidG9TdHJpbmciLCJlcnJvciIsImNvbnNvbGUiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInNlc3Npb24iLCJwYWdlcyIsInNpZ25JbiIsInN0cmF0ZWd5IiwibWF4QWdlIiwic2VjcmV0IiwicHJvY2VzcyIsImVudiIsIk5FWFRBVVRIX1NFQ1JFVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/mongodb.ts":
/*!****************************!*\
  !*** ./src/lib/mongodb.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectMongoDB: () => (/* binding */ connectMongoDB)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst connectMongoDB = async ()=>{\n    try {\n        await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(process.env.MONGODB_URI);\n        console.log(\"Connected to MongoDB\");\n    } catch (error) {\n        console.log(\"Error connecting to MongoDB: \", error);\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL21vbmdvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRXpCLE1BQU1DLGlCQUFpQjtJQUM1QixJQUFJO1FBQ0YsTUFBTUQsdURBQWdCLENBQUNHLFFBQVFDLEdBQUcsQ0FBQ0MsV0FBVztRQUM5Q0MsUUFBUUMsR0FBRyxDQUFDO0lBQ2QsRUFBRSxPQUFPQyxPQUFPO1FBQ2RGLFFBQVFDLEdBQUcsQ0FBQyxpQ0FBaUNDO0lBQy9DO0FBQ0YsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL21pbmQtbWVudG9yLy4vc3JjL2xpYi9tb25nb2RiLnRzPzUzYzIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcclxuXHJcbmV4cG9ydCBjb25zdCBjb25uZWN0TW9uZ29EQiA9IGFzeW5jICgpID0+IHtcclxuICB0cnkge1xyXG4gICAgYXdhaXQgbW9uZ29vc2UuY29ubmVjdChwcm9jZXNzLmVudi5NT05HT0RCX1VSSSEpO1xyXG4gICAgY29uc29sZS5sb2coXCJDb25uZWN0ZWQgdG8gTW9uZ29EQlwiKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5sb2coXCJFcnJvciBjb25uZWN0aW5nIHRvIE1vbmdvREI6IFwiLCBlcnJvcik7XHJcbiAgfVxyXG59OyAiXSwibmFtZXMiOlsibW9uZ29vc2UiLCJjb25uZWN0TW9uZ29EQiIsImNvbm5lY3QiLCJwcm9jZXNzIiwiZW52IiwiTU9OR09EQl9VUkkiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/mongodb.ts\n");

/***/ }),

/***/ "(rsc)/./src/models/user.ts":
/*!****************************!*\
  !*** ./src/models/user.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\n// Define the Resource schema\nconst resourceSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    title: {\n        type: String,\n        required: true\n    },\n    description: String,\n    type: String,\n    link: String,\n    addedAt: {\n        type: Date,\n        default: Date.now\n    }\n});\n// Define the StudyPlan schema\nconst studyPlanSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    subject: {\n        type: String,\n        required: true\n    },\n    duration: String,\n    examDate: Date,\n    weeklyPlans: [\n        {\n            week: String,\n            goals: [\n                String\n            ],\n            dailyTasks: [\n                {\n                    day: String,\n                    tasks: [\n                        String\n                    ],\n                    duration: String\n                }\n            ]\n        }\n    ],\n    recommendations: [\n        String\n    ],\n    createdAt: {\n        type: Date,\n        default: Date.now\n    }\n});\n// Enhanced User schema\nconst userSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    name: {\n        type: String,\n        required: true\n    },\n    email: {\n        type: String,\n        required: true,\n        unique: true\n    },\n    password: {\n        type: String,\n        required: true\n    },\n    subjects: [\n        {\n            type: String,\n            trim: true\n        }\n    ],\n    savedPlans: [\n        studyPlanSchema\n    ],\n    savedResources: [\n        resourceSchema\n    ],\n    profile: {\n        preferences: {\n            emailNotifications: {\n                type: Boolean,\n                default: true\n            },\n            studyReminders: {\n                type: Boolean,\n                default: true\n            }\n        }\n    },\n    stats: {\n        type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema).Types.ObjectId,\n        ref: \"StudyStats\"\n    }\n}, {\n    timestamps: true\n});\n// Index for performance\nuserSchema.index({\n    subjects: 1\n});\n// Methods\nuserSchema.methods.addStudyPlan = function(plan) {\n    this.savedPlans.push(plan);\n    return this.save();\n};\nuserSchema.methods.addResource = function(resource) {\n    this.savedResources.push(resource);\n    return this.save();\n};\nconst User = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", userSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbW9kZWxzL3VzZXIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBNEJoQyw2QkFBNkI7QUFDN0IsTUFBTUMsaUJBQWlCLElBQUlELHdEQUFlLENBQVk7SUFDcERHLE9BQU87UUFDTEMsTUFBTUM7UUFDTkMsVUFBVTtJQUNaO0lBQ0FDLGFBQWFGO0lBQ2JELE1BQU1DO0lBQ05HLE1BQU1IO0lBQ05JLFNBQVM7UUFDUEwsTUFBTU07UUFDTkMsU0FBU0QsS0FBS0UsR0FBRztJQUNuQjtBQUNGO0FBRUEsOEJBQThCO0FBQzlCLE1BQU1DLGtCQUFrQixJQUFJYix3REFBZSxDQUFhO0lBQ3REYyxTQUFTO1FBQ1BWLE1BQU1DO1FBQ05DLFVBQVU7SUFDWjtJQUNBUyxVQUFVVjtJQUNWVyxVQUFVTjtJQUNWTyxhQUFhO1FBQUM7WUFDWkMsTUFBTWI7WUFDTmMsT0FBTztnQkFBQ2Q7YUFBTztZQUNmZSxZQUFZO2dCQUFDO29CQUNYQyxLQUFLaEI7b0JBQ0xpQixPQUFPO3dCQUFDakI7cUJBQU87b0JBQ2ZVLFVBQVVWO2dCQUNaO2FBQUU7UUFDSjtLQUFFO0lBQ0ZrQixpQkFBaUI7UUFBQ2xCO0tBQU87SUFDekJtQixXQUFXO1FBQ1RwQixNQUFNTTtRQUNOQyxTQUFTRCxLQUFLRSxHQUFHO0lBQ25CO0FBQ0Y7QUFtQkEsdUJBQXVCO0FBQ3ZCLE1BQU1hLGFBQWEsSUFBSXpCLHdEQUFlLENBQVE7SUFDNUMwQixNQUFNO1FBQ0p0QixNQUFNQztRQUNOQyxVQUFVO0lBQ1o7SUFDQXFCLE9BQU87UUFDTHZCLE1BQU1DO1FBQ05DLFVBQVU7UUFDVnNCLFFBQVE7SUFDVjtJQUNBQyxVQUFVO1FBQ1J6QixNQUFNQztRQUNOQyxVQUFVO0lBQ1o7SUFDQXdCLFVBQVU7UUFBQztZQUNUMUIsTUFBTUM7WUFDTjBCLE1BQU07UUFDUjtLQUFFO0lBQ0ZDLFlBQVk7UUFBQ25CO0tBQWdCO0lBQzdCb0IsZ0JBQWdCO1FBQUNoQztLQUFlO0lBQ2hDaUMsU0FBUztRQUNQQyxhQUFhO1lBQ1hDLG9CQUFvQjtnQkFDbEJoQyxNQUFNaUM7Z0JBQ04xQixTQUFTO1lBQ1g7WUFDQTJCLGdCQUFnQjtnQkFDZGxDLE1BQU1pQztnQkFDTjFCLFNBQVM7WUFDWDtRQUNGO0lBQ0Y7SUFDQTRCLE9BQU87UUFDTG5DLE1BQU1KLHdEQUFlLENBQUN3QyxLQUFLLENBQUNDLFFBQVE7UUFDcENDLEtBQUs7SUFDUDtBQUNGLEdBQUc7SUFDREMsWUFBWTtBQUNkO0FBRUEsd0JBQXdCO0FBQ3hCbEIsV0FBV21CLEtBQUssQ0FBQztJQUFFZCxVQUFVO0FBQUU7QUFFL0IsVUFBVTtBQUNWTCxXQUFXb0IsT0FBTyxDQUFDQyxZQUFZLEdBQUcsU0FBU0MsSUFBZ0I7SUFDekQsSUFBSSxDQUFDZixVQUFVLENBQUNnQixJQUFJLENBQUNEO0lBQ3JCLE9BQU8sSUFBSSxDQUFDRSxJQUFJO0FBQ2xCO0FBRUF4QixXQUFXb0IsT0FBTyxDQUFDSyxXQUFXLEdBQUcsU0FBU0MsUUFBbUI7SUFDM0QsSUFBSSxDQUFDbEIsY0FBYyxDQUFDZSxJQUFJLENBQUNHO0lBQ3pCLE9BQU8sSUFBSSxDQUFDRixJQUFJO0FBQ2xCO0FBRUEsTUFBTUcsT0FBT3BELHdEQUFlLENBQUNvRCxJQUFJLElBQUlwRCxxREFBYyxDQUFRLFFBQVF5QjtBQUVuRSxpRUFBZTJCLElBQUlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9taW5kLW1lbnRvci8uL3NyYy9tb2RlbHMvdXNlci50cz84YjY0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcclxuXHJcbi8vIERlZmluZSBpbnRlcmZhY2VzIGZvciB0eXBlIHNhZmV0eVxyXG5pbnRlcmZhY2UgSVN0dWR5UGxhbiB7XHJcbiAgc3ViamVjdDogc3RyaW5nO1xyXG4gIGR1cmF0aW9uOiBzdHJpbmc7XHJcbiAgZXhhbURhdGU6IERhdGU7XHJcbiAgd2Vla2x5UGxhbnM6IEFycmF5PHtcclxuICAgIHdlZWs6IHN0cmluZztcclxuICAgIGdvYWxzOiBzdHJpbmdbXTtcclxuICAgIGRhaWx5VGFza3M6IEFycmF5PHtcclxuICAgICAgZGF5OiBzdHJpbmc7XHJcbiAgICAgIHRhc2tzOiBzdHJpbmdbXTtcclxuICAgICAgZHVyYXRpb246IHN0cmluZztcclxuICAgIH0+O1xyXG4gIH0+O1xyXG4gIHJlY29tbWVuZGF0aW9uczogc3RyaW5nW107XHJcbiAgY3JlYXRlZEF0OiBEYXRlO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSVJlc291cmNlIHtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xyXG4gIHR5cGU/OiBzdHJpbmc7XHJcbiAgbGluaz86IHN0cmluZztcclxuICBhZGRlZEF0OiBEYXRlO1xyXG59XHJcblxyXG4vLyBEZWZpbmUgdGhlIFJlc291cmNlIHNjaGVtYVxyXG5jb25zdCByZXNvdXJjZVNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWE8SVJlc291cmNlPih7XHJcbiAgdGl0bGU6IHtcclxuICAgIHR5cGU6IFN0cmluZyxcclxuICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gIH0sXHJcbiAgZGVzY3JpcHRpb246IFN0cmluZyxcclxuICB0eXBlOiBTdHJpbmcsXHJcbiAgbGluazogU3RyaW5nLFxyXG4gIGFkZGVkQXQ6IHtcclxuICAgIHR5cGU6IERhdGUsXHJcbiAgICBkZWZhdWx0OiBEYXRlLm5vdyxcclxuICB9LFxyXG59KTtcclxuXHJcbi8vIERlZmluZSB0aGUgU3R1ZHlQbGFuIHNjaGVtYVxyXG5jb25zdCBzdHVkeVBsYW5TY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hPElTdHVkeVBsYW4+KHtcclxuICBzdWJqZWN0OiB7XHJcbiAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICByZXF1aXJlZDogdHJ1ZSxcclxuICB9LFxyXG4gIGR1cmF0aW9uOiBTdHJpbmcsXHJcbiAgZXhhbURhdGU6IERhdGUsXHJcbiAgd2Vla2x5UGxhbnM6IFt7XHJcbiAgICB3ZWVrOiBTdHJpbmcsXHJcbiAgICBnb2FsczogW1N0cmluZ10sXHJcbiAgICBkYWlseVRhc2tzOiBbe1xyXG4gICAgICBkYXk6IFN0cmluZyxcclxuICAgICAgdGFza3M6IFtTdHJpbmddLFxyXG4gICAgICBkdXJhdGlvbjogU3RyaW5nLFxyXG4gICAgfV0sXHJcbiAgfV0sXHJcbiAgcmVjb21tZW5kYXRpb25zOiBbU3RyaW5nXSxcclxuICBjcmVhdGVkQXQ6IHtcclxuICAgIHR5cGU6IERhdGUsXHJcbiAgICBkZWZhdWx0OiBEYXRlLm5vdyxcclxuICB9LFxyXG59KTtcclxuXHJcbi8vIERlZmluZSBpbnRlcmZhY2UgZm9yIFVzZXIgZG9jdW1lbnRcclxuaW50ZXJmYWNlIElVc2VyIHtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgZW1haWw6IHN0cmluZztcclxuICBwYXNzd29yZDogc3RyaW5nO1xyXG4gIHN1YmplY3RzOiBzdHJpbmdbXTtcclxuICBzYXZlZFBsYW5zOiBJU3R1ZHlQbGFuW107XHJcbiAgc2F2ZWRSZXNvdXJjZXM6IElSZXNvdXJjZVtdO1xyXG4gIHByb2ZpbGU6IHtcclxuICAgIHByZWZlcmVuY2VzOiB7XHJcbiAgICAgIGVtYWlsTm90aWZpY2F0aW9uczogYm9vbGVhbjtcclxuICAgICAgc3R1ZHlSZW1pbmRlcnM6IGJvb2xlYW47XHJcbiAgICB9O1xyXG4gIH07XHJcbiAgc3RhdHM6IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkO1xyXG59XHJcblxyXG4vLyBFbmhhbmNlZCBVc2VyIHNjaGVtYVxyXG5jb25zdCB1c2VyU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYTxJVXNlcj4oe1xyXG4gIG5hbWU6IHtcclxuICAgIHR5cGU6IFN0cmluZyxcclxuICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gIH0sXHJcbiAgZW1haWw6IHtcclxuICAgIHR5cGU6IFN0cmluZyxcclxuICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgdW5pcXVlOiB0cnVlLFxyXG4gIH0sXHJcbiAgcGFzc3dvcmQ6IHtcclxuICAgIHR5cGU6IFN0cmluZyxcclxuICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gIH0sXHJcbiAgc3ViamVjdHM6IFt7XHJcbiAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICB0cmltOiB0cnVlLFxyXG4gIH1dLFxyXG4gIHNhdmVkUGxhbnM6IFtzdHVkeVBsYW5TY2hlbWFdLFxyXG4gIHNhdmVkUmVzb3VyY2VzOiBbcmVzb3VyY2VTY2hlbWFdLFxyXG4gIHByb2ZpbGU6IHtcclxuICAgIHByZWZlcmVuY2VzOiB7XHJcbiAgICAgIGVtYWlsTm90aWZpY2F0aW9uczoge1xyXG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgZGVmYXVsdDogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgICAgc3R1ZHlSZW1pbmRlcnM6IHtcclxuICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgc3RhdHM6IHtcclxuICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcclxuICAgIHJlZjogJ1N0dWR5U3RhdHMnXHJcbiAgfSxcclxufSwge1xyXG4gIHRpbWVzdGFtcHM6IHRydWUsXHJcbn0pO1xyXG5cclxuLy8gSW5kZXggZm9yIHBlcmZvcm1hbmNlXHJcbnVzZXJTY2hlbWEuaW5kZXgoeyBzdWJqZWN0czogMSB9KTtcclxuXHJcbi8vIE1ldGhvZHNcclxudXNlclNjaGVtYS5tZXRob2RzLmFkZFN0dWR5UGxhbiA9IGZ1bmN0aW9uKHBsYW46IElTdHVkeVBsYW4pIHtcclxuICB0aGlzLnNhdmVkUGxhbnMucHVzaChwbGFuKTtcclxuICByZXR1cm4gdGhpcy5zYXZlKCk7XHJcbn07XHJcblxyXG51c2VyU2NoZW1hLm1ldGhvZHMuYWRkUmVzb3VyY2UgPSBmdW5jdGlvbihyZXNvdXJjZTogSVJlc291cmNlKSB7XHJcbiAgdGhpcy5zYXZlZFJlc291cmNlcy5wdXNoKHJlc291cmNlKTtcclxuICByZXR1cm4gdGhpcy5zYXZlKCk7XHJcbn07XHJcblxyXG5jb25zdCBVc2VyID0gbW9uZ29vc2UubW9kZWxzLlVzZXIgfHwgbW9uZ29vc2UubW9kZWw8SVVzZXI+KFwiVXNlclwiLCB1c2VyU2NoZW1hKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVzZXI7XHJcbmV4cG9ydCB0eXBlIHsgSVVzZXIsIElTdHVkeVBsYW4sIElSZXNvdXJjZSB9OyAiXSwibmFtZXMiOlsibW9uZ29vc2UiLCJyZXNvdXJjZVNjaGVtYSIsIlNjaGVtYSIsInRpdGxlIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwiZGVzY3JpcHRpb24iLCJsaW5rIiwiYWRkZWRBdCIsIkRhdGUiLCJkZWZhdWx0Iiwibm93Iiwic3R1ZHlQbGFuU2NoZW1hIiwic3ViamVjdCIsImR1cmF0aW9uIiwiZXhhbURhdGUiLCJ3ZWVrbHlQbGFucyIsIndlZWsiLCJnb2FscyIsImRhaWx5VGFza3MiLCJkYXkiLCJ0YXNrcyIsInJlY29tbWVuZGF0aW9ucyIsImNyZWF0ZWRBdCIsInVzZXJTY2hlbWEiLCJuYW1lIiwiZW1haWwiLCJ1bmlxdWUiLCJwYXNzd29yZCIsInN1YmplY3RzIiwidHJpbSIsInNhdmVkUGxhbnMiLCJzYXZlZFJlc291cmNlcyIsInByb2ZpbGUiLCJwcmVmZXJlbmNlcyIsImVtYWlsTm90aWZpY2F0aW9ucyIsIkJvb2xlYW4iLCJzdHVkeVJlbWluZGVycyIsInN0YXRzIiwiVHlwZXMiLCJPYmplY3RJZCIsInJlZiIsInRpbWVzdGFtcHMiLCJpbmRleCIsIm1ldGhvZHMiLCJhZGRTdHVkeVBsYW4iLCJwbGFuIiwicHVzaCIsInNhdmUiLCJhZGRSZXNvdXJjZSIsInJlc291cmNlIiwiVXNlciIsIm1vZGVscyIsIm1vZGVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/models/user.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CShraddha%5CClgProj%5Cstudy-craft%5Cfrontend%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CShraddha%5CClgProj%5Cstudy-craft%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();