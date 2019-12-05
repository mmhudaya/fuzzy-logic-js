//Run your javascript here
//This genetics algorithm only work to find something with 2 parameter heuristics functions
console.log("Starting Fuzzy Logic");

//#region fuzzy logic

function uploadDataset(){
    //Dataset conf
    let fuzzyLogicParam = {
        datasetHeaders: [
            {
                name: "id",
                identifier: "id",
                type: "number",
                isId: true,
            },
            {
                name: "Follower Count",
                identifier: "followerCount",
                type: "number",

            },
            {
                name: "Engagement Rate",
                identifier: "engagementRate",
                type: "number"
            }
        ],
        grouping: [
            {
                identifier: "engagementRate",
                rules: [
                    {
                        name: "Sedikit",
                        values: [0, 0, 1, 1.5]
                    },
                    {
                        name: "Menengah",
                        values: [1, 1.5, 3, 3.5]
                    },
                    {
                        name: "Banyak",
                        values: [3, 3.5, 5.5, 6]
                    },
                    {
                        name: "Sangat Banyak",
                        values: [5.5, 6, Infinity, Infinity]
                    },
                ]
            },
            {
                identifier: "followerCount",
                rules: [
                    {
                        name: "Sedikit",
                        values: [0, 0, 4500, 5000]
                    },
                    {
                        name: "Menengah",
                        values: [4500, 5000, 14000, 15000]
                    },
                    {
                        name: "Banyak",
                        values: [14000, 15000, 55000, 60000]
                    },
                    {
                        name: "Sangat Banyak",
                        values: [55000, 60000, Infinity, Infinity]
                    },
                ]
            }
        ],
        inferences: [
            {
                name: "Tidak Layak",
                rules: [
                    //First OR
                    [
                        {
                            input: "engagementRate",
                            linguisticValue: "Sedikit"
                        },
                        {
                            input: "followerCount",
                            linguisticValue: "Sedikit"
                        },
                    ],
                    [
                        {
                            input: "engagementRate",
                            linguisticValue: "Menengah"
                        },
                        {
                            input: "followerCount",
                            linguisticValue: "Sedikit"
                        },
                    ],
                    [
                        {
                            input: "engagementRate",
                            linguisticValue: "Banyak"
                        },
                        {
                            input: "followerCount",
                            linguisticValue: "Sedikit"
                        },
                    ],
                    [
                        {
                            input: "engagementRate",
                            linguisticValue: "Sangat Banyak"
                        },
                        {
                            input: "followerCount",
                            linguisticValue: "Sedikit"
                        },
                    ],
                    [
                        {
                            input: "engagementRate",
                            linguisticValue: "Sedikit"
                        },
                        {
                            input: "followerCount",
                            linguisticValue: "Menengah"
                        },
                    ],
                    [
                        {
                            input: "engagementRate",
                            linguisticValue: "Menengah"
                        },
                        {
                            input: "followerCount",
                            linguisticValue: "Menengah"
                        },
                    ],
                ]
            },
            
            {
                name: "Dipertimbangkan",
                rules: [
                    //First OR
                    [
                        {
                            input: "engagementRate",
                            linguisticValue: "Banyak"
                        },
                        {
                            input: "followerCount",
                            linguisticValue: "Menengah"
                        },
                    ],
                    [
                        {
                            input: "engagementRate",
                            linguisticValue: "Sangat Banyak"
                        },
                        {
                            input: "followerCount",
                            linguisticValue: "Menengah"
                        },
                    ],
                    [
                        {
                            input: "engagementRate",
                            linguisticValue: "Sedikit"
                        },
                        {
                            input: "followerCount",
                            linguisticValue: "Banyak"
                        },
                    ],
                    [
                        {
                            input: "engagementRate",
                            linguisticValue: "Menengah"
                        },
                        {
                            input: "followerCount",
                            linguisticValue: "Banyak"
                        },
                    ],
                    [
                        {
                            input: "engagementRate",
                            linguisticValue: "Sedikit"
                        },
                        {
                            input: "followerCount",
                            linguisticValue: "Sangat Banyak"
                        },
                    ],
                ]
            },
            {
                name: "Layak",
                rules: [
                    //First OR
                    [
                        {
                            input: "engagementRate",
                            linguisticValue: "Banyak"
                        },
                        {
                            input: "followerCount",
                            linguisticValue: "Banyak"
                        },
                    ],
                    [
                        {
                            input: "engagementRate",
                            linguisticValue: "Sangat Banyak"
                        },
                        {
                            input: "followerCount",
                            linguisticValue: "Banyak"
                        },
                    ],
                    [
                        {
                            input: "engagementRate",
                            linguisticValue: "Menengah"
                        },
                        {
                            input: "followerCount",
                            linguisticValue: "Sangat Banyak"
                        },
                    ],
                    [
                        {
                            input: "engagementRate",
                            linguisticValue: "Banyak"
                        },
                        {
                            input: "followerCount",
                            linguisticValue: "Sangat Banyak"
                        },
                    ],
                    [
                        {
                            input: "engagementRate",
                            linguisticValue: "Sangat Banyak"
                        },
                        {
                            input: "followerCount",
                            linguisticValue: "Sangat Banyak"
                        },
                    ]
                ]
            },
        ],
        defuzzificationRules: [
            {
                inferenceName: "Dipertimbangkan",
                weight: 30
            },
            {
                inferenceName: "Tidak Layak",
                weight: 10
            },
            {
                inferenceName: "Layak",
                weight: 60
            },
        ],
        dataset: null,
        datasetDelimiter: ","
    }

    new Utils().readTextFromFile('fileInput', (text) => {
        fuzzyLogicParam.dataset = text
        console.log(fuzzyLogicParam)
        let fuzzyLogic = new FuzzyLogic(fuzzyLogicParam)
        fuzzyLogic.fuzzyfication()
        fuzzyLogic.inferenceRule()
        fuzzyLogic.defuzzification()
        fuzzyLogic.getOutput()

        let result = []
        result.push("id")
        for(let i=0; i<=20; i++){
            result.push(fuzzyLogic.datasets[i].id)
        }

        console.log(result)


        let csvContent =""
        for(let row of result){
            csvContent += row + "," +"\n"
        }
        console.log(csvContent)
        var link = document.createElement('a');
        link.download = 'choosen.csv';
        var blob = new Blob([csvContent], {type: 'application/vnd.ms-excel'});
        link.href = window.URL.createObjectURL(blob);
        link.click();
    })
}