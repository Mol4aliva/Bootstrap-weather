const apiKey = '4BVZVFAUDM4ZFKGVNL3PDWEJC';

const cities = [
    {
        name: 'tallinn',
        apiUrl: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/tallinn?unitGroup=metric&key=${apiKey}&contentType=json`
    },
    {
        name: 'tartu',
        apiUrl: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/tartu?unitGroup=metric&key=${apiKey}&contentType=json`
    },
    {
        name: 'parnu',
        apiUrl: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/parnu?unitGroup=metric&key=${apiKey}&contentType=json`
    },
    {
        name: 'narva',
        apiUrl: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/narva?unitGroup=metric&key=${apiKey}&contentType=json`
    },
    {
        name: 'sillamae',
        apiUrl: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/sillamae?unitGroup=metric&key=${apiKey}&contentType=json`
    },
    {
        name: 'maardu',
        apiUrl: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/maardu?unitGroup=metric&key=${apiKey}&contentType=json`
    },
    {
        name: 'rakvere',
        apiUrl: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/rakvere?unitGroup=metric&key=${apiKey}&contentType=json`
    },
    {
        name: 'kuressaare',
        apiUrl: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/kuressaare?unitGroup=metric&key=${apiKey}&contentType=json`
    },

];

async function getWeatherData(city) {
    try {
        const response = await fetch(city.apiUrl);

        if (!response.ok) {
            console.error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        displayWeatherData(data, city.name);
    } catch (error) {
        console.error('Error when getting data', error);
    }
}


function displayWeatherData(data, cityName) {
    const forecastTable = document.getElementById(`forecast-table-${cityName}`);

    if (!data || !data.days || data.days.length === 0) {
        console.error(`"Error: Unable to read weather forecast data for the city${cityName}`);
        return;
    }

    let forecastHTML = '<table class="table table-striped"><thead><tr><th>Date</th><th>Temperature</th><th>Precipitation</th><th>Wind</th><th>Humidity</th></tr></thead><tbody>';

    for (let i = 0; i < data.days.length; i++) {
        const day = data.days[i];

        const dateObject = new Date(day.datetime);

        const dayOfMonth = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const formattedDate = `${(dayOfMonth < 10 ? '0' : '') + dayOfMonth}.${(month < 10 ? '0' : '') + month}`;

        forecastHTML += '<tr>';
        forecastHTML += `<td>${formattedDate}</td>`;
        forecastHTML += `<td>${day.tempmin}°C - ${day.tempmax}°C</td>`;
        forecastHTML += `<td>${day.precip}%</td>`;
        forecastHTML += `<td>${day.windspeed} m/s</td>`;
        forecastHTML += `<td>${day.humidity} %</td>`;
        forecastHTML += '</tr>';
    }

    forecastHTML += '</tbody></table>';
    forecastTable.innerHTML = forecastHTML;
}

Promise.all(cities.map(getWeatherData))
    .then(() => {
        console.log('All requests have been completed');
    })
    .catch(error => {
        console.error('Error during the execution of requests:', error);
    });





