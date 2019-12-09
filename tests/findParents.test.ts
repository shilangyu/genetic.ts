import { CrossoverModes, Instance, ParentsSelectionModes } from '../src/genetic'

describe('`findParents` method of an Genetic instance', () => {
  it('tests the best parents selection', () => {
    const mockPopulation = [
      { fitness: () => 100, dna: { asd: 1 } },
      { fitness: () => 200, dna: { asd: 2 } },
      { fitness: () => 300, dna: { asd: 3 } },
      { fitness: () => 400, dna: { asd: 4 } },
      { fitness: () => 500, dna: { asd: 5 } }
    ]

    const ga = new Instance({
      population: mockPopulation,
      mutationFunction: () => 1,
      modes: { crossover: CrossoverModes.clone }
    })

    ga.findParents()

    const result = ga.parents
    const expected = [{ asd: 4 }, { asd: 5 }]

    expect(result).toContainEqual(expected[0])
    expect(result).toContainEqual(expected[1])
    expect(result.length).toBe(expected.length)
  })

  it('tests the probability parents selection', () => {
    const mockPopulation = [
      { fitness: () => 0, dna: { asd: 4 } },
      { fitness: () => 500, dna: { asd: 5 } }
    ]

    const ga = new Instance({
      population: mockPopulation,
      mutationFunction: () => 1,
      numberOfParents: 1,
      modes: {
        parentsSelection: ParentsSelectionModes.probability,
        crossover: CrossoverModes.clone
      }
    })

    ga.findParents()

    const result = ga.parents
    const expected = [{ asd: 5 }]

    expect(result).toEqual(expected)
  })

  it('tests the probability2 parents selection', () => {
    const mockPopulation = [
      { fitness: () => 0, dna: { asd: 4 } },
      { fitness: () => -500, dna: { asd: 5 } }
    ]

    const ga = new Instance({
      population: mockPopulation,
      mutationFunction: () => 1,
      numberOfParents: 1,
      modes: {
        parentsSelection: ParentsSelectionModes.probability2,
        crossover: CrossoverModes.clone
      }
    })

    ga.findParents()

    const result = ga.parents
    const expected = [{ asd: 5 }]

    expect(result).toEqual(expected)
  })

  it('tests the probability3 parents selection', () => {
    const mockPopulation = [
      { fitness: () => -200, dna: { asd: 4 } },
      { fitness: () => 500, dna: { asd: 5 } }
    ]

    const ga = new Instance({
      population: mockPopulation,
      mutationFunction: () => 1,
      numberOfParents: 1,
      modes: {
        parentsSelection: ParentsSelectionModes.probability3,
        crossover: CrossoverModes.clone
      }
    })

    ga.findParents()

    const result = ga.parents
    const expected = [{ asd: 5 }]

    expect(result).toEqual(expected)
  })

  it('tests unsupported parent selection mode', () => {
    const mockPopulation = [
      { fitness: () => 0, dna: { asd: 4 } },
      { fitness: () => 500, dna: { asd: 5 } }
    ]

    const ga = new Instance({
      population: mockPopulation,
      mutationFunction: () => 1,
      modes: {
        parentsSelection: -1 as any,
        crossover: CrossoverModes.clone
      }
    })

    expect(() => ga.findParents()).toThrowError(
      'Current parent selection mode is not supported.'
    )
  })
})
