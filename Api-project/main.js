import { data } from "autoprefixer";
import "./style.css";
const searchInput = document.getElementById("search");
const countryList = document.getElementById("country-list");
const card = document.getElementById("card");
let BASE_URL = "https://restcountries.com/v3.1";
let endPoint = "all";
async function getData(url, endPoint) {
  try {
    let response = await fetch(`${url}/${endPoint}`);
    response = await response.json();
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

let dataSet = getData(BASE_URL, endPoint);
dataSet.then((response) => renderList(response));
console.log(dataSet);
function renderList(data) {
  countryList.innerHTML = "";
  data.map((item) => {
    let li = `<li
        class="bg-[#7F8487] rounded-r-md py-2 hover:shadow-sm hover:shadow-white flex gap-8 items-center justify-between px-4 cursor-pointer text-center"
      >
        <span>${item.name.common}</span>
        <div class="w-24 h-16">
          <img class= "h-full"
            src=${item.flags.png}
            alt=""
          />
        </div>
      </li>`;
    countryList.innerHTML += li;
  });
}
// renderList(dataSet) ====> it doesnt work because dataSet is Based on promise
