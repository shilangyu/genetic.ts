import { Instance, CrossoverModes, chance, add } from '../Genetic'

describe('`mutation` method of an Genetic instance', () => {
	it('tests adding 1 to a property', () => {
		const mockPopulation = [
			{ fitness: 100, dna: [{ a: 213, e: [31] }, [[2, 46, 5]]] },
			{ fitness: 200, dna: [{ a: 23, e: [31] }, [[32, 64, 542]]] },
			{ fitness: 300, dna: [{ a: 21, e: [32] }, [[2, 4, 53]]] },
			{ fitness: 400, dna: [{ a: 13, e: [223] }, [[442, 24, 35]]] },
			{ fitness: 500, dna: [{ a: 3, e: [13] }, [[2, 74, 5]]] }
		]

		const g = new Instance({
			population: mockPopulation,
			amountOfDna: 3,
			mutationFunction: () => 1,
			modes: { crossover: CrossoverModes.average },
			fitnessFunction: () => 0
		})

		g.findParents()
			.crossover()
			.mutate()

		const result = g.newDna
		const expected = [
			[{ a: 9, e: [119] }, [[223, 50, 21]]],
			[{ a: 9, e: [119] }, [[223, 50, 21]]],
			[{ a: 9, e: [119] }, [[223, 50, 21]]]
		]

		expect(result).toEqual(expected)
	})

	it('tests the chance function', () => {
		const mockPopulation = [
			{ fitness: 100, dna: [{ a: 213, e: [31] }, [[2, 46, 5]]] },
			{ fitness: 200, dna: [{ a: 23, e: [31] }, [[32, 64, 542]]] },
			{ fitness: 300, dna: [{ a: 21, e: [32] }, [[2, 4, 53]]] },
			{ fitness: 400, dna: [{ a: 13, e: [223] }, [[442, 24, 35]]] },
			{ fitness: 500, dna: [{ a: 3, e: [13] }, [[2, 74, 5]]] }
		]

		let g = new Instance({
			population: mockPopulation,
			amountOfDna: 3,
			mutationFunction: chance(() => 1),
			mutationRate: 0,
			modes: { crossover: CrossoverModes.average },
			fitnessFunction: () => 0
		})

		g.findParents()
			.crossover()
			.mutate()

		let result = g.newDna
		let expected = [
			[{ a: 8, e: [118] }, [[222, 49, 20]]],
			[{ a: 8, e: [118] }, [[222, 49, 20]]],
			[{ a: 8, e: [118] }, [[222, 49, 20]]]
		]

		expect(result).toEqual(expected)

		g = new Instance({
			population: mockPopulation,
			amountOfDna: 3,
			mutationFunction: chance(() => 1),
			mutationRate: 1,
			modes: { crossover: CrossoverModes.average },
			fitnessFunction: () => 0
		})

		g.findParents()
			.crossover()
			.mutate()

		result = g.newDna
		expected = [
			[{ a: 9, e: [119] }, [[223, 50, 21]]],
			[{ a: 9, e: [119] }, [[223, 50, 21]]],
			[{ a: 9, e: [119] }, [[223, 50, 21]]]
		]

		expect(result).toEqual(expected)
	})

	it('tests the add function', () => {
		const mockPopulation = [
			{ fitness: 100, dna: [{ a: 213, e: [31] }, [[2, 46, 5]]] },
			{ fitness: 200, dna: [{ a: 23, e: [31] }, [[32, 64, 542]]] },
			{ fitness: 300, dna: [{ a: 21, e: [32] }, [[2, 4, 53]]] },
			{ fitness: 400, dna: [{ a: 13, e: [223] }, [[442, 24, 35]]] },
			{ fitness: 500, dna: [{ a: 3, e: [13] }, [[2, 74, 5]]] }
		]

		const g = new Instance({
			population: mockPopulation,
			amountOfDna: 3,
			mutationFunction: add(1, 1),
			modes: { crossover: CrossoverModes.average },
			fitnessFunction: () => 0
		})

		g.findParents()
			.crossover()
			.mutate()

		const result = g.newDna
		const expected = [
			[{ a: 9, e: [119] }, [[223, 50, 21]]],
			[{ a: 9, e: [119] }, [[223, 50, 21]]],
			[{ a: 9, e: [119] }, [[223, 50, 21]]]
		]

		expect(result).toEqual(expected)
	})
})
