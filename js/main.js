//Brandon McGhee
//ASD 1302

//Global Variables
var shelveValue;

//Inventory Function that will fill the Browse Page
var inventory = function() {

	var getUL = $('#inventory');

	$.couch.db("spirittracker").view("spirittracker/spirits", {
		success: function(data){
			$.each(data.rows, function(index, spirit) {
				var id = spirit.value._id;
				var name = spirit.value.spiritName;
				var family = spirit.value.family;
				var quantity = spirit.value.quantity;
				var shelve = spirit.value.shelve;
            	var bottleMIL = spirit.value.bottleMIL;
            	var date = spirit.value.date;
           		var rev = spirit.value._rev;
           		var nam = $('<h1>');
           		var fam = $('<p>');
           		var shv = $('<p>');
           		var dat = $('<p>');
           		var siz = $('<p>');
           		var qua = $('<p>');
           		var mainLi = $('<li>');
           		var subLi = $('<li>');
           		var linksLi = $('<p>');
            		
           		subLi.append(nam.text(name));
           		subLi.append(fam.text("Family: " + family));
           		subLi.append(shv.text("Quality: " + shelve));
           		subLi.append(dat.text("Purchased: " + date));
           		subLi.append(siz.text("Size: " + bottleMIL));
           		subLi.append(qua.text("Quantity: " + quantity));

           		mainLi.append(subLi);
           		getUL.append(mainLi);
           		
           		makeItemLinks(id, rev, linksLi);
           		mainLi.append(linksLi);
                   
            	});
        		getUL.listview('refresh');
           	    $('#editLink').button();
           	    $('#deleteLink').button();
            	}
    		});

    };

//News generator for news page
var newsResults = function() {
        var array = [];
        var arrayfinal = [];
        var list = $('#newsList');
        var i = 0;
         
        $.couch.db("spirittracker").view("spirittracker/spirits", {
    		success: function(data){
    			$.each(data.rows, function(index, spirit) {
    				var key = spirit.value._id;
    				var family = spirit.value.family;
    				
    				array.push(family[i]);
    				array.sort();
    				i++;
                	});
        		}
        });
    
    //Variable to hold the previous part of array, in for loop its compared to see if a duplicate entry exists
    var end = array[0];
    
    //Loop that looks for duplicates
    for (var z = 1; z < array.length; z++) {
        if (z == 1) {
        arrayfinal.push(array[0]);
        }

        if (array[z] != end ) {
        arrayfinal.push(array[z]);
        }
            end = array[z];
    }
    
        for (var x = 0, y = arrayfinal.length; x < y; x++) {
                var li = $('<li></li>');
                var data = arrayfinal[i];
                li.html(data);
                list.append(li);
        }
        list.listview('refresh');
};

    //Gets the current date and puts a default value in the date section of the spirit form
    var todaysDate = function() {
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        
        if (day < 10) {
            day = day + "0";
        }
        
        if (month < 10) {
            month = "0" + month;
        }

        today = year + "-" + month + "-" + day;
        $('#date').val(today);
        
    };
    
//The functions below can go inside or outside the pageinit function for the page in which it is needed.

function getImage(catName, makeSubList) {
    var imageLi = $('<p>');
    makeSubList.append(imageLi);
    var newImg = $('<img />');
    var setSrc = newImg.attr("src", "images/" + catName + ".png");
    imageLi.append(newImg);
};
                


    //Constructs delete and edit links
