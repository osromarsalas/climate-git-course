$(() => {
  var $h1 = $('h1');
  var $latitude = $("input[name='latitude']");
  var $longitude = $("input[name='longitude']");
  var btnLocation = $("input[name='btnLocation']");

  /* get location  */
  btnLocation.on('click', getPosition);

  function getPosition() {
    const geoconfig = {
      enableHighAccurancy: true,
      timeout: '10000',
      maximunAge: 60000
    };

    navigator.geolocation.getCurrentPosition(
      show, errors, geoconfig
    );
  }

  function show(position) {
    $latitude.val(position.coords.latitude);
    $longitude.val(position.coords.longitude);
  }

  function errors() {
    alert(`Error: ${error.code} ${error.message}`);
  }
  /* - get location */

  /* send to server */
  $('form').on('submit', (event) => {
    event.preventDefault();
    var latitude = $.trim($latitude.val());
    var longitude = $.trim($longitude.val());

    $h1.text('Loading...');

    var req = $.ajax({
      url: `/latitude/${latitude}/longitude/${longitude}`,
      dataType: 'json'
    });

    req.done((data) => {
      var temperature = data.temperature;
      $h1.html(`The temperature in ${data.timezone} is ${temperature} &#176 centigrados; in latitude ${latitude} and longitude ${longitude}`);
    });

    req.fail((error) => {
      $h1.text('Error!', error);
    });
  })
  /* - send to server */
});
