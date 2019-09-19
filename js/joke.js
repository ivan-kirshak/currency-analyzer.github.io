var closeTab = document.getElementById("close");
var yesButton = document.getElementById("yes");
var noButton = document.getElementById("no");

closeTab.addEventListener("click", function(){alert("You have to answer the question!")});

function runAway() {
    noButton.style.position = "absolute";
    noButton.style.top = Math.random() * 200 + 'px';
    noButton.style.left = Math.random() * 500 + 'px';
    noButton.style.transition = "all 0.1s"
}

noButton.addEventListener("mouseover", runAway);

function answer () {
    var change = document.getElementById("change");
    change.innerHTML ="We knew you would answer properly!";
}

yesButton.addEventListener("click", answer);