//DELETE FOR FINAL VERSION
console.log('hello');

/*DOESN'T WORK AND ISN'T UPDATED
FOR REFERENCE PURPOSES ONLY
//f = 70
//j = 74
//a = 65
//s = 83
//d = 68
//x = 88
//space = 32

var toggleBkgd = function(id) {
    var toggle = 0;
	$(document).keydown(function(event) {
        if (event.which == 70) {
            switch (toggle) {
                case 0:
                    redify(id);
                    break;
                case 1:
                    blueify(id);
                    break;
                case 2:
                    normalize(id);
                    break;
            }
            toggle++;
		}
        
        if (toggle >= 3) {
            toggle = 0;
        }
	});
};

var removeToggle = function(id) {
    $(id).unbind()
};
*/

//set background to black
var fillIn = function(id) {
	$(id).removeClass("white");
    $(id).removeClass("gray");
	$(id).addClass("black");
    $(id).attr("value", true);
};

//set background to white
var xOut = function(id) {
	$(id).removeClass("white");
    $(id).removeClass("black");
	$(id).addClass("white");
    $(id).attr("value", false);
};

//set background to gray
var clearCell = function(id) {
	$(id).removeClass("black");
    $(id).removeClass("white");
	$(id).addClass("gray");
    $(id).attr("value", false);
};

//clear correct/incorrect text and set up submit button
function onLoad() {
  $('#pause').removeAttr('disabled');
    $('#restart').removeAttr('disabled');
    $('#incorrect').addClass('hidden');
    $('#check').removeClass('hidden');
    $('#testPuzzle').removeClass('hidden');
    $('#keep').addClass('hidden');
    $('#correct').addClass('hidden');
    $('#leaderboard').addClass('hidden');
}

//show incorrect text and set up keep working button
function incorrect() {
    $('#pause').attr('disabled', true);
    $('#restart').attr('disabled', true);
    $('#incorrect').removeClass('hidden');  
    $('#keep').removeClass('hidden'); 
    $('#check').addClass('hidden'); 
    $('#correct').addClass('hidden');
    $('#leaderboard').addClass('hidden');
    $('#testPuzzle').addClass('hidden');
}

//show correct text and set up leaderboard button
function correct() {
    $('#pause').attr('disabled', true);
    $('#restart').attr('disabled', true);
    $('#correct').removeClass('hidden');
    $('#leaderboard').removeClass('hidden');
    $('#testPuzzle').removeClass('hidden');
    $('#keep').addClass('hidden');
    $('#check').addClass('hidden');
    $('#incorrect').addClass('hidden');
}

//  To start the stopwatch:
//      obj.start();
//
//  To get the duration in milliseconds without pausing / resuming:
//      var x = obj.time();
//
//  To pause the stopwatch:
//      var x = obj.stop(); // Result is duration in milliseconds
//
//  To resume a paused stopwatch
//      var x = obj.start();    // Result is duration in milliseconds
//
//  To reset a paused stopwatch
//      obj.stop();
//

var clsStopwatch = function() {
    // Private vars
    var startAt = 0;    // Time of last start / resume. (0 if not running)
    var lapTime = 0;    // Time on the clock when last stopped in milliseconds

    var now = function() {
        return (new Date()).getTime(); 
    }; 

    // Public methods
    // Start or resume
    this.start = function() {
        startAt = startAt ? startAt : now();
    };

    // Stop or pause
    this.stop = function() {
        // If running, update elapsed time otherwise keep it
        lapTime = startAt ? lapTime + now() - startAt : lapTime;
        startAt = 0; // Paused
    };

    // Reset
    this.reset = function() {
        lapTime = startAt = 0;
    };

    // Duration
    this.time = function() {
        return lapTime + (startAt ? now() - startAt : 0); 
    };
};


//cuts off digits in num to size
function pad(num, size) {
    var s = "0000" + num;
    return s.substr(s.length - size);
}

//returns a formatted time hh:mm:ss:mmm
function formatTime(time) {
    var h = m = s = ms = 0;
    var newTime = '';
 
    h = Math.floor( time / (60 * 60 * 1000) );
    time = time % (60 * 60 * 1000);
    m = Math.floor( time / (60 * 1000) );
    time = time % (60 * 1000);
    s = Math.floor( time / 1000 );
    ms = time % 1000;
 
    //newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 3);
    newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2);
    return newTime;
}


//VARIABLES AND FUNCTIONS FOR TIMER
var x = new clsStopwatch();
var $time;
var clocktimer;
function update() {
    $time.innerHTML = formatTime(x.time());
}

function show() {
    $time = document.getElementById('time');
    update();
}

function start() {
    clocktimer = setInterval("update()", 1);
    x.start();
}
 
function clkStop() {
    clearInterval(clocktimer);
    x.stop();
    return x.time();
}
 
function reset() {
    x.stop();
    x.reset();
    update();
}

//cycle through toggle states through clicking on objects
var clickBkgd = function(id) {
    var toggle; //variable to keep track of the states
    var myClass = $(id).attr("class"); //classes of the clicked object
    
    //depending on current state of object, start at a different
    //place in the cycle
    if (myClass.match("game") && myClass.match("game")) {
        if (myClass.match("gray")) {
            toggle = 0;
            $(id).attr("value", false);
        } else if (myClass.match("black")) {
            toggle = 1;
            $(id).attr("value", true);
        } else {
            toggle = 2;
            $(id).attr("value", false);
        }
    } else {
        return;
    }
    
    //when object clicked, cycle through toggle states
	$(id).click(function(event) {
            switch (toggle) {
                case 0:
                    fillIn(id);
                    break;
                case 1:
                    xOut(id);
                    break;
                case 2:
                    clearCell(id);
                    break;
            }
            toggle++;
            
            //if toggle goes to 3+, cycle back to 0
            if (toggle >= 3) {
                toggle = 0;
            }
	});
};

var getQueryVariable = function(variable) {
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("=");
           if(pair[0] == variable){return pair[1];}
   }
   return(false);
}

var gradeGrid = function(table, puzzle) {  
    var wrong = 0;
    $('#' + table + ' tr.gridData').each(function(i){
        $(this).find('td').each(function(j){
            /*console.log($(this).attr("value"))
            console.log(i + ' ' + j);
            console.log(puzzle[i][j].value)*/
            if ($(this).attr("value") != puzzle[i][j].value) {
                wrong++;
            }
        })
    })
    
    if (wrong == 0) {
        correct();
    } else {
        incorrect();
    }
}

var pauseOrResumeGame = function() {  
    //document.getElementById('check').style.visibility="hidden";
    var isPaused = $('#resume-pause').attr('value') == 'Resume Game';
    var newValue = isPaused ? 'Pause Game' : 'Resume Game';
    $('#resume-pause').attr('value', newValue); 
    isPaused ? $('#check').removeAttr('disabled') : $('#check').attr('disabled', true);
    isPaused ? $('#restart').removeAttr('disabled') : $('#restart').attr('disabled', true);
    $('#testPuzzle').toggleClass('hidden-visibility', !isPaused); 
}

var Main = function() {
    //clear correct/incorrect text and set up submit button
    onLoad();
    
    //start and display the timer
    show();
    start();
    update();
    
    //current game level
    var curLevel = getQueryVariable('level');
    curLevel = curLevel.toLowerCase();
    curLevel = curLevel.replace(' ', '');
    //when the mouse is over a table element, allow it to be clicked
    //and cycle through toggle states
    $("td").mouseover(function(event) {
        clickBkgd(this);
	});
    
    /*$(".highlight").hover(function(event) {
        toggleBkgd(this);
    });*/
    
    $("#check").click(function(event) {
        gradeGrid("testPuzzle", puzzles[curLevel]);
        clkStop();
        $('#resume-pause').attr('disabled', true);
    });
    
    $("#keep").click(function(event) {
        onLoad();
        start();
        $('#resume-pause').removeAttr('disabled');
    });
    
    $("#submit").click(function(event){
        document.getElementById("timevariable").value=x.time();
    });
    
    var pauseBefore = true;
    $("#resume-pause").click(function(event) {
        pauseOrResumeGame();
        if (pauseBefore) {
            clkStop();
            $('#clear').attr('disabled', true);
        } else {
            start();
            $('#clear').removeAttr('disabled');
        }
        
        pauseBefore = !pauseBefore;
    });
    
    $("#restart").click(function(event) {
        clearCell($("td"));
        reset();
        start();
        onLoad();
    });
    //DELETE LATER
    //USE PYTHON FOR THIS BUTTON
    //JUST FOR TESTING PURPOSES
    /*$("#leaderboard").click(function(event) {
        onLoad();
        start();
    });*/
};

