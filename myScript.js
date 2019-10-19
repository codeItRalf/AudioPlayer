let player = new Audio()
let playing = false
let prevTrack;
let repeat = false

$('#repeat').on('click', toggleRepeat)
$('button').on('click', playClip)
$('#next').on('click', playNext)
$('#prev').on('click', playNext)
$(player).on('timeupdate', function () {
        $('#seek-obj').attr("value", this.currentTime / this.duration,
                secondsToMinutes(this.currentTime, "start-time"),
                secondsToMinutes(this.duration, "end-time"));
})
$(player).on('ended', playNext)


function playClip() {

        if ($(this).parent(".list-item").length > 0) {
                play($(this))
                let track = $(this).attr('track')
                songInfo(track)
                markSong(track)


        }


        // play pause
        if ($("#play").is($(this))) {
                if (playing) {
                        player.pause()
                        playing = false
                        $("#play").addClass("fa-play")
                        $("#play").removeClass("fa-pause")
                } else {
                        player.play()
                        playing = true;
                        $("#play").addClass("fa-pause")
                        $("#play").removeClass("fa-play")
                }

        }
}

function playNext() {
        let number;
        if ($("#next").is($(this))) {
                number = 1;
        } else if ($("#prev").is($(this))){
                //If the song have played less then 3 seconds play previous song else start from 0.
                if (player.currentTime < 3) {
                        number = -1
                } else {
                        number = 0
                }

        }else{ // if the songs end if it should repeat or go to next
              if (repeat){
                      number = 0
              }else {
                      number = 1
              }

        }
        let nextTrack = parseInt(prevTrack) + number
        if (0 > nextTrack) {
                nextTrack = $("#playlist li").toArray().length
        } else if ($("#playlist li").toArray().length < nextTrack) {
                nextTrack = 0
        }
        play($("#item" + nextTrack + " >button"))
        songInfo(nextTrack)
        markSong(nextTrack)
}

function play(song) {
        player.src = $(song).attr('data-sound')
        player.play()
        playing = true;
        $("#play").addClass("fa-pause")
        $("#play").removeClass("fa-play")
}



function songInfo(track) {
        let bg = $("#item-pic" + track)
        let artist = $("#artist" + track)
        let song = $("#song" + track)
        $("#song-image-container").css('background-image', bg.css('background-image'))
        $("#info-item-artist").html($(artist).html())
        $("#info-item-song").html($(song).html())
}


function markSong(track) {
        if (prevTrack !== track) {
                $("#item" + track).addClass("active")
                if (prevTrack !== null && prevTrack !== undefined) {
                        $("#item" + prevTrack).removeClass("active")
                }

                prevTrack = track
        }
}


function secondsToMinutes(time, holder) {
        var min = ~~((time % 3600) / 60)
        var sec = Math.floor(time % 60);
        if(!isNaN(min) && !isNaN(sec)){
                var secMin = min + ":" + (sec < 10 ? "0" : "") + sec
                $("#" + holder).html(secMin)
        }
       
}


function toggleRepeat(){
        repeat = !repeat
        if(repeat){
                $(this).addClass("activeIcon")
                console.log("repeat")
        }else{
                console.log("dont repeat")
                $(this).removeClass("activeIcon") 
        }
}