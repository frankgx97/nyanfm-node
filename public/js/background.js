 var promise = new Promise(function(resolve, reject) {
     $.ajax({
         url: '/get_bg',
         type: 'get',
         success: function(data) {
             var rst = [];
             data.forEach(function(element) {
                 rst.push(element.url);
             }, this);
             resolve(rst);
         },
         fail: function(err) {
             alert(err);
         }
     });
 });
 promise.then(function(data) {
     $.backstretch([data], {
         duration: 5000,
         fade: 1200
     });
 });