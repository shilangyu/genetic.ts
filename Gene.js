class Gene {

	constructor(mutationRate = .01, amountOfParents = 2, inheritanceMode = 'chromosome', matingMode = 'probability') {
		const inhModes = ['chromosome', 'average']
		const mutModes = ['']
		const mateModes = ['best', 'probability'] 

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

			if(!mateModes.some(val => val == matingMode))
				throw `No such mating mode found: ${matingMode}.\nAvailable modes: ${mateModes.join(', ')}`
			else
				this.matingMode = matingMode
			
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
		

		switch(this.matingMode) {
			case 'best':
				let xBest = population	.map(x => x.fitness)
										.sort((a, b) => b - a)
										[this.amountOfParents-1]
				this.parents = population	.filter(ele => ele.fitness >= xBest)
											.sort((a, b) => b.fitness - a.fitness)
											.slice(0, this.amountOfParents)
											.map(ele => ele.dna)
				break
			case 'probability':
				this.parents = []
				
				let left = this.amountOfParents
				while(left-- > 0) {
					let choose = Math.random() * population.reduce( (total, curr) => total+curr.fitness, 0)
				
					for (let i = 0; i < population.length; i++) {
						choose -= population[i].fitness
						if(choose <= 0 ) {
							this.parents.push(population[i].dna)
							break
						}
					}
				}
				break
			default:
				break
		}
		
	}

	createPopulation(amount) {
		let res = []

		console.log(this.parents)
	   
		if(amount <= 0)
			console.warn('You are creating an empty population.')

		// create new generation with parents mutated genes
		switch (this.inheritanceMode) {
			case 'chromosome':
				for (let i = 0; i < amount; i++) {
					let tempObj = {}
					for (let val in this.parents[0])
						tempObj[val] = this.parents[Math.floor(Math.random() * this.amountOfParents)][val] * (1 - this.mutationRate + (Math.random() / (0.5 / this.mutationRate)))
					res.push(new Ball(50, i, tempObj))
				}
				break
			case 'average':
				let temp = {}
				for (let prop in this.parents[0]) {
					if(this.parents[0].hasOwnProperty(prop))
						temp[prop] = this.parents.map(ele => ele[prop]).reduce((sum, curr) => sum + curr) / this.amountOfParents
				}
				this.parents = temp

				for (let i = 0; i < amount; i++) {
					let tempObj = {}
					for (let val in this.parents)
						tempObj[val] = this.parents[val] * (1 - this.mutationRate + (Math.random() / (0.5 / this.mutationRate)))
					res.push(new Ball(50, i, tempObj))
				}
				break
			default:
				break
		}
		return res
	}
}
