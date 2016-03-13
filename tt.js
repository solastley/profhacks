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
var sleep = require('sleep');
filename = process.argv[2];

var readStream = fs.createReadStream(filename);
readStream.setEncoding('utf8');
readStream.on('data', (chunk)=> {

	while(chunk.search(blink)!=-1){

	  		//finding next isntance of eeg reading
			index = chunk.search(blink);
			index = index + blink.length;

			if(chunk[index]=="1" && test){
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
				//sleep.sleep(20);
				//econtact();
			}
			chunk = chunk.substring(index,chunk.length);
		}
		console.log("waiting");
		sleep.usleep(750000);
});
readStream.on('end',function() {
	console.log('end');
	
});

/*function econtact(){
	var firey = require('firebase');
	var myFireBase = new Firebase('https://shining-torch-6183.firebaseio.com/');
	var car = myFireBase.child('Car');
	var text_status = car.child('text_status');
	if (text_status)
	{
		// Twilio Credentials 
		var accountSid = 'AC9e62638d95f63fcf19b58f3b3a621c18'; 
		var authToken = '8f79e22193475ec928799dcdf96516c4'; 
 
		//require the Twilio module and create a REST client 
		var client = require('twilio')(accountSid, authToken); 
 
		client.messages.create({
			to: "+12673150322", 
			from: "+14848543923", 
			body: "Hello Alex. Nathan Todd has listed you as his emergency contact for MediRoute. He is currently experiencing a medical emergency and is on his way to the Kennedy University Hospital.",   
		}, function(err, message) { 
			console.log(message.sid); 
		});
	}
}*/