$(document).ready(Main);


//ANGULAR.JS CODE
var app = angular.module('test', []);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{(');
    $interpolateProvider.endSymbol(')}');
});

app.controller('TestController', function() {
    //test puzzle 3x3
    this.grid = testPuzzle;
    this.data = testPuzzleData;
    
    //small puzzles 5x5
    this.small1 = small1;
    this.small1data = small1Data;
    
    this.small2 = small2;
    this.small2data = small2Data;
    
    this.small3 = small3;
    this.small3data = small3Data;
    
    //medium puzzles 10x10
    this.medium1 = medium1;
    this.medium1data = medium1Data;
    
    this.medium2 = medium2;
    this.medium2data = medium2Data;
    
    this.medium3 = medium3;
    this.medium3data = medium3Data;
    
    //large puzzles 15x15
    this.large1 = large1;
    this.large1data = large1Data;
    
    this.large2 = large2;
    this.large2data = large2Data;
    
    this.large3 = large3;
    this.large3data = large3Data;
});

var testPuzzle = [
    [ { value: "true", id: 'r1c1' }, 
      { value: "true", id: 'r1c2' },
      { value: "true", id: 'r1c3' }
    ],

    [ { value: "true", id: 'r2c1' }, 
      { value: "false", id: 'r2c2' },
      { value: "true", id: 'r2c3' }
    ],
    
    [ { value: "false", id: 'r3c1' }, 
      { value: "true", id: 'r3c2' },
      { value: "false", id: 'r3c3' }
    ],
];

var testPuzzleData = {
    rows: [['',3], [1,1], ['',1]],
    cols: [['',1,''], [2, 1, 2]],
};

var small1 = [
    [ { value: "false", id: 'r1c1' }, 
      { value: "true", id: 'r1c2' },
      { value: "true", id: 'r1c3' },
      { value: "true", id: 'r1c4' },
      { value: "false", id: 'r1c5' }
    ],

    [ { value: "false", id: 'r2c1' }, 
      { value: "true", id: 'r2c2' },
      { value: "true", id: 'r2c3' },
      { value: "true", id: 'r2c4' },
      { value: "false", id: 'r2c5' }
    ],
    
    [ { value: "false", id: 'r3c1' }, 
      { value: "false", id: 'r3c2' },
      { value: "false", id: 'r3c3' },
      { value: "true", id: 'r3c4' },
      { value: "true", id: 'r3c5' }
    ], 

    [ { value: "true", id: 'r4c1' }, 
      { value: "false", id: 'r4c2' },
      { value: "true", id: 'r4c3' },
      { value: "false", id: 'r4c4' },
      { value: "false", id: 'r4c5' }
    ],

    [ { value: "false", id: 'r5c1' }, 
      { value: "true", id: 'r5c2' },
      { value: "true", id: 'r5c3' },
      { value: "true", id: 'r5c4' },
      { value: "false", id: 'r5c5' }
    ],

];

var small1Data = {
    rows: [['',3], ['',3], ['',2], [1,1], ['',3]],
    cols: [['',2,2,3,''], [1,1,2,1,1]],
};

var small2 = [
    [ { value: "false", id: 'r1c1' }, 
      { value: "true", id: 'r1c2' },
      { value: "true", id: 'r1c3' },
      { value: "true", id: 'r1c4' },
      { value: "true", id: 'r1c5' }
    ],

    [ { value: "false", id: 'r2c1' }, 
      { value: "true", id: 'r2c2' },
      { value: "true", id: 'r2c3' },
      { value: "true", id: 'r2c4' },
      { value: "false", id: 'r2c5' }
    ],
    
    [ { value: "false", id: 'r3c1' }, 
      { value: "false", id: 'r3c2' },
      { value: "false", id: 'r3c3' },
      { value: "true", id: 'r3c4' },
      { value: "true", id: 'r3c5' }
    ], 

    [ { value: "true", id: 'r4c1' }, 
      { value: "false", id: 'r4c2' },
      { value: "false", id: 'r4c3' },
      { value: "false", id: 'r4c4' },
      { value: "true", id: 'r4c5' }
    ],

    [ { value: "false", id: 'r5c1' }, 
      { value: "false", id: 'r5c2' },
      { value: "false", id: 'r5c3' },
      { value: "true", id: 'r5c4' },
      { value: "true", id: 'r5c5' }
    ],

];

var small2Data = {
    rows: [['','',4], ['','',3], ['','',2], ['',1,1], ['','',2]],
    cols: [['','','','',''], ['','','',3,1], [1,2,2,1,3]],
};


var small3 = [
    [ { value: "true", id: 'r1c1' }, 
      { value: "false", id: 'r1c2' },
      { value: "true", id: 'r1c3' },
      { value: "false", id: 'r1c4' },
      { value: "true", id: 'r1c5' }
    ],

    [ { value: "false", id: 'r2c1' }, 
      { value: "false", id: 'r2c2' },
      { value: "true", id: 'r2c3' },
      { value: "true", id: 'r2c4' },
      { value: "true", id: 'r2c5' }
    ],
    
    [ { value: "false", id: 'r3c1' }, 
      { value: "false", id: 'r3c2' },
      { value: "true", id: 'r3c3' },
      { value: "true", id: 'r3c4' },
      { value: "true", id: 'r3c5' }
    ], 

    [ { value: "false", id: 'r4c1' }, 
      { value: "false", id: 'r4c2' },
      { value: "true", id: 'r4c3' },
      { value: "false", id: 'r4c4' },
      { value: "true", id: 'r4c5' }
    ],

    [ { value: "true", id: 'r5c1' }, 
      { value: "true", id: 'r5c2' },
      { value: "false", id: 'r5c3' },
      { value: "false", id: 'r5c4' },
      { value: "false", id: 'r5c5' }
    ],

];

var small3Data = {
    rows: [[1,1,1], ['','',3], ['','',3], ['',1,1], ['','',2]],
    cols: [['','','','',''], [1,'','','',''], [1,1,4,2,4]],
};