function makeItemLinks(id, rev, linksLi) {
    var breakTag = $('<br />');
    var editLink = $('<a />');
    editLink.attr("data-role", "button");
    editLink.attr("data-theme", "e");
    editLink.attr("data-icon", "gear");
    editLink.attr("id", "editLink");
    editLink.attr("href", "#add");
    editLink.attr("key", id);
    editLink.attr("rev", rev);
    var editText = "Edit";
    editLink.on("click", editSpirit);
    editLink.html(editText);
    linksLi.append(editLink);
    
    //Delete
    var deleteLink = $('<a />');
    deleteLink.attr("data-role", "button");
    deleteLink.attr("data-theme", "c");
    deleteLink.attr("data-icon", "delete");
    deleteLink.attr("id", "deleteLink");
    deleteLink.attr("href", "#");
    deleteLink.attr("key", id);
    deleteLink.attr("rev", rev);
    var deleteText = "Delete Spirit";
    deleteLink.on("click", deleteSpirit);
    deleteLink.html(deleteText);
    linksLi.append(deleteLink);


    
    };
    
  //Function called to edit user's spirit
    function editSpirit() {
    	var key = $(this).attr("key");
    	var rev = $(this).attr("rev");
    	var name;
    	var family;
    	var quantity;
    	var shelve;
    	var bottleMIL;
    	var date;
        var editSubmit = $('#submit');
        alert("Edit Spirit Page: Key is " + key + " and Rev is " + rev);
        editSubmit.attr("key", key);
        editSubmit.attr("rev", rev);
    	
    	$.couch.db("spirittracker").view("spirittracker/spirits", {
    		success: function(data){
            	$.each(data.rows, function(index, spirit) {
            		var id = spirit.value._id;

            		if (id === key) {        		
            			name = spirit.value.spiritName;
            			family = spirit.value.family;
            			quantity = spirit.value.quantity;
            			shelve = spirit.value.shelve;
            			bottleMIL = spirit.value.bottleMIL;
            			date = spirit.value.date;
            			rev = spirit.value._rev;
            			
            		    $('#spiritname').val(name);
            		    $('#quantity').val(quantity);
            		    $('#family').val(family);
            		    $('#date').val(date);
            		 
            		    
                        //Change value of submit button to edit
                        $('#submit').val("Edit Spirit");
                        
                        editSubmit.on('click', function() {
                        	//myForm.validate();
                        	storeData(key, rev);
                        });  
                      
            		}
            		
        		    ///Fix this!!!!!!!!!!!!
                    switch (shelve) {
                    	case "Top Shelve":
                    		$('#topshelve').attr("checked", true);
                    		break;
                    	case "Middle Shelve":
                    		$('#middleshelve').attr("checked", true);
                    		break;
                    	case "Bottom Shelve":
                    		$('#bottomshelve').attr("checked", true);
                    		break;
                    	default:
                    		alert("no quality");
                    }


                    switch (bottleMIL) {
                    	case "Mini (50 ML)":
                    		$('#mini').attr('checked', true);
                            break;
                    	case "Half Pint (200 ML)":
                    		$('#halfpint').attr('checked', true);
                    		break;
                    	case "Pint (375 ML)":
                    		$('#pint').attr('checked', true);
                    		break;
                    	case "Fifth (750 ML)":
                    		$('#fifth').attr('checked', true);
                    		break;
                    	case "Liter (1000 ML)":
                    		$('#liter').attr('checked', true);
                    		break;
                    	case "Magnum (1500 ML)":
                    		$('#magnum').attr('checked', true);
                    		break;
                    	case "Half Gallon (1750 ML)":
                    		$('#halfgallon').attr('checked', true);
                    		break;
                    	case "Double Magnum (3000 ML)":
                    		$('#doublemagnum').attr('checked', true);
                    		break;
                    	default:
                    		alert("Error: No Bottle Size could be listed");
                    }
            		
            	});
    		}
    	});
           
    };





//Deletes selected spirit
var deleteSpirit = function (){
	var doc = {
			_id: $(this).attr("key"),
			_rev: $(this).attr("rev")
	};
	var ask = confirm("Are you sure you want to delete this spirit from your inventory?");
	if (ask) {
		$.couch.db("spirittracker").removeDoc(doc, {
			success: function(data) {
        		alert("Spirit was Removed");
                location.reload();
                $('#inventory').listview("refresh");
        	}
        });
	}else{
		alert("Spirt was NOT removed.");
    }        
};




//Spirit Storage Function
var storeData = function(key, rev){
	var doc = {
			_id: key,
			_rev: rev
	};
	
	alert("Store Data key is " + key);
	alert("Store Data rev is " + rev);

	var spirit            = {};
		spirit.spiritName = $('#spiritname').val();
      	spirit.quantity   = $('#quantity').val();
       	spirit.bottleMIL  = $('input:radio[name=size]:checked').val();
       	spirit.shelve     = $('input:radio[name=shelve]:checked').val();
       	spirit.family     = $('#family').val();
      	spirit.date       = $('#date').val();
      	spirit._id		  = $(this).attr("key");
      	spirit.type		  = "spirit";
      	spirit._rev		  = $(this).attr("rev");
            
   	$.couch.db("spirittracker").saveDoc(spirit, {
        success: function(data) {
            $('#inventory').listview("refresh");
        }
   	});
    //location.reload();
   	alert("Spirit Stored!");

};


          


