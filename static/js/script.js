//When the user click on the button, it will generate a random ship.
async function generateRandomShip() {
    //start loading animation + desactivate button
    document.getElementById("generateButton").disabled = true;
    var img = document.createElement('img');
    img.src = "https://media1.tenor.com/images/0d96348a4df45355e98b243f7f447e7f/tenor.gif?itemid=8820437";
    var src = document.getElementById("loading");
    src.appendChild(img);
    var number = await returnValidNumber();
    var url = "https://swapi.dev/api/starships/" + number + "/";
    //Information
    var pilots;
    var movies;
    await $.get(url, function(data, status)
    {
        $("#name").text(data.name);
        $("#model").text(data.model);
        $("#class").text(data.starship_class);
        $("#manufacturer").text(data.manufacturer);
        $("#price").text(data.cost_in_credits);
        $("#length").text(data.length);
        $("#nbCrew").text(data.crew);
        $("#nbPassenger").text(data.passengers);
        $("#maxCapacity").text(data.cargo_capacity);
        //Pilots and Movies
        pilots = data.pilots;
        movies = data.films;
    });
    //check if there is more than 0 pilots
    if(pilots.length > 0) {
        var html = '<tr>';
        html += '<th>Name</th>';
        html += '<th>Gender</th>';
        html += '</tr>';
        document.getElementById("pilots").innerHTML = html;
        pilots.forEach(generatePilots);

    }
    else {
        document.getElementById("pilots").innerHTML = '<p>There is no pilot .3.</p>';
    }
    if(movies.length > 0) {
        var html = '<tr>';
        html += '<th>Title</th>';
        html += '<th>Director</th>';
        html += '<th>Release Date</th>';
        html += '</tr>';

        document.getElementById("movies").innerHTML = html;
        movies.forEach(generateMovies);
    }
    else{
        document.getElementById("movies").innerHTML = '<p>There is no movie .3.</p>';
    }
    //stop loading animation + reactivate button
    src.removeChild(src.firstChild);
    document.getElementById("generateButton").disabled = false;
}
//2 is the smallest number possible, 75 is the highest. So a random on [2,75].
function random() {
    return Math.floor(Math.random() * 75) + 2;
}
//this will loop on random() until it find a valid ship.
async function returnValidNumber(){
    var number = 0;
    while(true){
        number = random();
        let url = 'https://swapi.dev/api/starships/'+ number + '/';
        if (await fetch(url, { method: 'head' }).then(status => status.ok)) break;
    }
    return number;
}

function urlExists(url, callback) {
     fetch(url, { method: 'head' })
        .then(function(status) {

            callback(status.ok)
        });
}
async function generateMovies(item)
{
    var html = '<tr>';

    await $.get(item, function(data, status)
    {
        html += '<td>' + data.title + '</td>'
        html += '<td>' + data.director + '</td>'
        html += '<td>' + data.release_date + '</td>'
    });
    html += '</tr>'
    document.getElementById("movies").innerHTML += html;
}
async function generatePilots(item)
{
    var html = '<tr>';

    await $.get(item, function(data, status)
    {
        html += '<td>' + data.name + '</td>'
        html += '<td>' + data.gender + '</td>'
    });
    html += '</tr>'
    document.getElementById("pilots").innerHTML += html;
}