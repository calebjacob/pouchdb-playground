(function() {
  var db = new PouchDB('playground');

  db.replicate.to('http://calebjacob.com:6690/test', {
    live: true
  }, function(error) {
    console.log(error);
  });

  db.replicate.from('http://calebjacob.com:6690/test', {
    live: true
  }, function(error) {
    console.log(error);
  });



  function createThing() {
    var thing = {
      foobar: Date.now()
    };

    db
      .post(thing)
      .then(function(result) {
        console.log(result);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  var button = document.querySelector('button');
  button.addEventListener('click', createThing);



  function renderThings() {
    db
      .allDocs({
        include_docs: true
      })
      .then(function(things) {
        var container = document.getElementById('things');
        var html = '';

        things.rows.forEach(function(row) {
          html += ('<p>' + row.doc.foobar + '</p>');
        });

        container.innerHTML = html;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  renderThings();



  db
    .changes({
      since: 'now',
      live: true
    })
    .on('change', renderThings);
})();
