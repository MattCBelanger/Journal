//function
function Journal (){

	this.entries=[];
}

Journal.prototype.addEntry = function(Entry) {
	// checks curse words before entry submitted
	var patt1 = /fuck|shit|ass/ig;
	var temp= Entry.content;
	var updatedEntry= temp.replace(patt1, function(temp){

			  var i = 0;
			  var exs = "";
			  while (i < temp.length) {
			    exs += "X";
			    i++;
				}
			return exs;
		});
//updates content in entry and adds to journal
	Entry.content = updatedEntry
	this.entries.push(Entry);
}

Journal.prototype.numOfEntries = function(entries){
	return this.entries.length;
}

Journal.prototype.findAlltags= function(tag){
	var findEntry=[];
	var index = this.entries.length;
	var search1 = '';

	for(i=0;i<index;i++){
			
			search1 = this.entries[i].tags.indexOf(tag);
			
			if(search1>=0){
				findEntry.push(this.entries[i]);
			}
		
	}
	return findEntry;
}

Journal.prototype.findAllstrings= function(string){
	var findEntry=[];
	var index = this.entries.length;
	var search1 = '';

	for(i=0;i<index;i++){
			
			search1 = this.entries[i].content.search(string);
			
			if(search1>=0){
				findEntry.push(this.entries[i]);
			}
		
	} 
	return findEntry;
}

Journal.prototype.deleteEntry = function(Entry){
	var index = this.entries.indexOf(Entry);
	this.entries.splice(index,1);
}

Journal.prototype.displayEntry = function(Entry){
	var index = this.entries.indexOf(Entry);
	return this.entries(index);
}

function Entry(title,author,content, time, tag){
		this.title= title;
		this.author= author;
		this.content = content;
		this.time=time;
		this.tags= tag;
		
}




var journal1 = new Journal();

var entry1 = new Entry("title","author","lotsfuck fuck cat contass",Date.now(),["fun", "boring", "lame"]);
var entry2 = new Entry("title2","author2", "lots of dog content2",Date.now(),["fun", "boring", "lame"]);
var entry3 = new Entry("title999","author9999", "lots ass of dog content9999",Date.now(),["fun", "sad"]);



journal1.addEntry(entry1);
journal1.addEntry(entry2);
journal1.addEntry(entry3);

console.log(journal1.entries);
console.log(journal1.numOfEntries());

journal1.deleteEntry(entry2);

console.log(journal1.entries);
console.log(journal1.numOfEntries());
console.log(journal1.findAlltags("lame"));

console.log(journal1.numOfEntries());
console.log(journal1.findAllstrings("cat"));




