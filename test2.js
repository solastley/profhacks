// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

var l = 0;
var count = 0;
var total = [0,0,0,0];
var avg = [0,0,0,0];
var num;

// Read the file and print its contents.
var fs = require('fs')
filename = process.argv[2];
fs.readFile(filename, 'utf8', function(err, data) {
	if (err) throw err;

	//extracting new data
	data = data.substring(l,data.length);
	l = data.length;

	//searchign all new data for eeg readings
	while(data.search("/muse/eeg ffff")!=-1){

  		//finding next isntance of eeg reading
		var index = data.search("/muse/eeg ffff");
		index = index + 15; // skiiping above string
		count = count + 1;  // counting another reading

		//finding number indexes
		for(num = 0; data[(index)+num]!=" "; num++){}
		var datnum = data.substring(index,index+num);
		//adding number to totals and averages
		total[0] = parseFloat(datnum) + total[0];
		avg[0] = total[0]/count;

		//truncate data and repeat above
		data = data.substring(num+1,data.length);
		for(num = 0; data[(index)+num]!=" "; num++){}
		var datnum = data.substring(index,index+num);

		total[1] = parseFloat(datnum) + total[1];
		avg[1] = total[1]/count;

		data = data.substring(num+1,data.length);
		for(num = 0; data[(index)+num]!=" "; num++){}
		var datnum = data.substring(index,index+num);
		
		total[2] = parseFloat(datnum) + total[2];
		avg[2] = total[2]/count;

		data = data.substring(num+1,data.length);
		for(num = 0; data[(index)+num]!="\n"; num++){}
		var datnum = data.substring(index,index+num-2);
		
		total[3] = parseFloat(datnum) + total[3];
		avg[3] = total[3]/count;
	}

	console.log(total);
	console.log(avg);

});

while(true){
	fs.readFile(filename, 'utf8', function(err, data) {
		if (err) throw err;

		//extracting new data
		data = data.substring(l,data.length);
		l = data.length;

		var l = 0;
		var countt = 0;
		var totalt = [0,0,0,0];
		var avgt = [0,0,0,0];
		var num;
		var blink = "/muse/elements/blink i ";

		//searchign all new data for eeg readings
		while(data.search(blink)!=-1){

	  		//finding next isntance of eeg reading
			var index = data.search(blink);
			index = index + blink.length; // skiiping above string
			if(data[index]=="1"){
				countt = countt + 1;
			}
			if(countt>=5{
				//firebase trigger
				countt = 0;
			}
		}


	});

}