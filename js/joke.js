// identifying the buttons

var closeTab = document.getElementById("close");
var yesButton = document.getElementById("yes");
var noButton = document.getElementById("no");

// on click the X button produces and alert
closeTab.addEventListener("click", function(){alert("You have to answer the question!")});

// when mouse is over the "No!" button, it runs away
function runAway() {
    noButton.style.position = "absolute";
    noButton.style.top = Math.random() * 200 + 'px';
    noButton.style.left = Math.random() * 500 + 'px';
    noButton.style.transition = "all 0.1s"
}

noButton.addEventListener("mouseover", runAway);

// reaction on clicking "Yes!" button
function answer () {
    var change = document.getElementById("change");
    change.innerHTML ="We knew you would answer properly!";
}

yesButton.addEventListener("click", answer);