var medium1 = [
    [ { value: "false", id: 'r1c1' }, 
      { value: "false", id: 'r1c2' },
      { value: "true", id: 'r1c3' },
      { value: "true", id: 'r1c4' },
      { value: "false", id: 'r1c5' },
      { value: "false", id: 'r1c6' },
      { value: "false", id: 'r1c7' },
      { value: "false", id: 'r1c8' },
      { value: "false", id: 'r1c9' },
      { value: "false", id: 'r1c10' }
    ],

    [ { value: "false", id: 'r2c1' }, 
      { value: "true", id: 'r2c2' },
      { value: "false", id: 'r2c3' },
      { value: "true", id: 'r2c4' },
      { value: "false", id: 'r2c5' },
      { value: "false", id: 'r2c6' }, 
      { value: "false", id: 'r2c7' },
      { value: "false", id: 'r2c8' },
      { value: "false", id: 'r2c9' },
      { value: "false", id: 'r2c10' }
    ],
    
    [ { value: "true", id: 'r3c1' }, 
      { value: "true", id: 'r3c2' },
      { value: "true", id: 'r3c3' },
      { value: "true", id: 'r3c4' },
      { value: "false", id: 'r3c5' },
      { value: "false", id: 'r3c6' }, 
      { value: "false", id: 'r3c7' },
      { value: "false", id: 'r3c8' },
      { value: "false", id: 'r3c9' },
      { value: "false", id: 'r3c10' }
    ],

    [ { value: "false", id: 'r4c1' }, 
      { value: "false", id: 'r4c2' },
      { value: "true", id: 'r4c3' },
      { value: "true", id: 'r4c4' },
      { value: "false", id: 'r4c5' },
      { value: "false", id: 'r4c6' }, 
      { value: "false", id: 'r4c7' },
      { value: "false", id: 'r4c8' },
      { value: "false", id: 'r4c9' },
      { value: "true", id: 'r4c10' }
    ],

    [ { value: "false", id: 'r5c1' }, 
      { value: "false", id: 'r5c2' },
      { value: "true", id: 'r5c3' },
      { value: "true", id: 'r5c4' },
      { value: "true", id: 'r5c5' },
      { value: "false", id: 'r5c6' }, 
      { value: "false", id: 'r5c7' },
      { value: "false", id: 'r5c8' },
      { value: "false", id: 'r5c9' },
      { value: "true", id: 'r5c10' }
    ],
    
    [ { value: "false", id: 'r6c1' }, 
      { value: "false", id: 'r6c2' },
      { value: "true", id: 'r6c3' },
      { value: "true", id: 'r6c4' },
      { value: "true", id: 'r6c5' },
      { value: "true", id: 'r6c6' }, 
      { value: "true", id: 'r6c7' },
      { value: "true", id: 'r6c8' },
      { value: "true", id: 'r6c9' },
      { value: "true", id: 'r6c10' }
    ],

    [ { value: "false", id: 'r7c1' }, 
      { value: "false", id: 'r7c2' },
      { value: "true", id: 'r7c3' },
      { value: "true", id: 'r7c4' },
      { value: "true", id: 'r7c5' },
      { value: "true", id: 'r7c6' }, 
      { value: "true", id: 'r7c7' },
      { value: "true", id: 'r7c8' },
      { value: "true", id: 'r7c9' },
      { value: "true", id: 'r7c10' }
    ],

    [ { value: "false", id: 'r8c1' }, 
      { value: "false", id: 'r8c2' },
      { value: "true", id: 'r8c3' },
      { value: "true", id: 'r8c4' },
      { value: "true", id: 'r8c5' },
      { value: "true", id: 'r8c6' }, 
      { value: "true", id: 'r8c7' },
      { value: "true", id: 'r8c8' },
      { value: "true", id: 'r8c9' },
      { value: "false", id: 'r8c10' }
    ],

    [ { value: "false", id: 'r9c1' }, 
      { value: "false", id: 'r9c2' },
      { value: "false", id: 'r9c3' },
      { value: "true", id: 'r9c4' },
      { value: "true", id: 'r9c5' },
      { value: "true", id: 'r9c6' }, 
      { value: "true", id: 'r9c7' },
      { value: "true", id: 'r9c8' },
      { value: "false", id: 'r9c9' },
      { value: "false", id: 'r9c10' }
    ],

    [ { value: "false", id: 'r10c1' }, 
      { value: "false", id: 'r10c2' },
      { value: "false", id: 'r10c3' },
      { value: "false", id: 'r10c4' },
      { value: "true", id: 'r10c5' },
      { value: "true", id: 'r10c6' }, 
      { value: "true", id: 'r10c7' },
      { value: "false", id: 'r10c8' },
      { value: "false", id: 'r10c9' },
      { value: "false", id: 'r10c10' }
    ],

];

var medium1Data = {
    rows: [['',2], [1,1], ['',4], [2,1], [3,1], ['',8], ['',8], ['',7], ['',5], ['',3] ],
    cols: [['','',1,'','','','','','',''], [1, 2, 6, 9, 6, 5, 5, 4, 3, 4]]
};

var medium2 = [
    [ { value: "false", id: 'r1c1' }, 
      { value: "false", id: 'r1c2' },
      { value: "false", id: 'r1c3' },
      { value: "false", id: 'r1c4' },
      { value: "false", id: 'r1c5' },
      { value: "false", id: 'r1c6' },
      { value: "true", id: 'r1c7' },
      { value: "false", id: 'r1c8' },
      { value: "true", id: 'r1c9' },
      { value: "true", id: 'r1c10' }
    ],

    [ { value: "false", id: 'r2c1' }, 
      { value: "false", id: 'r2c2' },
      { value: "false", id: 'r2c3' },
      { value: "false", id: 'r2c4' },
      { value: "false", id: 'r2c5' },
      { value: "false", id: 'r2c6' }, 
      { value: "false", id: 'r2c7' },
      { value: "false", id: 'r2c8' },
      { value: "true", id: 'r2c9' },
      { value: "true", id: 'r2c10' }
    ],
    
    [ { value: "false", id: 'r3c1' }, 
      { value: "false", id: 'r3c2' },
      { value: "false", id: 'r3c3' },
      { value: "false", id: 'r3c4' },
      { value: "false", id: 'r3c5' },
      { value: "false", id: 'r3c6' }, 
      { value: "false", id: 'r3c7' },
      { value: "true", id: 'r3c8' },
      { value: "false", id: 'r3c9' },
      { value: "false", id: 'r3c10' }
    ],

    [ { value: "false", id: 'r4c1' }, 
      { value: "false", id: 'r4c2' },
      { value: "false", id: 'r4c3' },
      { value: "false", id: 'r4c4' },
      { value: "false", id: 'r4c5' },
      { value: "false", id: 'r4c6' }, 
      { value: "false", id: 'r4c7' },
      { value: "false", id: 'r4c8' },
      { value: "false", id: 'r4c9' },
      { value: "true", id: 'r4c10' }
    ],

    [ { value: "false", id: 'r5c1' }, 
      { value: "false", id: 'r5c2' },
      { value: "false", id: 'r5c3' },
      { value: "false", id: 'r5c4' },
      { value: "false", id: 'r5c5' },
      { value: "true", id: 'r5c6' }, 
      { value: "true", id: 'r5c7' },
      { value: "false", id: 'r5c8' },
      { value: "false", id: 'r5c9' },
      { value: "false", id: 'r5c10' }
    ],
    
    [ { value: "true", id: 'r6c1' }, 
      { value: "true", id: 'r6c2' },
      { value: "false", id: 'r6c3' },
      { value: "false", id: 'r6c4' },
      { value: "true", id: 'r6c5' },
      { value: "true", id: 'r6c6' }, 
      { value: "true", id: 'r6c7' },
      { value: "true", id: 'r6c8' },
      { value: "false", id: 'r6c9' },
      { value: "false", id: 'r6c10' }
    ],

    [ { value: "true", id: 'r7c1' }, 
      { value: "true", id: 'r7c2' },
      { value: "false", id: 'r7c3' },
      { value: "true", id: 'r7c4' },
      { value: "true", id: 'r7c5' },
      { value: "true", id: 'r7c6' }, 
      { value: "true", id: 'r7c7' },
      { value: "true", id: 'r7c8' },
      { value: "true", id: 'r7c9' },
      { value: "false", id: 'r7c10' }
    ],

    [ { value: "false", id: 'r8c1' }, 
      { value: "true", id: 'r8c2' },
      { value: "true", id: 'r8c3' },
      { value: "true", id: 'r8c4' },
      { value: "true", id: 'r8c5' },
      { value: "true", id: 'r8c6' }, 
      { value: "true", id: 'r8c7' },
      { value: "true", id: 'r8c8' },
      { value: "true", id: 'r8c9' },
      { value: "false", id: 'r8c10' }
    ],

    [ { value: "false", id: 'r9c1' }, 
      { value: "false", id: 'r9c2' },
      { value: "false", id: 'r9c3' },
      { value: "false", id: 'r9c4' },
      { value: "true", id: 'r9c5' },
      { value: "false", id: 'r9c6' }, 
      { value: "false", id: 'r9c7' },
      { value: "true", id: 'r9c8' },
      { value: "false", id: 'r9c9' },
      { value: "false", id: 'r9c10' }
    ],

    [ { value: "false", id: 'r10c1' }, 
      { value: "false", id: 'r10c2' },
      { value: "false", id: 'r10c3' },
      { value: "true", id: 'r10c4' },
      { value: "true", id: 'r10c5' },
      { value: "false", id: 'r10c6' }, 
      { value: "true", id: 'r10c7' },
      { value: "true", id: 'r10c8' },
      { value: "false", id: 'r10c9' },
      { value: "false", id: 'r10c10' }
    ],
];

