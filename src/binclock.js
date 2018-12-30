const binClock = (function() {

  const _units = ['hours', 'minutes', 'seconds'];

  const _clockData = {
    hours: {
      decimalValue: null,
      binaryValue: null,
      binaryElements: [],
      labelElement: null,
      decimalElement: null
    },
    minutes: {
      decimalValue: null,
      binaryValue: null,
      binaryElements: [],
      labelElement: null,
      decimalElement: null
    },
    seconds: {
      decimalValue: null,
      binaryValue: null,
      binaryElements: [],
      labelElement: null,
      decimalElement: null
    }
  };

  const _classNames = ['off', 'on'];


  function render() {

    _units.forEach(function(unit) {

      const binaryValue = _clockData[unit].binaryValue.split('');

      _clockData[unit].decimalElement.innerText = _clockData[unit].decimalValue;
      
      _clockData[unit].binaryElements.forEach(function(el, index) {

        const value = parseInt(binaryValue[index] ? binaryValue[index] : '0');

        el.innerText = value;

        if (!el.classList.contains(_classNames[value])) {
          el.classList.remove(_classNames[0], _classNames[1]);
          el.classList.add(_classNames[value]);
        }

      });

    });

  }


  function getPaddedBinaryString(decimalValue) {

    const numBinaryPositions = 6;
    const binaryString = decimalValue.toString(2);
    const padding = '000000'.substr(0, numBinaryPositions - binaryString.length);

    return (padding + binaryString);

  }


  function onInterval() {

    const date = new Date();

    _clockData.hours.decimalValue = date.getHours();
    _clockData.hours.binaryValue = getPaddedBinaryString(_clockData.hours.decimalValue);

    _clockData.minutes.decimalValue = date.getMinutes();
    _clockData.minutes.binaryValue = getPaddedBinaryString(_clockData.minutes.decimalValue);

    _clockData.seconds.decimalValue = date.getSeconds();
    _clockData.seconds.binaryValue = getPaddedBinaryString(_clockData.seconds.decimalValue);

    render();

  }


  function createElement(tagName, className, parent) {

    const el = document.createElement(tagName);

    if (className) {
      el.className = className;
    }

    parent && parent.appendChild(el);

    return el;

  }


  function populateListMarkup() {

    const numBinaryPositions = 6;

    _units.forEach(function(unit) {

      const list = createElement('ol', 'binclock-list ' + unit);

      _clockData[unit].labelElement = createElement('li', 'binclock-label', list);
      _clockData[unit].labelElement.innerText = unit[0].toUpperCase();

      for (let i = 0; i < numBinaryPositions; i++) {

        const binaryEl = createElement('li', 'binclock-binary ' + _classNames[0], list);

        _clockData[unit].binaryElements.push(binaryEl);

      }

      _clockData[unit].decimalElement = createElement('li', 'binclock-decimal', list);
      _clockData.el.appendChild(list);

    });

  }


  function start(elementId) {

    _clockData.el = document.getElementById(elementId);

    populateListMarkup();
    onInterval();

    setInterval(onInterval, 1000);

    return _clockData;

  }


  return start;

}());