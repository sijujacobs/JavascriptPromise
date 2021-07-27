(() => {
	let fetchButton = document.getElementById('fetchButton');
	let fetchAllButton = document.getElementById('fetchAllButton');
	fetchButton.addEventListener('click', fetchButtonClickHandler);
	fetchAllButton.addEventListener('click', fetchAllButtonlickHandler);

	const fetchPeople = () => {
		return fetch("https://ghibliapi.herokuapp.com/people")
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.catch(err => console.error('ERROR :: fetchPeople', err));
	}

	function getUsers() {
		return fetch("https://jsonplaceholder.typicode.com/users")
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.catch(err => console.error('ERROR :: fetchPeople', err));
	}
	function getAlbums() {
		return fetch("https://jsonplaceholder.typicode.com/albums")
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.catch(err => console.error('ERROR :: fetchPeople', err));
	}

	function fetchButtonClickHandler() {
		getUsers().then(res => {
			console.log(' fetchButtonClickHandler ::fetchSingleApi : users :', res);
		});
	}
	function fetchAllButtonlickHandler() {
		isAllPromiseSettled([fetchPeople(), getUsers(), getAlbums()]).then(results => {
			console.log('Final results : ', results);
		});
	}

	function isAllPromiseSettled(promises) {
		var results = [];
		return new Promise(resolve => {
			promises.forEach((promise, index) => {
				return Promise.resolve(promise)
					.then(result => {
						results.push({
							status: "SUCCESS",
							value: result
						});
					})
					.catch(err => {
						results.push({
							status: "ERROR",
							reason: err
						});
					})
					.finally(() => {
						if (promises.length - 1 === index) {
							resolve(results);
						}
					});
			});
		});
	}
})();