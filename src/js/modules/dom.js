var dom = (function(){
  'use strict';

  var version = '1.0.0';
  var author  = 'sona';

  function cLog(input, console_style) {
    validate(!isString(input), 'You should input the string');

    if ( input.indexOf('%c') > -1 ) {
      console_style = console_style || cLog.styles;
      console.log(input, console_style);
    } else {
      console.log(input);
    }
  }

  cLog.styles = 'color: #fe4940; font-size: 1.2rem;';

  function isDataType(data) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
  }

  function isNumber(data) {
    return isDataType(data) === 'number';
  }

  function isString(data) {
    return isDataType(data) === 'string';
  }

  function isBoolean(data) {
    return isDataType(data) === 'boolean';
  }

  function isFunction(data) {
    return isDataType(data) === 'function';
  }

  function isArray(data) {
    return isDataType(data) === 'array';
  }

  function isObject(data) {
    return isDataType(data) === 'object';
  }

  function isElement(node) {
    if (!node) { return false; }
    return node.nodeType === 1;
  }

  function isDocument(node) {
    return node.nodeType === 9;
  }

  function validate(condition, error_message) {
    if (condition) { throw new Error(error_message); }
  }

  function isValidate(condition, success, fail) {
    if ( condition && success && isFunction(success) ) { success(); }
    if ( !condition && fail && isFunction(fail) ) { fail(); }
    return condition ? true : false;
  }

  function queryAll(selector, context ) {
    validate( !isString(selector), 'arguments must be string type' );

    context = (isString(context) ? query(context) : context) || document;
    validate( !isElement(context) && !isDocument(context), 'Second Element must be element node' );
    return context.querySelectorAll(selector);
  }

  function query(selector, context) {
    return queryAll(selector, context)[0];
  }

  function hasClass(target, className) {
    validate( !isString(className), 'arguments must be string type' );
    var classes = target.className.split(' ');
    if (classes.indexOf(className) === -1) {
      return false;
    } else {
      return true;
    }
  }

  function addClass(target, className) {
    validate( !isString(className), 'arguments must be string type' );

    if(!hasClass(target, className)) {
      target.className = target.className + ' ' + className;
    }
  }

  function toggle(ctrGroup, hiddenClass) {

    if (hasClass(ctrGroup, hiddenClass)) {
      ctrGroup.className = ctrGroup.className.split(' ')[0];
    } else {
      addClass(ctrGroup, hiddenClass);
    }
  }

  function show(context) {
    context = (isString(context) ? query(context) : context) || document;
    context.style.display = 'block';

  }

  function hide(context) {
    context = (isString(context) ? query(context) : context) || document;
    context.style.display = 'none';
  }

  function isCorrectSoundCloudURL(track) {
    var re = /https:\/\/soundcloud.com\/[0-9a-z-]+\/[0-9a-z-]+/;
    return re.test(track);
  }

  return {
    'info': {
      'version': version,
      'author': author
    },
    'util': {
      'cLog': cLog,
      'toggle' : toggle,
      'isCorrectSoundCloudURL' : isCorrectSoundCloudURL
    },
    'query' : query,
    'show'  : show,
    'hide'  : hide
  };
})();
