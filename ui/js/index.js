(function() {
  var db = new PouchDB('playground', {
    auto_compaction: true,
    size: 1000
  });

  db.replicate.to('http://calebjacob.com:6690/poop', {
    live: true,
    retry: true
  }, function(error) {
    console.log(error);
  });

  db.replicate.from('http://calebjacob.com:6690/poop', {
    live: true,
    retry: true
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

  var createButton = document.querySelector('#create');
  createButton.addEventListener('click', createThing);



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




  function loadThing() {
    db
      .get('B59FF33F-CC29-EEF7-AE9C-06D3F5F9E61E')
      .then(function(result) {
        console.log('result', result);
      })
      .catch(function(error) {
        console.log('error', error);
      });
  }

  var loadButton = document.querySelector('#load');
  loadButton.addEventListener('click', loadThing);
})();
