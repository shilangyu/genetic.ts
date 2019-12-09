import { Instance, ParentsSelectionModes } from '../src/genetic'

describe('checks history', () => {
  it('tests parent saving', () => {
    const pop = [
      { fitness: () => 1, dna: { o: [123, [123]] } },
      { fitness: () => 2, dna: { o: [3, [1]] } }
    ]
    const ga = new Instance({
      population: pop,
      mutationFunction: () => 1,
      numberOfParents: 1,
      keepHistory: true
    })

    ga.findParents()

    expect(ga.history).toEqual([[{ fitness: 2, dna: { o: [3, [1]] } }]])
  })

  it('tests should add second record', () => {
    const pop = [
      { fitness: () => 0, dna: { o: [123, [123]] } },
      { fitness: () => 2, dna: { o: [3, [1]] } }
    ]
    const ga = new Instance({
      population: pop,
      mutationFunction: () => 1,
      numberOfParents: 1,
      keepHistory: true,
      modes: {
        parentsSelection: ParentsSelectionModes.probability
      }
    })

    ga.nextGeneration().findParents()

    expect(ga.history).toEqual([
      [{ fitness: 2, dna: { o: [3, [1]] } }],
      [{ fitness: 2, dna: { o: [4, [2]] } }]
    ])
  })
})
