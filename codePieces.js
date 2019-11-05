    class Jukebox {

        constructor (app) {
        
       // 0.) get app arg and style it -- get BG image to appear for instant sense of progress
            
                //################################
            
       // 1.) div to hold the 12 btns
            
                //*****************************
            
            // these buttons need to go into makeButtons() function below constructor;
            

       // 2.) sound object must use methods this.sound.createElement("controls") and this.sound.setAttribute("controls","controls") or it won't work
            
            //################################
            
       // 3.) a span to hold the volume slider label: VOL
            
            //*****************************
            
       // 4.) a slider for the volume controller -- the audio controller does not come w volume
            
            //################################
            
        
       // 5.) a div to display info about current song: Song, Artist, Album
            
            //*****************************
    
      // 6.) a div to display the album cover -- see blackjack app for CSS to do perspective
            
            //################################
       
      // 7.) a div to hold the quarter, and another div right over the coin slot
            
            //*****************************
            
       // 8.) the quarter image -- starts tails, flips to heads when it is dropped into slot !
              // drag and drop quarter functionality -- see drag-and-drop exercise file
              // hint: use inline fat-arrow functions for drag-and-drop, as : 
              //        this.coin.addEventListener('dragstart', (event) => {
              //          event.dataTransfer.setData('text', event.target.id)
              //       })
            
        
            //################################
            
            
       // 9.) a bunch of vars are needed: array to hold AJAX-loaded parsed JSON song data 
              // you need to make your own JSON file: [ { "title": "Light My Fire", "artist": "The Doors" }] -- etc.
            
            //*****************************
            
       // 10.) other vars may be needed to keep track of currently playing song, etc 
              // you need a good algorithm to figure this out
            
            //################################
            
       // 11.) constructor finishes with an AJAX call to the songs.json file; the loaded data is   
              // parsed and handed off to the songsArr
              // inside the AJAX if-statement -- when data is loaded -- call the makeButtons method
              // a bunch of methods are needed after the constructor to run the jukebox: 
            
            //*****************************
      
            
        } // close constructor
        
            //################################
        //*****************************
            //################################
         //*****************************
            
        
        
      // 12.) makeButtons() runs a button-making for-loop: each btn must call playSong method 
        
        //################################
        
      // 13.) playSong() method plays the song for that particular button
               // also displays album cover and outputs details: Song title, artist, album
        
        
        //*****************************
        
      // 14.) playRandomSong() runs when the user drops the quarter into the slot
               // a rand num is needed to pick a song -- when song is done it is spliced out of array so that it does not repeat
               // the quarter gets you all 12 songs -- what a cheap jukebox !! autoplay next song
        
        // Others : control mouseover and mouseout of button to show-hide album cover; control volume
    // clicking mute should set slider to zero
        
        //################################
    
    // 15.) playRandomSong, setVolume, among others
        
        //*****************************
            
    }