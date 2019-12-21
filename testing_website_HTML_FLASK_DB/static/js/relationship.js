//hard code values for filters to test
var ageValue = localStorage.getItem("ageValue");
console.log(ageValue);
var metValue = localStorage.getItem("metValue");
console.log(metValue);
var kidsValue = localStorage.getItem("kidsValue");
console.log(kidsValue);
var edValue = localStorage.getItem("edValue");
console.log(edValue);
var raceValue = localStorage.getItem("raceValue");
console.log(raceValue);
var sexValue = localStorage.getItem("sexValue");
console.log("sexValue");

  //define function to filter based on how met response
function selectMet(features) {
    return features.how_met === metValue;
  }

//define function to filter based on race response
function selectRace(features){
    return features.race_gap === raceValue;
}
//define function to filter based on sexual orientation
function selectSexuality(features){
    return features.same_sex_couple === sexValue;
}

//code to get data from database
d3.json("http://127.0.0.1:5000/data").then(function(data){
    //filter data based on criteria above
        //var filterMet = selectMet(data);
   //filter data on age
    var ageResult = data.filter(function(a){
     return a.age_difference_bin == ageValue;
    });
    console.log(ageResult);
    //filter data on education gap
    var edResult = ageResult.filter(function(b){
        return b.edu_gap_bin == edValue;
    });
    console.log(edResult);
    //filter data on number of kids
    var kidsResult = edResult.filter(function(c){
        return c.children_in_hh == kidsValue;
    });
    console.log(kidsResult);
    //filter data on same sex couple
    var sexResult = kidsResult.filter(function(d){
        return d.same_sex_couple == sexValue;
    });
    console.log(sexResult);
    //filter data on how met
    //var metResult = sexResult.filter(function(e){
    //    return e.how_met_unique == metValue;
    //});
    //console.log(metResult);

    //get unique values to build x axis
    var distinct = []

    function getUniqueValues(array, key){
        return array.reduce(function(carry, item){
            if(item[key] && !~carry.indexOf(item[key])) carry.push(item[key]);
            return carry;
        }, []);
    }

    distinct = getUniqueValues(sexResult, "relationship_len");
    

    console.log(distinct);
    console.log(distinct.length);
    //get counts for y axis
    // empty counters declared
    var counts = []
    var num = 0
    
    //iterate through distinct values
    for (var y = 0; y < distinct.length; y++){
        //compare distinct value to each value in the filtered array of objects
        for (var z = 0; z<sexResult.length; z++){
            if (distinct[y] === sexResult[z].relationship_len){
                num = num + 1;
            }
        }
        //add final count to array
        counts.push(num);
        //reset value counter
        num = 0;
    }
    console.log(counts);
    
    //calculating metrics for summary statement/table
    let relationLength = sexResult.map(({relationship_len})=> relationship_len);
    console.log(relationLength);
    
    var total = 0;
    for (var i = 0; i < relationLength.length; i++) {
        total +=relationLength[i];
    }
    var avg = total/relationLength.length;
    console.log(avg);

    function Median(data) {
        return Quartile_50(data);
      }
      
      function Quartile_25(data) {
        return Quartile(data, 0.25);
      }
      
      function Quartile_50(data) {
        return Quartile(data, 0.5);
      }
      
      function Quartile_75(data) {
        return Quartile(data, 0.75);
      }
      
      function Quartile(data, q) {
        data=Array_Sort_Numbers(data);
        var pos = ((data.length) - 1) * q;
        var base = Math.floor(pos);
        var rest = pos - base;
        if( (data[base+1]!==undefined) ) {
          return data[base] + rest * (data[base+1] - data[base]);
        } else {
          return data[base];
        }
      }
      
      function Array_Sort_Numbers(inputarray){
        return inputarray.sort(function(a, b) {
          return a - b;
        });
      }
      var Quart_25;
       Quart_25 = Quartile_25(relationLength);
      var Quart_50;
      Quart_50 = Quartile_50(relationLength); 
      var Quart_75;
      Quart_75 = Quartile_75(relationLength);
      console.log(Quartile_25(relationLength));
      console.log(Quartile_50(relationLength));
      console.log(Quartile_75(relationLength));

    //code to plot
    var plotting = [
        {
            //x = relationship length
            x:distinct,
            //y = count of each in relationship length
            y:counts,
            type: "bar"
        }
    ];
    var banana = document.getElementById("resultDiv");
 
    Plotly.newPlot(banana, plotting);

    document.getElementById("statement").innerHTML = "<h1> The average relationship length based on your inputs is" + avg  +"</h1>"
    document.getElementById("statement2").innerHTML = "<h2> The first quartile is between 0 and " + Quart_25 + "with the second quartile between " + Quart _25 " and " Quart_50 ".  The third quartile is between " + Quart_50 " and " + Quart_75 " with the 4th quartile over " Quart_75 "."</h2>
    
});
d3.json("http://127.0.0.1:5000/percentDict").then(function(data){
    var aging = data.age_gap_bin_dict;
    console.log(data);
    var children = data.children_in_hh_percent;
    console.log(children);
    var ed = data.edu_gap_bin_percent;
    console.log(ed)
    var meeting = data.how_met_unique_percent;
    console.log(meeting);
    var couple = data.same_sex_percent;
    console.log(couple);

    var ageage = aging[ageValue];
    console.log(ageage);
    var kidskids = children[kidsValue];
    console.log(kidskids);
    var metmet = meeting[metValue];
    console.log(metmet);
    var ss = couple[sexValue];
    console.log(ss);
    var eded = ed[edValue];
    console.log(eded);

    results = [{ageValue: ageage}, {kidsValue: kidskids}, {metValue: metmet}, {sexValue: ss}, {edValue: eded} ]
    results.forEach((entry) => {
        var row = tbody.append("tr");
        Object.entries(entry).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
});