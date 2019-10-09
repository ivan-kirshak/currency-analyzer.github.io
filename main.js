// UPPER PART OF PAGE (RATE GRAPH)

// currency identificator
let currency = document.getElementById("currency");

// date identificators
let firstDate = document.getElementById("dateOne");
let secondDate = document.getElementById("dateTwo");

// search button
let searchBtn = document.getElementById("analyze");

let dataArray = [];

// DISPLAY RATE IN NUMBERS FOR PARTICULAR DATE
function displayRate (e) {
    if (e.target.value == "") {
        return;
    }

    let firstCorrect = firstDate.value.split("-").join("");
    let secondCorrect = secondDate.value.split("-").join("");

    for (let i = Number(firstCorrect); i <= Number(secondCorrect); i++) {
        let XHR = new XMLHttpRequest();
        let URI = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${currency.value}&date=${i}&json`;
        XHR.addEventListener("readystatechange", function() {
            if ((XHR.readyState === 4) && (XHR.status === 200)) {
                let res = JSON.parse(XHR.responseText);
                let resObj = {rate: res[0].rate, date: res[0].exchangedate};
                dataArray.push(resObj);
                console.log(dataArray);
            }
        }, false);
        XHR.open("GET", URI);
        XHR.send(); 
    }
}

let chartOptions = {     
    title: {
        text: `Currency rate of ${currency.value} from ${firstDate.value} to ${secondDate.value}`
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
            pointStart: `${firstDate.value}`
        }
    },

    series: [{
        name: `${currency.value}`,
        data: `${dataArray}`
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
}

searchBtn.addEventListener("click", displayRate, false);
Highcharts.chart("chart", chartOptions)

// chart
let chart = document.getElementById("chart");

// END OF UPPER PART (CURRENCY GRAPH)

//  LOWER PART (CURRENCY CONVERTER)
let currencyConv = document.getElementById("currencyConv");
let dateConv = document.getElementById("dateConv");
let converter = document.getElementById("convert");
let quantity = document.getElementById("quantity");
let resultOne = document.getElementById("resultConv")

function convertMoney() {
    let correctDate = dateConv.value.split("-").join("");
    let correctQuantity = Number(quantity.value);

    const XHR_Conv = new XMLHttpRequest();
    let URI_Conv = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${currencyConv.value}&date=${correctDate}&json`;
    
    XHR_Conv.addEventListener("readystatechange", function () {
        if ((XHR_Conv.readyState === 4) && (XHR_Conv.status === 200)) {
            let res = JSON.parse(XHR_Conv.responseText);
            resultConv.innerHTML = `${correctQuantity} ${currencyConv.value} = ${correctQuantity * res[0].rate.toFixed(2)} hryvnias (${dateConv.value})`;
        }
    }, false);
    XHR_Conv.open("GET", URI_Conv);
    XHR_Conv.send();
}

converter.addEventListener("click", convertMoney, false)
//  END OF LOWER PART (CURRENCY CONVERTER)

// to Top button in footer
const toTopBtn = document.getElementById("toTopBtn");

function toTop () {
    document.body.scrollTop = 0; // safari
    document.documentElement.scrollTop = 0; // chrome, firefox, and others
}

toTopBtn.addEventListener("click", toTop);