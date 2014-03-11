function logout(){
	var r = confirm("Do you really want to log out?");
	if (r) {
	   window.location.href = '../php/logout.php'
	}
}
function trashIcon(ele){
	var cost = ele.parentNode.parentNode.parentNode.getElementsByTagName('a')[0].innerHTML;
	var name = ele.getElementsByTagName('span')[0].innerHTML;
	var details = ele.parentNode.parentNode.parentNode.getElementsByTagName('small')[0].innerHTML;
	alert("trash");
	alert(cost);
}
function wishlist(ele){
	var cost = ele.parentNode.parentNode.parentNode.getElementsByTagName('a')[0].innerHTML;
	var name = ele.getElementsByTagName('span')[0].innerHTML;
	var details = ele.parentNode.parentNode.parentNode.getElementsByTagName('small')[0].innerHTML;
	alert("wish");
	alert(name);
}
function sponsor(ele){
	var cost = ele.parentNode.parentNode.parentNode.getElementsByTagName('a')[0].innerHTML;
	var name = ele.getElementsByTagName('span')[0].innerHTML;
	var details = ele.parentNode.parentNode.parentNode.getElementsByTagName('small')[0].innerHTML;
	console.log("sponsor");
	
	var details = ele.parentNode.parentNode.parentNode.getElementsByTagName('small')[0].innerHTML;
		$.post("../php/charles/sponsorPackage.php", {costValue: cost, packageName:name, packageDetails:details},
		function(data)
		{
			//console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
			//load_Sponsorshiplist();
		}, 'json');
		console.log("3 seconds until sponsorshiplist refresh...");
		setTimeout(function(){
			load_Sponsorshiplist();
		},3000);
	
}
function load_Wishlist(){
	$.post("../php/charles/loadWishlist.php", {postsearch: searchValue},
	function(data)
	{	
		$("#wishlist").empty();
		$.each(data.result, function(){
		    $("#wishlist").prepend("<div><div class=\"panel panel-success panel-default\"><div class=\"panel-heading panel-success\"><h3 class=\"panel-title\"><span> "+this['Package Name']+ "</span><span class=\"pull-right\"><span onclick=\"sponsor(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-gift\">"+"&nbsp"+"</span><span onclick=\"trashIcon(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-trash\">"+"&nbsp"+"</span><span onclick=\"wishlist(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-star\"></span></span></h3></div><div class=\"panel-body\"><div class=\"\"><blockquote class=\"pull-left text-muted\"><small>"+this['Detail']+"</small></blockquote><a class=\"pull-right\"> $"+this['Price']+"</a></div></div></div></div>");
		});
	}, 'json');
}
function load_Sponsorshiplist(){
	console.log("starting loading sponsorshiplist");
	$.post("../php/charles/loadSponsorshiplist.php",
	function(data)
	{	
		console.log("emptying sponsorship list");
		$("#sponsoredlist").empty();
		$.each(data.result, function(){
		    $("#sponsoredlist").prepend("<div><div class=\"panel panel-success panel-default\"><div class=\"panel-heading panel-success\"><h3 class=\"panel-title\"><span> "+this['Package Name']+ "</span><span class=\"pull-right\"><span onclick=\"sponsor(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-gift\">"+"&nbsp"+"</span><span onclick=\"trashIcon(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-trash\">"+"&nbsp"+"</span><span onclick=\"wishlist(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-star\"></span></span></h3></div><div class=\"panel-body\"><div class=\"\"><blockquote class=\"pull-left text-muted\"><small>"+this['Detail']+"</small></blockquote><a class=\"pull-right\"> $"+this['Price']+"</a></div></div></div></div>");
		});
	});
}

