window.onload=function(){
  var key=0;
  const AllofDateSelector = document.querySelectorAll(".DateSelector");
  AllofDateSelector.forEach(elements => {
    const DataType   = (elements.getAttribute("class").split(" ")[1]).split("-");
    const Gap = 30;
    const Chronicle = DataType[0];
    const SelectType = DataType[1];

    init(SelectType,key,elements,Gap);
    key++;
  });
}

function init(type,key,elements,Gap){
  const today   = new Date();
  const nextday = new Date();
  nextday.setDate(today.getDate()+ Gap);
  createDateSelector(key,elements);
  (type=="single")  && (setInitValue(key,today,0));
  (type=="start")   && (setInitValue(key,today,1));
  (type=="end")     && (setInitValue(key,nextday,2));
  //document.getElementById("M"+key).setAttribute("disabled", "disabled");
  //document.getElementById("D"+key).setAttribute("disabled", "disabled");
}

function leapYear(year) {
  return ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) ? true : false;
}

function createDateSelector(ID,place){
  createSelect("Y"+ID,place);
  createSelect("M"+ID,place);
  createSelect("D"+ID,place);
}
function setInitValue(key,day,type){
  const y =document.getElementById("Y"+key);
  const m =document.getElementById("M"+key);
  const d =document.getElementById("D"+key);

  //create select Years,Months,Dates
  createOptions(y,day.getFullYear()-30,day.getFullYear()+30);
  createOptions(m,1,12);
  generateDateByLeap(day.getFullYear(),day.getMonth()+1,d);

  //initialize the selected value by day
  y.value=day.getFullYear();
  m.value=day.getMonth()+1;
  d.value=day.getDate();

  //change value of date selector when you selecte a year or month
  var selectedYear,selectedMonth,selectedDate;

  y.onchange=function(){
    selectedYear = (day.getFullYear()-30)+y.selectedIndex;
    console.log({status,targetDate}=check(key,(type-1)));
    selectedYear = y.value;
    generateDateByLeap(selectedYear,selectedMonth,d);
  };
  m.onchange=function(){
    selectedMonth = m.selectedIndex+1;
    console.log(check(key,(type-1)));
    
    selectedMonth = m.value;
    generateDateByLeap(selectedYear,selectedMonth,d);
  };
  d.onchange=function(){
    selectedYear = (day.getFullYear()-30)+y.selectedIndex;
    selectedMonth = m.selectedIndex+1;
    selectedDate = d.selectedIndex;
    console.log(selectedDate);
const result = check(key, (type - 1));
    if (!result.status) {

        const t = result.targetDate;

        document.getElementById("Y" + key).value = t.getFullYear();
        document.getElementById("M" + key).value = t.getMonth();
        document.getElementById("D" + key).value = t.getDate()+1;
	console.log(t.getDate())
    }
    if(type==1){
      //(key)
      nextYear=document.getElementById("Y"+(key+1));
      nextMonth=document.getElementById("M"+(key+1));
      nextDate=document.getElementById("D"+(key+1));
      if((selectedYear==nextYear.value)&&(selectedMonth==nextMonth.value)){
        (selectedDate>nextDate.value)? (d.value=parseInt(nextDate.value)-1):(d.value=d.value);
      }
    }if(type==2){
      lastYear=document.getElementById("Y"+(key-1));
      lastMonth=document.getElementById("M"+(key-1));
      lastDate=document.getElementById("D"+(key-1));
      if((selectedYear==lastYear.value)&&(selectedMonth==lastMonth.value)){
        (selectedDate<lastDate.value)? (d.value=parseInt(lastDate.value)+1):(d.value=d.value);
      }
    }

  };
}
function generateDateByLeap(YYYY,MM,DDplace){
  const origin = DDplace.value
  clearOptions(DDplace);
  if (MM == 2){
    leapYear(YYYY)? createOptions(DDplace,1,29) : createOptions(DDplace,1,28);

  }else if (((MM <= 7) && (MM %2 != 0)) || ((MM >= 8)&&(MM %2 == 0))){
    createOptions(DDplace,1,31);

  }else{
    createOptions(DDplace,1,30);
  }
  DDplace.value=origin;
}

function createOptions(obj,start,end){
  for(i=start;i<=end;i++){
    obj.add(new Option(i,i));
  }
}

function createSelect(SelectID,elements){
  const name = document.createElement("select");
  name.id=SelectID;
  elements.appendChild(name);
}

function clearOptions(Dateselection){
  Dateselection.options.length=0;
}
function check(key,status){
    const startKey=key-status;
    const endKey=startKey+1;

    const Dates=["Y","M","D"];
    const startDateID= Dates.map(x=> document.getElementById(x+startKey));
    const endDateID= Dates.map(x=> document.getElementById(x+endKey));


    const StartYear =document.getElementById("Y"+startKey);
    const StartMonth =document.getElementById("M"+startKey);
    const StartDate =document.getElementById("D"+startKey);
    const EndYear =document.getElementById("Y"+endKey);
    const EndMonth =document.getElementById("M"+endKey);
    const EndDate =document.getElementById("D"+endKey);
    ///console.table(StartYear.value,StartMonth.value,StartDate.value,EndYear.value,EndMonth.value, EndDate.value)

    const Start = new Date(StartYear.value.padStart(4, "0")+"-"+StartMonth.value.padStart(2, "0")+"-"+StartDate.value.padStart(2, "0"));
    const yesterday= new Date();
    const End = new Date(EndYear.value.padStart(4, '0')+"-"+EndMonth.value.padStart(2, '0')+"-"+EndDate.value.padStart(2, '0'));
    const tomorrow = new Date();
    console.log(Start,End);

    yesterday.setDate(End.getDate()-1);
    tomorrow.setDate(Start.getDate()+1);
    console.log(yesterday,tomorrow);
    //return Start>=End ? false:true;
    return {
        status: Start>=End ? false:true,
        targetDate: status>0? yesterday:tomorrow,
    };
}
