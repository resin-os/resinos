var $pageContent = $('.docs__content')

$.fn.addAnchor = function() {
  this.each(function () {
    var $el = $(this)
    $el.append(' <a class="hash" href="#' + $el.attr('id') + '">#</a>')
  })
  return this
}


$('.docs__sidebar').height($(document).height())
$pageContent
  .find('h2,h3,h4,h5,h6')
  .addAnchor()
$pageContent
  .find('table')
  .addClass('table table-bordered')
$pageContent
  .find('p > strong:first-child:contains("Warning")')
  .parent()
  .wrap('<div class="alert alert-warning"></div>')
$pageContent
  .find('p > strong:first-child:contains("Note")')
  .parent()
  .wrap('<div class="alert alert-info"></div>')
$pageContent
  .find('p > strong:first-child:contains("NOTE")')
  .parent()
  .wrap('<div class="alert alert-info"></div>')

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g
function escapeRegExp(string) {
  return string.replace(reRegExpChar, '\\$&')
}

var $dynamicSwitch = $('.js-dynamic-switch')

if ($dynamicSwitch.length) {
  var $dynamicSwitchSelects = $dynamicSwitch.find('select')
  var urlTemplate = $dynamicSwitch.data('url-template')

  function getDynamicContext() {
    var result = {}
    $dynamicSwitchSelects.each(function() {
      result[this.getAttribute('name')] = this.value
    })
    return result
  }

  function populateTemplate(arg, context) {
    var key, value, re
    for (key in context) {
      value = context[key]
      re = new RegExp(escapeRegExp(key), 'g')
      arg = arg.replace(re, value)
    }
    return arg
  }

  $dynamicSwitchSelects.on('change', function() {
    location.href = populateTemplate(urlTemplate, getDynamicContext())
  })
}
