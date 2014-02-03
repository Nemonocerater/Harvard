function showUploadImage(){
	$("#file").show('slow');
	$("#submit").show('slow');
}

function hideUploadImage(){
	setTimeout(function(){
		$("#file").hide('slow');
		$("#submit").hide('slow');
	}, 2000);	
}

//add a package to database when click the submit button
function submit() {
	var packageName = $('#packageName').val();
	var price = $('#price').val();
	var details = $('#details').val();
	$.post('../php/addPackage.php', { postPackageName: packageName, postPrice: price, postDetails: details },
		function (data) {
		    window.location.reload();
		});
}

//logout from the club page
function logout() {
	var r = confirm("Do you really want to log out?");
	if (r) {
		window.location.href = '../php/logout.php'
	}
}


var ClubDetails = {
	update: function() {
		var details = ClubDetails.get();
		$.post('../php/updateClubDetails.php', details);
	},
	get: function() {
		var clubName = $('#ClubName').children('input').val();
		var clubMembers = parseInt($('#ClubMembers').val());
		var schoolName = $('#SchoolName').children('input').val();
		var clubDetails = $('#ClubDetails').val();
		var emailAddress = $('#EmailAddress').val();
		
		var details = {
			postClubName: clubName,
			postClubMembers: clubMembers,
			postSchoolName: schoolName,
			postClubDetails: clubDetails,
			postEmailAddress: emailAddress
		};
		return details;
	}
}

$(document).ready(function () {
	loadClubPackages();
	loadClubDetails();

	$('#ClubInformation').on('change', '.details', ClubDetails.update);

	function loadClubPackages() {
		$.getJSON("../php/getPackagesByClub.php", function (data) {
			var packageName, packagePrice, clubPackagesSize;
			clubPackagesSize = data.packages.length;
			for (var i = 0; i < clubPackagesSize; i++) {
				packageName = data.packages[i].packageName;
				packagePrice = data.packages[i].packagePrice;
			    $("#packages").prepend("<div><div class=\"panel panel-success panel-default\"><div class=\"panel-heading panel-success\"><h3 class=\"panel-title\"><span> "+packageName+ "- Active </span><span class=\"pull-right\"><span class=\"glyphicon glyphicon-trash\">"+"&nbsp"+"</span><span class=\"glyphicon glyphicon-star\"></span></span></h3></div><div class=\"panel-body\"><div class=\"\"><blockquote class=\"pull-left text-muted\"><small>Detail of the package goes here </small></blockquote><a class=\"pull-right\"> $"+packagePrice+"</a></div></div></div></div>");
			}
		});
	}

	function loadClubDetails() {
		$.getJSON("../php/getClub.php", function (data) {

			var clubName = data.clubDetails[0].clubName;
			var emailAddress = data.clubDetails[0].emailAddress;
			var numberOfMembers = data.clubDetails[0].numberOfMembers;
			var schoolName = data.clubDetails[0].schoolName;
			var clubDescription = data.clubDetails[0].clubDescription;
			var imageLocation = data.clubDetails[0].imageLocation;

			$("#ClubName").children('input').val(clubName);
			if (numberOfMembers === null)
			{
				$("#ClubMembers").val("#ofMembers");
			}
			else
			{
				$("#ClubMembers").val(numberOfMembers);
			}
			
			$("#SchoolName").children('input').val(schoolName);
			$("#ClubDetails").val(clubDescription);
			$("#clubPic").attr("src", imageLocation);
			$("#EmailAddress").val(emailAddress);

		});
	}

});
