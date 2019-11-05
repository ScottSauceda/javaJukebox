class Jukebox {

    constructor(app) {
       
       // 0.) get app arg and style it -- get BG image to appear for instant sense of progress
        
        this.app = document.getElementById('app');
        
//        this.app.innerHTML = 'Hello world from JukeBox class';
        
        this.app.style.cssText = "background-image: url(images/jukebox-interface.jpg); background-size: cover; width: 100%; min-height: 820px;";
        
//        alert('Hello World');
       
       // make DOM elements: everything is Absolute Positioned, except for buttons in an AP div
        
        
       //################################//
        
        
       // 1.) div to hold the 12 btns
        this.jbDivs = document.createElement('div');
        this.jbDivs.className = 'jbDivs';
        this.jbDivs.innerHTML = "";
        this.jbDivs.style.cssText = 'display:none';
        this.app.appendChild(this.jbDivs);
    
        
        // these buttons need to go into makeButtons() function below constructor;
        
        
       // 2.) sound object must use methods this.sound.createElement("controls") and this.sound.setAttribute("controls","controls") or it won't work
        
        this.sound = new Audio();
        this.sound.setAttribute('controls', 'controls');
        this.sound.autoplay = true;
        this.sound.className = 'musicControls';
        this.app.appendChild(this.sound);
                
       // 3.) a span to hold the volume slider label: VOL
        this.sliderSpan = document.createElement('span');
        this.sliderSpan.style.cssText = 'display:none';
        this.sliderSpan.className = 'sliderSpan';
        this.app.appendChild(this.sliderSpan);
        
       // 4.) a slider for the volume controller -- the audio controller does not come w volume
        this.sliderControl = document.createElement('input');
        this.sliderControl.id = 'sliderControl';
        this.sliderControl.setAttribute('type', 'range');
        this.sliderControl.setAttribute('min', '0');
        this.sliderControl.setAttribute('step', '0.1');
        this.sliderControl.setAttribute('max', '1.0');
        this.sliderControl.addEventListener('change', this.setV.bind(this));
       this.sliderSpan.appendChild(this.sliderControl);
        
       // 5.) a div to display info about current song: Song, Artist, Album
        this.musicInfo = document.createElement('div');
        this.musicInfo.className = 'musicInfo';
        this.musicInfo.innerHTML = '';
        this.musicInfo.style.cssText = 'display:none';
        this.app.appendChild(this.musicInfo);
        
       // 6.) a div to display the album cover -- see blackjack app for CSS to do perspective
        this.albumDiv = document.createElement('div');
        this.albumDiv.style.cssText = 'display: none';
        this.albumDiv.className = 'albumDiv';
        this.app.appendChild(this.albumDiv);
              // the album of the current song appears all during play BUT if user mousesover
              // any button, whether song is playing or not, that album appears until mouseout
         this.albumDivImg = new Image();
        this.albumDiv.appendChild(this.albumDivImg);

       // 7.) a div to hold the quarter, and another div right over the coin slot
        this.coinDiv = document.createElement('div');
        this.coinDiv.className = 'coinDiv';
       
       this.coinDiv.id = 'coinDiv';
       this.coinDiv.addEventListener('ondragover', this.ondragover.bind(this));
        this.app.appendChild(this.coinDiv);
        
        ////////////////////////
        
        this.coinSlot = document.createElement('div');
        this.coinSlot.className = 'coinSlot';
       
       this.coinSlot.id = 'coinSlot'; 
        
       this.coinSlot.addEventListener('click', this.playRandomSong.bind(this));
       this.app.appendChild(this.coinSlot);
        
        
       // 8.) the quarter image -- starts tails, flips to heads when it is dropped into slot !
              // drag and drop quarter functionality -- see drag-and-drop exercise file
              // hint: use inline fat-arrow functions for drag-and-drop, as : 
              //        this.coin.addEventListener('dragstart', (event) => {
              //          event.dataTransfer.setData('text', event.target.id)
              //       })
        
        this.coin = new Image();
        
        this.coin.className = 'coin';
        this.coin.id = 'coin';
        this.coin.src = 'images/coins/tails.png';
        this.coin.setAttribute('draggable','true');
        this.coin.addEventListener('ondragstart', this.ondragstart.bind(this));
        this.coinDiv.appendChild(this.coin);
        
        
       // 9.) a bunch of vars are needed: array to hold AJAX-loaded parsed JSON song data 
              // you need to make your own JSON file: [ { "title": "Light My Fire", "artist": "The Doors" }] -- etc.
        
       // 10.) other vars may be needed to keep track of currently playing song, etc 
              // you need a good algorithm to figure this out
          
       // 11.) constructor finishes with an AJAX call to the songs.json file; the loaded data is   
              // parsed and handed off to the songsArr
              // inside the AJAX if-statement -- when data is loaded -- call the makeButtons method
              // a bunch of methods are needed after the constructor to run the jukebox: 
        
         const xhr = new XMLHttpRequest()
            xhr.onreadystatechange = () => {
                if(xhr.status == 200 && xhr.readyState == 4) {

                    this.songs = JSON.parse(xhr.responseText);
                    // sort song title in alphabetical order
                    this.songTitle = this.songs.map(e => e.title).sort();
                    // simply loop through artist without altering order of songs
                    this.songArtist = this.songs.map(e => e.artist);
                    // simply loop through albums without altering order of songs
                    this.songAlbum = this.songs.map(e => e.album);
//                    console.log(this.songTitle);
//                    console.log(this.songArtist);
//                    console.log(this.songAlbum);
                    this.makeButtons.apply(this);
                    
                } // end if
            } // end onreadystatchange
        xhr.open('GET', 'js/songs.json', true);
        xhr.send();
        
//        this.playSong.bind(this);
//        this.playRandomSong.bind(this);
                    
    } // end constructor()
    
    ///////############*****************############################********************////////////
    
    // END CONSTRUCTOR //
    
     ///////############*****************############################********************////////////
    
    
      // 12.) makeButtons() runs a button-making for-loop: each btn must call playSong method 
    makeButtons() { 
        
        this.jbDivs.style.cssText = 'display:display';
        this.jbButton = document.createElement('button');
        this.sliderSpan.style.cssText = 'display:display';
        
        this.songs.map((e,i) => {
            this.jbButton = document.createElement('button');
            this.jbButton.id = i;
            this.jbButton.title = e.title;
            this.jbButton.album = e.album;
            this.jbButton.artist = e.artist;
            this.jbButton.className = 'buttons';
            this.jbButton.innerHTML = e.title;
            this.jbButton.addEventListener('click', this.playSong.bind(this));        
//            this.jbButton.addEventListener('click', this.playRandomSong.bind(this));
            this.jbDivs.appendChild(this.jbButton);
//            console.log(this.jbButton);
            
        }); // end this.songTitle.map
        
    } // makeButtons() 
    
    
    
    // 13.) playSong() method plays the song for that particular button
               // also displays album cover and outputs details: Song title, artist, album
    playSong() {  
        
        // DOM elements to display/play your songs.json info/audio file
                
         this.albumDiv.style.cssText = 'display: display';
        
       this.musicInfo.style.cssText = 'display: display';
        
       this.musicInfo.innerHTML = `<p>${event.target.title}<br>
            ${event.target.artist}<br>
            ${event.target.album}<br>
        </p>`;

       this.sound.src = `songs/${event.target.title}.mp3`;
        
        this.sound.play();
        
        this.albumDivImg.src = `images/albumArt/${event.target.album}.jpg`;
        
        
       
     } // playSong()

        
    
    
    
    
       // 14.) playRandomSong() runs when the user drops the quarter into the slot
               // a rand num is needed to pick a song -- when song is done it is spliced out of array so that it does not repeat
               // the quarter gets you all 12 songs -- what a cheap jukebox !! autoplay next song
    
    playRandomSong() {
        
        const randSong = this.songs.sort((a, b) => 0.5 - Math.random());
        
        for(let i = 0; i < randSong.length; i++) {
        
        this.sound.src = `songs/${randSong[i].title}.mp3`;
            
        this.sound.play();
            
        this.albumDiv.style.cssText = 'display: display';
            
        this.albumDivImg.src = `images/albumArt/${randSong[i].album}.jpg`;
        
       this.musicInfo.style.cssText = 'display: display';
        
       this.musicInfo.innerHTML = `<p>${randSong[i].title}<br>
            ${randSong[i].artist}<br>
            ${randSong[i].album}<br>
        </p>`;
            
        } // end for loop
        
    } // playRandomSong()
    
        
    
    
    setV() {
//        console.log('HelloWorld');
        this.sound.volume = this.sliderControl.value;
        
    }
    
    ondragstart() {
//        event.dataTransfer.setData('text', event.target.id);
//        alert('You grabbed the coin');
    }
    
    ondragover() {
//        event.preventDefault();
        alert('You are dragging coin');
    }
    
    ondrop() {
        
        alert('You dropeed the coin in coin slot');
    }
    
    // Others : control mouseover and mouseout of button to show-hide album cover; control volume
    // clicking mute should set slider to zero
    
    // 15.) playRandomSong, setVolume, among others
    
    onmouseout() {
        
    }
    
    
    
    mouseIn() {
        
    }
    
    muteSlider() {
        
    }
 
} // end Jukebox() Class
