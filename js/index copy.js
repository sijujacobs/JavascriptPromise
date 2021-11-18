(() => {
	let fetchButton = document.getElementById('fetchButton');
	let clearButton = document.getElementById('clearButton');
	fetchButton.addEventListener('click', fetchButtonClickHandler)
	clearButton.addEventListener('click', clearButtonClickHandler)

	function fetchButtonClickHandler() {
		console.log(' Promise :: fetchButtonClickHandler : ');
		getUsers();
	}

	async function getUsers() {
		let result = await fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.text())
			.then(data => data);
		return result
	}
	async function getUsersOLD() {
		return new Promise(resolve => {
			return fetch('https://jsonplaceholder.typicode.com/users')
				.then(response => response.text())
				.then(data => resolve(data));
		})
	}
	async function getAlbums() {
		return new Promise(resolve => {
			fetch('https://jsonplaceholder.typicode.com/albums')
				.then(response => response.text())
				.then(data => resolve(data));
		})
	}
	async function getTodos() {
		const toDos = await fetch('https://jsonplaceholder.typicode.com/todos')
			.then(response => response.text())
			.then(data => console.log('Promise :: getTodos: data : ', data));
	}
	function clearButtonClickHandler() {
		console.log(' Promise :: clearButtonClickHandler : ');
		httpCallWithWaitTime(3000);
	}

	function httpCallWithWaitTime(waitTime) {
		setTimeout(() => {
			console.log('Success : second call with time ', waitTime, ' seconds');
		}, waitTime)
	}
const myObj = {
    name: 'siju',
    age: '55',
    address: {
        street: '111 MyStreet',
        city: 'MyCity',
        dob: new Date(),
    },
    phone: '12345',
    languages: ['javascript', 'actionscript'],
    dob: null,
    isVerified: false,
    car: undefined,
    model: null,
};

console.clear();
console.log('cloned myObj : ', {...myObj});
const propsToDelete = ['name','dob'];
function findProp(mObject){
    for(let obj in mObject){
      if(propsToDelete.indexOf(obj) > -1){
        mObject.hasOwnProperty(obj) && delete mObject[obj];
      }
      if(mObject[obj] && mObject[obj] !== null){
        if(typeof mObject[obj] === 'object'){
          if(Array.isArray(mObject[obj])){
            const thisArray = mObject[obj];
            for(let aIndex=0; aIndex < thisArray.length; aIndex++){
              findProp(thisArray[aIndex]);
            }
          }else{
            findProp(mObject[obj]);
          }
        }
      }
    }
}

findProp(myObj);
console.log('myObj : ', myObj);
})();
