const main = document.getElementById('main'),
	  addUserBtn = document.getElementById('add_user'),
	  doubleBtn = document.getElementById('double'),
	  showMillionairesBtn = document.getElementById('show_millionaires'),
	  sortBtn  = document.getElementById('sort'),
	  calculateWealthBtn = document.getElementById('calculate_wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and money 
async function getRandomUser() {
	const res = await fetch(`https://randomuser.me/api`);
	const data = await res.json();

	const user = data.results[0];
	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random()*1000000)
	}
	appData(newUser);
}

// Add new obj to data array
function appData(obj) {
	data.push(obj);
	
	updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
	main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
	providedData.forEach(item => {
		const element = document.createElement('div');
		element.classList.add('person');
		element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
		main.appendChild(element);
	})
}

// Format number as money
function formatMoney(number) {
	return "$" + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
}

// Double Money
function doubleMoney() {
	data = data.map(item => {
		return {...item, money: item.money * 2}
	})
	updateDOM();
}

// Sort user
function SortRichest() {
	data.sort((a,b) => b.money - a.money);
	updateDOM();
}

// Show millionaires
function showMillionaires() {
	data = data.filter(item => item.money > 1000000);
	updateDOM();
}

// Calculate all money 
function calculateWealth() {
	const wealth = data.reduce((acc, item) => {
		return acc += item.money
	}, 0)
	
	const wealthEl = document.createElement('div');
	wealthEl.innerHTML = `<h3>Match wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
	main.appendChild(wealthEl);
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', SortRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);























// https://codesandbox.io/dashboard/home

// https://codesandbox.io/dashboard/home	  
// https://coursehunter.net/course/react-redux-professionalnaya-razrabotka