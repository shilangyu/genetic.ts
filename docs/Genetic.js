"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Genetic = /** @class */ (function () {
    function Genetic(mutationRate, numberOfParents, parentsSelectionMode, crossoverMode) {
        this.mutationRate = mutationRate;
        this.numberOfParents = numberOfParents;
        this.parentsSelectionMode = parentsSelectionMode;
        this.crossoverMode = crossoverMode;
        this.parents = [];
        this.chromosomes = [];
    }
    Genetic.prototype.findParents = function (population) {
        if (this.parentsSelectionMode === "BEST" /* best */) {
            this.parents = population
                .sort(function (a, b) { return a.fitness - b.fitness; })
                .slice(-this.numberOfParents)
                .map(function (e) { return e.dna; });
        }
        else if (this.parentsSelectionMode === "PROBABILITY" /* probability */) {
            var left = this.numberOfParents;
            var fitnessSum = population.reduce(function (prev, curr) { return prev + curr.fitness; }, 0);
            while (left-- > 0) {
                var chosen = Math.random() * fitnessSum;
                for (var _i = 0, population_1 = population; _i < population_1.length; _i++) {
                    var member = population_1[_i];
                    chosen -= member.fitness;
                    if (chosen <= 0) {
                        this.parents.push(member.dna);
                        fitnessSum -= member.fitness;
                        population.splice(population.indexOf(member), 1);
                        break;
                    }
                }
            }
        }
        return this;
    };
    Genetic.prototype.crossover = function (amountOfChromosomes) {
        var _this = this;
        if (this.crossoverMode === "RANDOM" /* random */) {
            var deepAvrg_1 = function (targets) {
                if (Array.isArray(targets[0])) {
                    return new Array(targets[0].length)
                        .fill(null)
                        .map(function (e, i) { return deepAvrg_1(targets.map(function (e) { return e[i]; })); });
                }
                else if (typeof targets[0] === 'object') {
                    var temp = {};
                    var _loop_1 = function (key) {
                        temp[key] = deepAvrg_1(targets.map(function (e) { return e[key]; }));
                    };
                    for (var _i = 0, _a = Object.keys(targets[0]); _i < _a.length; _i++) {
                        var key = _a[_i];
                        _loop_1(key);
                    }
                    return temp;
                }
                else if (typeof targets[0] === 'number')
                    return targets[Math.floor(Math.random() * targets.length)];
            };
            this.chromosomes = new Array(amountOfChromosomes).fill(null).map(function () { return deepAvrg_1(_this.parents); });
        }
        else if (this.crossoverMode === "CLONE" /* clone */) {
            var left = amountOfChromosomes;
            while (left-- > 0) {
                var chosen = Math.floor(Math.random() * this.parents.length);
                this.chromosomes.push(JSON.parse(JSON.stringify(this.parents[chosen])));
            }
        }
        else if (this.crossoverMode === "AVERAGE" /* average */) {
            var deepAvrg_2 = function (targets) {
                if (Array.isArray(targets[0])) {
                    return new Array(targets[0].length)
                        .fill(null)
                        .map(function (e, i) { return deepAvrg_2(targets.map(function (e) { return e[i]; })); });
                }
                else if (typeof targets[0] === 'object') {
                    var temp = {};
                    var _loop_2 = function (key) {
                        temp[key] = deepAvrg_2(targets.map(function (e) { return e[key]; }));
                    };
                    for (var _i = 0, _a = Object.keys(targets[0]); _i < _a.length; _i++) {
                        var key = _a[_i];
                        _loop_2(key);
                    }
                    return temp;
                }
                else if (typeof targets[0] === 'number')
                    return targets.reduce(function (prev, curr) { return prev + curr; }, 0) / targets.length;
            };
            var res_1 = JSON.stringify(deepAvrg_2(this.parents));
            this.chromosomes = new Array(amountOfChromosomes).fill(null).map(function () { return JSON.parse(res_1); });
        }
        return this;
    };
    Genetic.prototype.mutation = function (func) {
        var _this = this;
        var deeper = function (target) {
            if (Array.isArray(target)) {
                return target.map(deeper);
            }
            else if (typeof target === 'object') {
                var temp = {};
                for (var _i = 0, _a = Object.keys(target); _i < _a.length; _i++) {
                    var key = _a[_i];
                    temp[key] = deeper(target[key]);
                }
                return temp;
            }
            else if (typeof target === 'number')
                return target + func(_this.mutationRate);
        };
        this.chromosomes = this.chromosomes.map(deeper);
        return this.chromosomes;
    };
    Genetic.validatePopulation = function (population) {
        if (!population.every(function (mem) { return 'fitness' in mem; }))
            throw new Error('Member of the population is missing the fitness property.');
        if (!population.every(function (mem) { return typeof mem.fitness === 'number'; }))
            throw new Error('Fitness of a member of the population is not of type number.');
        if (!population.every(function (mem) { return 'dna' in mem; }))
            throw new Error('Member of the population is missing the dna property.');
        function validateTypes(obj) {
            if (Array.isArray(obj))
                for (var _i = 0, obj_1 = obj; _i < obj_1.length; _i++) {
                    var ele = obj_1[_i];
                    validateTypes(ele);
                }
            else if (typeof obj === 'object')
                for (var _a = 0, _b = Object.values(obj); _a < _b.length; _a++) {
                    var ele = _b[_a];
                    validateTypes(ele);
                }
            else if (typeof obj !== 'number')
                throw new Error('Dna of a member of the population has an incorrect type.');
        }
        validateTypes(population);
        var zip = function (a, b) { return a.map(function (e, i) { return [e, b[i]]; }); };
        function validateStructure(obj, model) {
            if (Array.isArray(model)) {
                if (obj.length !== model.length)
                    throw new Error('Dna of a member of the population has a different structure.');
                for (var _i = 0, _a = zip(obj, model); _i < _a.length; _i++) {
                    var _b = _a[_i], a = _b[0], b = _b[1];
                    if (Array.isArray(a) !== Array.isArray(b)) {
                        throw new Error('Dna of a member of the population has a different structure.');
                    }
                    else if (typeof a !== typeof b) {
                        throw new Error('Dna of a member of the population has a different structure.');
                    }
                    else if (typeof a !== 'number') {
                        validateStructure(a, b);
                    }
                }
            }
            else if (typeof obj === 'object') {
                if (!zip(Object.keys(obj), Object.keys(model)).every(function (_a) {
                    var a = _a[0], b = _a[1];
                    return a === b;
                })) {
                    throw new Error('Dna of a member of the population has a different structure.');
                }
                for (var _c = 0, _d = zip(Object.values(obj), Object.values(model)); _c < _d.length; _c++) {
                    var _e = _d[_c], a = _e[0], b = _e[1];
                    if (Array.isArray(a) !== Array.isArray(b)) {
                        throw new Error('Dna of a member of the population has a different structure.');
                    }
                    else if (typeof a !== typeof b) {
                        throw new Error('Dna of a member of the population has a different structure.');
                    }
                    else if (typeof a !== 'number') {
                        validateStructure(a, b);
                    }
                }
            }
            else if (typeof obj !== 'number')
                throw new Error('Dna of a member of the population has a different structure.');
        }
        for (var _i = 0, _a = population.slice(1); _i < _a.length; _i++) {
            var curr = _a[_i];
            validateStructure(curr, population[0]);
        }
    };
    return Genetic;
}());
exports.default = Genetic;
exports.chance = function (func) { return function (mutationRate) {
    if (Math.random() < mutationRate)
        return func(mutationRate);
    return 0;
}; };
exports.add = function (min, max) { return function () {
    return Math.random() * (max - min) + min;
}; };
