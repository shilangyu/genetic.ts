import Genetic, { CrossoverModes, ParentsSelectionModes } from '../Genetic'

describe('`findParents` method of an Genetic instance', () => {
	it('tests the best parents selection', () => {
		const g = new Genetic({
			modes: { crossover: CrossoverModes.clone }
		})

		const mockPopulation = [
			{ fitness: 100, dna: { asd: 1 } },
			{ fitness: 200, dna: { asd: 2 } },
			{ fitness: 300, dna: { asd: 3 } },
			{ fitness: 400, dna: { asd: 4 } },
			{ fitness: 500, dna: { asd: 5 } }
		]

		g.findParents(mockPopulation)

		const result = g.parents
		const expected = [{ asd: 4 }, { asd: 5 }]

		expect(result).toEqual(expected)
	})

	it('tests the probability parents selection', () => {
		const g = new Genetic({
			modes: {
				parentsSelection: ParentsSelectionModes.probability,
				crossover: CrossoverModes.clone
			}
		})

		const mockPopulation = [
			{ fitness: 0, dna: { asd: 4 } },
			{ fitness: 500, dna: { asd: 5 } }
		]

		g.findParents(mockPopulation)

		const result = g.parents
		const expected = [{ asd: 5 }, { asd: 4 }]

		expect(result).toEqual(expected)
	})
})
