import { CrossoverModes, Instance, ParentsSelectionModes } from '../src/genetic'

describe('checks if objects are copies when needed', () => {
  it('tests if population is a direct reference', () => {
    const pop = [
      { fitness: () => 1, dna: { o: [123, [123]] } },
      { fitness: () => 1, dna: { o: [123, [123]] } }
    ]
    const g = new Instance({
      population: pop,
      mutationFunction: () => 1,
      numberOfParents: 1
    })

    g.findParents()
      .crossover()
      .mutate()

    expect(pop).toBe(g.population)
    for (let i = 0; i < pop.length; i++) {
      expect(pop[i]).toBe(g.population[i])
      expect(pop[i].dna).toBe(g.population[i].dna)
    }
  })

  it("tests if parents' dna is a deep copy after all parent findings", () => {
    const mem = { fitness: () => 1, dna: { o: [123, [123]] } }
    const g = new Instance({
      population: [mem],
      mutationFunction: () => 1,
      numberOfParents: 1
    })

    for (const mode of Object.values(
      ParentsSelectionModes
    ) as ParentsSelectionModes[]) {
      g.modes.parentsSelection = mode
      g.findParents()

      const parent = g.parents[0]
      expect(mem.dna).not.toBe(parent)
      expect(mem.dna.o).not.toBe(parent.o)
      expect(mem.dna.o[1]).not.toBe(parent.o[1])
    }
  })

  it('tests if newDna is a deep copy after all crossovers', () => {
    const mem = { fitness: () => 1, dna: { o: [123, [123]] } }
    const g = new Instance({
      population: [mem],
      mutationFunction: () => 1,
      numberOfParents: 1
    })

    for (const mode of Object.values(CrossoverModes) as CrossoverModes[]) {
      g.modes.crossover = mode
      g.findParents().crossover()

      const newDna = g.newDna[0]
      expect(mem.dna).not.toBe(newDna)
      expect(mem.dna.o).not.toBe(newDna.o)
      expect(mem.dna.o[1]).not.toBe(newDna.o[1])
    }
  })

  it("tests if newDna is different than parents' if preserving them", () => {
    const mem = { fitness: () => 1, dna: { o: [123, [123]] } }
    const g = new Instance({
      population: [mem],
      mutationFunction: () => 0,
      numberOfParents: 1,
      preserveParents: true
    })
      .findParents()
      .crossover()
      .mutate()

    const newDna = g.newDna[0]
    const parent = g.parents[0]
    expect(parent).not.toBe(newDna)
    expect(parent.o).not.toBe(newDna.o)
    expect(parent.o[1]).not.toBe(newDna.o[1])
  })
})
