// declare the variables
let currency = document.getElementById("currency");
let firstDate = document.getElementById("dateOne");
let secondDate = document.getElementById("dateTwo");
let analyzeBtn = document.getElementById("analyze");
let chartError = document.getElementById("chartError");
/*
let quantity = document.getElementById("quantity");
let quantityTwo = document.getElementById("quantityTwo");
let firstCurrency = document.getElementById("currencyConvOne");
let secondCurrency = document.getElementById("currencyConvTwo");
let convertBtn = document.getElementById("convert");
let printResult = document.getElementById("resultConv");
*/
analyzeBtn.addEventListener("click", analyze, false);

const XHR = new XMLHttpRequest();

const currenciesObj = {
    USD: "",
    EUR: "",
    GBP: "",
    AUD: "",
    NZD: "",
    CAD: "",
    NOK: "",
    SEK: "",
    DKK: "",
    ZAR: "",
    CNY: "",
    JPY: "",
    KRW: ""
};
/*
function converter(e) {
    let valueOne = quantity.value;
    let valueTwo = quantityTwo;
    let currOne = firstCurrency.value;
    let currTwo = secondCurrency.value;
    if (currOne == "UAH") {
        valueTwo.value = (valueOne / currenciesObj[currTwo]).toFixed(2);
    } else if (currTwo == "UAH") {
        valueTwo.value = (valueOne * currenciesObj[currOne]).toFixed(2);
    }
}

convertBtn.addEventListener("click", converter, false);
*/

async function analyze(e) {
    let startDate = firstDate.value;
    let endDate = secondDate.value;

    chartOptions.series[0].name = currency.value;
    chartOptions.xAxis.categories = [];
    chartOptions.series[0].data = [];

    startDate = Date.parse(startDate);
    endDate = Date.parse(endDate);

    if (firstDate.value === "" || secondDate.value === "") {
        chartError.innerHTML = `<h3 class="error">Please, select the dates of analysis.</h3>`;
    } else {
        for (let i = startDate; i <= endDate; i = i + 24 * 60 * 60 * 1000) {
            let URI = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${
                currency.value
                }&date=${new Date(i)
                    .toISOString()
                    .substr(0, 10)
                    .split("-")
                    .join("")}&json`;
            let response = await fetch(URI);
            let data = await response.json();
            let itemObj = {
                rate: data[0].rate,
                exchangedate: data[0].exchangedate
            };
            chartOptions.series[0].data.push(Number(itemObj.rate.toFixed(2)));
            chartOptions.xAxis.categories.push(new Date(i).toGMTString().substr(5, 6));
            chartOptions.title.text = `Currency rate of ${currency.value} from ${firstDate.value} to ${secondDate.value}`;
            chartOptions.subtitle.text = `Data provided via <a href="https://www.bank.gov.ua/" >National Bank Of Ukraine</a>`;
        }
        Highcharts.chart("chart", chartOptions);
        chartError.innerHTML = "";
    }

}

/*
async function conversionProcess (e) {
    let conversionUri = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`;
    let response = await fetch(conversionUri);
    let data = await response.json();

    for (let key in data) {
        if (currenciesObj.hasOwnProperty(data[key].cc)) {
            currenciesObj[data[key].cc] = data[key].rate.toFixed(2);
        }
    }

    printResult.innerHTML = `${quantity.value} ${firstCurrency.value} = ${quantityTwo.value} ${secondCurrency.value}`;
}

function onLoad() {
    conversionProcess();
    }
    
window.onload = onLoad;
*/

let quantityConv = document.getElementById("quantity");
let currencyConv = document.getElementById("currencyConvTwo");
let dateConv = document.getElementById("convDate");
let btnConv = document.getElementById("convert");
let resConv = document.getElementById("resultConv");

function makeConversion() {
    let correctedDate = dateConv.value.split("-").join("");
    let correctedQuantity = Number(quantityConv.value);
    let date = new Date(dateConv.value).toDateString();
    if (dateConv.value === "") {
        resConv.innerText = "Please print the date of currency conversion";
        resConv.style.color = "rgb(255, 0, 0)";
    } else {
        const XHR_Conv = new XMLHttpRequest()
        let URI_Conv = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${
            currencyConv.value}&date=${correctedDate}&json`;
        XHR_Conv.addEventListener("readystatechange", function () {
            if ((XHR_Conv.readyState === 4) && (XHR_Conv.status === 200)) {
                let result = JSON.parse(XHR_Conv.responseText);
                resConv.innerHTML = `${correctedQuantity} ${currencyConv.value} = 
                ${correctedQuantity * result[0].rate.toFixed(2)} hryvnias. (${date})`;
                resConv.style.color = "rgb(0, 0, 0)";
            }
        }, false);
        XHR_Conv.open("GET", URI_Conv);
        XHR_Conv.send();
    }
}

btnConv.addEventListener("click", makeConversion, false);

let chartOptions = {
    title: {
        text: ""
    },

    subtitle: {
        text: ""
    },
    xAxis: {
        categories: []
    },
    yAxis: {
        title: {
            text: "Currency rate"
        }
    },
    legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle"
    },

    /*
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 0
      }
    },
    */

    series: [
        {
            name: "",
            data: []
        }
    ],

    responsive: {
        rules: [
            {
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: "horizontal",
                        align: "center",
                        verticalAlign: "bottom"
                    }
                }
            }
        ]
    }
};

Highcharts.chart("chart", chartOptions);

// To Top Btn
let toTopBtn = document.getElementById("toTopBtn");
function toTop() {
    let top = document.querySelector(".intro-upper");
    top.scrollIntoView({
        behavior: "smooth"
    });
}
toTopBtn.addEventListener("click", toTop, false);
