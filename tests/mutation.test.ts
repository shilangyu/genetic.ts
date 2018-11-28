import Genetic, {
	CrossoverModes,
	chance,
	add
} from '../Genetic'

describe('`mutation` method of an Genetic instance', () => {
	it('tests adding 1 to a property', () => {
		const g = new Genetic({
			modes: { crossover: CrossoverModes.average }
		})

		const mockPopulation = [
			{ fitness: 100, dna: [{ a: 213, e: [31] }, [[2, 46, 5]]] },
			{ fitness: 200, dna: [{ a: 23, e: [31] }, [[32, 64, 542]]] },
			{ fitness: 300, dna: [{ a: 21, e: [32] }, [[2, 4, 53]]] },
			{ fitness: 400, dna: [{ a: 13, e: [223] }, [[442, 24, 35]]] },
			{ fitness: 500, dna: [{ a: 3, e: [13] }, [[2, 74, 5]]] }
		]

		g.findParents(mockPopulation)
			.crossover(3)
			.mutate(() => 1)

		const result = g.chromosomes
		const expected = [
			[{ a: 9, e: [119] }, [[223, 50, 21]]],
			[{ a: 9, e: [119] }, [[223, 50, 21]]],
			[{ a: 9, e: [119] }, [[223, 50, 21]]]
		]

		expect(result).toEqual(expected)
	})

	it('tests the chance function', () => {
		let g = new Genetic({
			mutationRate: 0,
			modes: { crossover: CrossoverModes.average }
		})

		const mockPopulation = [
			{ fitness: 100, dna: [{ a: 213, e: [31] }, [[2, 46, 5]]] },
			{ fitness: 200, dna: [{ a: 23, e: [31] }, [[32, 64, 542]]] },
			{ fitness: 300, dna: [{ a: 21, e: [32] }, [[2, 4, 53]]] },
			{ fitness: 400, dna: [{ a: 13, e: [223] }, [[442, 24, 35]]] },
			{ fitness: 500, dna: [{ a: 3, e: [13] }, [[2, 74, 5]]] }
		]

		g.findParents(mockPopulation)
			.crossover(3)
			.mutate(chance(() => 1))

		let result = g.chromosomes
		let expected = [
			[{ a: 8, e: [118] }, [[222, 49, 20]]],
			[{ a: 8, e: [118] }, [[222, 49, 20]]],
			[{ a: 8, e: [118] }, [[222, 49, 20]]]
		]

		expect(result).toEqual(expected)

		g = new Genetic({
			mutationRate: 1,
			modes: { crossover: CrossoverModes.average }
		})

		g.findParents(mockPopulation)
			.crossover(3)
			.mutate(chance(() => 1))

		result = g.chromosomes
		expected = [
			[{ a: 9, e: [119] }, [[223, 50, 21]]],
			[{ a: 9, e: [119] }, [[223, 50, 21]]],
			[{ a: 9, e: [119] }, [[223, 50, 21]]]
		]

		expect(result).toEqual(expected)
	})

	it('tests the add function', () => {
		const g = new Genetic({
			modes: { crossover: CrossoverModes.average }
		})

		const mockPopulation = [
			{ fitness: 100, dna: [{ a: 213, e: [31] }, [[2, 46, 5]]] },
			{ fitness: 200, dna: [{ a: 23, e: [31] }, [[32, 64, 542]]] },
			{ fitness: 300, dna: [{ a: 21, e: [32] }, [[2, 4, 53]]] },
			{ fitness: 400, dna: [{ a: 13, e: [223] }, [[442, 24, 35]]] },
			{ fitness: 500, dna: [{ a: 3, e: [13] }, [[2, 74, 5]]] }
		]

		g.findParents(mockPopulation)
			.crossover(3)
			.mutate(add(1, 1))

		const result = g.chromosomes
		const expected = [
			[{ a: 9, e: [119] }, [[223, 50, 21]]],
			[{ a: 9, e: [119] }, [[223, 50, 21]]],
			[{ a: 9, e: [119] }, [[223, 50, 21]]]
		]

		expect(result).toEqual(expected)
	})
})
