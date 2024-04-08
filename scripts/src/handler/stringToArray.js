export function stringToArray(inputString) {
    let categoryArray = inputString.split("],");
    let resultArray = [];

    for (let categoryString of categoryArray) {
        let [categoryName, itemsString] = categoryString.split(":[");
        categoryName = categoryName.trim();
        // itemsString = itemsString.replace("]", "");

        if (itemsString !==  undefined) {
            let items = itemsString.split(";").map(item => {
                let [itemName, sell, buy] = item.split(",").map(val => isNaN(val) ? val.trim() : Number(val));
                return [itemName, sell, buy];
            });
            resultArray.push({ [categoryName]: items });
        }
        
    }

    // console.warn(JSON.stringify(resultArray));
    return resultArray
}

// let exampleCategoryData = resultArray.find(obj => obj.hasOwnProperty('ExampleCategory'));

// if (exampleCategoryData) {
//     let exampleCategoryArray = exampleCategoryData['ExampleCategory'];
//     console.log(exampleCategoryArray);
// } else {
//     console.log("Kategori 'ExampleCategory' tidak ditemukan.");
// }

/*
* inputString = "ExampleCategory:[minecraft:coal,800,1000;minecraft:iron_ingot,1000,1200;minecraft:gold_ingot,1500,2000;minecraft:diamond,2500,5000],AnotherCategory:[minecraft:fish,800,900;minecraft:salmon,900,1000]";
* result: [ 
*    { ExampleCategory: [ [Array] ] },
*    { AnotherCategory: [ [Array] ] } 
* ]
*/