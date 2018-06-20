var lines = [];
lines.push("The cake is a lie");


function pick_random()
{
    return lines[Math.floor(Math.random()*quotes.length)];
}
