import Genetic, { CrossoverModes, ParentsSelectionModes } from '../Genetic'

describe('`crossover` method of an Genetic instance', () => {
	it('tests the random gene crossover', () => {
		const g = new Genetic(0.01, 2, ParentsSelectionModes.best, CrossoverModes.random)

		const mockPopulation = [
			{ fitness: 100, dna: { asd: 1, tut: 11 } },
			{ fitness: 200, dna: { asd: 2, tut: 12 } },
			{ fitness: 300, dna: { asd: 3, tut: 1 } },
			{ fitness: 400, dna: { asd: 4, tut: 12 } },
			{ fitness: 500, dna: { asd: 8, tut: 10 } }
		]

		g.findParents(mockPopulation).crossover(3)

		const result = g.chromosomes
		const expected = [{ asd: 6, tut: 11 }, { asd: 6, tut: 11 },{ asd: 6, tut: 11 }]

		expect(result).toHaveLength(3)
	})

	it('tests the clone gene crossover', () => {
		const g = new Genetic(0.01, 1, ParentsSelectionModes.best, CrossoverModes.clone)

		const mockPopulation = [
			{ fitness: 100, dna: { asd: 1, tut: 11 } },
			{ fitness: 200, dna: { asd: 2, tut: 12 } },
			{ fitness: 300, dna: { asd: 3, tut: 1 } },
			{ fitness: 400, dna: { asd: 4, tut: 12 } },
			{ fitness: 500, dna: { asd: 8, tut: 10 } }
		]

		g.findParents(mockPopulation).crossover(3)

		const result = g.chromosomes
		const expected = [{ asd: 8, tut: 10 }, { asd: 8, tut: 10 },{ asd: 8, tut: 10 }]

		expect(result).toEqual(expected)
	})

	it('tests the average gene crossover', () => {
		const g = new Genetic(0.01, 2, ParentsSelectionModes.best, CrossoverModes.average)

		const mockPopulation = [
			{ fitness: 100, dna: { asd: 1, tut: 11 } },
			{ fitness: 200, dna: { asd: 2, tut: 12 } },
			{ fitness: 300, dna: { asd: 3, tut: 1 } },
			{ fitness: 400, dna: { asd: 4, tut: 12 } },
			{ fitness: 500, dna: { asd: 8, tut: 10 } }
		]

		g.findParents(mockPopulation).crossover(3)

		const result = g.chromosomes
		const expected = [{ asd: 6, tut: 11 }, { asd: 6, tut: 11 },{ asd: 6, tut: 11 }]

		expect(result).toEqual(expected)
	})
})
