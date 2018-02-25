function countdown(){

  // Time Table
  var week = {
    Mon: {
      10: "MPMC(LSPR, CR6)",
      11: "MATH-IV(RRP,CR6)",
      12: "DBMS(DD, CR6)",
      14: "DBMS Lab (DD, PL1)"
    },
    Tue: {
      9: "OS(MP, CR5)",
      10: "MATH IV(RRP,CR6)",
      11: "POC(PS, CR6)",
      14: "MP Lab(LSPR, PL3)"
    },
    Wed: {
      9: "MPMC(LSPR, CR6)",
      10: "OS(MP, CR5)",
      11: "DBMS(DD, CR5)",
      12: "POC(PS, CR5)"
    },
    Thu: {
      9: "OS(MP, CR5)",
      10: "MATH-IV(RRP, CR6)",
      11: "POC(PS, CR6)"
    },
    Fri: {
      9: "MATH-IV(RRP,CR5)",
      10: "MPMC(LSPR,CR6)",
      11: "DBMS(DD, CR6)"
    },
    Sat: {
      9: "DBMS(DD,CR5)",
      10: "MPMC(LSPR,CR6)",
      11: "OS(MP, CR6)",
      14: "POC(PS,CR1)"
    },
    Sun: {}
  }

  var now = new Date();
  var today = new Date().toString().slice(0, 16);
  var day = new Date().toString().slice(0,3);
  var time = new Date().toString().slice(16,18);

  // Display next day time table if it'd more than 5 PM
  if(time > 17) {
    var day = new Date(now.getTime() + (24 * 60 * 60 * 1000)).toDateString().slice(0,3);
    document.getElementById("today").textContent = "Tomorrow";
  }

  var eventDate = Object.keys(week[day]);

  // iterate to latest time
  for (var i in eventDate) {
    if(parseInt(time) < parseInt(eventDate[i])) {
      time = eventDate[i];
      break;
    }
  }

  // Convert class time strings to actual dates (doesn't work past midnight yet)
  for(var i=0, l=eventDate.length; i<l; i++){
    for (var x in eventDate) {
      // convert 9  to 09
      if(parseInt(eventDate[i])==9) {
        eventDate[i] = "0" + eventDate[i];
      }
    }
    eventDate[i] = new Date(today+" "+eventDate[i]+":00");
  }


  var currentTime = now.getTime();
  var eventTime = 0;
  for(var i=0, l=eventDate.length; i<l; i++){
    eventTime = eventDate[i].getTime();
    if(eventTime>currentTime) {
      var remTime = eventTime - currentTime;
      break;
    }
  }

  var s = Math.floor(remTime/1000);
  var m = Math.floor(s/60);
  var h = Math.floor(m/60);
  var d = Math.floor(h/24);

  h %= 24;
  m %= 60;
  s %= 60;

  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;


  if(week[day][time] != undefined) {
    document.getElementById("hours").textContent = h + " h";
    document.getElementById("minutes").textContent = m + " m";
    document.getElementById("seconds").textContent = s + " s";
    document.getElementById("nextClass").textContent = week[day][time];
  }


  classId = ["nine", "ten", "eleven", "twelve", "two"];
  var key = 9;
  for (var x in classId) {
    if(week[day][key] != undefined) {
      document.getElementById(classId[x]).textContent = week[day][String(key)];
    } else {
      document.getElementById(classId[x]).textContent = "No Class, Yay!"
    }
    if(key !=12) {
      key += 1;
    } else {
      key +=2;
    }
  }

  // Display today classes
//        document.getElementById("nine").textContent = week[day]["9"];
//        document.getElementById("ten").textContent = week[day]["10"];
//        document.getElementById("eleven").textContent = week[day]["11"];
//        document.getElementById("twelve").textContent = week[day]["12"];
//        document.getElementById("two").textContent = week[day]["14"];

  setTimeout(countdown, 1000);
}

countdown();
