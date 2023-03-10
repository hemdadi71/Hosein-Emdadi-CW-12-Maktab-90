import { data } from 'autoprefixer'
// import _ from 'lodash'
// import { debounce } from 'lodash/function.js'
import './style.css'
const searchInput = document.getElementById('search')
const countryList = document.getElementById('country-list')
const card = document.getElementById('card')
const Prev = document.getElementById('Prev')
const Next = document.getElementById('Next')
const sort = document.getElementById('sort')
let BASE_URL = 'http://localhost:3000'
let URL = BASE_URL + '/countries'
let SortRevers = 'asc'
let page = 1
let endPoint = `?_page=${page}&_limit=5`
let state
async function getData(url, endPoint) {
  try {
    let response = await fetch(`${url}/${endPoint}`)
    response = await response.json()
    return response
  } catch (error) {
    console.log(error)
  }
}

const debounce = (func, delay) => {
  let debounceTimer
  return function () {
    const context = this
    const args = arguments
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => func.apply(context, args), delay)
  }
}

let dataSet = getData(URL, endPoint)
dataSet.then(response => {
  renderList(response)
})
function renderList(data) {
  countryList.innerHTML = ''
  data.map(item => {
    let li = `<li data-name=${item.name.common}
        class="bg-[#7F8487] rounded-r-md py-2 hover:shadow-sm hover:shadow-white flex gap-8 items-center justify-between px-4 cursor-pointer text-center"
      >
        <span class='text-left'>${item.name.common}</span>
        <div class="w-24 h-16 p-0">
          <img class= "h-full w-full"
            src=${item.flags.png}
            alt=""
          />
        </div>
      </li>`
    countryList.innerHTML += li
  })
}
const handleSearchItem = e => {
  const InputValue = e.target.value.toLowerCase()
  dataSet = getData(BASE_URL, 'countries')
  dataSet.then(response => {
    const filteredItem = response.filter(
      item =>
        item.name.common.toLowerCase().includes(InputValue) ||
        item.region.toLowerCase().includes(InputValue)
    )
    renderList(filteredItem)
  })
}
const handleCard = e => {
  if (!e.target.dataset.name) return
  dataSet.then(response => {
    const targetItem = response.find(
      item => item.name.common === e.target.dataset.name
    )
    card.innerHTML = `<figure class="absolute top-[-50px] -translate-x-1/2 left-1/2">
    <img
      class="rounded-full w-24 h-24"
      src=${targetItem.flags.png}
      alt=""
      srcset=""
    />
  </figure>
  <div class="flex flex-col items-center justify-center py-16 gap-5">
    <div>
      <h2 class="font-bold text-xl">${targetItem.name.common}</h2>
      <p class="font-semibold text-gray-700">${targetItem.region}</p>
    </div>
    <div>
      <p class="font-bold">Capital :</p>
      <span>${targetItem.capital[0]}</span>
    </div>
    <div>
      <p class="font-bold">Area code :</p>
      <span>${targetItem.idd.root + targetItem.idd.suffixes[0]}</span>
    </div>
    <div>
      <p class="font-bold">Neighbors :</p>
      <span>${targetItem.borders.join(' , ')}</span>
    </div>
  </div>`
  })
}
countryList.addEventListener('click', handleCard)
searchInput.addEventListener('keyup', debounce(handleSearchItem, 1000))
Prev.addEventListener('click', () => {
  --page < 1 ? 1 : page
  endPoint = `&_page=${page}&_limit=5`
  dataSet = getData(URL + '?', endPoint)
  dataSet.then(response => {
    renderList(response)
  })
})
Next.addEventListener('click', () => {
  ++page > 50 ? 50 : page
  endPoint = `&_page=${page}&_limit=5`
  dataSet = getData(URL + '?', endPoint)
  dataSet.then(response => {
    renderList(response)
  })
})
sort.addEventListener('click', () => {
  SortRevers = SortRevers === 'asc' ? 'desc' : 'asc'
  URL = URL + `?_sort=name.common&_order=${SortRevers}`
  endPoint = `&_page=${page}&_limit=5`
  dataSet = getData(URL, endPoint)
  dataSet.then(response => {
    renderList(response)
  })
})

// document.getElementById('myBtn').addEventListener('click', _.debouce(() => {
//   console.log('click');
//   }, 2000))
