//listeners
$(document).ready(function(){

	$('#myJournal').submit(function(event){
		event.preventDefault();
		var frm = $('#myJournal');
		makeEntry(frm);
		$('#myJournal').get(0).reset();
		$('#numEntries').html(newJournal.numOfEntries());
	});

	$('#mySearch').submit(function(event){
		event.preventDefault();
		var frm = $('#mySearch');
		makeSearch(frm);
		$('#mySearch').get(0).reset();
		
	});

	$('#theJournal').html(journalHTML(newJournal));

	$('#numEntries').html(newJournal.numOfEntries());

	$('#rtnJournal').click(function(event){

		$('#theJournal').html(journalHTML(newJournal));
	
 	});
});

//parallax
	var parallax = document.getElementById("parallax");
	var speed = -0.5;

	window.onscroll = function() {
	  var yOffset = window.pageYOffset;
	  parallax.style.backgroundPosition = "0px " + (yOffset / speed) + "px";
	}

//global variables
var newJournal = new Journal();

// seperate functions
function makeEntry(frm){
	var title = frm.find('input[name="title"]').val();
	var author = frm.find('input[name="author"]').val();
	var content = frm.find('textarea[name="content"]').val();
	var tags = frm.find('input[name="tags"]').val();
	
	var newEntry = new Entry(title,author,content,tags);

	newJournal.addEntry(newEntry);
	$('#theJournal').html(journalHTML(newJournal));
	

}

function makeSearch(frm){
	var find = frm.find('input[name="searchAll"]').val();
	var found = [];
	
	
	found = newJournal.findAllstrings(find);
	
	
	$('#theJournal').html(searchHTML(found));
}

function journalHTML(jHTML){
	//get number of entires
	var n = jHTML.numOfEntries();
	var html = '';
	for(var i=0;i<n;i++){

		

		html+= '<div class=grad>';
		html+='<span class=dateSize>'+jHTML.entries[i].timestamp+'</span>';
		html+='<h1 class=undL>'+jHTML.entries[i].title+'</h1>';
		
		html+='<h3> Author: '+jHTML.entries[i].author+'</h3>';
		html+='<h3>'+jHTML.entries[i].content+'</h3>';
		html+='<h5> Tags: '+jHTML.entries[i].tags+'</h5> </div>';
		html+='<div class=spacer></div>';
	}
	return html;
}

function searchHTML(sHTML){
	//get number of entires
	var n = sHTML.length;
	var html = '';
	for(var i=0;i<n;i++){

		

		html+= '<div class=grad>';
		html+='<span class=dateSize>'+sHTML[i].timestamp+'</span>';
		html+='<h1 class=undL>'+sHTML[i].title+'</h1>';
		html+='<h3>'+sHTML[i].author+'</h3>';
		html+='<h3>'+sHTML[i].content+'</h3>';
		html+='<h5>'+sHTML[i].tags+'</h5> </div>';
		html+='<div class=spacer></div>';
	}
	return html;
}


//classes
function Journal (){

	this.entries=[];
}

function Entry(title,author,content,tag){
		this.title= title;
		this.author= author;
		this.content = content;
		this.tags = tag;
		this.timestamp1 = new Date();
		this.timestamp1 = this.timestamp1.toString();
		this.timestamp = this.timestamp1.substring(15, 0);
}

//class prototypes

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
	Entry.content = updatedEntry;
	this.entries.unshift(Entry);
	
}

Journal.prototype.numOfEntries = function(entries){
	return this.entries.length;
}

Journal.prototype.findAllstrings= function(string){
	var findEntry=[];
	var index = this.entries.length;
	
	var search1 = '';
	var search2 = '';
	var search3 = '';
	var search4 = '';

	for(i=0;i<index;i++){
			
			search1 = this.entries[i].content.search(string);
			search2 = this.entries[i].tags.search(string);
			search3 = this.entries[i].author.search(string);
			search4 = this.entries[i].title.search(string);
			
			
			if(search1>=0 || search2>=0 || search3>=0 || search4>=0){
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




//hard coding entries to journal

var entry1 = new Entry("I went to the park!","Matt","lotsfuck fuck cat  i lived in a bag for a year. i did not say that i did,but maybe i shoud have not taken that apple tree . oh the humanity. contass some much content coming outta my ass. I ove content, dont get me started on content, my spelling is bad though", "fun boring lame");
var entry2 = new Entry("10 Reasons why I love felines","Matt", " cat Lorem ipsum fuck dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum."," fun sad lame happy");
var entry3 = new Entry("Scietific flaws of the movie Interstellar","Matt", " cat Lorem ipsum dolorfuckfuckfuck ass sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum.","fun sad bad");
var entry4 = new Entry("I'm sleepy today","Matt", " dog Lorem ipsum dolor sit shit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum.","fun sad");




newJournal.addEntry(entry1);
newJournal.addEntry(entry2);
newJournal.addEntry(entry3);
newJournal.addEntry(entry4);

// console.log(newJournal.entries);
// console.log(journal1.numOfEntries());

// journal1.deleteEntry(entry2);

// console.log(journal1.entries);
// console.log(journal1.numOfEntries());
// console.log(journal1.findAlltags("lame"));

// console.log(journal1.numOfEntries());
// console.log(journal1.findAllstrings("cat"));




