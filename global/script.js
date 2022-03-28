var map = L.map('map').setView([34.0479,100.6197],2);
      var gl = L.mapboxGL({
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
        accessToken: 'not-needed',
        style: 'https://api.maptiler.com/maps/c35b4c6b-b68e-4c71-b937-8f221d37b7c8/style.json?key=mUvVA2OmRPxD6smD7gry'
      }).addTo(map);

let myicon = L.icon({
  iconUrl:'./global/marker.svg',
  iconSize:[25,25]
});
map.setMinZoom(2);




async function getmap_data(){
let data = await fetch('https://disease.sh/v3/covid-19/countries');
let obj = await data.json();

obj.forEach((curr,i)=>{
  
  let cntry_nme =`
  <option value="${curr.country}">${curr.country}</option>
  `;

  document.querySelector('#sel1').insertAdjacentHTML('beforeend',cntry_nme);

});
let marker ={};

  document.querySelector(`#sel1`).onchange=()=>{
  
    let country = document.querySelector('#sel1').value;


    obj.forEach(curr=>{
  if(country==curr.country){
    map.setView([curr.countryInfo.lat,curr.countryInfo.long],3);
  if(marker!=undefined){
   map.removeLayer(marker);
  }
marker = L.marker([curr.countryInfo.lat,curr.countryInfo.long],{icon:myicon});
 marker.bindPopup(`<h style="color:#c0392b;">${curr.country}</h><p style="color:#ff3838;" >Confirmed: ${format(curr.cases)}</p><p  style="color:#27ae60;">Recovered: ${format(curr.recovered)}</p><p  style="color:#576574;">Deaths: ${format(curr.deaths)}</p>`).addTo(map).openPopup();
  }
  if(country=="nill"){map.setView([34.0479,100.6197],2);  map.removeLayer(marker); }
 
});
    };



};
getmap_data();
function format(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

     
async function global_data(){

  let g_data= await fetch('https://disease.sh/v3/covid-19/all');
  let g_obj = await g_data.json();
  let html1 = `
  <p class="mx-auto">${format(g_obj.cases)}</p>
  `;
  let html2 = `
  <p class="mx-auto">${format(g_obj.recovered)}</p>
  `;
  let html3 = `
  <p class="mx-auto">${format(g_obj.deaths)}</p>
  `;
  let html4 = `
  <p class="mx-auto">${format(g_obj.todayCases)}</p>
  `;
  let html5 = `
  <p class="mx-auto">${format(g_obj.todayRecovered)}</p>
  `;
  let html6 = `
  <p class="mx-auto">${format(g_obj.todayDeaths)}</p>
  `;
  
  document.querySelector('.div1').insertAdjacentHTML('beforeend',html1);
  document.querySelector('.div2').insertAdjacentHTML('beforeend',html2);
  document.querySelector('.div3').insertAdjacentHTML('beforeend',html3);
  document.querySelector('.div4').insertAdjacentHTML('beforeend',html4);
  document.querySelector('.div5').insertAdjacentHTML('beforeend',html5);
  document.querySelector('.div6').insertAdjacentHTML('beforeend',html6);
}
global_data();

async function cont_data(){
  let cont_data= await fetch('https://disease.sh/v3/covid-19/continents');
  let cont_obj = await cont_data.json();
  
  cont_obj.forEach((curr)=>{
    if(curr.continent=="North America"){
      let html = `
      <tr>
      <td style="color:#637385;">${curr.continent}</td>
      <td style="color:#ff3838;">${format(curr.cases)}</td>
      <td style="color:#27ae60;">${format(curr.recovered)}</td>
      <td style="color:#637385;">${format(curr.deaths)}</td>
      <td style="color:#ff3838">${format(curr.active)}</td>
      <td style="color:#bfb1f3;">${format(curr.critical)}</td>
      <td style="color:#0d69e2;">${format(curr.population)}</td>
      </tr>
      `
      document.querySelector('.tbl').insertAdjacentHTML('beforeend',html);
      
    }
    
      });

  cont_obj.forEach((curr)=>{
if(curr.continent!="North America"){
  let html = `
<tr>
<td style="color:#637385;">${curr.continent}</td>
<td style="color:#ff3838;">${format(curr.cases)}</td>
<td style="color:#27ae60;">${format(curr.recovered)}</td>
<td style="color:#637385;">${format(curr.deaths)}</td>
<td style="color:#ff3838;">${format(curr.active)}</td>
<td style="color:#bfb1f3;">${format(curr.critical)}</td>
<td style="color:#0d69e2;">${format(curr.population)}</td>
</tr>
`
document.querySelector('.tbl').insertAdjacentHTML('beforeend',html);

}
  
  });
}
cont_data();


window.addEventListener("load", function() {
  const loader = this.document.querySelector(".loader");
  loader.className += " hidden";
});
