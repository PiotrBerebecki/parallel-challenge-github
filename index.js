var accessToken = 'aa948f9d807764d3839cf30e0b327db1956b984f';

var baseUrl = 'https://api.github.com/users/PiotrBerebecki/orgs?access_token='


var githubHandles = [
  "Akin909",
  "alexis-l8",
  "antoniotrkdz",
  // "bo-bok",
  // "ConchobarMacNessa",
  // "finnhodgkin",
  // "joeylouise",
  // "lucyrose93",
  // "majakudlicka",
  // "oliverjam",
  // "pbywater",
  // "PiotrBerebecki",
  // "Samatar26",
  // "smarthutza",
  // "yvonne-liu",
  // "ZooeyMiller"
];

// TO DO: put your github access token here
var access_token = "";

function createTableRow (user) {
  var tr = document.createElement("tr");
  var values = Object.keys(user);
  var cols = values.map(function(v){
    var td = document.createElement("td");
    td.innerHTML = user[v];
    return td;
  });
  cols.forEach(function(c) {
    tr.appendChild(c);
  });
  return tr;
}

// generic request function takes a url and a callback
function request(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, xhr.responseText);
    } else {
      console.log("waiting for response");
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

// callback: returns an object containing username, full name and number of people following
function getUser(username, cb) {
  var url = "https://api.github.com/users/" + username //+ "?access_token=" + access_token;
  request(url, function(error, data) {
    if (error) {
      console.log(error);
    } else {
      var userObject = JSON.parse(data);
      return cb({
        username: username,
        name: userObject.name,
        following: userObject.following,
      });
    }
  });
}

// TO DO: write a function "getAllUsers" which returns details of all your users
// this function should only return something when all the data has been retrieved from the API!

function getAllUsers(arr, cb) {
  var users = [];

  arr.forEach(function(element, index) {
    getUser(element, function(userObj) {
      users.push(userObj);

      if (index === arr.length - 1) {
        cb(users);
      }
    });
  });
}


// TO DO: bonus - make sure the users are sorted in order of the number people they're following
// adapt the final callback below to include this new function!
function sortUsers(arr) {
  // return sorted array!
}

// called when all the data has been retrieved
function finalCallback(arr) {
  var rows = arr.map(createTableRow);
  rows.forEach(function(r) {
    document.querySelector("table").appendChild(r);
  })
}

getAllUsers(githubHandles, finalCallback);
