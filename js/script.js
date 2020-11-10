$(document).ready(function () {
    // $('#download').click(function () {
    //     this.href = $('#canvas')[0].toDataURL();// Change here
    //     this.download = 'design.png';
    // });
    $('#control').hide();

    $('#video').resize(function () {
        $('#cont').height($('#video').height());
        $('#cont').width('100%');
        $('#control').height($('#video').height() * 0.1);
        $('#control').css('top', $('#video').height() * 0.9);
        $('#control').width('100%');
        $('#control').show();
    });

    function opencam() {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.oGetUserMedia || navigator.msGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia(
                { video: true },
                streamWebCam,
                throwError);
        }
    }
    function closecam() {

        video.pause();

        try {
            video.srcObject = null;
        } catch (error) {
            video.src = null;
        }

        var track = strr.getTracks()[0];  // if only one media track
        // ...
        track.stop();

    }
    var video = document.getElementById('video');
    var test = document.getElementById('cont');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var strr;
    function streamWebCam(stream) {
        const mediaSource = new MediaSource(stream);
        try {
            video.srcObject = stream;
        } catch (error) {
            video.src = URL.createObjectURL(mediaSource);
        }
        video.play();
        strr = stream;
    }
    function throwError(e) {
        alert(e.name);
    }
    // open camera function 
    opencam();
    $('#control').show();
    // open camera function 


    $('#close').click(function (event) {
        closecam();
    });
    let count = 0;
    $('#snap').click(function (event) {  
        canvas.width = test.clientWidth;
        canvas.height = test.clientHeight;
        context.drawImage(video, 0, 0);
        $('#vid').css('z-index', '20');
        $('#capture').css('z-index', '30');
        if (count <= 3) { 
            console.log(count);  
            $('.face-thumbnail .face-wrap').eq(count).find('img').attr('src', $('#canvas')[0].toDataURL());
            count++;
        }
        if(count > 3){
            count = 0;
        }
    });
    $('#retake').click(function (event) {
        $('#vid').css('z-index', '30');
        $('#capture').css('z-index', '20');
    });
});