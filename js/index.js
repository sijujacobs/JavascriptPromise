(() => {
	console.clear();
	let fetchButton = document.getElementById('fetchButton');
	let fetchAllButton = document.getElementById('fetchAllButton');
	fetchButton.addEventListener('click', fetchButtonClickHandler);
	fetchAllButton.addEventListener('click', fetchAllButtonlickHandler);
	const userURL = "https://jsonplaceholder.typicode.com/users";
	const albumURL = "https://jsonplaceholder.typicode.com/albums";
	const peopleURL = "https://ghibliapi.herokuapp.com/people";
	const errorURL = "https://ghibliapi.herokuapp.com/peoxple";

	const fetchData = (apiURL) => {
		let apiResponse = {
			statusCode: '',
			data: '',
			message: '',
			apiName: apiURL.substr(apiURL.lastIndexOf('/')),
		}
		return fetch(apiURL)
			.then(response => {
				apiResponse.statusCode = response.status;
				if (response.ok) {
					apiResponse.message = 'OK';
					return response.json();
				} else {
					apiResponse.message = 'ERROR';
				}
			})
			.then(response => {
				apiResponse.data = response;
				return apiResponse;
			})
			.catch(err => ({ message: 'CATCH-ERROR', reason: err }));
	}

	function fetchButtonClickHandler() {
		fetchData(userURL).then(res => {
			console.log(' fetchButtonClickHandler ::fetchSingleApi : users :', res);
		});
	}
	function fetchAllButtonlickHandler() {
		isAllPromiseSettled([fetchData(peopleURL), fetchData(userURL), fetchData(albumURL), fetchData(errorURL)]).then(results => {
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
							status: result.statusCode,
							data: result,
							message: result.message
						});
					})
					.catch(err => {
						results.push({
							status: "ERROR",
							message: err
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