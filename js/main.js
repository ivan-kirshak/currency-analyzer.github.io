// currency identificators

let firstCurrency = document.getElementById("currencyOne");
let secondCurrency = document.getElementById("currencyTwo");

// date identificators
let firstDate = document.getElementById("dateOne");
let secondDate = document.getElementById("dateTwo");

// search button
let searchBtn = document.getElementById("search");

// chart
let chart = document.getElementById("chart");

// to Top button in footer
const toTopBtn = document.getElementById("toTopBtn");

function toTop () {
    document.body.scrollTop = 0; // safari
    document.documentElement.scrollTop = 0; // chrome, firefox, and others
}

toTopBtn.addEventListener("click", toTop);