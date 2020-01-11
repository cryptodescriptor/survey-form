/* Highlight checkboxes and radio buttons only when focused using TAB */

var tabbed = false;

var keyCodes = [
	9 /* TAB */,
	37 /* LEFT */,
	38 /* UP */,
	39 /* RIGHT */,
	40 /* DOWN */
];

window.addEventListener('keydown', function(e) {
  if (keyCodes.indexOf(e.keyCode) !== -1) {
    tabbed = true;
  }
}, true); /* as soon as captured */

window.addEventListener('mousedown', function(e) {
  tabbed = false;
}, true); /* as soon as captured */

var radios = document.querySelectorAll('input[type="radio"]'),
	checkboxes = document.querySelectorAll('input[type="checkbox"]');

// ie11 nodelist forEach
if(window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}

var cachedAdjacentElements = {};

[radios, checkboxes].forEach(function(elements) {
	elements.forEach(function(element) {
		cachedAdjacentElements[element.id] = document.querySelector('#' + element.id + ' + label');

		element.addEventListener('focus', function(e) {
			if (tabbed) {
				cachedAdjacentElements[e.target.id].classList.add('focused');
				tabbed = false;
			}
		});

		element.addEventListener('blur', function(e) {
			cachedAdjacentElements[e.target.id].classList.remove('focused');
		});
	});
});

var selects = document.querySelectorAll('select'),
  cachedSelectParents = {};

selects.forEach(function(select) {
  cachedSelectParents[select.id] = select.parentElement;

  select.addEventListener('focus', function(e) {
    if (tabbed) {
      cachedSelectParents[e.target.id].classList.add('focused');
      tabbed = false;
    }
  });

  select.addEventListener('blur', function(e) {
    cachedSelectParents[e.target.id].classList.remove('focused');
  });
});