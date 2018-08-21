$(document).ready(function() {
    $.ajax({
        url: '/api/get_bg',
        type: 'get',
        success: function(data) {
            //console.log(data)
            $.backstretch(data, {
                duration: 5000,
                fade: 1200
            });
        },
        fail: function(err) {
            alert(err);
        }
    });
});