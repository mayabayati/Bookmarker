 //listen to form submit 

var element = document.getElementById('myform');
if (element) {element.addEventListener('submit', saveBookmark, false);}



function saveBookmark(e){
    
   var siteName = document.getElementById("sitename").value;
   var siteURL = document.getElementById("siteurl").value;

   if(!siteName || !siteURL) {

   	alert("Please fill in the form");
   	return false;

   }

   var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
   var regex = new RegExp(expression);

   if(!siteURL.match(regex)){
   	alert ("Please Use a valid URL");
    return false;
   }
   
   
   var bookmark = {
   	name:siteName,
    url:siteURL
}


//localStorage.setItem('test', 'helloworld');

   if(localStorage.getItem('bookmarks') === null){
   	var bookmarks =[];

   	bookmarks = [];
   	bookmarks.push(bookmark);
   	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   }
   else {
   	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   	bookmarks.push(bookmark);
   	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

   }
   fetchBookmarks();

	e.preventDefault();

}

function deleteBookmark(url){

	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	for(var i =0; i< bookmarks.length; ++i){

		if (bookmarks[i].url == url) {
			bookmarks.splice(i, 1);
		}
  }

     localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

     fetchBookmarks();
}



function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
     //getting output
	var bookmarksResults = document.getElementById('bookmarksResults');

	//build output

	bookmarksresult.innerHTML='';

	for(var i =0; i< bookmarks.length; ++i){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

	bookmarksresult.innerHTML += '<div class="alert alert-info">'+
		                                 '<h3>'+ name +
		                                 '     <a class="btn btn-success" target ="_blank" href="'+url+'">Visit</a>     ' +
		                                 '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>     ' +

		                                 '</h3>' + '</div>';

	}



    
}