class Gene {

    constructor(mutationRate = .01, inheritanceMode = 'chromosome', numberOfParents = 2) {
        const inhModes = ['chromosome', 'average']
        const mutModes = ['']

        if(inhModes.some(val => val == inheritanceMode))
            this.inheritanceMode = inheritanceMode
        else
            throw new Error(`No such inheritance mode found: ${inheritanceMode}.\nAvailable modes: ${inhModes.join(', ')}`)
    
        
        this.mutation = (mutationRate <= 0 || mutationRate >= 1) ? 
                        (console.warn(`Mutation rate is ${mutationRate*100}%`), mutationRate) : 
                        mutationRate

        this.parents = []
        this.amountOfParents = numberOfParents
    }

    findParents(population) {
        if(population.length < this.amountOfParents)
            throw new Error(`Population has less members than amount of parents chosen.\nPop: ${population.length}, Parents: ${this.amountOfParents}`)

        let xBest = population.slice()
                              .map(x => x.fitness)
                              .sort((a, b) => b - a)
                              [this.amountOfParents-1]

        this.parents = population.filter(ele => ele.fitness >= xBest)
                                 .sort((a, b) => b.fitness - a.fitness)
                                 .slice(0, this.amountOfParents)
                                 .map(ele => ele.genotype)
    }

    createPopulation(amount) {
        let res = []

        if(amount <= 0)
            console.warn('You are creating an empty population.')

        // adjust if a different mode was chosen
        if(this.inheritanceMode == 'average') {
            let temp = {}
            for (let prop in this.parents[0]) {
                if(this.parents[0].hasOwnProperty(prop))
                    temp[prop] = this.parents.map(ele => ele[prop]).reduce((sum, curr) => sum + curr) / this.amountOfParents
            }
            this.parents = temp
        }
        
        // create new generation with parents mutated genes
        switch (this.inheritanceMode) {
            case 'chromosome':
                for (i = 0; i < amount; i++) {
                    let tempObj = {}
                    for (let val in this.parents[0])
                        tempObj[val] = this.parents[floor(random(this.amountOfParents))][val] * random(1 - this.mutation, 1 + this.mutation)
                    res.push(new Ball(50, i, tempObj))
                }
                break
            case 'average':
                for (i = 0; i < amount; i++) {
                    let tempObj = {}
                    for (let val in this.parents)
                        tempObj[val] = this.parents[val] * random(1 - this.mutation, 1 + this.mutation)
                    res.push(new Ball(50, i, tempObj))
                }
                break
            default:
                break
        }
        return res
    }
}
