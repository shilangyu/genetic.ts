import Genetic, {CrossoverModes, ParentsSelectionModes} from '../Genetic'

describe('`overwrite` method of an Genetic instance', () => {
	it('tests overwriting a number prop', () => {
		let g = new Genetic({
			population: [],
			mutationFunction: () => 1,
			fitnessFunction: () => 0
		})
		
		const expected = [10, -1]

		g.overwrite(self => {
			self.amountOfDna = expected[0]
			self.mutationRate = expected[1]
		})
		

		const result = [g.amountOfDna, g.mutationRate]

		expect(result).toEqual(expected)
	})

	it('tests overwriting a object prop', () => {
		let g = new Genetic({
			population: [],
			mutationFunction: () => 1,
			fitnessFunction: () => 0
		})
		
		const expected = {
			parentsSelection: ParentsSelectionModes.best,
			crossover: CrossoverModes.average
		}

		g.overwrite(self => {
			self.modes.crossover = expected.crossover
		})
		

		const result = g.modes

		expect(result).toEqual(expected)
	})
})
