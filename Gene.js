class Gene {

	constructor(mutationRate = .01, inheritanceMode = 'chromosome', amountOfParents = 2) {
		const inhModes = ['chromosome', 'average']
		const mutModes = ['']

		try {
			if(Number.isNaN(amountOfParents = Number.parseInt(amountOfParents)))
				throw new TypeError(`amountOfParents argument is not a number`)
			else if(amountOfParents <= 0) 
				throw 'Cannot use less than 1 parent.'
			else
				this.amountOfParents = amountOfParents

			if(!inhModes.some(val => val == inheritanceMode))
				throw `No such inheritance mode found: ${inheritanceMode}.\nAvailable modes: ${inhModes.join(', ')}`
			else
				this.inheritanceMode = inheritanceMode
			
			if(Number.isNaN(mutationRate = Number.parseFloat(mutationRate)))
				throw new TypeError(`mutationRate argument is not a number`)
			else if(mutationRate <= 0 || mutationRate >= 1)
				console.warn(`Mutation rate is ${mutationRate*100}%`)
			this.mutationRate = mutationRate

			this.parents = []
		} catch(e) {
			if(e instanceof TypeError)
				console.error(e)
			else
				throw new Error(e)
		}
	}

	findParents(population) {
		try {
			if(!Array.isArray(population))
				throw new TypeError(`Passed parameter is not an array`)
			
			if(population.length < this.amountOfParents)
				throw new RangeError(`Population has less members than amount of parents chosen.\nPop: ${population.length}, Parents: ${this.amountOfParents}`)

			if(!population[0].hasOwnProperty('dna'))
				throw new ReferenceError(`Population does not contain the 'dna' property.`)
			
			if(!population[0].hasOwnProperty('fitness'))
				throw new ReferenceError(`Population does not contain the 'fitness' property.`)
				
		} catch(e) {
			if(e instanceof TypeError)
				console.error(e)
			else if(e instanceof RangeError)
				console.error(e)
			else if(e instanceof ReferenceError)
				console.error(e)
			else
				throw new Error(e)
		}
		
		let xBest = population.map(x => x.fitness)
							  .sort((a, b) => b - a)
							  [this.amountOfParents-1]

		this.parents = population.filter(ele => ele.fitness >= xBest)
								 .sort((a, b) => b.fitness - a.fitness)
								 .slice(0, this.amountOfParents)
								 .map(ele => ele.dna)
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
						tempObj[val] = this.parents[floor(random(this.amountOfParents))][val] * random(1 - this.mutationRate, 1 + this.mutationRate)
					res.push(new Ball(50, i, tempObj))
				}
				break
			case 'average':
				for (i = 0; i < amount; i++) {
					let tempObj = {}
					for (let val in this.parents)
						tempObj[val] = this.parents[val] * random(1 - this.mutationRate, 1 + this.mutationRate)
					res.push(new Ball(50, i, tempObj))
				}
				break
			default:
				break
		}
		return res
	}
}
