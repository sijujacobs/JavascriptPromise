(() => {
	let fetchButton = document.getElementById('fetchButton');
	let fetchAllButton = document.getElementById('fetchAllButton');
	// fetchButton.addEventListener('click', fetchButtonClickHandler)
	fetchAllButton.addEventListener('click', fetchAllButtonlickHandler);

	function fetchAllButtonlickHandler() {
		console.log(' Promise :: fetchAllButtonlickHandler : ');
		var usersPromise = fetch("https://jsonplaceholder.typicode.com/users").then(res =>
			res.json()
		);

		var albumPromise = fetch("https://jsonplaceholder.typicode.com/albums").then(res =>
			res.json()
		);
		isAllPromiseSettled([usersPromise, albumPromise]).then(results => {
			console.log(results);
		});
	}
	function isAllPromiseSettled(promises) {
		var results = []
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