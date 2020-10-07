/*!
 * jQuery Migrate - v3.0.1 - 2017-09-26
 * Copyright jQuery Foundation and other contributors
 */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],window,a)}else{if(typeof module==="object"&&module.exports){module.exports=a(require("jquery"),window)}else{a(jQuery,window)}}})(function(m,i){m.migrateVersion="3.0.1";(function(){var C=/^[12]\./;if(!i.console||!i.console.log){return}if(!m||C.test(m.fn.jquery)){i.console.log("JQMIGRATE: jQuery 3.0.0+ REQUIRED")}if(m.migrateWarnings){i.console.log("JQMIGRATE: Migrate plugin loaded multiple times")}i.console.log("JQMIGRATE: Migrate is installed"+(m.migrateMute?"":" with logging active")+", version "+m.migrateVersion)})();var A={};m.migrateWarnings=[];if(m.migrateTrace===undefined){m.migrateTrace=true}m.migrateReset=function(){A={};m.migrateWarnings.length=0};function g(D){var C=i.console;if(!A[D]){A[D]=true;m.migrateWarnings.push(D);if(C&&C.warn&&!m.migrateMute){C.warn("JQMIGRATE: "+D);if(m.migrateTrace&&C.trace){C.trace()}}}}function a(D,F,C,E){Object.defineProperty(D,F,{configurable:true,enumerable:true,get:function(){g(E);return C},set:function(G){g(E);C=G}})}function d(D,F,C,E){D[F]=function(){g(E);return C.apply(this,arguments)}}if(i.document.compatMode==="BackCompat"){g("jQuery is not compatible with Quirks Mode")}var x=m.fn.init,t=m.isNumeric,s=m.find,n=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,k=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g;m.fn.init=function(D){var C=Array.prototype.slice.call(arguments);if(typeof D==="string"&&D==="#"){g("jQuery( '#' ) is not a valid selector");C[0]=[]}return x.apply(this,C)};m.fn.init.prototype=m.fn;m.find=function(C){var F=Array.prototype.slice.call(arguments);if(typeof C==="string"&&n.test(C)){try{i.document.querySelector(C)}catch(E){C=C.replace(k,function(H,G,J,I){return"["+G+J+'"'+I+'"]'});try{i.document.querySelector(C);g("Attribute selector with '#' must be quoted: "+F[0]);F[0]=C}catch(D){g("Attribute selector with '#' was not fixed: "+F[0])}}}return s.apply(this,F)};var v;for(v in s){if(Object.prototype.hasOwnProperty.call(s,v)){m.find[v]=s[v]}}m.fn.size=function(){g("jQuery.fn.size() is deprecated and removed; use the .length property");return this.length};m.parseJSON=function(){g("jQuery.parseJSON is deprecated; use JSON.parse");return JSON.parse.apply(null,arguments)};m.isNumeric=function(F){function D(H){var G=H&&H.toString();return !m.isArray(H)&&(G-parseFloat(G)+1)>=0}var E=t(F),C=D(F);if(E!==C){g("jQuery.isNumeric() should not be called on constructed objects")}return C};d(m,"holdReady",m.holdReady,"jQuery.holdReady is deprecated");d(m,"unique",m.uniqueSort,"jQuery.unique is deprecated; use jQuery.uniqueSort");a(m.expr,"filters",m.expr.pseudos,"jQuery.expr.filters is deprecated; use jQuery.expr.pseudos");a(m.expr,":",m.expr.pseudos,"jQuery.expr[':'] is deprecated; use jQuery.expr.pseudos");var p=m.ajax;m.ajax=function(){var C=p.apply(this,arguments);if(C.promise){d(C,"success",C.done,"jQXHR.success is deprecated and removed");d(C,"error",C.fail,"jQXHR.error is deprecated and removed");d(C,"complete",C.always,"jQXHR.complete is deprecated and removed")}return C};var c=m.fn.removeAttr,o=m.fn.toggleClass,z=/\S+/g;m.fn.removeAttr=function(D){var C=this;m.each(D.match(z),function(F,E){if(m.expr.match.bool.test(E)){g("jQuery.fn.removeAttr no longer sets boolean properties: "+E);C.prop(E,false)}});return c.apply(this,arguments)};m.fn.toggleClass=function(C){if(C!==undefined&&typeof C!=="boolean"){return o.apply(this,arguments)}g("jQuery.fn.toggleClass( boolean ) is deprecated");return this.each(function(){var D=this.getAttribute&&this.getAttribute("class")||"";if(D){m.data(this,"__className__",D)}if(this.setAttribute){this.setAttribute("class",D||C===false?"":m.data(this,"__className__")||"")}})};var u=false;if(m.swap){m.each(["height","width","reliableMarginRight"],function(D,C){var E=m.cssHooks[C]&&m.cssHooks[C].get;if(E){m.cssHooks[C].get=function(){var F;u=true;F=E.apply(this,arguments);u=false;return F}}})}m.swap=function(H,G,I,F){var E,D,C={};if(!u){g("jQuery.swap() is undocumented and deprecated")}for(D in G){C[D]=H.style[D];H.style[D]=G[D]}E=I.apply(H,F||[]);for(D in G){H.style[D]=C[D]}return E};var B=m.data;m.data=function(G,C,H){var F;if(C&&typeof C==="object"&&arguments.length===2){F=m.hasData(G)&&B.call(this,G);var E={};for(var D in C){if(D!==m.camelCase(D)){g("jQuery.data() always sets/gets camelCased names: "+D);F[D]=C[D]}else{E[D]=C[D]}}B.call(this,G,E);return C}if(C&&typeof C==="string"&&C!==m.camelCase(C)){F=m.hasData(G)&&B.call(this,G);if(F&&C in F){g("jQuery.data() always sets/gets camelCased names: "+C);if(arguments.length>2){F[C]=H}return F[C]}}return B.apply(this,arguments)};var f=m.Tween.prototype.run;var l=function(C){return C};m.Tween.prototype.run=function(){if(m.easing[this.easing].length>1){g("'jQuery.easing."+this.easing.toString()+"' should use only one argument");m.easing[this.easing]=l}f.apply(this,arguments)};m.fx.interval=m.fx.interval||13;if(i.requestAnimationFrame){a(m.fx,"interval",m.fx.interval,"jQuery.fx.interval is deprecated")}var h=m.fn.load,w=m.event.add,j=m.event.fix;m.event.props=[];m.event.fixHooks={};a(m.event.props,"concat",m.event.props.concat,"jQuery.event.props.concat() is deprecated and removed");m.event.fix=function(C){var F,E=C.type,G=this.fixHooks[E],D=m.event.props;if(D.length){g("jQuery.event.props are deprecated and removed: "+D.join());while(D.length){m.event.addProp(D.pop())}}if(G&&!G._migrated_){G._migrated_=true;g("jQuery.event.fixHooks are deprecated and removed: "+E);if((D=G.props)&&D.length){while(D.length){m.event.addProp(D.pop())}}}F=j.call(this,C);return G&&G.filter?G.filter(F,C):F};m.event.add=function(D,C){if(D===i&&C==="load"&&i.document.readyState==="complete"){g("jQuery(window).on('load'...) called after load event occurred")}return w.apply(this,arguments)};m.each(["load","unload","error"],function(D,C){m.fn[C]=function(){var E=Array.prototype.slice.call(arguments,0);if(C==="load"&&typeof E[0]==="string"){return h.apply(this,E)}g("jQuery.fn."+C+"() is deprecated");E.splice(0,0,C);if(arguments.length){return this.on.apply(this,E)}this.triggerHandler.apply(this,E);return this}});m.each(("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu").split(" "),function(D,C){m.fn[C]=function(F,E){g("jQuery.fn."+C+"() event shorthand is deprecated");return arguments.length>0?this.on(C,null,F,E):this.trigger(C)}});m(function(){m(i.document).triggerHandler("ready")});m.event.special.ready={setup:function(){if(this===i.document){g("'ready' event is deprecated")}}};m.fn.extend({bind:function(C,E,D){g("jQuery.fn.bind() is deprecated");return this.on(C,null,E,D)},unbind:function(C,D){g("jQuery.fn.unbind() is deprecated");return this.off(C,null,D)},delegate:function(C,D,F,E){g("jQuery.fn.delegate() is deprecated");return this.on(D,C,F,E)},undelegate:function(C,D,E){g("jQuery.fn.undelegate() is deprecated");return arguments.length===1?this.off(C,"**"):this.off(D,C||"**",E)},hover:function(C,D){g("jQuery.fn.hover() is deprecated");return this.on("mouseenter",C).on("mouseleave",D||C)}});var b=m.fn.offset;m.fn.offset=function(){var C,E=this[0],D={top:0,left:0};if(!E||!E.nodeType){g("jQuery.fn.offset() requires a valid DOM element");return D}C=(E.ownerDocument||i.document).documentElement;if(!m.contains(C,E)){g("jQuery.fn.offset() requires an element connected to a document");return D}return b.apply(this,arguments)};var e=m.param;m.param=function(D,C){var E=m.ajaxSettings&&m.ajaxSettings.traditional;if(C===undefined&&E){g("jQuery.param() no longer uses jQuery.ajaxSettings.traditional");C=E}return e.call(this,D,C)};var r=m.fn.andSelf||m.fn.addBack;m.fn.andSelf=function(){g("jQuery.fn.andSelf() is deprecated and removed, use jQuery.fn.addBack()");return r.apply(this,arguments)};var q=m.Deferred,y=[["resolve","done",m.Callbacks("once memory"),m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory"),m.Callbacks("memory")]];m.Deferred=function(D){var C=q(),E=C.promise();C.pipe=E.pipe=function(){var F=arguments;g("deferred.pipe() is deprecated");return m.Deferred(function(G){m.each(y,function(I,H){var J=m.isFunction(F[I])&&F[I];C[H[1]](function(){var K=J&&J.apply(this,arguments);if(K&&m.isFunction(K.promise)){K.promise().done(G.resolve).fail(G.reject).progress(G.notify)}else{G[H[0]+"With"](this===E?G.promise():this,J?[K]:arguments)}})});F=null}).promise()};if(D){D.call(C,C)}return C};m.Deferred.exceptionHook=q.exceptionHook;return m});