class FuzzyLogic{
    constructor(parameter){
        this.datasets = []
        this.parameter = parameter
        this.initialize(parameter)
    }

    initialize(parameter){
        this.constructDatasetObject(this.getDatasetList(parameter.dataset, parameter.datasetDelimiter), parameter.datasetHeaders)
        // console.log(this.datasets)
    }

    constructDatasetObject(datasets, datasetHeaders){
        //Remove header
        datasets.shift();
        datasets.pop();

        for(let dataset of datasets){
            let object = {}
            for (let index = 0; index < datasetHeaders.length; index++) {
                const header = datasetHeaders[index]
                object[header.identifier] = dataset[index].replace(/(\r\n|\n|\r)/gm,"").trim()

                if(header.type == "number"){
                    object[header.identifier] = Number(object[header.identifier])
                }
            }
            this.datasets.push(object)
        }
    }

    getDatasetList(datasets, delimiter){
        let datasetArr = []
        for(let dataset of datasets.split("\n")) datasetArr.push(dataset.split(delimiter))

        return datasetArr
    }
    
    //#region Fuzzy
    fuzzyfication(){
        for(let dataset of this.datasets){
            dataset["groupingValue"] = {}
            for(let input in dataset){
                this.grouping(input, dataset)
            }
        }

        console.log(this.datasets)
    }

    grouping(input, row){
        for(let grouping of this.parameter.grouping){
            if(grouping.identifier == input){
                row["groupingValue"][input] = this.getRowGroupingValue(grouping.rules, row[input])
            }
        }
    }

    getRowGroupingValue(rules, value){  
        let groupingObj = {}
        for(let rule of rules)  {
            if(value <= rule.values[0] || value >= rule.values[3]){
                groupingObj[rule.name] = (0)
            }else if (rule.values[0] < value && value < rule.values[1]){
                groupingObj[rule.name] = (value - rule.values[0]) / (rule.values[1] - rule.values[0])
            }else if (rule.values[1] <= value && value <= rule.values[2]){
                groupingObj[rule.name] = 1
            }else if(rule.values[2] < value && value<= rule.values[3]){
                groupingObj[rule.name] = (rule.values[3] - value)/(rule.values[3] - rule.values[2])
            }
        }

        return groupingObj
    }

    graphValue(values){
        
    }

    inferenceRule(){
        for(let dataset of this.datasets){
            dataset["inference"] = {}
            for(let inference of this.parameter.inferences){
                dataset.inference[inference.name] = {
                    minValues: [],
                    maxValue: 0
                }
                for(let rule of inference.rules){
                    let minValues = []
                    for(let _rule of rule){
                        minValues.push(dataset.groupingValue[_rule.input][_rule.linguisticValue])
                    }
                    dataset.inference[inference.name].minValues.push(Math.min(...minValues))
                }

                dataset.inference[inference.name].maxValue = Math.max(...dataset.inference[inference.name].minValues)
            }
        }

        console.log(this.datasets)
    }

    defuzzification(){
        for(let dataset of this.datasets){
            let value = 0
            let avgValue = 0
            for(let defuzzificationRule of this.parameter.defuzzificationRules){
                value += defuzzificationRule.weight * dataset.inference[defuzzificationRule.inferenceName].maxValue
                avgValue += dataset.inference[defuzzificationRule.inferenceName].maxValue
            }
            dataset["defuzzification"] = value / avgValue
        }
    }

    getOutput(){
        this.datasets.sort(function (a, b) {
            if (a.defuzzification > b.defuzzification) {
                return -1;
            }
            if (b.defuzzification > a.defuzzification) {
                return 1;
            }
            return 0;
        });
    }

    //#region drawer

}