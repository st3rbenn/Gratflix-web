"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePlexResponse = void 0;
var fast_xml_parser_1 = require("fast-xml-parser");
var xmlParser = new fast_xml_parser_1.XMLParser({
    attributeNamePrefix: "",
    ignoreAttributes: false,
    parseAttributeValue: true,
    trimValues: true,
    stopNodes: ["parse-me-as-string"],
});
var CHUNK_SIZE = 20;
var progressBar = function (current, total) {
    var length = 50; // Longueur de la barre de progression
    var position = Math.ceil((current / total) * length);
    var bar = Array(length)
        .fill("-")
        .map(function (c, i) { return (i < position ? "=" : c); })
        .join("");
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write("[".concat(bar, "] ").concat(((current / total) * 100).toFixed(2), "%"));
};
var sendDataToDatabase = function (actor) { return __awaiter(void 0, void 0, void 0, function () {
    var config, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("actor", actor);
                config = {
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkxMjY4MDUwLCJleHAiOjE2OTM4NjAwNTB9.EFtKLxZcqgzDFAn6Lesg8KRPJ0aI_rvEDT7S3awIZLw",
                        "content-type": "application/json",
                    },
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:1337/content-manager/collection-types/api::actor.actor", __assign({ method: "POST" }, config))];
            case 2:
                _a.sent();
                console.log(actor.fullname, "added to database ✅");
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.log("ERROOOOOOOOOOOOR 🛑", e_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var parsePlexResponse = function (xml) { return __awaiter(void 0, void 0, void 0, function () {
    var res, xmlResult, _a, _b, actorNames, actors, _i, _c, video, _d, _e, actor, e_2;
    var _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                console.log("START PARSING");
                _g.label = 1;
            case 1:
                _g.trys.push([1, 5, , 6]);
                return [4 /*yield*/, fetch("https://plex.tenta-zone.fr/library/sections/3/all?X-Plex-Client-Identifier=469w2zc6l54h91elzqnc38be&X-Plex-Token=vLHzuw2hXUXxdh9KKAPu&X-Plex-Language=en")];
            case 2:
                res = _g.sent();
                _b = (_a = xmlParser).parse;
                return [4 /*yield*/, res.text()];
            case 3: return [4 /*yield*/, _b.apply(_a, [_g.sent()])];
            case 4:
                xmlResult = _g.sent();
                actorNames = [];
                actors = Array.from(actorNames).map(function (fullname) { return ({
                    fullname: fullname,
                }); });
                // console.log("RESPONNNNNNSE", xmlResult)
                for (_i = 0, _c = (_f = xmlResult === null || xmlResult === void 0 ? void 0 : xmlResult.MediaContainer) === null || _f === void 0 ? void 0 : _f.Video; _i < _c.length; _i++) {
                    video = _c[_i];
                    for (_d = 0, _e = video.Role; _d < _e.length; _d++) {
                        actor = _e[_d];
                        if (actors.includes({
                            fullname: actor.tag,
                        })) {
                            console.log("ALREADY IN");
                            continue;
                        }
                        else {
                            actors.push({
                                fullname: actor.tag,
                            });
                        }
                    }
                }
                console.log("START --------------------------", actors);
                //i want to wait 2 seconds between each request
                // for (let i = 0; i < actors.length; i++) {
                // 	await sendDataToDatabase(actors[i])
                // 	await new Promise((resolve) => setTimeout(resolve, 1000))
                // 	progressBar(i, actors.length)
                // }
                console.log("DONE");
                return [3 /*break*/, 6];
            case 5:
                e_2 = _g.sent();
                console.log(e_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.parsePlexResponse = parsePlexResponse;
(0, exports.parsePlexResponse)();
// console.log(res.MediaContainer.Video)
//ALL REQUEST STRAPI
//PUT REQUEST
//ACTOR LIKE
// http://localhost:1337/content-manager/collection-types/api::actor.actor/${id}
//POST REQUEST
//ACTOR CREATE
// http://localhost:1337/content-manager/collection-types/api::actor.actor
