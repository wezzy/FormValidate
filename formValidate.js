/*
Copyright (c) 2009, artBits snc. All rights reserved.
Code licensed under the BSD License
version: 0.1
*/

if(YAHOO.ext === undefined) YAHOO.ext = {};

/**
 * Powerful form validation using YUI
 * @module ext
 * @class FormValidate
 * @static
 */
YAHOO.ext.FormValidate = (function (msg) {
	
	// Data structure
	var _rules = [];
	
	// Initialization
	var _startup = function(){
		var forms = YAHOO.util.Selector.query('form'); 
		for(var i = 0; i < fomrs.length; i++){
			YAHOO.util.Event.addListener(forms[i], "submit", function(evt){
				var form = forms[i];
				YAHOO.ext.FormValidate.check(forms, evt);
			}); 
		}
	}
	
	var _parseRule = function(element, rule){
		var rule = {};
		rule.element = element.getAttribute('id');
		var params = rule.split("#");
		rule.command = params[0];
		var p = [];
		for(var i = 1; i < params.length - 1; i++){
			p.push(params[i]);
		}
		rule.params = p;
		
		_rules.push(rule);
	}
	
	var _parseCompleteRule = function(rule){
		var params = rule.split('#');		
		_parseRule(params[0], rule.replace(params[0] + "#"));
	}
	
	var _showError = function(element, message){
		
	}
	
	var _hideError = function(element){
		
	}
	
	var _checker = {};
	
	_checker['no'] = function(){
		return true;
	}
	
	return {
		
		/**
		* This method initialize FormValidate and add the event listeners to forms
		* @param {array} rules an array of rules to validate
		*/
		init: function(rules){
			if(rules) _rules = _rules.concat(rules);
			YAHOO.util.Event.onDOMReady(_startup);
		},
		
		/**
		* Perform the check
		* @param {HTMLElement} form optionally specify the form to check
		* @param {Event} evt optionally pass the submit event
		* @return {bool} true if all the check pass
		*/
		check: function(form, evt){
			if(!form){
				if(evt) form = YAHOO.util.Event.getTarget(evt);
			}
			
			if(typeof(form) === "string") form = YAHOO.util.Dom.get(form);
			
			if(form){
				var customFormRule = form.getAttribute('validate');
				if(customFormRule == "no") return;
			}
			
			for(var i = 0; i < _rules.length; i++){
				
				var r = _rules[i];
				var element;
				if(form){
					element = YAHOO.util.Selector.query(r.element, form);
				}else{
					element = YAHOO.util.Selector.query(r.element);
				}
				
				var result = _checker[r.command](element, r.params);
			}
			
			if(evt) YAHOO.util.Event.stopEvent(evt);
		}
		
	}
	
})();
YAHOO.register("formvalidate", YAHOO.ext.FormValidate, {version: "0.1", build: "0"});