var medium2Data = {
    rows: [[1,2], ['',2], ['',1], ['',1], ['',2], [2,4], [2,6], ['',8], [1,1], [2,2] ],
    cols: [['','','','','','',1,'','',''], ['', '', '', 2, '', '', 4, 1, 2, 2], 
    [2, 3, 1, 1, 5, 4, 1, 5, 2, 1],]
};


var medium3 = [
    [ { value: "false", id: 'r1c1' }, 
      { value: "false", id: 'r1c2' },
      { value: "false", id: 'r1c3' },
      { value: "false", id: 'r1c4' },
      { value: "true", id: 'r1c5' },
      { value: "false", id: 'r1c6' },
      { value: "false", id: 'r1c7' },
      { value: "false", id: 'r1c8' },
      { value: "true", id: 'r1c9' },
      { value: "true", id: 'r1c10' }
    ],

    [ { value: "false", id: 'r2c1' }, 
      { value: "false", id: 'r2c2' },
      { value: "true", id: 'r2c3' },
      { value: "true", id: 'r2c4' },
      { value: "true", id: 'r2c5' },
      { value: "true", id: 'r2c6' }, 
      { value: "true", id: 'r2c7' },
      { value: "true", id: 'r2c8' },
      { value: "true", id: 'r2c9' },
      { value: "true", id: 'r2c10' }
    ],
    
    [ { value: "false", id: 'r3c1' }, 
      { value: "false", id: 'r3c2' },
      { value: "false", id: 'r3c3' },
      { value: "false", id: 'r3c4' },
      { value: "true", id: 'r3c5' },
      { value: "true", id: 'r3c6' }, 
      { value: "true", id: 'r3c7' },
      { value: "true", id: 'r3c8' },
      { value: "true", id: 'r3c9' },
      { value: "true", id: 'r3c10' }
    ],

    [ { value: "false", id: 'r4c1' }, 
      { value: "false", id: 'r4c2' },
      { value: "false", id: 'r4c3' },
      { value: "true", id: 'r4c4' },
      { value: "true", id: 'r4c5' },
      { value: "true", id: 'r4c6' }, 
      { value: "true", id: 'r4c7' },
      { value: "true", id: 'r4c8' },
      { value: "true", id: 'r4c9' },
      { value: "true", id: 'r4c10' }
    ],

    [ { value: "false", id: 'r5c1' }, 
      { value: "false", id: 'r5c2' },
      { value: "false", id: 'r5c3' },
      { value: "false", id: 'r5c4' },
      { value: "false", id: 'r5c5' },
      { value: "false", id: 'r5c6' }, 
      { value: "true", id: 'r5c7' },
      { value: "false", id: 'r5c8' },
      { value: "false", id: 'r5c9' },
      { value: "false", id: 'r5c10' }
    ],
    
    [ { value: "true", id: 'r6c1' }, 
      { value: "false", id: 'r6c2' },
      { value: "true", id: 'r6c3' },
      { value: "false", id: 'r6c4' },
      { value: "true", id: 'r6c5' },
      { value: "false", id: 'r6c6' }, 
      { value: "false", id: 'r6c7' },
      { value: "false", id: 'r6c8' },
      { value: "false", id: 'r6c9' },
      { value: "false", id: 'r6c10' }
    ],

    [ { value: "true", id: 'r7c1' }, 
      { value: "false", id: 'r7c2' },
      { value: "false", id: 'r7c3' },
      { value: "false", id: 'r7c4' },
      { value: "true", id: 'r7c5' },
      { value: "false", id: 'r7c6' }, 
      { value: "false", id: 'r7c7' },
      { value: "false", id: 'r7c8' },
      { value: "false", id: 'r7c9' },
      { value: "false", id: 'r7c10' }
    ],

    [ { value: "true", id: 'r8c1' }, 
      { value: "true", id: 'r8c2' },
      { value: "true", id: 'r8c3' },
      { value: "false", id: 'r8c4' },
      { value: "true", id: 'r8c5' },
      { value: "false", id: 'r8c6' }, 
      { value: "true", id: 'r8c7' },
      { value: "false", id: 'r8c8' },
      { value: "false", id: 'r8c9' },
      { value: "false", id: 'r8c10' }
    ],

    [ { value: "true", id: 'r9c1' }, 
      { value: "true", id: 'r9c2' },
      { value: "true", id: 'r9c3' },
      { value: "true", id: 'r9c4' },
      { value: "true", id: 'r9c5' },
      { value: "false", id: 'r9c6' }, 
      { value: "true", id: 'r9c7' },
      { value: "true", id: 'r9c8' },
      { value: "false", id: 'r9c9' },
      { value: "false", id: 'r9c10' }
    ],

    [ { value: "true", id: 'r10c1' }, 
      { value: "true", id: 'r10c2' },
      { value: "true", id: 'r10c3' },
      { value: "true", id: 'r10c4' },
      { value: "true", id: 'r10c5' },
      { value: "true", id: 'r10c6' }, 
      { value: "true", id: 'r10c7' },
      { value: "true", id: 'r10c8' },
      { value: "false", id: 'r10c9' },
      { value: "false", id: 'r10c10' }
    ],
];

var medium3Data = {
    rows: [['',1,2], ['','',8], ['','',6], ['','',7], ['','',1], [1,1,1], ['',1,1], [3,1,1], ['',5,2], ['','',8] ],
    cols: [['','',1,1,'','','','','',''], ['','', 1, 1, 4, 3, 4, 3, '', ''], [5, 3, 3, 2, 5, 1, 3, 2, 4, 4]]
};

