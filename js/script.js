$(document).ready(function () {
    var password = prompt("Enter the password");
    if (password !== "guise@dollar") {
        document.body.innerHTML = '';
        document.body.innerHTML = 'Password Failed! Reload to Renter Password';
        return false;
    }

    // camera html 
    // Grab elements, create settings, etc.
    var video = document.getElementById('video');
    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
            video.srcObject = stream;
            video.play();
        });
    }


    let count = 0;
    $('#snap').click(function () {
        if (count <= 3) {
            $('.face-thumbnail .face-wrap').eq(count).find('img').attr('src', $('#canvas')[0].toDataURL());
            count++;
        }
        if (count > 3) {
            count = 0;
        }
    });
});