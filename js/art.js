var title;
var details;
var date;
var image;
var status;
var price;
var artList = new Array();

//class declaration
class Art {
  constructor(title, details, date, image, status, price) {
    this.title = title;
    this.details = details;
    this.date = date;
    this.image = image;
    this.status = status;
    this.price = price;
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

  for (let art of data.Art) {
    artList.push(
      new Art(art.title, art.details, art.date, art.image, art.status, art.price)
    );
  }// end of art loop

  mainScreen();

}// end of loadJSON

function mainScreen() {
  $(".JA-mainScroll").html("");
  $(".JA-mainScroll").append(
    `
    <div class="largespacer"></div>
    `
  )
  for (let x = 0; x < artList.length; x++) {
    $(".JA-mainScroll").append(
      `   
      <div class="JA-newsmedialink" style="width:400px;">
        <div class="JA-newsmediaImageWrap "> 
          <a href="images/art/${artList[x].image}" data-lightbox="art" class="JA-lightboxLink">
            <figure> 
              <img src="images/art/${artList[x].image}" alt="news thing" class="JA-newsmediaImage">
              <figcaption class="JA-newsmediaText">
                <p><strong>${artList[x].title}</strong></p>
                <p>${artList[x].details}&nbsp;&nbsp;|&nbsp;&nbsp;${artList[x].status}</p>
              </figcaption>
            </figure>
          </a>
          <div class="JA-newsmediaDate">
          <p>${artList[x].date}</p>
          </div>
        </div>     
      </div>
    `
    )
  }
}// end mainScreen