var large1 = [
    [ { value: "false", id: 'r1c1' }, 
      { value: "false", id: 'r1c2' },
      { value: "false", id: 'r1c3' },
      { value: "false", id: 'r1c4' },
      { value: "false", id: 'r1c5' },
      { value: "false", id: 'r1c6' },
      { value: "false", id: 'r1c7' },
      { value: "false", id: 'r1c8' },
      { value: "false", id: 'r1c9' },
      { value: "true", id: 'r1c10' },
      { value: "true", id: 'r1c11' }, 
      { value: "true", id: 'r1c12' },
      { value: "false", id: 'r1c13' },
      { value: "false", id: 'r1c14' },
      { value: "false", id: 'r1c15' },
    ],

    [ { value: "false", id: 'r2c1' }, 
      { value: "false", id: 'r2c2' },
      { value: "false", id: 'r2c3' },
      { value: "false", id: 'r2c4' },
      { value: "false", id: 'r2c5' },
      { value: "false", id: 'r2c6' }, 
      { value: "false", id: 'r2c7' },
      { value: "false", id: 'r2c8' },
      { value: "true", id: 'r2c9' },
      { value: "true", id: 'r2c10' },
      { value: "true", id: 'r2c11' }, 
      { value: "true", id: 'r2c12' },
      { value: "true", id: 'r2c13' },
      { value: "false", id: 'r2c14' },
      { value: "false", id: 'r2c15' },
    ],
    
    [ { value: "false", id: 'r3c1' }, 
      { value: "false", id: 'r3c2' },
      { value: "false", id: 'r3c3' },
      { value: "false", id: 'r3c4' },
      { value: "false", id: 'r3c5' },
      { value: "false", id: 'r3c6' }, 
      { value: "false", id: 'r3c7' },
      { value: "true", id: 'r3c8' },
      { value: "true", id: 'r3c9' },
      { value: "true", id: 'r3c10' },
      { value: "true", id: 'r3c11' }, 
      { value: "false", id: 'r3c12' },
      { value: "true", id: 'r3c13' },
      { value: "true", id: 'r3c14' },
      { value: "true", id: 'r3c15' },
    ],

    [ { value: "false", id: 'r4c1' }, 
      { value: "false", id: 'r4c2' },
      { value: "false", id: 'r4c3' },
      { value: "false", id: 'r4c4' },
      { value: "false", id: 'r4c5' },
      { value: "false", id: 'r4c6' }, 
      { value: "false", id: 'r4c7' },
      { value: "true", id: 'r4c8' },
      { value: "true", id: 'r4c9' },
      { value: "true", id: 'r4c10' },
      { value: "true", id: 'r4c11' }, 
      { value: "true", id: 'r4c12' },
      { value: "true", id: 'r4c13' },
      { value: "true", id: 'r4c14' },
      { value: "false", id: 'r4c15' },
    ],

    [ { value: "false", id: 'r5c1' }, 
      { value: "false", id: 'r5c2' },
      { value: "false", id: 'r5c3' },
      { value: "false", id: 'r5c4' },
      { value: "false", id: 'r5c5' },
      { value: "false", id: 'r5c6' }, 
      { value: "false", id: 'r5c7' },
      { value: "false", id: 'r5c8' },
      { value: "true", id: 'r5c9' },
      { value: "true", id: 'r5c10' },
      { value: "true", id: 'r5c11' }, 
      { value: "true", id: 'r5c12' },
      { value: "true", id: 'r5c13' },
      { value: "false", id: 'r5c14' },
      { value: "false", id: 'r5c15' },
    ],
    
    [ { value: "false", id: 'r6c1' }, 
      { value: "false", id: 'r6c2' },
      { value: "false", id: 'r6c3' },
      { value: "false", id: 'r6c4' },
      { value: "false", id: 'r6c5' },
      { value: "false", id: 'r6c6' }, 
      { value: "false", id: 'r6c7' },
      { value: "false", id: 'r6c8' },
      { value: "false", id: 'r6c9' },
      { value: "true", id: 'r6c10' },
      { value: "true", id: 'r6c11' }, 
      { value: "true", id: 'r6c12' },
      { value: "false", id: 'r6c13' },
      { value: "false", id: 'r6c14' },
      { value: "false", id: 'r6c15' },
    ],

    [ { value: "false", id: 'r7c1' }, 
      { value: "false", id: 'r7c2' },
      { value: "false", id: 'r7c3' },
      { value: "false", id: 'r7c4' },
      { value: "false", id: 'r7c5' },
      { value: "false", id: 'r7c6' }, 
      { value: "false", id: 'r7c7' },
      { value: "false", id: 'r7c8' },
      { value: "true", id: 'r7c9' },
      { value: "true", id: 'r7c10' },
      { value: "true", id: 'r7c11' }, 
      { value: "true", id: 'r7c12' },
      { value: "true", id: 'r7c13' },
      { value: "false", id: 'r7c14' },
      { value: "false", id: 'r7c15' },
    ],

    [ { value: "true", id: 'r8c1' }, 
      { value: "false", id: 'r8c2' },
      { value: "false", id: 'r8c3' },
      { value: "false", id: 'r8c4' },
      { value: "false", id: 'r8c5' },
      { value: "false", id: 'r8c6' }, 
      { value: "true", id: 'r8c7' },
      { value: "true", id: 'r8c8' },
      { value: "true", id: 'r8c9' },
      { value: "true", id: 'r8c10' },
      { value: "true", id: 'r8c11' }, 
      { value: "true", id: 'r8c12' },
      { value: "true", id: 'r8c13' },
      { value: "true", id: 'r8c14' },
      { value: "false", id: 'r8c15' },
    ],

    [ { value: "true", id: 'r9c1' }, 
      { value: "true", id: 'r9c2' },
      { value: "true", id: 'r9c3' },
      { value: "false", id: 'r9c4' },
      { value: "false", id: 'r9c5' },
      { value: "true", id: 'r9c6' }, 
      { value: "true", id: 'r9c7' },
      { value: "true", id: 'r9c8' },
      { value: "false", id: 'r9c9' },
      { value: "false", id: 'r9c10' },
      { value: "false", id: 'r9c11' }, 
      { value: "true", id: 'r9c12' },
      { value: "true", id: 'r9c13' },
      { value: "true", id: 'r9c14' },
      { value: "false", id: 'r9c15' },
    ],

    [ { value: "true", id: 'r10c1' }, 
      { value: "true", id: 'r10c2' },
      { value: "true", id: 'r10c3' },
      { value: "true", id: 'r10c4' },
      { value: "true", id: 'r10c5' },
      { value: "true", id: 'r10c6' }, 
      { value: "true", id: 'r10c7' },
      { value: "false", id: 'r10c8' },
      { value: "true", id: 'r10c9' },
      { value: "true", id: 'r10c10' },
      { value: "true", id: 'r10c11' }, 
      { value: "false", id: 'r10c12' },
      { value: "true", id: 'r10c13' },
      { value: "true", id: 'r10c14' },
      { value: "false", id: 'r10c15' },
    ],

    [ { value: "false", id: 'r11c1' }, 
      { value: "true", id: 'r11c2' },
      { value: "true", id: 'r11c3' },
      { value: "true", id: 'r11c4' },
      { value: "true", id: 'r11c5' },
      { value: "true", id: 'r11c6' },
      { value: "false", id: 'r11c7' },
      { value: "true", id: 'r11c8' },
      { value: "true", id: 'r11c9' },
      { value: "true", id: 'r11c10' },
      { value: "true", id: 'r11c11' }, 
      { value: "false", id: 'r11c12' },
      { value: "true", id: 'r11c13' },
      { value: "true", id: 'r11c14' },
      { value: "false", id: 'r11c15' },
    ],

    [ { value: "false", id: 'r12c1' }, 
      { value: "true", id: 'r12c2' },
      { value: "true", id: 'r12c3' },
      { value: "true", id: 'r12c4' },
      { value: "true", id: 'r12c5' },
      { value: "true", id: 'r12c6' }, 
      { value: "true", id: 'r12c7' },
      { value: "true", id: 'r12c8' },
      { value: "true", id: 'r12c9' },
      { value: "false", id: 'r12c10' },
      { value: "false", id: 'r12c11' }, 
      { value: "true", id: 'r12c12' },
      { value: "true", id: 'r12c13' },
      { value: "false", id: 'r12c14' },
      { value: "false", id: 'r12c15' },
    ],
    
    [ { value: "false", id: 'r14c1' }, 
      { value: "false", id: 'r14c2' },
      { value: "true", id: 'r14c3' },
      { value: "true", id: 'r14c4' },
      { value: "true", id: 'r14c5' },
      { value: "true", id: 'r14c6' }, 
      { value: "true", id: 'r14c7' },
      { value: "true", id: 'r14c8' },
      { value: "true", id: 'r14c9' },
      { value: "true", id: 'r14c10' },
      { value: "true", id: 'r14c11' }, 
      { value: "true", id: 'r14c12' },
      { value: "false", id: 'r14c13' },
      { value: "false", id: 'r14c14' },
      { value: "false", id: 'r14c15' },
    ],

	[ { value: "false", id: 'r13c1' }, 
      { value: "false", id: 'r13c2' },
      { value: "false", id: 'r13c3' },
      { value: "false", id: 'r13c4' },
      { value: "true", id: 'r13c5' },
      { value: "true", id: 'r13c6' }, 
      { value: "false", id: 'r13c7' },
      { value: "true", id: 'r13c8' },
      { value: "true", id: 'r13c9' },
      { value: "true", id: 'r13c10' },
      { value: "false", id: 'r13c11' }, 
      { value: "false", id: 'r13c12' },
      { value: "false", id: 'r13c13' },
      { value: "false", id: 'r13c14' },
      { value: "false", id: 'r13c15' },
    ],

    [ { value: "false", id: 'r15c1' }, 
      { value: "false", id: 'r15c2' },
      { value: "false", id: 'r15c3' },
      { value: "false", id: 'r15c4' },
      { value: "false", id: 'r15c5' },
      { value: "false", id: 'r15c6' }, 
      { value: "true", id: 'r15c7' },
      { value: "true", id: 'r15c8' },
      { value: "true", id: 'r15c9' },
      { value: "true", id: 'r15c10' },
      { value: "true", id: 'r15c11' }, 
      { value: "true", id: 'r15c12' },
      { value: "false", id: 'r15c13' },
      { value: "false", id: 'r15c14' },
      { value: "false", id: 'r15c15' },
    ],
    
];

