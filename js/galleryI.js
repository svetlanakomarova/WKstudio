var title;
var subtitle;
var projectId;
var firstName;
var lastName;
var vision;

var imageList = new Array();

//class declaration
class Project {
  constructor(title, subtitle, projectId, vision) {
    this.title = title;
    this.subtitle = subtitle;
    this.projectId = projectId;
    this.vision = vision;
  }
}

$(function () {


  // get local storage values
  projectId = localStorage.getItem("projectId");

  $.ajax({
    type: "GET",
    url: "data/dataEn.json",
    dataType: "json",
    success: loadEnJSON,
    error: function (e) { alert(`${e.status} - ${e.statusText}`); }
  }); // end of ajax call

  

}); // end of doc ready

function loadEnJSON(data) {


  //retrieve art details from JSON file
firstName = data.PersonalData.FirstName;
lastName = data.PersonalData.LastName;
  // create art List

  for (let p of data.InteriorProject) {

if (p.projectId === projectId) {
  title = p.title;
  subtitle = p.subtitle;
  vision = p.vision;

  for (let img of p.imageList) {
    imageList.push(img.img);
  }


}

  }// end of art loop

  mainScreen();

}// end of loadJSON

function mainScreen() {


  $(".pagetitle").append (
    `
 
    <h1>${title}</h1>
    <!--project title-->
    <h2>${subtitle}</h2>
    <!--project subtitle-->

    `
  );
 
  $(".container").html("");

  for (let x = 0; x < imageList.length; x++) {
    $(".container").append(
      `   
      <a href="images/interior/${projectId}/${imageList[x]}" data-lightbox="${title}">
      <div class="projectimgwrap">
        <img src="images/interior/${projectId}/${imageList[x]}" alt="image ${x+1} of ${title}">
       </div></a>
       <div class="mediumspacer"></div>
    `

    )
  }// end for loop

  $(".endGallery").append(
    `
    <div class="pagetitle">
                <h1>${title}</h1>
                <!--project title-->
                <h2>${subtitle}</h2>
                <!--project subtitle-->
            </div>
            
  <div class="projecttext"><p> <strong>The Vision</strong> <br>
${vision}
                 </p>       
</div>

           


            <!--credits-------------------------------------------------->

            <div class="projectcredits">
                <div class="creditTitles">
                    <span> <strong>Leads: </strong>${firstName} ${lastName}</span> <br>

                </div>
            </div>
        </div>
        <!--page content end-->
        <!--credits end------------------------------------------->
        <div class="largespacer"></div>
    `
  )
  
}// end mainScreen


