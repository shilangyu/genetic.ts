import { CrossoverModes, Instance, ParentsSelectionModes } from '../src/Genetic'

describe('`findParents` method of an Genetic instance', () => {
  it('tests the best parents selection', () => {
    const mockPopulation = [
      { fitness: () => 100, dna: { asd: 1 } },
      { fitness: () => 200, dna: { asd: 2 } },
      { fitness: () => 300, dna: { asd: 3 } },
      { fitness: () => 400, dna: { asd: 4 } },
      { fitness: () => 500, dna: { asd: 5 } }
    ]

    const g = new Instance({
      population: mockPopulation,
      mutationFunction: () => 1,
      modes: { crossover: CrossoverModes.clone }
    })

    g.findParents()

    const result = g.parents
    const expected = [{ asd: 4 }, { asd: 5 }]

    expect(result).toEqual(expected)
  })

  it('tests the probability parents selection', () => {
    const mockPopulation = [
      { fitness: () => 0, dna: { asd: 4 } },
      { fitness: () => 500, dna: { asd: 5 } }
    ]

    const g = new Instance({
      population: mockPopulation,
      mutationFunction: () => 1,
      modes: {
        parentsSelection: ParentsSelectionModes.probability,
        crossover: CrossoverModes.clone
      }
    })

    g.findParents()

    const result = g.parents
    const expected = [{ asd: 5 }, { asd: 4 }]

    expect(result).toEqual(expected)
  })
})
