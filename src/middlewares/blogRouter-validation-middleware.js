"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouterValidation = void 0;
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("./input-validation-middleware");
const nameValidation = (0, express_validator_1.body)('name').isString().trim().isLength({ min: 3, max: 15 });
const youtubeUrlValidation = (0, express_validator_1.body)('youtubeUrl').isString().trim().isURL().isLength({ min: 5, max: 100 });
exports.blogRouterValidation = [nameValidation, youtubeUrlValidation, input_validation_middleware_1.inputValidationMiddleware];
