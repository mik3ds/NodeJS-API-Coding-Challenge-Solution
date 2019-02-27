var request = require('request-promise');

function recursiveAPICall(url_to_call, data) {
	return request({
      "method":"GET", 
      "uri": "http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com" + url_to_call,
      "json": true
    }).then(function(response) {
    	if (!data) {
    		data = []
    	}
    	response.objects.forEach(function(obj) {
    		if (obj.category == "Air Conditioners") {
  				let temp = (obj.size.width/100) * (obj.size.length/100) * (obj.size.height/100) * 250
  				data.push(temp)
    		}
    	})
    	if (response.next) {
    		return recursiveAPICall(response.next, data)
    	}
		return data;
    })
}

function main() {
	recursiveAPICall("/api/products/1").then(function(result) {
		let totalkg = 0
		result.forEach(function(kg) {
			totalkg += kg
		})
		console.log(result.length + " Air Conditioners found, with an average cubic weight of " + (totalkg / result.length).toFixed(2) + " kg")
	})
}

main()