var large1Data = {
    rows: [ ['','',3], ['','',5], ['',4,3], ['','',7], ['','',5], 
    		['','',3], ['','',5], ['',1,8], [3,3,3], [7,3,2], [5,4,2], 
    		['',8,2], ['','',10], ['',2,3], ['','',6]
    ],

    cols: [
    	['','','','','','','','','','',8,2,'','',''],
    	['','','','','','',3,2,4,8,2,6,'','',''],
    	['','','','','','',2,2,2,2,1,2,4,2,''],
    	[3,4,5,4,5,6,1,5,6,3,1,1,6,4,1]
    ],

};



var large2 = [
    [ { value: "true", id: 'r1c1' }, 
      { value: "true", id: 'r1c2' },
      { value: "false", id: 'r1c3' },
      { value: "true", id: 'r1c4' },
      { value: "true", id: 'r1c5' },
      { value: "false", id: 'r1c6' },
      { value: "false", id: 'r1c7' },
      { value: "false", id: 'r1c8' },
      { value: "false", id: 'r1c9' },
      { value: "false", id: 'r1c10' },
      { value: "false", id: 'r1c11' }, 
      { value: "false", id: 'r1c12' },
      { value: "false", id: 'r1c13' },
      { value: "false", id: 'r1c14' },
      { value: "false", id: 'r1c15' },
    ],

    [ { value: "true", id: 'r2c1' }, 
      { value: "true", id: 'r2c2' },
      { value: "false", id: 'r2c3' },
      { value: "true", id: 'r2c4' },
      { value: "true", id: 'r2c5' },
      { value: "false", id: 'r2c6' }, 
      { value: "false", id: 'r2c7' },
      { value: "true", id: 'r2c8' },
      { value: "true", id: 'r2c9' },
      { value: "true", id: 'r2c10' },
      { value: "true", id: 'r2c11' }, 
      { value: "true", id: 'r2c12' },
      { value: "true", id: 'r2c13' },
      { value: "false", id: 'r2c14' },
      { value: "false", id: 'r2c15' },
    ],
    
    [ { value: "false", id: 'r3c1' }, 
      { value: "true", id: 'r3c2' },
      { value: "false", id: 'r3c3' },
      { value: "true", id: 'r3c4' },
      { value: "false", id: 'r3c5' },
      { value: "false", id: 'r3c6' }, 
      { value: "true", id: 'r3c7' },
      { value: "true", id: 'r3c8' },
      { value: "false", id: 'r3c9' },
      { value: "false", id: 'r3c10' },
      { value: "false", id: 'r3c11' }, 
      { value: "false", id: 'r3c12' },
      { value: "true", id: 'r3c13' },
      { value: "true", id: 'r3c14' },
      { value: "false", id: 'r3c15' },
    ],

    [ { value: "false", id: 'r4c1' }, 
      { value: "true", id: 'r4c2' },
      { value: "true", id: 'r4c3' },
      { value: "true", id: 'r4c4' },
      { value: "false", id: 'r4c5' },
      { value: "true", id: 'r4c6' }, 
      { value: "true", id: 'r4c7' },
      { value: "false", id: 'r4c8' },
      { value: "true", id: 'r4c9' },
      { value: "true", id: 'r4c10' },
      { value: "true", id: 'r4c11' }, 
      { value: "true", id: 'r4c12' },
      { value: "false", id: 'r4c13' },
      { value: "true", id: 'r4c14' },
      { value: "true", id: 'r4c15' },
    ],

    [ { value: "true", id: 'r5c1' }, 
      { value: "true", id: 'r5c2' },
      { value: "false", id: 'r5c3' },
      { value: "true", id: 'r5c4' },
      { value: "true", id: 'r5c5' },
      { value: "true", id: 'r5c6' }, 
      { value: "false", id: 'r5c7' },
      { value: "true", id: 'r5c8' },
      { value: "true", id: 'r5c9' },
      { value: "false", id: 'r5c10' },
      { value: "false", id: 'r5c11' }, 
      { value: "true", id: 'r5c12' },
      { value: "true", id: 'r5c13' },
      { value: "false", id: 'r5c14' },
      { value: "true", id: 'r5c15' },
    ],
    
    [ { value: "true", id: 'r6c1' }, 
      { value: "false", id: 'r6c2' },
      { value: "true", id: 'r6c3' },
      { value: "false", id: 'r6c4' },
      { value: "true", id: 'r6c5' },
      { value: "true", id: 'r6c6' }, 
      { value: "false", id: 'r6c7' },
      { value: "true", id: 'r6c8' },
      { value: "false", id: 'r6c9' },
      { value: "true", id: 'r6c10' },
      { value: "true", id: 'r6c11' }, 
      { value: "false", id: 'r6c12' },
      { value: "true", id: 'r6c13' },
      { value: "false", id: 'r6c14' },
      { value: "true", id: 'r6c15' },
    ],

    [ { value: "true", id: 'r7c1' }, 
      { value: "false", id: 'r7c2' },
      { value: "false", id: 'r7c3' },
      { value: "false", id: 'r7c4' },
      { value: "false", id: 'r7c5' },
      { value: "true", id: 'r7c6' }, 
      { value: "true", id: 'r7c7' },
      { value: "true", id: 'r7c8' },
      { value: "false", id: 'r7c9' },
      { value: "true", id: 'r7c10' },
      { value: "false", id: 'r7c11' }, 
      { value: "true", id: 'r7c12' },
      { value: "true", id: 'r7c13' },
      { value: "false", id: 'r7c14' },
      { value: "true", id: 'r7c15' },
    ],

    [ { value: "true", id: 'r8c1' }, 
      { value: "true", id: 'r8c2' },
      { value: "true", id: 'r8c3' },
      { value: "false", id: 'r8c4' },
      { value: "false", id: 'r8c5' },
      { value: "false", id: 'r8c6' }, 
      { value: "true", id: 'r8c7' },
      { value: "true", id: 'r8c8' },
      { value: "false", id: 'r8c9' },
      { value: "true", id: 'r8c10' },
      { value: "true", id: 'r8c11' }, 
      { value: "true", id: 'r8c12' },
      { value: "false", id: 'r8c13' },
      { value: "false", id: 'r8c14' },
      { value: "true", id: 'r8c15' },
    ],

    [ { value: "false", id: 'r9c1' }, 
      { value: "true", id: 'r9c2' },
      { value: "false", id: 'r9c3' },
      { value: "false", id: 'r9c4' },
      { value: "false", id: 'r9c5' },
      { value: "false", id: 'r9c6' }, 
      { value: "false", id: 'r9c7' },
      { value: "true", id: 'r9c8' },
      { value: "true", id: 'r9c9' },
      { value: "false", id: 'r9c10' },
      { value: "false", id: 'r9c11' }, 
      { value: "false", id: 'r9c12' },
      { value: "false", id: 'r9c13' },
      { value: "true", id: 'r9c14' },
      { value: "true", id: 'r9c15' },
    ],

    [ { value: "false", id: 'r10c1' }, 
      { value: "true", id: 'r10c2' },
      { value: "true", id: 'r10c3' },
      { value: "false", id: 'r10c4' },
      { value: "false", id: 'r10c5' },
      { value: "false", id: 'r10c6' }, 
      { value: "false", id: 'r10c7' },
      { value: "false", id: 'r10c8' },
      { value: "true", id: 'r10c9' },
      { value: "true", id: 'r10c10' },
      { value: "true", id: 'r10c11' }, 
      { value: "true", id: 'r10c12' },
      { value: "true", id: 'r10c13' },
      { value: "true", id: 'r10c14' },
      { value: "false", id: 'r10c15' },
    ],

    [ { value: "false", id: 'r11c1' }, 
      { value: "false", id: 'r11c2' },
      { value: "true", id: 'r11c3' },
      { value: "true", id: 'r11c4' },
      { value: "false", id: 'r11c5' },
      { value: "false", id: 'r11c6' },
      { value: "false", id: 'r11c7' },
      { value: "false", id: 'r11c8' },
      { value: "false", id: 'r11c9' },
      { value: "false", id: 'r11c10' },
      { value: "false", id: 'r11c11' }, 
      { value: "false", id: 'r11c12' },
      { value: "true", id: 'r11c13' },
      { value: "true", id: 'r11c14' },
      { value: "true", id: 'r11c15' },
    ],

    [ { value: "false", id: 'r12c1' }, 
      { value: "true", id: 'r12c2' },
      { value: "true", id: 'r12c3' },
      { value: "true", id: 'r12c4' },
      { value: "true", id: 'r12c5' },
      { value: "true", id: 'r12c6' }, 
      { value: "true", id: 'r12c7' },
      { value: "true", id: 'r12c8' },
      { value: "true", id: 'r12c9' },
      { value: "true", id: 'r12c10' },
      { value: "true", id: 'r12c11' }, 
      { value: "true", id: 'r12c12' },
      { value: "true", id: 'r12c13' },
      { value: "true", id: 'r12c14' },
      { value: "true", id: 'r12c15' },
    ],
    
    [ { value: "true", id: 'r13c1' }, 
      { value: "true", id: 'r13c2' },
      { value: "true", id: 'r13c3' },
      { value: "true", id: 'r13c4' },
      { value: "true", id: 'r13c5' },
      { value: "true", id: 'r13c6' }, 
      { value: "false", id: 'r13c7' },
      { value: "true", id: 'r13c8' },
      { value: "true", id: 'r13c9' },
      { value: "false", id: 'r13c10' },
      { value: "true", id: 'r13c11' }, 
      { value: "true", id: 'r13c12' },
      { value: "false", id: 'r13c13' },
      { value: "true", id: 'r13c14' },
      { value: "false", id: 'r13c15' },
    ],

    [ { value: "true", id: 'r14c1' }, 
      { value: "true", id: 'r14c2' },
      { value: "false", id: 'r14c3' },
      { value: "false", id: 'r14c4' },
      { value: "true", id: 'r14c5' },
      { value: "true", id: 'r14c6' }, 
      { value: "true", id: 'r14c7' },
      { value: "false", id: 'r14c8' },
      { value: "true", id: 'r14c9' },
      { value: "true", id: 'r14c10' },
      { value: "false", id: 'r14c11' }, 
      { value: "true", id: 'r14c12' },
      { value: "true", id: 'r14c13' },
      { value: "false", id: 'r14c14' },
      { value: "false", id: 'r14c15' },
    ],

    [ { value: "true", id: 'r15c1' }, 
      { value: "false", id: 'r15c2' },
      { value: "false", id: 'r15c3' },
      { value: "false", id: 'r15c4' },
      { value: "false", id: 'r15c5' },
      { value: "false", id: 'r15c6' }, 
      { value: "true", id: 'r15c7' },
      { value: "true", id: 'r15c8' },
      { value: "true", id: 'r15c9' },
      { value: "true", id: 'r15c10' },
      { value: "true", id: 'r15c11' }, 
      { value: "true", id: 'r15c12' },
      { value: "false", id: 'r15c13' },
      { value: "false", id: 'r15c14' },
      { value: "false", id: 'r15c15' },
    ],
    
];

