/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//Create globals variables through function valued variable
var Globals = (function()
{
    //Variable to hold initial batch of unshuffled duplicates    
    this.duplicates = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];
    //Create random duplicate array by putting unshuffled duplicate array through the
    //shuffle method
    this.randomDuplicates =  shuffle(this.duplicates);
    //create an empty local array variable
    var preShuffleImageNames = new Array();
    //loop through random duplicate array to create a random image array
    for(i = 0; i < this.randomDuplicates.length; i++)
    {
        preShuffleImageNames.push("car" + this.randomDuplicates[i] + ".png");
    }
    //create global variable by assigning local shuffled image array variable
    this.imageNames = preShuffleImageNames;
    //create other global variables needed by other functions
    this.clickedImages1 = null;
    this.clickedImages2 = null;
    this.SHOWING_NONE  = "showing none";
    this.SHOWING_ONE = "showing one";
    this.SHOWING_TWO = "showing two";
    this.GAME_OVER = "game over";
    this.currentState = SHOWING_NONE;

    return this;
})();

//This function will get all elements in table where pictures will go and add
//an event listener to each one to handle the click on the image for the game
//when the page is loaded
function initialize()
{
    for(var i = 0; i < 28; i++)
    {
        var gamespace = document.getElementById(i.toString());
        gamespace.addEventListener("click", imageClickHandler);   
    }   
}
//this event handler function when an image is clicked
function imageClickHandler()
{
    //grad the id of the image that was clicked
    var carID = this.id;
    //switch based on the current state of the game  
    switch(Globals.currentState){
        //if the image was clicked and no images were previously showing, it
        //will grab the index from the image Names array, and set the source
        //of the image to that image and store in a global variable to keep
        //track of the id. It will then remove the event listener so it can't
        //be clicked again and the current state will change
        case "showing none":
            var arrayID = Globals.imageNames[carID];
            document.getElementById(carID).setAttribute('src',"images/" + arrayID);
            Globals.clickedImages1 = carID;
            document.getElementById(Globals.clickedImages1).removeEventListener("click", imageClickHandler);
            Globals.currentState = Globals.SHOWING_ONE;
            break;
        //if the image was clicked and one image was previously showing, it
        //will grab the index from the image Names array, and set the source
        //of the image to that image and store in a global variable to keep
        //track of the id. It will then remove the event listener so it can't
        //be clicked again and the current state will change, it will then
        //set a timeout and a function will be called in 2 seconds to see if
        //the images sources match
        case "showing one":
            var arrayID = Globals.imageNames[carID];
            document.getElementById(carID).setAttribute('src',"images/" + arrayID);
            Globals.clickedImages2 = carID;
            document.getElementById(Globals.clickedImages2).removeEventListener("click", imageClickHandler);
            Globals.currentState = Globals.SHOWING_TWO;
            setTimeout(timeOutHandler, 2000); 
            break;
        default:
            break;
    }  
}
//This functiaon will be called after two images have been selected. It will get
//the source attribute value by the id's that were saved in the global variables
//before and store them in local variables. It will then compare the two. If they
//are equal, then the image sources will be replace by the cleared image and we
//will check to see if all the spaces on the board are equal to  cleared.png. If they
//are, that means the game is over, if they aren't then the game will continue and 
//the current state will change back to showing none. If they don't match, then
//the spaces source attibute value will go back to the hidden.png image and
//the eventhandlers will be added back to both of those space.
function timeOutHandler()
{
    var image1src = document.getElementById(Globals.clickedImages1).getAttribute("src");
    var image2src = document.getElementById(Globals.clickedImages2).getAttribute("src");
    
   
   
   if(image1src  === image2src)
   {
       document.getElementById(Globals.clickedImages1).setAttribute('src',"images/cleared.png");
       document.getElementById(Globals.clickedImages2).setAttribute('src',"images/cleared.png");
       
       var gameOverCheck = new Array(28);
       
       for(var i = 0; i < 28; i++)
       {
        var currentSrc = document.getElementById(i.toString()).getAttribute("src");
        gameOverCheck[i] = currentSrc; 
       } 
       
       if(gameovercheck(gameOverCheck) === true)
       {
           alert("Game Over! Congratulations!!");
           Globals.currentState = Globals.GAME_OVER;
       }
       else
       {
          Globals. currentState = Globals.SHOWING_NONE;
       }   
   }
   else
   {
       document.getElementById(Globals.clickedImages1).setAttribute('src',"images/hidden.png");
       document.getElementById(Globals.clickedImages2).setAttribute('src',"images/hidden.png");
       document.getElementById(Globals.clickedImages1).addEventListener("click", imageClickHandler);
       document.getElementById(Globals.clickedImages2).addEventListener("click", imageClickHandler);
       Globals.currentState = Globals.SHOWING_NONE;
   }
    
}
//This function will take an array of what all the current source attribute 
//values are for all the spaces on the board and check to see if they aren't equal
//to images/cleared.png. As soon as one space doesn't equal that, then this
//fuction will return false and the game will continue. If they all equal to the
//cleared.png, then the game is over.
function gameovercheck(arr)
{
    var L= arr.length-1;
    while(L){
        if(arr[L] !== "images/cleared.png") return false;
        L--;
    }
    return true;
}
//Using the famous Fisher-Yates algorithm to shuffle the duplicates array to
//get a random duplicate array
function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}