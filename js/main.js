// currency identificators
let firstCurrency = document.getElementById("currencyOne");
let secondCurrency = document.getElementById("currencyTwo");

// date identificators
let firstDate = document.getElementById("dateOne");
let secondDate = document.getElementById("dateTwo");

// search button
let searchBtn = document.getElementById("search");
let resultOne = document.getElementById("resultOne");
let resultTwo = document.getElementById("resultTwo");

// DISPLAY RATE IN NUMBERS FOR PARTICULAR DATE
function displayRate (e) {
    if (e.target.value == "") {
        return;
    }
    let firstCorrect = firstDate.value.split("-").join("");
    let secondCorrect = secondDate.value.split("-").join("");

    // Request for first currency
    const XHR_One = new XMLHttpRequest();
    let URI_One = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${firstCurrency.value}&date=${firstCorrect}&json`;
    
    XHR_One.addEventListener("readystatechange", function () {
        if ((XHR_One.readyState === 4) && (XHR_One.status === 200)) {
            let res = JSON.parse(XHR_One.responseText);
            resultOne.innerHTML = `1 ${firstCurrency.value} = ${res[0].rate.toFixed(2)} hryvnias`;
        }
    }, false);
    XHR_One.open("GET", URI_One);
    XHR_One.send();

    // Request for second currency 
    const XHR_Two = new XMLHttpRequest();
    let URI_Two = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${secondCurrency.value}&date=${secondCorrect}&json`;
    
    XHR_Two.addEventListener("readystatechange", function () {
        if ((XHR_Two.readyState === 4) && (XHR_Two.status === 200)) {
            let res = JSON.parse(XHR_Two.responseText);
            resultTwo.innerHTML = `1 ${secondCurrency.value} = ${res[0].rate.toFixed(2)} hryvnias`;
        }
    }, false);
    XHR_Two.open("GET", URI_Two);
    XHR_Two.send();
}

// CHART
function displayChart() {
    Highcharts.chart('chart', {

        title: {
            text: `Comparison of ${firstCurrency.value} to ${secondCurrency.value} from ${firstDate.value} to ${secondDate.value}`
        },
    
        yAxis: {
            title: {
                text: 'Currency rate'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2010
            }
        },
    
        series: [{
            name: `${firstCurrency.value}`,
            data: []
        }, {
            name: `${secondCurrency.value}`,
            data: []
        }],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    });
}

searchBtn.addEventListener("click", displayRate, false);
searchBtn.addEventListener("click", displayChart, false);

// chart
let chart = document.getElementById("chart");

// to Top button in footer
const toTopBtn = document.getElementById("toTopBtn");

function toTop () {
    document.body.scrollTop = 0; // safari
    document.documentElement.scrollTop = 0; // chrome, firefox, and others
}

toTopBtn.addEventListener("click", toTop);