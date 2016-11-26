this.dom_helper = (function(global){
  'use strict';
  var version = '1.0.0';
  var author  = 'sona';

  /** @function cLog */
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

  /** @function isDataType() */
  function isDataType(data) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
  }

  /** @function isNumber() */
  function isNumber(data) {
    return isDataType(data) === 'number';
  }
  /** @function isString() */
  function isString(data) {
    return isDataType(data) === 'string';
  }
  /** @function isBoolean() */
  function isBoolean(data) {
    return isDataType(data) === 'boolean';
  }
  /** @function isFunction() */
  function isFunction(data) {
    return isDataType(data) === 'function';
  }
  /** @function isArray() */
  function isArray(data) {
    return isDataType(data) === 'array';
  }
  /** @function isObject() */
  function isObject(data) {
    return isDataType(data) === 'object';
  }

  /** @function isElement() */
  function isElement(node) {
    if (!node) { return false; }
    return node.nodeType === 1;
  }

  /** @function isDocument() */
  function isDocument(node) {
    return node.nodeType === 9;
  }

  /** @function validate() */
  function validate(condition, error_message) {
    if (condition) { throw new Error(error_message); }
  }

  /** @function isValidate() */
  function isValidate(condition, success, fail) {
    if ( condition && success && isFunction(success) ) { success(); }
    if ( !condition && fail && isFunction(fail) ) { fail(); }
    return condition ? true : false;
  }

  /** @function queryAll() */
  function queryAll(selector, context ) {
    validate( !isString(selector), 'arguments must be string type' );

    context = (isString(context) ? query(context) : context) || document;
    validate( !isElement(context) && !isDocument(context), 'Second Element must be element node' );
    return context.querySelectorAll(selector);
  }

  /** @function query() */
  function query(selector, context) {
    return queryAll(selector, context)[0];
  }

  /** @function controlGroup() */
  // function toggle(ctrGroup) {
  //  if (ctrGroup.className.indexOf('ctrgroup--hidden') === 9) {
  //     ctrGroup.className = ctrGroup.className.split(' ')[0];
  //   } else {
  //     ctrGroup.className = ctrGroup.className + ' ctrgroup--hidden';
  //   }
  // }

  return {
    'info': {
      'version': version,
      'author': author
    },
    'util': {
      'cLog': cLog
    },
    'query'    : query,
  };
})(this);
