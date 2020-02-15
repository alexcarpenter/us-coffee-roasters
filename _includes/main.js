window.onload = function() {
  var countUp = new CountUp('roasters-length', {{ roasters.length }}, {
    startVal: 100
  });
  countUp.start();
};
