var projectId;
var title;
var subtitle;
var year;
var titleImage;

var projectList = new Array();

//class declaration
class Project {
  constructor(projectId,title, subtitle, year, titleImage) {
    this.projectId = projectId;
    this.title = title;
    this.subtitle = subtitle;
    this.year = year;
    this.titleImage = titleImage;
  }
}

$(function () {


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

  // create art List

  for (let p of data.InteriorProject) {
    projectList.push(
      new Project(p.projectId, p.title, p.subtitle, p.year, p.titleImage)
    );
  }// end of art loop

  mainScreen();

}// end of loadJSON

function mainScreen() {
  $(".WK-scrollWrap").html("");
  $(".WK-scrollWrap").append (
    `
    <div class="smallspacer"></div>
    <div class="smallspacer"></div>
    <div class="smallspacer"></div>
    `
  )
  for (let x = 0; x < projectList.length; x++) {
    $(".WK-scrollWrap").append(
      `   
      <div id="list" class="WK-linkWrap WK-Notprojects WK-NotObjects floatleft" style="width:300px;">
      <a href="galleryI.html" class="WK-projectPageLink" id='${projectList[x].projectId}'>
          <img src="images/interior/${projectList[x].titleImage}" alt="image of an interior thing"
              class="WK-newsmediaImage">
          <div class="title-wrapper">
              <h2 class="img_head">${projectList[x].title}</h2>
              <p class="img_description">${projectList[x].subtitle} | ${projectList[x].year}</p>
          </div>
      </a>
      
      
      </div>
    `
    )
  }
}// end mainScreen


//save data to local storage
$(document).on("click", "#list>a",function(){
localStorage.setItem("projectId", $(this).closest("a").attr("id"));
});