function search(){
	var searchValue = $('#searchValue').val();
	if(searchValue == "") {
		$.getJSON("../php/getAllPackages.php", function (data) {
			$("#packages").empty();
			$.each(data.result, function(){
			    $("#packages").prepend("<div><div class=\"panel panel-success panel-default\"><div class=\"panel-heading panel-success\"><h3 class=\"panel-title\"><span> "+this['Package Name']+ "</span><span class=\"pull-right\"><span onclick=\"sponsor(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-gift\">"+"&nbsp"+"</span><span onclick=\"trashIcon(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-trash\">"+"&nbsp"+"</span><span onclick=\"wishlist(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-star\"></span></span></h3></div><div class=\"panel-body\"><div class=\"\"><blockquote class=\"pull-left text-muted\"><small>"+this['Detail']+"</small></blockquote><a class=\"pull-right\"> $"+this['Price']+"</a></div></div></div></div>");
			});
		});
	}
	else {
		$.post("../php/search.php", {postsearch: searchValue},
		function(data)
		{	
			$("#packages").empty();
			$.each(data.result, function(){
			    $("#packages").prepend("<div><div class=\"panel panel-success panel-default\"><div class=\"panel-heading panel-success\"><h3 class=\"panel-title\"><span> "+this['Package Name']+ "</span><span class=\"pull-right\"><span onclick=\"sponsor(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-gift\">"+"&nbsp"+"</span><span onclick=\"trashIcon(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-trash\">"+"&nbsp"+"</span><span onclick=\"wishlist(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-star\"></span></span></h3></div><div class=\"panel-body\"><div class=\"\"><blockquote class=\"pull-left text-muted\"><small>"+this['Detail']+"</small></blockquote><a class=\"pull-right\"> $"+this['Price']+"</a></div></div></div></div>");
			});
		}, 'json');
	}
}

var CompanyDetails = {
	update: function() {
		var details = CompanyDetails.get();
		$.post('../php/updateCompanyDetails.php', details);
	},
	get: function() {
		var email = $('#email').val();
		var name = $('#companyName').val();
		var description = $('#description').val();
		
		var details = {
			postCompanyEmail: email,
			postCompanyName: name,
			postCompanyDescription: description
		};
		console.log(details);
		return details;
	}
}

$(document).ready(function () {	
	load();
	
	$('#companyDetails')
		.on('change', CompanyDetails.update);	
		
	function load(){
		load_CompanyInfo();
		load_allPackages();
		initTabView();
		load_Sponsorshiplist();
	}

	function load_CompanyInfo(){
		$.getJSON("../php/getCompany.php",
			function(data)
			{
				console.log(data);
				var details = data["companyDetails"][0];
				console.log(details);
				$("#email").val(details["emailAddress"]);
				$("#companyName").val(details["companyName"]);
				$("#description").val(details["companyDescription"]);
			});
	}
	function load_allPackages() {
		$.getJSON("../php/getAllPackages.php", function (data) {
			$("#packages").empty();
			$.each(data.result, function(){
			    $("#packages").prepend("<div><div class=\"panel panel-success panel-default\"><div class=\"panel-heading panel-success\"><h3 class=\"panel-title\"><span> "+this['Package Name']+ "</span><span class=\"pull-right\"><span onclick=\"sponsor(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-gift\">"+"&nbsp"+"</span><span onclick=\"trashIcon(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-trash\">"+"&nbsp"+"</span><span onclick=\"wishlist(this.parentNode.parentNode)\" class=\"glyphicon glyphicon-star\"></span></span></h3></div><div class=\"panel-body\"><div class=\"\"><blockquote class=\"pull-left text-muted\"><small>"+this['Detail']+"</small></blockquote><a class=\"pull-right\"> $"+this['Price']+"</a></div></div></div></div>");
			});
		});
	}

	function initTabView(){
				var x = document.getElementsByClassName('tab-view')
				for(var i=0; i < x.length; i++) {
				  x[i].onclick = displayTab;
				}

				var prevViewedTab = null;

				function displayTab(e) {
				var idOfTabToDisplay = this.getAttribute("data-tab")

				if(prevViewedTab) {
				  prevViewedTab.style.display = 'none';
				}

				var tabToDisplay = document.getElementById(idOfTabToDisplay);
				  tabToDisplay.style.display = 'block';
				  prevViewedTab = tabToDisplay;
				}

				var defaultTab = document.getElementsByClassName('default-tab')
				  if (defaultTab.length) {
					defaultTab[0].style.display = 'block';
					prevViewedTab = defaultTab[0];
				  }
			  }
	});

