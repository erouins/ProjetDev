const fs = require("fs");

exports.compair = function (){
  
  var nbIds = 0;
  fs.readFile("./tastes.json", "utf8", (err, jsonTastes) => {
    fs.readFile("./taste.json", "utf8", (err, jsonTaste) => {
      fs.readFile("./criteria.json", "utf8", (err, jsonString) => {
        fs.readFile("./criteriaToCompair.json", "utf8", (err, jsonToCompair) => {
          if (err) {
            console.log("File read failed:", err);
            return;
          }
          const criteriasToCompair = JSON.parse(JSON.parse(jsonToCompair)[0]["criteria"]);
          const json = JSON.parse(jsonString);
          var idsToKeep = new Array;
          var listCriterias = [];
          console.log("test 1 :",json);
          console.log("test 2 :",json[0]["criteria"]);
          for(var i = 0; i < json.length ; i++){
            listCriterias = JSON.parse(json[i]["criteria"]);
            const comparison = realcompair(criteriasToCompair, listCriterias);
            if(comparison > 50){
              idsToKeep.push({id : json[i]["id"], placeId: json[i]["placeId"], reviewValue: comparison, finalValue:0});
              console.log("New id : ", idsToKeep[nbIds]["id"]);
              nbIds +=1;
            }
          }
          console.log("Ids kept : ", idsToKeep);
          if(idsToKeep.length != 0){
            console.log("2nd part");
            for(var i = 0; i < idsToKeep.length ; i++){
              JSON.parse(jsonTastes).forEach(taste => {
                if(taste["id"] == idsToKeep[i]["id"]){
                  const comparison = realcompair(JSON.parse(JSON.parse(jsonTaste)[0]["criteria"]),JSON.parse(taste["criteria"]));
                    idsToKeep[i]["finalValue"] = (comparison*2+idsToKeep[i]["reviewValue"])/3;
                }
              });
            }
            var winners = bestOfN(idsToKeep, 2);
            winners.forEach((winner) => {
              console.log("Winner with ", winner["finalValue"], "% and place id ", winner["placeId"]);
            });
          }
        });
      });
    })
  })
}

function bestOfN(idsList, champions){
  var winners = new Array;
  
  while(winners.length < champions){
    var index = 0;
    var max = idsList[0]["finalValue"];
    for(var i = 0; i < idsList.length ; i++){
      if(max < idsList[i]["finalValue"]){
         max = idsList[i]["finalValue"];
         index = i;
        }
    }
    winners.push(idsList[index]);
    idsList.splice(index, 1); 
  }
  return winners;
}

function realcompair(criteria1, criteria2){
  console.log("comparison");
  var result = 0;
  criteria1.forEach(crit1 => {
    if (criteria2.includes(crit1)) result+=1;
  });
  console.log("first criteria : ", criteria1);
  console.log("second criteria : ", criteria2);
  console.log("percent same criterias 1 : ", result/criteria1.length*100);
  console.log("percent same criterias 2 : ", result/criteria2.length*100);
  if(criteria1.length > criteria2.length){
      return result/criteria1.length*100;
    
  }else{
      return result/criteria2.length*100;
  }
}
