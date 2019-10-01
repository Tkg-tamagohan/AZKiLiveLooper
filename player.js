var liveData = [];
$.getJSON('./LiveData.json', function (data) {
	liveData = data['contents'];
});

// 2. This code loads the IFrame Player API code asynchronously.

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var count = 0;

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		videoId: liveData[count].video,
		playerVars: {
			start: liveData[count].start,
			end: liveData[count].end
		},
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1)
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
	if (event.data == 0 && !done) {
		count += 1;
		done = true;
		if (!(count < liveData.length)) {
			count = 0;
		}

		setLive(count)
	} else
	if (event.data == 1 && done) {
		done = false;
	}
}

var setLive = function (Num) {
	count = Num;
	player.loadVideoById({
		videoId: liveData[count].video,
		startSeconds: Number(liveData[count].start),
		endSeconds: Number(liveData[count].end)
	});
	makeTable(liveData[count].setList, "timeTable");
};

// 表の動的作成
function makeTable(data, tableId) {
	var table = document.getElementById(tableId);
	var i;
	
	table.innerHTML = "";

	for (i = 0; i < data.length; i++) {
		table.innerHTML += '<tr><td style="width: 80px">#' + (i+1) + '</td><td><a  href="#">' + data[i].title + '</a></td><td>' + '' + '</td></tr>';
	}
}

window.onload = function () {
	// 表の動的作成
	makeTable(liveData[count].setList, "timeTable");
};