var large2Data = {
    rows: [ ['','','','','',2,2], ['','','','',2,2,6], ['','','',1,1,2,2],
    		['','','',3,2,4,2], ['','',2,3,2,2,1], [1,1,2,1,2,1,1],
    		['','',1,3,1,2,1], ['','','',3,2,3,1], ['','','','',1,2,2],
    		['','','','','',2,6], ['','','','','',2,3], 
    		['','','','','','',14], ['','','',6,2,2,1],['','','',2,3,2,2],
    		['','','','','',1,6]
    ],

    cols: [ ['','','','','','','','','','',1,'','',''],
    		['','','','','','','','','',1,1,'','',''],
    		['','','','','','','','','',1,1,1,'',''],
    		['','',1,'','','',2,2,1,3,1,2,2,'',''],
    		[2,5,1,'',2,'',2,5,2,1,1,2,3,'',''],
    		[4,3,1,5,2,4,1,2,2,1,2,1,3,2,6],
    		[3,3,4,3,3,3,2,1,4,2,1,4,1,5,2]
    ],
};



var large3 = [
    [ { value: "true", id: 'r1c1' }, 
      { value: "true", id: 'r1c2' },
      { value: "true", id: 'r1c3' },
      { value: "true", id: 'r1c4' },
      { value: "false", id: 'r1c5' },
      { value: "false", id: 'r1c6' },
      { value: "false", id: 'r1c7' },
      { value: "false", id: 'r1c8' },
      { value: "true", id: 'r1c9' },
      { value: "true", id: 'r1c10' },
      { value: "true", id: 'r1c11' }, 
      { value: "true", id: 'r1c12' },
      { value: "false", id: 'r1c13' },
      { value: "false", id: 'r1c14' },
      { value: "false", id: 'r1c15' },
    ],

    [ { value: "false", id: 'r2c1' }, 
      { value: "false", id: 'r2c2' },
      { value: "false", id: 'r2c3' },
      { value: "true", id: 'r2c4' },
      { value: "true", id: 'r2c5' },
      { value: "false", id: 'r2c6' }, 
      { value: "false", id: 'r2c7' },
      { value: "true", id: 'r2c8' },
      { value: "true", id: 'r2c9' },
      { value: "true", id: 'r2c10' },
      { value: "false", id: 'r2c11' }, 
      { value: "false", id: 'r2c12' },
      { value: "false", id: 'r2c13' },
      { value: "false", id: 'r2c14' },
      { value: "false", id: 'r2c15' },
    ],
    
    [ { value: "false", id: 'r3c1' }, 
      { value: "true", id: 'r3c2' },
      { value: "true", id: 'r3c3' },
      { value: "true", id: 'r3c4' },
      { value: "true", id: 'r3c5' },
      { value: "true", id: 'r3c6' }, 
      { value: "true", id: 'r3c7' },
      { value: "true", id: 'r3c8' },
      { value: "true", id: 'r3c9' },
      { value: "false", id: 'r3c10' },
      { value: "false", id: 'r3c11' }, 
      { value: "false", id: 'r3c12' },
      { value: "false", id: 'r3c13' },
      { value: "false", id: 'r3c14' },
      { value: "false", id: 'r3c15' },
    ],

    [ { value: "true", id: 'r4c1' }, 
      { value: "true", id: 'r4c2' },
      { value: "true", id: 'r4c3' },
      { value: "true", id: 'r4c4' },
      { value: "false", id: 'r4c5' },
      { value: "true", id: 'r4c6' }, 
      { value: "true", id: 'r4c7' },
      { value: "false", id: 'r4c8' },
      { value: "false", id: 'r4c9' },
      { value: "false", id: 'r4c10' },
      { value: "false", id: 'r4c11' }, 
      { value: "false", id: 'r4c12' },
      { value: "false", id: 'r4c13' },
      { value: "false", id: 'r4c14' },
      { value: "false", id: 'r4c15' },
    ],

    [ { value: "true", id: 'r5c1' }, 
      { value: "false", id: 'r5c2' },
      { value: "false", id: 'r5c3' },
      { value: "false", id: 'r5c4' },
      { value: "false", id: 'r5c5' },
      { value: "false", id: 'r5c6' }, 
      { value: "true", id: 'r5c7' },
      { value: "true", id: 'r5c8' },
      { value: "false", id: 'r5c9' },
      { value: "false", id: 'r5c10' },
      { value: "false", id: 'r5c11' }, 
      { value: "false", id: 'r5c12' },
      { value: "false", id: 'r5c13' },
      { value: "false", id: 'r5c14' },
      { value: "false", id: 'r5c15' },
    ],
    
    [ { value: "false", id: 'r6c1' }, 
      { value: "false", id: 'r6c2' },
      { value: "false", id: 'r6c3' },
      { value: "true", id: 'r6c4' },
      { value: "true", id: 'r6c5' },
      { value: "true", id: 'r6c6' }, 
      { value: "false", id: 'r6c7' },
      { value: "true", id: 'r6c8' },
      { value: "false", id: 'r6c9' },
      { value: "true", id: 'r6c10' },
      { value: "true", id: 'r6c11' }, 
      { value: "true", id: 'r6c12' },
      { value: "false", id: 'r6c13' },
      { value: "false", id: 'r6c14' },
      { value: "false", id: 'r6c15' },
    ],

    [ { value: "false", id: 'r7c1' }, 
      { value: "false", id: 'r7c2' },
      { value: "true", id: 'r7c3' },
      { value: "true", id: 'r7c4' },
      { value: "false", id: 'r7c5' },
      { value: "true", id: 'r7c6' }, 
      { value: "true", id: 'r7c7' },
      { value: "true", id: 'r7c8' },
      { value: "true", id: 'r7c9' },
      { value: "true", id: 'r7c10' },
      { value: "false", id: 'r7c11' }, 
      { value: "true", id: 'r7c12' },
      { value: "true", id: 'r7c13' },
      { value: "false", id: 'r7c14' },
      { value: "false", id: 'r7c15' },
    ],

    [ { value: "false", id: 'r8c1' }, 
      { value: "true", id: 'r8c2' },
      { value: "true", id: 'r8c3' },
      { value: "false", id: 'r8c4' },
      { value: "false", id: 'r8c5' },
      { value: "false", id: 'r8c6' }, 
      { value: "true", id: 'r8c7' },
      { value: "true", id: 'r8c8' },
      { value: "true", id: 'r8c9' },
      { value: "false", id: 'r8c10' },
      { value: "false", id: 'r8c11' }, 
      { value: "false", id: 'r8c12' },
      { value: "true", id: 'r8c13' },
      { value: "true", id: 'r8c14' },
      { value: "false", id: 'r8c15' },
    ],

    [ { value: "false", id: 'r9c1' }, 
      { value: "true", id: 'r9c2' },
      { value: "false", id: 'r9c3' },
      { value: "false", id: 'r9c4' },
      { value: "false", id: 'r9c5' },
      { value: "false", id: 'r9c6' }, 
      { value: "false", id: 'r9c7' },
      { value: "true", id: 'r9c8' },
      { value: "false", id: 'r9c9' },
      { value: "false", id: 'r9c10' },
      { value: "false", id: 'r9c11' }, 
      { value: "false", id: 'r9c12' },
      { value: "false", id: 'r9c13' },
      { value: "true", id: 'r9c14' },
      { value: "false", id: 'r9c15' },
    ],

    [ { value: "false", id: 'r10c1' }, 
      { value: "true", id: 'r10c2' },
      { value: "false", id: 'r10c3' },
      { value: "false", id: 'r10c4' },
      { value: "false", id: 'r10c5' },
      { value: "false", id: 'r10c6' }, 
      { value: "false", id: 'r10c7' },
      { value: "false", id: 'r10c8' },
      { value: "false", id: 'r10c9' },
      { value: "false", id: 'r10c10' },
      { value: "false", id: 'r10c11' }, 
      { value: "false", id: 'r10c12' },
      { value: "false", id: 'r10c13' },
      { value: "true", id: 'r10c14' },
      { value: "false", id: 'r10c15' },
    ],

    [ { value: "false", id: 'r11c1' }, 
      { value: "true", id: 'r11c2' },
      { value: "true", id: 'r11c3' },
      { value: "false", id: 'r11c4' },
      { value: "false", id: 'r11c5' },
      { value: "false", id: 'r11c6' },
      { value: "false", id: 'r11c7' },
      { value: "false", id: 'r11c8' },
      { value: "false", id: 'r11c9' },
      { value: "false", id: 'r11c10' },
      { value: "false", id: 'r11c11' }, 
      { value: "false", id: 'r11c12' },
      { value: "true", id: 'r11c13' },
      { value: "true", id: 'r11c14' },
      { value: "false", id: 'r11c15' },
    ],

    [ { value: "false", id: 'r12c1' }, 
      { value: "true", id: 'r12c2' },
      { value: "true", id: 'r12c3' },
      { value: "true", id: 'r12c4' },
      { value: "false", id: 'r12c5' },
      { value: "false", id: 'r12c6' }, 
      { value: "false", id: 'r12c7' },
      { value: "false", id: 'r12c8' },
      { value: "false", id: 'r12c9' },
      { value: "false", id: 'r12c10' },
      { value: "false", id: 'r12c11' }, 
      { value: "true", id: 'r12c12' },
      { value: "true", id: 'r12c13' },
      { value: "true", id: 'r12c14' },
      { value: "false", id: 'r12c15' },
    ],
    
    [ { value: "false", id: 'r13c1' }, 
      { value: "false", id: 'r13c2' },
      { value: "true", id: 'r13c3' },
      { value: "true", id: 'r13c4' },
      { value: "true", id: 'r13c5' },
      { value: "false", id: 'r13c6' }, 
      { value: "false", id: 'r13c7' },
      { value: "false", id: 'r13c8' },
      { value: "false", id: 'r13c9' },
      { value: "false", id: 'r13c10' },
      { value: "true", id: 'r13c11' }, 
      { value: "true", id: 'r13c12' },
      { value: "true", id: 'r13c13' },
      { value: "false", id: 'r13c14' },
      { value: "false", id: 'r13c15' },
    ],

    [ { value: "false", id: 'r14c1' }, 
      { value: "false", id: 'r14c2' },
      { value: "false", id: 'r14c3' },
      { value: "true", id: 'r14c4' },
      { value: "true", id: 'r14c5' },
      { value: "true", id: 'r14c6' }, 
      { value: "true", id: 'r14c7' },
      { value: "true", id: 'r14c8' },
      { value: "true", id: 'r14c9' },
      { value: "true", id: 'r14c10' },
      { value: "true", id: 'r14c11' }, 
      { value: "true", id: 'r14c12' },
      { value: "false", id: 'r14c13' },
      { value: "false", id: 'r14c14' },
      { value: "false", id: 'r14c15' },
    ],

    [ { value: "false", id: 'r15c1' }, 
      { value: "false", id: 'r15c2' },
      { value: "false", id: 'r15c3' },
      { value: "false", id: 'r15c4' },
      { value: "false", id: 'r15c5' },
      { value: "true", id: 'r15c6' }, 
      { value: "true", id: 'r15c7' },
      { value: "true", id: 'r15c8' },
      { value: "true", id: 'r15c9' },
      { value: "true", id: 'r15c10' },
      { value: "false", id: 'r15c11' }, 
      { value: "false", id: 'r15c12' },
      { value: "false", id: 'r15c13' },
      { value: "false", id: 'r15c14' },
      { value: "false", id: 'r15c15' },
    ],
    
];

var large3Data = {
    rows: [ ['',4,4], ['',2,3], ['','',8], ['',4,2], ['',1,2], [3,1,3],
    		[2,5,2], [2,3,2], [1,1,1], ['',1,1], ['',2,2], ['',3,3], 
    		['',3,3], ['','',9], ['','',5]

    ],

    cols: [ ['','',1,'','','','','','','','','','','',''],
    		['',1,2,4,2,2,3,2,3,2,1,1,'','',''],
    		[1, 2, 2, 2, 1, 2, 2, 5, 2, 2, 1, 2, 2, '',''],
    		[2, 5, 3, 3, 2, 2, 2, 2, 2, 2, 2, 3, 3, 5, '0']
    ],
};

var puzzles = { 'testPuzzle': testPuzzle,
                'small1': small1,
                'small2': small2,
                'small3': small3,
                'medium1': medium1,
                'medium2': medium2,
                'medium3': medium3,
                'large1': large1,
                'large2': large2,
                'large3': large3,
};