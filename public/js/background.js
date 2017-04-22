$.ajax({
    url: '/get_bg',
    type: 'get',
    success: function(data) {
        $.backstretch([data], {
            duration: 5000,
            fade: 1200
        });
    },
    fail: function(err) {
        alert(err);
    }
});