// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

var l = 0;
var count = 0;
var blink = "/muse/elements/blink i ";
var test = true;
var index;

// Read the file and print its contents.
var fs = require('fs')
filename = process.argv[2];
	fs.readFile(filename, 'utf8', function(err, data) {
		if (err) throw err;

		//extracting new data
		data = data.substring(l,data.length);
		l = data.length;

		//searchign all new data for eeg readings
		while(data.search(blink)!=-1){

	  		//finding next isntance of eeg reading
			index = data.search(blink);
			index = index + blink.length;

			if(data[index]=="1" && test){
				console.log("He blinked once");
				count = count + 1;
				test = false;
			}
			else{test = true;}
			if(count>=5){
				var firey = require('firebase');
				var myFireBase = new Firebase('https://shining-torch-6183.firebaseio.com/');
				var car = myFireBase.child('Car');
				var passenger_status = car.child('passenger_status');
				passenger_status.set(true);
				console.log("He blinked 5 times");
				count = 0;
			}
			data = data.substring(index,data.length);
		}
	});
