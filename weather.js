// const apiKey="439624355ba94cb0916144211240311";
const report=document.querySelector(".para");
let lastSearch="jamshedpur";
// const weatherUrl=`http://api.weatherapi.com/v1/current.json?key=439624355ba94cb0916144211240311&q=${lastSearch}&aqi=yes`;
let forecastUrl=`http://api.weatherapi.com/v1/forecast.json?key=439624355ba94cb0916144211240311&q=${lastSearch}&days=7&aqi=yes`;
apiCall();

let city=document.querySelector("#search");
city.addEventListener('change',function (evt){
    lastSearch=city.value;
    forecastUrl=`http://api.weatherapi.com/v1/forecast.json?key=439624355ba94cb0916144211240311&q=${lastSearch}&days=7&aqi=yes`;
    apiCall();
    console.log(city.value);
});

// let overlay = document.querySelector("overlay");
// console.log(overlay);
async function apiCall(){
    try{
        // overlay.style.display = "block";
        // overlay.classList.add("overlay");

        const forecastRes = await fetch(forecastUrl);
        const forecastData = await forecastRes.json();
        console.log(forecastData);

        // overlay.classList.remove("overlay");

        setData(forecastData);
        hourTable(forecastData);
        dayTable(forecastData);
    }
    catch(e){
        // console.log("Error :"+e);
    }
}

    const loc=document.querySelector(".city");
    const U_loc=document.querySelector("#city");
    const d_time=document.querySelector("#dateTime");
    const cld_img=document.querySelector(".cloud-img");
    const cld=document.querySelector(".cloud");
    const tempr=document.querySelector(".mintemp");
    const humidt=document.querySelector(".humidity");
    const wnd=document.querySelector(".wind");
    const sunset=document.querySelector(".sunset");
    const sunrise=document.querySelector(".sunrise");
    const haze=document.querySelector(".haze");
    const pressure=document.querySelector(".pressure");
    const Uv=document.querySelector(".uv");

    function setData(forecastData){
        loc.innerText=forecastData.location.name;
        U_loc.innerText=forecastData.location.name;
        d_time.innerText=forecastData.location.localtime;
        tempr.innerText=parseInt(forecastData.current.temp_c);
        humidt.innerText=parseInt(forecastData.current.humidity);
        wnd.innerText=parseInt(forecastData.current.wind_kph);
        if(forecastData.current.condition.text=="Cloudy")
            cld_img.src="assest/cloudy-day.png";
        else if(forecastData.current.condition.text=="Sunny")
            cld_img.src="assest/sunny.png";
        else if(forecastData.current.condition.text=="Mist" || forecastData.current.condition.text=="Haze")
            cld_img.src="assest/fog.png";
        else if(forecastData.current.condition.text=="Overcast")
            cld_img.src="assest/overcast.png";
        else if(forecastData.current.condition.text=="Clear")
            cld_img.src="assest/clear-sky.png";
        else if(forecastData.current.condition.text=="Partly cloudy")
            cld_img.src="assest/partly.png";
        else
             cld_img.src=forecastData.current.condition.icon;
        cld.innerText=forecastData.current.condition.text;
        pressure.innerText=forecastData.current.pressure_mb;
        Uv.innerText=forecastData.current.uv;
        sunrise.innerText=forecastData.forecast.forecastday[0].astro.sunrise;
        sunset.innerText=forecastData.forecast.forecastday[0].astro.sunset;
    }
    
    function hourTable(forecastData){
        const table=document.getElementById("hour");
        table.innerHTML="";
        const data=forecastData.forecast.forecastday[0].hour;
        const time=document.createElement("tr");
        const cld=document.createElement("tr");
        const temp=document.createElement("tr");
        const hume=document.createElement("tr");
        const wind=document.createElement("tr");
        const presr=document.createElement("tr");
        let i=0;
        let times=0;
        data.forEach(element => {
            let elmt=document.createElement("th")
            if(times<10)
                elmt.textContent=`0${times}:00`;
            else
            elmt.textContent=`${times}:00`;
            time.appendChild(elmt);
            table.appendChild(time);

            elmt=document.createElement("td");
            elmt.textContent=data[i].condition.text;
            cld.appendChild(elmt);
            table.appendChild(cld);

            elmt=document.createElement("td");
            elmt.textContent=data[i].temp_c;
            temp.appendChild(elmt);
            table.appendChild(temp);

            elmt=document.createElement("td");
            elmt.textContent=data[i].humidity;
            hume.appendChild(elmt);
            table.appendChild(hume);

            elmt=document.createElement("td");
            elmt.textContent=data[i].wind_kph;
            wind.appendChild(elmt);
            table.appendChild(wind);

            elmt=document.createElement("td");
            elmt.textContent=data[i].pressure_mb;
            presr.appendChild(elmt);
            table.appendChild(presr);
            times++;
            i++;
        });

        console.log(data);
    }

    function dayTable(forecastData){
        const table=document.getElementById("day_table");
        // console.log(table);
        table.innerHTML="";
        const data=forecastData.forecast.forecastday;
        let i=0;
        data.forEach(element => {
            const row=document.createElement("tr");
            let elmt=document.createElement("td")
            elmt.textContent=data[i].date;
            elmt.classList.add("date");
            row.appendChild(elmt);
            
            elmt=document.createElement("td");
            elmt.textContent=data[i].astro.sunrise;
            row.appendChild(elmt);
            
            elmt=document.createElement("td");
            elmt.textContent=data[i].astro.sunset;
            row.appendChild(elmt);
            
            elmt=document.createElement("td");
            elmt.textContent=data[i].day.condition.text;
            row.appendChild(elmt);
            
            elmt=document.createElement("td");
            elmt.textContent=data[i].day.avgtemp_c;
            row.appendChild(elmt);
            
            elmt=document.createElement("td");
            elmt.textContent=data[i].day.avghumidity;
            row.appendChild(elmt);
            
            elmt=document.createElement("td");
            elmt.textContent=data[i].day.maxwind_kph;
            row.appendChild(elmt);
            
            elmt=document.createElement("td");
            elmt.textContent=data[i].day.uv;
            row.appendChild(elmt);
            
            table.appendChild(row);
            i++;
        });
        
        // console.log(table);
    }