/////PAGE LISTENERS/////

//Home Page Listener
$('#home').on('pageinit', function(){
	
	$.couch.info({
	    success: function(data) {
	        console.log(data);
	    }
	});
	
	
	
	
	todaysDate();
	//newsResults();
        	
});

var urlVars = function(urlData){
	var urlData = $($.mobile.activePage).data("url");
	var urlParts = urlData.split('?');
	var urlPairs = urlParts[1].split('&');
	var urlValues = {};
	for (var pair in urlPairs) {
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	console.log(urlValues);
	return urlValues;
} 

$('#spirits').live('pageshow', function(){
	var curSpirit = urlVars()["spirit"];
	var curFamily = urlVars()["family"];
	var curShelve = urlVars()["shelve"];
	var curDate = urlVars()["date"];
	var curSize = urlVars()["bottleMIL"];
	var curQuantity = urlVars()["quantity"];
	var nam = $('<h1>');
	var fam = $('<p>');
	var shv = $('<p>');
	var dat = $('<p>');
	var siz = $('<p>');
	var qua = $('<p>');
	var urlData = $(this).data("url");
	var mainLi = $('<li>');
	var subLi = $('<li>');
	
	subLi.append(nam.text(curSpirit));
	subLi.append(fam.text("Family: " + curFamily));
	subLi.append(shv.text("Quality: " + curShelve));
	subLi.append(dat.text("Purchased: " + curDate));
	subLi.append(siz.text("Size: " + curSize));
	subLi.append(qua.text("Quantity: " + curQuantity));

	mainLi.append(subLi);
	
	$('#mainList').append(mainLi);
	
	$('#mainList').listview('refresh');

});

//Browse Page Listener
$('#browse').on('pageinit', function() {

//Empties Local Storage of all user or system data
var clearStorage = function(){
        var answer = confirm("Do you want to clear all the Spirits in your Inventory?");
        if (answer) {
            if (localStorage.length === 0) {
                alert("Spirit Storage is already Empty!");
            }else{
                localStorage.clear();
                alert("Spirit Storage has been Emptied");
                location.reload();
            }
        toggleControls("off");
        }else{
            return false;
        }
};

	$('#delete').on('click', function() {
		clearStorage();
    });
        
    //Running Iventory!
    inventory();

                
});

//Add page listener
$('#add').on('pageinit', function(){
	if ($(this).attr("key") === undefined) {
		$('#middleshelve').attr('checked', true);
		$('#fifth').attr('checked', true);  
		$('#quantity').slider("refresh");
		$('#spiritname').val("Enter name of spirit");
	};
    $('#spiritname').on('click', function() {
    	$('#spiritname').val("");
    });
        
    var myForm = $('#addspiritform');
    var errorlink = $('#errorlink');
                         
    myForm.validate({
    	ignore: '.ignoreValidation',
    	invalidHandler: function(form, validator) {
                                
    		errorlink.click();
            var html = '';
            for (var key in validator.submitted) {
            	var label = $('label[for^="' + key + '"]').not('[generated]');
            	var legend = label.closest('fieldset').find('.ui-controlgroup-label');
            	var fieldName = legend.length ? legend.text() : label.text();
            	html += '<li>' + fieldName + '</li>';
            };
            
            $('#errors ul').html(html);
                                
            },
            submitHandler: function() {
            	var data = myForm.serializeArray();
            	//storeData();
            }
    });
                
    $('#reset').on('click', function() {
    	resetForm();
    	location.reload('#add');
    });
                
    var resetForm = function() {
    	$('#spiritname').val('');
    	$('#quantity').val(1);
    	$('#family').val('');
    	todaysDate();
    	$('#topshelve').attr('checked', false);
    	$('#middleshelve').attr('checked', true);
    	$('#bottomshelve').attr('checked', false);
    	$('#fifth').attr('checked', true);
    };
                

                
});

//News page listener
$('#news').on('pageinit', function(){
	$('#newsList').listview('refresh');

});



//////END PAGE LISTENERS//////
