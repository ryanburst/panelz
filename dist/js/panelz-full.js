/*! Hammer.JS - v2.0.8 - 2016-04-23
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(j(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(b,c,d){var e="DEPRECATED METHOD: "+c+"\n"+d+" AT \n";return function(){var c=new Error("get-stack-trace"),d=c&&c.stack?c.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",f=a.console&&(a.console.warn||a.console.log);return f&&f.call(a.console,e,d),b.apply(this,arguments)}}function i(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&la(d,c)}function j(a,b){return function(){return a.apply(b,arguments)}}function k(a,b){return typeof a==oa?a.apply(b?b[0]||d:d,b):a}function l(a,b){return a===d?b:a}function m(a,b,c){g(q(b),function(b){a.addEventListener(b,c,!1)})}function n(a,b,c){g(q(b),function(b){a.removeEventListener(b,c,!1)})}function o(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function p(a,b){return a.indexOf(b)>-1}function q(a){return a.trim().split(/\s+/g)}function r(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function s(a){return Array.prototype.slice.call(a,0)}function t(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];r(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function u(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ma.length;){if(c=ma[g],e=c?c+f:b,e in a)return e;g++}return d}function v(){return ua++}function w(b){var c=b.ownerDocument||b;return c.defaultView||c.parentWindow||a}function x(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){k(a.options.enable,[a])&&c.handler(b)},this.init()}function y(a){var b,c=a.options.inputClass;return new(b=c?c:xa?M:ya?P:wa?R:L)(a,z)}function z(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&Ea&&d-e===0,g=b&(Ga|Ha)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,A(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function A(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=D(b)),e>1&&!c.firstMultiple?c.firstMultiple=D(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=E(d);b.timeStamp=ra(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=I(h,i),b.distance=H(h,i),B(c,b),b.offsetDirection=G(b.deltaX,b.deltaY);var j=F(b.deltaTime,b.deltaX,b.deltaY);b.overallVelocityX=j.x,b.overallVelocityY=j.y,b.overallVelocity=qa(j.x)>qa(j.y)?j.x:j.y,b.scale=g?K(g.pointers,d):1,b.rotation=g?J(g.pointers,d):0,b.maxPointers=c.prevInput?b.pointers.length>c.prevInput.maxPointers?b.pointers.length:c.prevInput.maxPointers:b.pointers.length,C(c,b);var k=a.element;o(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function B(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};b.eventType!==Ea&&f.eventType!==Ga||(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function C(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Ha&&(i>Da||h.velocity===d)){var j=b.deltaX-h.deltaX,k=b.deltaY-h.deltaY,l=F(i,j,k);e=l.x,f=l.y,c=qa(l.x)>qa(l.y)?l.x:l.y,g=G(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function D(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:pa(a.pointers[c].clientX),clientY:pa(a.pointers[c].clientY)},c++;return{timeStamp:ra(),pointers:b,center:E(b),deltaX:a.deltaX,deltaY:a.deltaY}}function E(a){var b=a.length;if(1===b)return{x:pa(a[0].clientX),y:pa(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:pa(c/b),y:pa(d/b)}}function F(a,b,c){return{x:b/a||0,y:c/a||0}}function G(a,b){return a===b?Ia:qa(a)>=qa(b)?0>a?Ja:Ka:0>b?La:Ma}function H(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function I(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function J(a,b){return I(b[1],b[0],Ra)+I(a[1],a[0],Ra)}function K(a,b){return H(b[0],b[1],Ra)/H(a[0],a[1],Ra)}function L(){this.evEl=Ta,this.evWin=Ua,this.pressed=!1,x.apply(this,arguments)}function M(){this.evEl=Xa,this.evWin=Ya,x.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function N(){this.evTarget=$a,this.evWin=_a,this.started=!1,x.apply(this,arguments)}function O(a,b){var c=s(a.touches),d=s(a.changedTouches);return b&(Ga|Ha)&&(c=t(c.concat(d),"identifier",!0)),[c,d]}function P(){this.evTarget=bb,this.targetIds={},x.apply(this,arguments)}function Q(a,b){var c=s(a.touches),d=this.targetIds;if(b&(Ea|Fa)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=s(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return o(a.target,i)}),b===Ea)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ga|Ha)&&delete d[g[e].identifier],e++;return h.length?[t(f.concat(h),"identifier",!0),h]:void 0}function R(){x.apply(this,arguments);var a=j(this.handler,this);this.touch=new P(this.manager,a),this.mouse=new L(this.manager,a),this.primaryTouch=null,this.lastTouches=[]}function S(a,b){a&Ea?(this.primaryTouch=b.changedPointers[0].identifier,T.call(this,b)):a&(Ga|Ha)&&T.call(this,b)}function T(a){var b=a.changedPointers[0];if(b.identifier===this.primaryTouch){var c={x:b.clientX,y:b.clientY};this.lastTouches.push(c);var d=this.lastTouches,e=function(){var a=d.indexOf(c);a>-1&&d.splice(a,1)};setTimeout(e,cb)}}function U(a){for(var b=a.srcEvent.clientX,c=a.srcEvent.clientY,d=0;d<this.lastTouches.length;d++){var e=this.lastTouches[d],f=Math.abs(b-e.x),g=Math.abs(c-e.y);if(db>=f&&db>=g)return!0}return!1}function V(a,b){this.manager=a,this.set(b)}function W(a){if(p(a,jb))return jb;var b=p(a,kb),c=p(a,lb);return b&&c?jb:b||c?b?kb:lb:p(a,ib)?ib:hb}function X(){if(!fb)return!1;var b={},c=a.CSS&&a.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(d){b[d]=c?a.CSS.supports("touch-action",d):!0}),b}function Y(a){this.options=la({},this.defaults,a||{}),this.id=v(),this.manager=null,this.options.enable=l(this.options.enable,!0),this.state=nb,this.simultaneous={},this.requireFail=[]}function Z(a){return a&sb?"cancel":a&qb?"end":a&pb?"move":a&ob?"start":""}function $(a){return a==Ma?"down":a==La?"up":a==Ja?"left":a==Ka?"right":""}function _(a,b){var c=b.manager;return c?c.get(a):a}function aa(){Y.apply(this,arguments)}function ba(){aa.apply(this,arguments),this.pX=null,this.pY=null}function ca(){aa.apply(this,arguments)}function da(){Y.apply(this,arguments),this._timer=null,this._input=null}function ea(){aa.apply(this,arguments)}function fa(){aa.apply(this,arguments)}function ga(){Y.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ha(a,b){return b=b||{},b.recognizers=l(b.recognizers,ha.defaults.preset),new ia(a,b)}function ia(a,b){this.options=la({},ha.defaults,b||{}),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=a,this.input=y(this),this.touchAction=new V(this,this.options.touchAction),ja(this,!0),g(this.options.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function ja(a,b){var c=a.element;if(c.style){var d;g(a.options.cssProps,function(e,f){d=u(c.style,f),b?(a.oldCssProps[d]=c.style[d],c.style[d]=e):c.style[d]=a.oldCssProps[d]||""}),b||(a.oldCssProps={})}}function ka(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var la,ma=["","webkit","Moz","MS","ms","o"],na=b.createElement("div"),oa="function",pa=Math.round,qa=Math.abs,ra=Date.now;la="function"!=typeof Object.assign?function(a){if(a===d||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var b=Object(a),c=1;c<arguments.length;c++){var e=arguments[c];if(e!==d&&null!==e)for(var f in e)e.hasOwnProperty(f)&&(b[f]=e[f])}return b}:Object.assign;var sa=h(function(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a},"extend","Use `assign`."),ta=h(function(a,b){return sa(a,b,!0)},"merge","Use `assign`."),ua=1,va=/mobile|tablet|ip(ad|hone|od)|android/i,wa="ontouchstart"in a,xa=u(a,"PointerEvent")!==d,ya=wa&&va.test(navigator.userAgent),za="touch",Aa="pen",Ba="mouse",Ca="kinect",Da=25,Ea=1,Fa=2,Ga=4,Ha=8,Ia=1,Ja=2,Ka=4,La=8,Ma=16,Na=Ja|Ka,Oa=La|Ma,Pa=Na|Oa,Qa=["x","y"],Ra=["clientX","clientY"];x.prototype={handler:function(){},init:function(){this.evEl&&m(this.element,this.evEl,this.domHandler),this.evTarget&&m(this.target,this.evTarget,this.domHandler),this.evWin&&m(w(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(w(this.element),this.evWin,this.domHandler)}};var Sa={mousedown:Ea,mousemove:Fa,mouseup:Ga},Ta="mousedown",Ua="mousemove mouseup";i(L,x,{handler:function(a){var b=Sa[a.type];b&Ea&&0===a.button&&(this.pressed=!0),b&Fa&&1!==a.which&&(b=Ga),this.pressed&&(b&Ga&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:Ba,srcEvent:a}))}});var Va={pointerdown:Ea,pointermove:Fa,pointerup:Ga,pointercancel:Ha,pointerout:Ha},Wa={2:za,3:Aa,4:Ba,5:Ca},Xa="pointerdown",Ya="pointermove pointerup pointercancel";a.MSPointerEvent&&!a.PointerEvent&&(Xa="MSPointerDown",Ya="MSPointerMove MSPointerUp MSPointerCancel"),i(M,x,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Va[d],f=Wa[a.pointerType]||a.pointerType,g=f==za,h=r(b,a.pointerId,"pointerId");e&Ea&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ga|Ha)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Za={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},$a="touchstart",_a="touchstart touchmove touchend touchcancel";i(N,x,{handler:function(a){var b=Za[a.type];if(b===Ea&&(this.started=!0),this.started){var c=O.call(this,a,b);b&(Ga|Ha)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}}});var ab={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},bb="touchstart touchmove touchend touchcancel";i(P,x,{handler:function(a){var b=ab[a.type],c=Q.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}});var cb=2500,db=25;i(R,x,{handler:function(a,b,c){var d=c.pointerType==za,e=c.pointerType==Ba;if(!(e&&c.sourceCapabilities&&c.sourceCapabilities.firesTouchEvents)){if(d)S.call(this,b,c);else if(e&&U.call(this,c))return;this.callback(a,b,c)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var eb=u(na.style,"touchAction"),fb=eb!==d,gb="compute",hb="auto",ib="manipulation",jb="none",kb="pan-x",lb="pan-y",mb=X();V.prototype={set:function(a){a==gb&&(a=this.compute()),fb&&this.manager.element.style&&mb[a]&&(this.manager.element.style[eb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){k(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),W(a.join(" "))},preventDefaults:function(a){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=p(d,jb)&&!mb[jb],f=p(d,lb)&&!mb[lb],g=p(d,kb)&&!mb[kb];if(e){var h=1===a.pointers.length,i=a.distance<2,j=a.deltaTime<250;if(h&&i&&j)return}return g&&f?void 0:e||f&&c&Na||g&&c&Oa?this.preventSrc(b):void 0},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var nb=1,ob=2,pb=4,qb=8,rb=qb,sb=16,tb=32;Y.prototype={defaults:{},set:function(a){return la(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=_(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=_(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=_(a,this),-1===r(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=_(a,this);var b=r(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(b,a)}var c=this,d=this.state;qb>d&&b(c.options.event+Z(d)),b(c.options.event),a.additionalEvent&&b(a.additionalEvent),d>=qb&&b(c.options.event+Z(d))},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=tb)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(tb|nb)))return!1;a++}return!0},recognize:function(a){var b=la({},a);return k(this.options.enable,[this,b])?(this.state&(rb|sb|tb)&&(this.state=nb),this.state=this.process(b),void(this.state&(ob|pb|qb|sb)&&this.tryEmit(b))):(this.reset(),void(this.state=tb))},process:function(a){},getTouchAction:function(){},reset:function(){}},i(aa,Y,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(ob|pb),e=this.attrTest(a);return d&&(c&Ha||!e)?b|sb:d||e?c&Ga?b|qb:b&ob?b|pb:ob:tb}}),i(ba,aa,{defaults:{event:"pan",threshold:10,pointers:1,direction:Pa},getTouchAction:function(){var a=this.options.direction,b=[];return a&Na&&b.push(lb),a&Oa&&b.push(kb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Na?(e=0===f?Ia:0>f?Ja:Ka,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ia:0>g?La:Ma,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return aa.prototype.attrTest.call(this,a)&&(this.state&ob||!(this.state&ob)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=$(a.direction);b&&(a.additionalEvent=this.options.event+b),this._super.emit.call(this,a)}}),i(ca,aa,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&ob)},emit:function(a){if(1!==a.scale){var b=a.scale<1?"in":"out";a.additionalEvent=this.options.event+b}this._super.emit.call(this,a)}}),i(da,Y,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[hb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ga|Ha)&&!f)this.reset();else if(a.eventType&Ea)this.reset(),this._timer=e(function(){this.state=rb,this.tryEmit()},b.time,this);else if(a.eventType&Ga)return rb;return tb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===rb&&(a&&a.eventType&Ga?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=ra(),this.manager.emit(this.options.event,this._input)))}}),i(ea,aa,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&ob)}}),i(fa,aa,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Na|Oa,pointers:1},getTouchAction:function(){return ba.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Na|Oa)?b=a.overallVelocity:c&Na?b=a.overallVelocityX:c&Oa&&(b=a.overallVelocityY),this._super.attrTest.call(this,a)&&c&a.offsetDirection&&a.distance>this.options.threshold&&a.maxPointers==this.options.pointers&&qa(b)>this.options.velocity&&a.eventType&Ga},emit:function(a){var b=$(a.offsetDirection);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),i(ga,Y,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[ib]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&Ea&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ga)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||H(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=rb,this.tryEmit()},b.interval,this),ob):rb}return tb},failTimeout:function(){return this._timer=e(function(){this.state=tb},this.options.interval,this),tb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==rb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ha.VERSION="2.0.8",ha.defaults={domEvents:!1,touchAction:gb,enable:!0,inputTarget:null,inputClass:null,preset:[[ea,{enable:!1}],[ca,{enable:!1},["rotate"]],[fa,{direction:Na}],[ba,{direction:Na},["swipe"]],[ga],[ga,{event:"doubletap",taps:2},["tap"]],[da]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ub=1,vb=2;ia.prototype={set:function(a){return la(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?vb:ub},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&rb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===vb||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(ob|pb|qb)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof Y)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;if(a=this.get(a)){var b=this.recognizers,c=r(b,a);-1!==c&&(b.splice(c,1),this.touchAction.update())}return this},on:function(a,b){if(a!==d&&b!==d){var c=this.handlers;return g(q(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this}},off:function(a,b){if(a!==d){var c=this.handlers;return g(q(a),function(a){b?c[a]&&c[a].splice(r(c[a],b),1):delete c[a]}),this}},emit:function(a,b){this.options.domEvents&&ka(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&ja(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},la(ha,{INPUT_START:Ea,INPUT_MOVE:Fa,INPUT_END:Ga,INPUT_CANCEL:Ha,STATE_POSSIBLE:nb,STATE_BEGAN:ob,STATE_CHANGED:pb,STATE_ENDED:qb,STATE_RECOGNIZED:rb,STATE_CANCELLED:sb,STATE_FAILED:tb,DIRECTION_NONE:Ia,DIRECTION_LEFT:Ja,DIRECTION_RIGHT:Ka,DIRECTION_UP:La,DIRECTION_DOWN:Ma,DIRECTION_HORIZONTAL:Na,DIRECTION_VERTICAL:Oa,DIRECTION_ALL:Pa,Manager:ia,Input:x,TouchAction:V,TouchInput:P,MouseInput:L,PointerEventInput:M,TouchMouseInput:R,SingleTouchInput:N,Recognizer:Y,AttrRecognizer:aa,Tap:ga,Pan:ba,Swipe:fa,Pinch:ca,Rotate:ea,Press:da,on:m,off:n,each:g,merge:ta,extend:sa,assign:la,inherit:i,bindFn:j,prefixed:u});var wb="undefined"!=typeof a?a:"undefined"!=typeof self?self:{};wb.Hammer=ha,"function"==typeof define&&define.amd?define(function(){return ha}):"undefined"!=typeof module&&module.exports?module.exports=ha:a[c]=ha}(window,document,"Hammer");

(function(window, document, exportName, undefined) {
    "use strict";

    var isMultiTouch = false;
    var multiTouchStartPos;
    var eventTarget;
    var touchElements = {};

    // polyfills
    if(!document.createTouch) {
        document.createTouch = function(view, target, identifier, pageX, pageY, screenX, screenY, clientX, clientY) {
            // auto set
            if(clientX == undefined || clientY == undefined) {
                clientX = pageX - window.pageXOffset;
                clientY = pageY - window.pageYOffset;
            }

            return new Touch(target, identifier, {
                pageX: pageX,
                pageY: pageY,
                screenX: screenX,
                screenY: screenY,
                clientX: clientX,
                clientY: clientY
            });
        };
    }

    if(!document.createTouchList) {
        document.createTouchList = function() {
            var touchList = new TouchList();
            for (var i = 0; i < arguments.length; i++) {
                touchList[i] = arguments[i];
            }
            touchList.length = arguments.length;
            return touchList;
        };
    }

    /**
     * create an touch point
     * @constructor
     * @param target
     * @param identifier
     * @param pos
     * @param deltaX
     * @param deltaY
     * @returns {Object} touchPoint
     */
    function Touch(target, identifier, pos, deltaX, deltaY) {
        deltaX = deltaX || 0;
        deltaY = deltaY || 0;

        this.identifier = identifier;
        this.target = target;
        this.clientX = pos.clientX + deltaX;
        this.clientY = pos.clientY + deltaY;
        this.screenX = pos.screenX + deltaX;
        this.screenY = pos.screenY + deltaY;
        this.pageX = pos.pageX + deltaX;
        this.pageY = pos.pageY + deltaY;
    }

    /**
     * create empty touchlist with the methods
     * @constructor
     * @returns touchList
     */
    function TouchList() {
        var touchList = [];

        touchList.item = function(index) {
            return this[index] || null;
        };

        // specified by Mozilla
        touchList.identifiedTouch = function(id) {
            return this[id + 1] || null;
        };

        return touchList;
    }


    /**
     * Simple trick to fake touch event support
     * this is enough for most libraries like Modernizr and Hammer
     */
    function fakeTouchSupport() {
        var objs = [window, document.documentElement];
        var props = ['ontouchstart', 'ontouchmove', 'ontouchcancel', 'ontouchend'];

        for(var o=0; o<objs.length; o++) {
            for(var p=0; p<props.length; p++) {
                if(objs[o] && objs[o][props[p]] == undefined) {
                    objs[o][props[p]] = null;
                }
            }
        }
    }

    /**
     * we don't have to emulate on a touch device
     * @returns {boolean}
     */
    function hasTouchSupport() {
        return ("ontouchstart" in window) || // touch events
               (window.Modernizr && window.Modernizr.touch) || // modernizr
               (navigator.msMaxTouchPoints || navigator.maxTouchPoints) > 2; // pointer events
    }

    /**
     * disable mouseevents on the page
     * @param ev
     */
    function preventMouseEvents(ev) {
        ev.preventDefault();
        ev.stopPropagation();
    }

    /**
     * only trigger touches when the left mousebutton has been pressed
     * @param touchType
     * @returns {Function}
     */
    function onMouse(touchType) {
        return function(ev) {
            // prevent mouse events
            preventMouseEvents(ev);

            if (ev.which !== 1) {
                return;
            }

            // The EventTarget on which the touch point started when it was first placed on the surface,
            // even if the touch point has since moved outside the interactive area of that element.
            // also, when the target doesnt exist anymore, we update it
            if (ev.type == 'mousedown' || !eventTarget || (eventTarget && !eventTarget.dispatchEvent)) {
                eventTarget = ev.target;
            }

            // shiftKey has been lost, so trigger a touchend
            if (isMultiTouch && !ev.shiftKey) {
                triggerTouch('touchend', ev);
                isMultiTouch = false;
            }

            triggerTouch(touchType, ev);

            // we're entering the multi-touch mode!
            if (!isMultiTouch && ev.shiftKey) {
                isMultiTouch = true;
                multiTouchStartPos = {
                    pageX: ev.pageX,
                    pageY: ev.pageY,
                    clientX: ev.clientX,
                    clientY: ev.clientY,
                    screenX: ev.screenX,
                    screenY: ev.screenY
                };
                triggerTouch('touchstart', ev);
            }

            // reset
            if (ev.type == 'mouseup') {
                multiTouchStartPos = null;
                isMultiTouch = false;
                eventTarget = null;
            }
        }
    }

    /**
     * trigger a touch event
     * @param eventName
     * @param mouseEv
     */
    function triggerTouch(eventName, mouseEv) {
        var touchEvent = document.createEvent('Event');
        touchEvent.initEvent(eventName, true, true);

        touchEvent.altKey = mouseEv.altKey;
        touchEvent.ctrlKey = mouseEv.ctrlKey;
        touchEvent.metaKey = mouseEv.metaKey;
        touchEvent.shiftKey = mouseEv.shiftKey;

        touchEvent.touches = getActiveTouches(mouseEv, eventName);
        touchEvent.targetTouches = getActiveTouches(mouseEv, eventName);
        touchEvent.changedTouches = getChangedTouches(mouseEv, eventName);

        eventTarget.dispatchEvent(touchEvent);
    }

    /**
     * create a touchList based on the mouse event
     * @param mouseEv
     * @returns {TouchList}
     */
    function createTouchList(mouseEv) {
        var touchList = new TouchList();

        if (isMultiTouch) {
            var f = TouchEmulator.multiTouchOffset;
            var deltaX = multiTouchStartPos.pageX - mouseEv.pageX;
            var deltaY = multiTouchStartPos.pageY - mouseEv.pageY;

            touchList.push(new Touch(eventTarget, 1, multiTouchStartPos, (deltaX*-1) - f, (deltaY*-1) + f));
            touchList.push(new Touch(eventTarget, 2, multiTouchStartPos, deltaX+f, deltaY-f));
        } else {
            touchList.push(new Touch(eventTarget, 1, mouseEv, 0, 0));
        }

        return touchList;
    }

    /**
     * receive all active touches
     * @param mouseEv
     * @returns {TouchList}
     */
    function getActiveTouches(mouseEv, eventName) {
        // empty list
        if (mouseEv.type == 'mouseup') {
            return new TouchList();
        }

        var touchList = createTouchList(mouseEv);
        if(isMultiTouch && mouseEv.type != 'mouseup' && eventName == 'touchend') {
            touchList.splice(1, 1);
        }
        return touchList;
    }

    /**
     * receive a filtered set of touches with only the changed pointers
     * @param mouseEv
     * @param eventName
     * @returns {TouchList}
     */
    function getChangedTouches(mouseEv, eventName) {
        var touchList = createTouchList(mouseEv);

        // we only want to return the added/removed item on multitouch
        // which is the second pointer, so remove the first pointer from the touchList
        //
        // but when the mouseEv.type is mouseup, we want to send all touches because then
        // no new input will be possible
        if(isMultiTouch && mouseEv.type != 'mouseup' &&
            (eventName == 'touchstart' || eventName == 'touchend')) {
            touchList.splice(0, 1);
        }

        return touchList;
    }

    /**
     * show the touchpoints on the screen
     */
    function showTouches(ev) {
        var touch, i, el, styles;

        // first all visible touches
        for(i = 0; i < ev.touches.length; i++) {
            touch = ev.touches[i];
            el = touchElements[touch.identifier];
            if(!el) {
                el = touchElements[touch.identifier] = document.createElement("div");
                document.body.appendChild(el);
            }

            styles = TouchEmulator.template(touch);
            for(var prop in styles) {
                el.style[prop] = styles[prop];
            }
        }

        // remove all ended touches
        if(ev.type == 'touchend' || ev.type == 'touchcancel') {
            for(i = 0; i < ev.changedTouches.length; i++) {
                touch = ev.changedTouches[i];
                el = touchElements[touch.identifier];
                if(el) {
                    el.parentNode.removeChild(el);
                    delete touchElements[touch.identifier];
                }
            }
        }
    }

    /**
     * TouchEmulator initializer
     */
    function TouchEmulator() {
        if (hasTouchSupport()) {
            //return;
        }

        fakeTouchSupport();

        window.addEventListener("mousedown", onMouse('touchstart'), true);
        window.addEventListener("mousemove", onMouse('touchmove'), true);
        window.addEventListener("mouseup", onMouse('touchend'), true);

        window.addEventListener("mouseenter", preventMouseEvents, true);
        window.addEventListener("mouseleave", preventMouseEvents, true);
        window.addEventListener("mouseout", preventMouseEvents, true);
        window.addEventListener("mouseover", preventMouseEvents, true);

        // it uses itself!
        window.addEventListener("touchstart", showTouches, true);
        window.addEventListener("touchmove", showTouches, true);
        window.addEventListener("touchend", showTouches, true);
        window.addEventListener("touchcancel", showTouches, true);
    }

    // start distance when entering the multitouch mode
    TouchEmulator.multiTouchOffset = 75;

    /**
     * css template for the touch rendering
     * @param touch
     * @returns object
     */
    TouchEmulator.template = function(touch) {
        var size = 30;
        var transform = 'translate('+ (touch.clientX-(size/2)) +'px, '+ (touch.clientY-(size/2)) +'px)';
        return {
            position: 'fixed',
            left: 0,
            top: 0,
            background: '#fff',
            border: 'solid 1px #999',
            opacity: .6,
            borderRadius: '100%',
            height: size + 'px',
            width: size + 'px',
            padding: 0,
            margin: 0,
            display: 'block',
            overflow: 'hidden',
            pointerEvents: 'none',
            webkitUserSelect: 'none',
            mozUserSelect: 'none',
            userSelect: 'none',
            webkitTransform: transform,
            mozTransform: transform,
            transform: transform,
            zIndex: 100
        }
    };

    // export
    if (typeof define == "function" && define.amd) {
        define(function() {
            return TouchEmulator;
        });
    } else if (typeof module != "undefined" && module.exports) {
        module.exports = TouchEmulator;
    } else {
        window[exportName] = TouchEmulator;
    }
})(window, document, "TouchEmulator");
!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var c="function"==typeof require&&require;if(!u&&c)return c(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var a=n[o]={exports:{}};t[o][0].call(a.exports,function(n){var r=t[o][1][n];return s(r?r:n)},a,a.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(t,n,r){(function(n){"use strict";function define(t,n,e){t[n]||Object[r](t,n,{writable:!0,configurable:!0,value:e})}if(t(295),t(296),t(2),n._babelPolyfill)throw new Error("only one instance of babel-polyfill is allowed");n._babelPolyfill=!0;var r="defineProperty";define(String.prototype,"padLeft","".padStart),define(String.prototype,"padRight","".padEnd),"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function(t){[][t]&&define(Array,t,Function.call.bind([][t]))})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{2:2,295:295,296:296}],2:[function(t,n,r){t(119),n.exports=t(23).RegExp.escape},{119:119,23:23}],3:[function(t,n,r){n.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},{}],4:[function(t,n,r){var e=t(18);n.exports=function(t,n){if("number"!=typeof t&&"Number"!=e(t))throw TypeError(n);return+t}},{18:18}],5:[function(t,n,r){var e=t(117)("unscopables"),i=Array.prototype;void 0==i[e]&&t(40)(i,e,{}),n.exports=function(t){i[e][t]=!0}},{117:117,40:40}],6:[function(t,n,r){n.exports=function(t,n,r,e){if(!(t instanceof n)||void 0!==e&&e in t)throw TypeError(r+": incorrect invocation!");return t}},{}],7:[function(t,n,r){var e=t(49);n.exports=function(t){if(!e(t))throw TypeError(t+" is not an object!");return t}},{49:49}],8:[function(t,n,r){"use strict";var e=t(109),i=t(105),o=t(108);n.exports=[].copyWithin||function copyWithin(t,n){var r=e(this),u=o(r.length),c=i(t,u),f=i(n,u),a=arguments.length>2?arguments[2]:void 0,s=Math.min((void 0===a?u:i(a,u))-f,u-c),l=1;for(f<c&&c<f+s&&(l=-1,f+=s-1,c+=s-1);s-- >0;)f in r?r[c]=r[f]:delete r[c],c+=l,f+=l;return r}},{105:105,108:108,109:109}],9:[function(t,n,r){"use strict";var e=t(109),i=t(105),o=t(108);n.exports=function fill(t){for(var n=e(this),r=o(n.length),u=arguments.length,c=i(u>1?arguments[1]:void 0,r),f=u>2?arguments[2]:void 0,a=void 0===f?r:i(f,r);a>c;)n[c++]=t;return n}},{105:105,108:108,109:109}],10:[function(t,n,r){var e=t(37);n.exports=function(t,n){var r=[];return e(t,!1,r.push,r,n),r}},{37:37}],11:[function(t,n,r){var e=t(107),i=t(108),o=t(105);n.exports=function(t){return function(n,r,u){var c,f=e(n),a=i(f.length),s=o(u,a);if(t&&r!=r){for(;a>s;)if(c=f[s++],c!=c)return!0}else for(;a>s;s++)if((t||s in f)&&f[s]===r)return t||s||0;return!t&&-1}}},{105:105,107:107,108:108}],12:[function(t,n,r){var e=t(25),i=t(45),o=t(109),u=t(108),c=t(15);n.exports=function(t,n){var r=1==t,f=2==t,a=3==t,s=4==t,l=6==t,h=5==t||l,v=n||c;return function(n,c,p){for(var d,y,g=o(n),b=i(g),x=e(c,p,3),m=u(b.length),w=0,S=r?v(n,m):f?v(n,0):void 0;m>w;w++)if((h||w in b)&&(d=b[w],y=x(d,w,g),t))if(r)S[w]=y;else if(y)switch(t){case 3:return!0;case 5:return d;case 6:return w;case 2:S.push(d)}else if(s)return!1;return l?-1:a||s?s:S}}},{108:108,109:109,15:15,25:25,45:45}],13:[function(t,n,r){var e=t(3),i=t(109),o=t(45),u=t(108);n.exports=function(t,n,r,c,f){e(n);var a=i(t),s=o(a),l=u(a.length),h=f?l-1:0,v=f?-1:1;if(r<2)for(;;){if(h in s){c=s[h],h+=v;break}if(h+=v,f?h<0:l<=h)throw TypeError("Reduce of empty array with no initial value")}for(;f?h>=0:l>h;h+=v)h in s&&(c=n(c,s[h],h,a));return c}},{108:108,109:109,3:3,45:45}],14:[function(t,n,r){var e=t(49),i=t(47),o=t(117)("species");n.exports=function(t){var n;return i(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!i(n.prototype)||(n=void 0),e(n)&&(n=n[o],null===n&&(n=void 0))),void 0===n?Array:n}},{117:117,47:47,49:49}],15:[function(t,n,r){var e=t(14);n.exports=function(t,n){return new(e(t))(n)}},{14:14}],16:[function(t,n,r){"use strict";var e=t(3),i=t(49),o=t(44),u=[].slice,c={},f=function(t,n,r){if(!(n in c)){for(var e=[],i=0;i<n;i++)e[i]="a["+i+"]";c[n]=Function("F,a","return new F("+e.join(",")+")")}return c[n](t,r)};n.exports=Function.bind||function bind(t){var n=e(this),r=u.call(arguments,1),c=function(){var e=r.concat(u.call(arguments));return this instanceof c?f(n,e.length,e):o(n,e,t)};return i(n.prototype)&&(c.prototype=n.prototype),c}},{3:3,44:44,49:49}],17:[function(t,n,r){var e=t(18),i=t(117)("toStringTag"),o="Arguments"==e(function(){return arguments}()),u=function(t,n){try{return t[n]}catch(t){}};n.exports=function(t){var n,r,c;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(r=u(n=Object(t),i))?r:o?e(n):"Object"==(c=e(n))&&"function"==typeof n.callee?"Arguments":c}},{117:117,18:18}],18:[function(t,n,r){var e={}.toString;n.exports=function(t){return e.call(t).slice(8,-1)}},{}],19:[function(t,n,r){"use strict";var e=t(67).f,i=t(66),o=t(86),u=t(25),c=t(6),f=t(27),a=t(37),s=t(53),l=t(55),h=t(91),v=t(28),p=t(62).fastKey,d=v?"_s":"size",y=function(t,n){var r,e=p(n);if("F"!==e)return t._i[e];for(r=t._f;r;r=r.n)if(r.k==n)return r};n.exports={getConstructor:function(t,n,r,s){var l=t(function(t,e){c(t,l,n,"_i"),t._i=i(null),t._f=void 0,t._l=void 0,t[d]=0,void 0!=e&&a(e,r,t[s],t)});return o(l.prototype,{clear:function clear(){for(var t=this,n=t._i,r=t._f;r;r=r.n)r.r=!0,r.p&&(r.p=r.p.n=void 0),delete n[r.i];t._f=t._l=void 0,t[d]=0},delete:function(t){var n=this,r=y(n,t);if(r){var e=r.n,i=r.p;delete n._i[r.i],r.r=!0,i&&(i.n=e),e&&(e.p=i),n._f==r&&(n._f=e),n._l==r&&(n._l=i),n[d]--}return!!r},forEach:function forEach(t){c(this,l,"forEach");for(var n,r=u(t,arguments.length>1?arguments[1]:void 0,3);n=n?n.n:this._f;)for(r(n.v,n.k,this);n&&n.r;)n=n.p},has:function has(t){return!!y(this,t)}}),v&&e(l.prototype,"size",{get:function(){return f(this[d])}}),l},def:function(t,n,r){var e,i,o=y(t,n);return o?o.v=r:(t._l=o={i:i=p(n,!0),k:n,v:r,p:e=t._l,n:void 0,r:!1},t._f||(t._f=o),e&&(e.n=o),t[d]++,"F"!==i&&(t._i[i]=o)),t},getEntry:y,setStrong:function(t,n,r){s(t,n,function(t,n){this._t=t,this._k=n,this._l=void 0},function(){for(var t=this,n=t._k,r=t._l;r&&r.r;)r=r.p;return t._t&&(t._l=r=r?r.n:t._t._f)?"keys"==n?l(0,r.k):"values"==n?l(0,r.v):l(0,[r.k,r.v]):(t._t=void 0,l(1))},r?"entries":"values",!r,!0),h(n)}}},{25:25,27:27,28:28,37:37,53:53,55:55,6:6,62:62,66:66,67:67,86:86,91:91}],20:[function(t,n,r){var e=t(17),i=t(10);n.exports=function(t){return function toJSON(){if(e(this)!=t)throw TypeError(t+"#toJSON isn't generic");return i(this)}}},{10:10,17:17}],21:[function(t,n,r){"use strict";var e=t(86),i=t(62).getWeak,o=t(7),u=t(49),c=t(6),f=t(37),a=t(12),s=t(39),l=a(5),h=a(6),v=0,p=function(t){return t._l||(t._l=new d)},d=function(){this.a=[]},y=function(t,n){return l(t.a,function(t){return t[0]===n})};d.prototype={get:function(t){var n=y(this,t);if(n)return n[1]},has:function(t){return!!y(this,t)},set:function(t,n){var r=y(this,t);r?r[1]=n:this.a.push([t,n])},delete:function(t){var n=h(this.a,function(n){return n[0]===t});return~n&&this.a.splice(n,1),!!~n}},n.exports={getConstructor:function(t,n,r,o){var a=t(function(t,e){c(t,a,n,"_i"),t._i=v++,t._l=void 0,void 0!=e&&f(e,r,t[o],t)});return e(a.prototype,{delete:function(t){if(!u(t))return!1;var n=i(t);return n===!0?p(this).delete(t):n&&s(n,this._i)&&delete n[this._i]},has:function has(t){if(!u(t))return!1;var n=i(t);return n===!0?p(this).has(t):n&&s(n,this._i)}}),a},def:function(t,n,r){var e=i(o(n),!0);return e===!0?p(t).set(n,r):e[t._i]=r,t},ufstore:p}},{12:12,37:37,39:39,49:49,6:6,62:62,7:7,86:86}],22:[function(t,n,r){"use strict";var e=t(38),i=t(32),o=t(87),u=t(86),c=t(62),f=t(37),a=t(6),s=t(49),l=t(34),h=t(54),v=t(92),p=t(43);n.exports=function(t,n,r,d,y,g){var b=e[t],x=b,m=y?"set":"add",w=x&&x.prototype,S={},_=function(t){var n=w[t];o(w,t,"delete"==t?function(t){return!(g&&!s(t))&&n.call(this,0===t?0:t)}:"has"==t?function has(t){return!(g&&!s(t))&&n.call(this,0===t?0:t)}:"get"==t?function get(t){return g&&!s(t)?void 0:n.call(this,0===t?0:t)}:"add"==t?function add(t){return n.call(this,0===t?0:t),this}:function set(t,r){return n.call(this,0===t?0:t,r),this})};if("function"==typeof x&&(g||w.forEach&&!l(function(){(new x).entries().next()}))){var E=new x,O=E[m](g?{}:-0,1)!=E,F=l(function(){E.has(1)}),P=h(function(t){new x(t)}),M=!g&&l(function(){for(var t=new x,n=5;n--;)t[m](n,n);return!t.has(-0)});P||(x=n(function(n,r){a(n,x,t);var e=p(new b,n,x);return void 0!=r&&f(r,y,e[m],e),e}),x.prototype=w,w.constructor=x),(F||M)&&(_("delete"),_("has"),y&&_("get")),(M||O)&&_(m),g&&w.clear&&delete w.clear}else x=d.getConstructor(n,t,y,m),u(x.prototype,r),c.NEED=!0;return v(x,t),S[t]=x,i(i.G+i.W+i.F*(x!=b),S),g||d.setStrong(x,t,y),x}},{32:32,34:34,37:37,38:38,43:43,49:49,54:54,6:6,62:62,86:86,87:87,92:92}],23:[function(t,n,r){var e=n.exports={version:"2.4.0"};"number"==typeof __e&&(__e=e)},{}],24:[function(t,n,r){"use strict";var e=t(67),i=t(85);n.exports=function(t,n,r){n in t?e.f(t,n,i(0,r)):t[n]=r}},{67:67,85:85}],25:[function(t,n,r){var e=t(3);n.exports=function(t,n,r){if(e(t),void 0===n)return t;switch(r){case 1:return function(r){return t.call(n,r)};case 2:return function(r,e){return t.call(n,r,e)};case 3:return function(r,e,i){return t.call(n,r,e,i)}}return function(){return t.apply(n,arguments)}}},{3:3}],26:[function(t,n,r){"use strict";var e=t(7),i=t(110),o="number";n.exports=function(t){if("string"!==t&&t!==o&&"default"!==t)throw TypeError("Incorrect hint");return i(e(this),t!=o)}},{110:110,7:7}],27:[function(t,n,r){n.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},{}],28:[function(t,n,r){n.exports=!t(34)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},{34:34}],29:[function(t,n,r){var e=t(49),i=t(38).document,o=e(i)&&e(i.createElement);n.exports=function(t){return o?i.createElement(t):{}}},{38:38,49:49}],30:[function(t,n,r){n.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},{}],31:[function(t,n,r){var e=t(76),i=t(73),o=t(77);n.exports=function(t){var n=e(t),r=i.f;if(r)for(var u,c=r(t),f=o.f,a=0;c.length>a;)f.call(t,u=c[a++])&&n.push(u);return n}},{73:73,76:76,77:77}],32:[function(t,n,r){var e=t(38),i=t(23),o=t(40),u=t(87),c=t(25),f="prototype",a=function(t,n,r){var s,l,h,v,p=t&a.F,d=t&a.G,y=t&a.S,g=t&a.P,b=t&a.B,x=d?e:y?e[n]||(e[n]={}):(e[n]||{})[f],m=d?i:i[n]||(i[n]={}),w=m[f]||(m[f]={});d&&(r=n);for(s in r)l=!p&&x&&void 0!==x[s],h=(l?x:r)[s],v=b&&l?c(h,e):g&&"function"==typeof h?c(Function.call,h):h,x&&u(x,s,h,t&a.U),m[s]!=h&&o(m,s,v),g&&w[s]!=h&&(w[s]=h)};e.core=i,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,n.exports=a},{23:23,25:25,38:38,40:40,87:87}],33:[function(t,n,r){var e=t(117)("match");n.exports=function(t){var n=/./;try{"/./"[t](n)}catch(r){try{return n[e]=!1,!"/./"[t](n)}catch(t){}}return!0}},{117:117}],34:[function(t,n,r){n.exports=function(t){try{return!!t()}catch(t){return!0}}},{}],35:[function(t,n,r){"use strict";var e=t(40),i=t(87),o=t(34),u=t(27),c=t(117);n.exports=function(t,n,r){var f=c(t),a=r(u,f,""[t]),s=a[0],l=a[1];o(function(){var n={};return n[f]=function(){return 7},7!=""[t](n)})&&(i(String.prototype,t,s),e(RegExp.prototype,f,2==n?function(t,n){return l.call(t,this,n)}:function(t){return l.call(t,this)}))}},{117:117,27:27,34:34,40:40,87:87}],36:[function(t,n,r){"use strict";var e=t(7);n.exports=function(){var t=e(this),n="";return t.global&&(n+="g"),t.ignoreCase&&(n+="i"),t.multiline&&(n+="m"),t.unicode&&(n+="u"),t.sticky&&(n+="y"),n}},{7:7}],37:[function(t,n,r){var e=t(25),i=t(51),o=t(46),u=t(7),c=t(108),f=t(118),a={},s={},r=n.exports=function(t,n,r,l,h){var v,p,d,y,g=h?function(){return t}:f(t),b=e(r,l,n?2:1),x=0;if("function"!=typeof g)throw TypeError(t+" is not iterable!");if(o(g)){for(v=c(t.length);v>x;x++)if(y=n?b(u(p=t[x])[0],p[1]):b(t[x]),y===a||y===s)return y}else for(d=g.call(t);!(p=d.next()).done;)if(y=i(d,b,p.value,n),y===a||y===s)return y};r.BREAK=a,r.RETURN=s},{108:108,118:118,25:25,46:46,51:51,7:7}],38:[function(t,n,r){var e=n.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},{}],39:[function(t,n,r){var e={}.hasOwnProperty;n.exports=function(t,n){return e.call(t,n)}},{}],40:[function(t,n,r){var e=t(67),i=t(85);n.exports=t(28)?function(t,n,r){return e.f(t,n,i(1,r))}:function(t,n,r){return t[n]=r,t}},{28:28,67:67,85:85}],41:[function(t,n,r){n.exports=t(38).document&&document.documentElement},{38:38}],42:[function(t,n,r){n.exports=!t(28)&&!t(34)(function(){return 7!=Object.defineProperty(t(29)("div"),"a",{get:function(){return 7}}).a})},{28:28,29:29,34:34}],43:[function(t,n,r){var e=t(49),i=t(90).set;n.exports=function(t,n,r){var o,u=n.constructor;return u!==r&&"function"==typeof u&&(o=u.prototype)!==r.prototype&&e(o)&&i&&i(t,o),t}},{49:49,90:90}],44:[function(t,n,r){n.exports=function(t,n,r){var e=void 0===r;switch(n.length){case 0:return e?t():t.call(r);case 1:return e?t(n[0]):t.call(r,n[0]);case 2:return e?t(n[0],n[1]):t.call(r,n[0],n[1]);case 3:return e?t(n[0],n[1],n[2]):t.call(r,n[0],n[1],n[2]);case 4:return e?t(n[0],n[1],n[2],n[3]):t.call(r,n[0],n[1],n[2],n[3])}return t.apply(r,n)}},{}],45:[function(t,n,r){var e=t(18);n.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==e(t)?t.split(""):Object(t)}},{18:18}],46:[function(t,n,r){var e=t(56),i=t(117)("iterator"),o=Array.prototype;n.exports=function(t){return void 0!==t&&(e.Array===t||o[i]===t)}},{117:117,56:56}],47:[function(t,n,r){var e=t(18);n.exports=Array.isArray||function isArray(t){return"Array"==e(t)}},{18:18}],48:[function(t,n,r){var e=t(49),i=Math.floor;n.exports=function isInteger(t){return!e(t)&&isFinite(t)&&i(t)===t}},{49:49}],49:[function(t,n,r){n.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},{}],50:[function(t,n,r){var e=t(49),i=t(18),o=t(117)("match");n.exports=function(t){var n;return e(t)&&(void 0!==(n=t[o])?!!n:"RegExp"==i(t))}},{117:117,18:18,49:49}],51:[function(t,n,r){var e=t(7);n.exports=function(t,n,r,i){try{return i?n(e(r)[0],r[1]):n(r)}catch(n){var o=t.return;throw void 0!==o&&e(o.call(t)),n}}},{7:7}],52:[function(t,n,r){"use strict";var e=t(66),i=t(85),o=t(92),u={};t(40)(u,t(117)("iterator"),function(){return this}),n.exports=function(t,n,r){t.prototype=e(u,{next:i(1,r)}),o(t,n+" Iterator")}},{117:117,40:40,66:66,85:85,92:92}],53:[function(t,n,r){"use strict";var e=t(58),i=t(32),o=t(87),u=t(40),c=t(39),f=t(56),a=t(52),s=t(92),l=t(74),h=t(117)("iterator"),v=!([].keys&&"next"in[].keys()),p="@@iterator",d="keys",y="values",g=function(){return this};n.exports=function(t,n,r,b,x,m,w){a(r,n,b);var S,_,E,O=function(t){if(!v&&t in A)return A[t];switch(t){case d:return function keys(){return new r(this,t)};case y:return function values(){return new r(this,t)}}return function entries(){return new r(this,t)}},F=n+" Iterator",P=x==y,M=!1,A=t.prototype,I=A[h]||A[p]||x&&A[x],j=I||O(x),N=x?P?O("entries"):j:void 0,k="Array"==n?A.entries||I:I;if(k&&(E=l(k.call(new t)),E!==Object.prototype&&(s(E,F,!0),e||c(E,h)||u(E,h,g))),P&&I&&I.name!==y&&(M=!0,j=function values(){return I.call(this)}),e&&!w||!v&&!M&&A[h]||u(A,h,j),f[n]=j,f[F]=g,x)if(S={values:P?j:O(y),keys:m?j:O(d),entries:N},w)for(_ in S)_ in A||o(A,_,S[_]);else i(i.P+i.F*(v||M),n,S);return S}},{117:117,32:32,39:39,40:40,52:52,56:56,58:58,74:74,87:87,92:92}],54:[function(t,n,r){var e=t(117)("iterator"),i=!1;try{var o=[7][e]();o.return=function(){i=!0},Array.from(o,function(){throw 2})}catch(t){}n.exports=function(t,n){if(!n&&!i)return!1;var r=!1;try{var o=[7],u=o[e]();u.next=function(){return{done:r=!0}},o[e]=function(){return u},t(o)}catch(t){}return r}},{117:117}],55:[function(t,n,r){n.exports=function(t,n){return{value:n,done:!!t}}},{}],56:[function(t,n,r){n.exports={}},{}],57:[function(t,n,r){var e=t(76),i=t(107);n.exports=function(t,n){for(var r,o=i(t),u=e(o),c=u.length,f=0;c>f;)if(o[r=u[f++]]===n)return r}},{107:107,76:76}],58:[function(t,n,r){n.exports=!1},{}],59:[function(t,n,r){var e=Math.expm1;n.exports=!e||e(10)>22025.465794806718||e(10)<22025.465794806718||e(-2e-17)!=-2e-17?function expm1(t){return 0==(t=+t)?t:t>-1e-6&&t<1e-6?t+t*t/2:Math.exp(t)-1}:e},{}],60:[function(t,n,r){n.exports=Math.log1p||function log1p(t){return(t=+t)>-1e-8&&t<1e-8?t-t*t/2:Math.log(1+t)}},{}],61:[function(t,n,r){n.exports=Math.sign||function sign(t){return 0==(t=+t)||t!=t?t:t<0?-1:1}},{}],62:[function(t,n,r){var e=t(114)("meta"),i=t(49),o=t(39),u=t(67).f,c=0,f=Object.isExtensible||function(){return!0},a=!t(34)(function(){return f(Object.preventExtensions({}))}),s=function(t){u(t,e,{value:{i:"O"+ ++c,w:{}}})},l=function(t,n){if(!i(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,e)){if(!f(t))return"F";if(!n)return"E";s(t)}return t[e].i},h=function(t,n){if(!o(t,e)){if(!f(t))return!0;if(!n)return!1;s(t)}return t[e].w},v=function(t){return a&&p.NEED&&f(t)&&!o(t,e)&&s(t),t},p=n.exports={KEY:e,NEED:!1,fastKey:l,getWeak:h,onFreeze:v}},{114:114,34:34,39:39,49:49,67:67}],63:[function(t,n,r){var e=t(149),i=t(32),o=t(94)("metadata"),u=o.store||(o.store=new(t(255))),c=function(t,n,r){var i=u.get(t);if(!i){if(!r)return;u.set(t,i=new e)}var o=i.get(n);if(!o){if(!r)return;i.set(n,o=new e)}return o},f=function(t,n,r){var e=c(n,r,!1);return void 0!==e&&e.has(t)},a=function(t,n,r){var e=c(n,r,!1);return void 0===e?void 0:e.get(t)},s=function(t,n,r,e){c(r,e,!0).set(t,n)},l=function(t,n){var r=c(t,n,!1),e=[];return r&&r.forEach(function(t,n){e.push(n)}),e},h=function(t){return void 0===t||"symbol"==typeof t?t:String(t)},v=function(t){i(i.S,"Reflect",t)};n.exports={store:u,map:c,has:f,get:a,set:s,keys:l,key:h,exp:v}},{149:149,255:255,32:32,94:94}],64:[function(t,n,r){var e=t(38),i=t(104).set,o=e.MutationObserver||e.WebKitMutationObserver,u=e.process,c=e.Promise,f="process"==t(18)(u);n.exports=function(){var t,n,r,a=function(){var e,i;for(f&&(e=u.domain)&&e.exit();t;){i=t.fn,t=t.next;try{i()}catch(e){throw t?r():n=void 0,e}}n=void 0,e&&e.enter()};if(f)r=function(){u.nextTick(a)};else if(o){var s=!0,l=document.createTextNode("");new o(a).observe(l,{characterData:!0}),r=function(){l.data=s=!s}}else if(c&&c.resolve){var h=c.resolve();r=function(){h.then(a)}}else r=function(){i.call(e,a)};return function(e){var i={fn:e,next:void 0};n&&(n.next=i),t||(t=i,r()),n=i}}},{104:104,18:18,38:38}],65:[function(t,n,r){"use strict";var e=t(76),i=t(73),o=t(77),u=t(109),c=t(45),f=Object.assign;n.exports=!f||t(34)(function(){var t={},n={},r=Symbol(),e="abcdefghijklmnopqrst";return t[r]=7,e.split("").forEach(function(t){n[t]=t}),7!=f({},t)[r]||Object.keys(f({},n)).join("")!=e})?function assign(t,n){for(var r=u(t),f=arguments.length,a=1,s=i.f,l=o.f;f>a;)for(var h,v=c(arguments[a++]),p=s?e(v).concat(s(v)):e(v),d=p.length,y=0;d>y;)l.call(v,h=p[y++])&&(r[h]=v[h]);return r}:f},{109:109,34:34,45:45,73:73,76:76,77:77}],66:[function(t,n,r){var e=t(7),i=t(68),o=t(30),u=t(93)("IE_PROTO"),c=function(){},f="prototype",a=function(){var n,r=t(29)("iframe"),e=o.length,i="<",u=">";for(r.style.display="none",t(41).appendChild(r),r.src="javascript:",n=r.contentWindow.document,n.open(),n.write(i+"script"+u+"document.F=Object"+i+"/script"+u),n.close(),a=n.F;e--;)delete a[f][o[e]];return a()};n.exports=Object.create||function create(t,n){var r;return null!==t?(c[f]=e(t),r=new c,c[f]=null,r[u]=t):r=a(),void 0===n?r:i(r,n)}},{29:29,30:30,41:41,68:68,7:7,93:93}],67:[function(t,n,r){var e=t(7),i=t(42),o=t(110),u=Object.defineProperty;r.f=t(28)?Object.defineProperty:function defineProperty(t,n,r){if(e(t),n=o(n,!0),e(r),i)try{return u(t,n,r)}catch(t){}if("get"in r||"set"in r)throw TypeError("Accessors not supported!");return"value"in r&&(t[n]=r.value),t}},{110:110,28:28,42:42,7:7}],68:[function(t,n,r){var e=t(67),i=t(7),o=t(76);n.exports=t(28)?Object.defineProperties:function defineProperties(t,n){i(t);for(var r,u=o(n),c=u.length,f=0;c>f;)e.f(t,r=u[f++],n[r]);return t}},{28:28,67:67,7:7,76:76}],69:[function(t,n,r){n.exports=t(58)||!t(34)(function(){var n=Math.random();__defineSetter__.call(null,n,function(){}),delete t(38)[n]})},{34:34,38:38,58:58}],70:[function(t,n,r){var e=t(77),i=t(85),o=t(107),u=t(110),c=t(39),f=t(42),a=Object.getOwnPropertyDescriptor;r.f=t(28)?a:function getOwnPropertyDescriptor(t,n){if(t=o(t),n=u(n,!0),f)try{return a(t,n)}catch(t){}if(c(t,n))return i(!e.f.call(t,n),t[n])}},{107:107,110:110,28:28,39:39,42:42,77:77,85:85}],71:[function(t,n,r){var e=t(107),i=t(72).f,o={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return i(t)}catch(t){return u.slice()}};n.exports.f=function getOwnPropertyNames(t){return u&&"[object Window]"==o.call(t)?c(t):i(e(t))}},{107:107,72:72}],72:[function(t,n,r){var e=t(75),i=t(30).concat("length","prototype");r.f=Object.getOwnPropertyNames||function getOwnPropertyNames(t){return e(t,i)}},{30:30,75:75}],73:[function(t,n,r){r.f=Object.getOwnPropertySymbols},{}],74:[function(t,n,r){var e=t(39),i=t(109),o=t(93)("IE_PROTO"),u=Object.prototype;n.exports=Object.getPrototypeOf||function(t){return t=i(t),e(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},{109:109,39:39,93:93}],75:[function(t,n,r){var e=t(39),i=t(107),o=t(11)(!1),u=t(93)("IE_PROTO");n.exports=function(t,n){var r,c=i(t),f=0,a=[];for(r in c)r!=u&&e(c,r)&&a.push(r);for(;n.length>f;)e(c,r=n[f++])&&(~o(a,r)||a.push(r));return a}},{107:107,11:11,39:39,93:93}],76:[function(t,n,r){var e=t(75),i=t(30);n.exports=Object.keys||function keys(t){return e(t,i)}},{30:30,75:75}],77:[function(t,n,r){r.f={}.propertyIsEnumerable},{}],78:[function(t,n,r){var e=t(32),i=t(23),o=t(34);n.exports=function(t,n){var r=(i.Object||{})[t]||Object[t],u={};u[t]=n(r),e(e.S+e.F*o(function(){r(1)}),"Object",u)}},{23:23,32:32,34:34}],79:[function(t,n,r){var e=t(76),i=t(107),o=t(77).f;n.exports=function(t){return function(n){for(var r,u=i(n),c=e(u),f=c.length,a=0,s=[];f>a;)o.call(u,r=c[a++])&&s.push(t?[r,u[r]]:u[r]);return s}}},{107:107,76:76,77:77}],80:[function(t,n,r){var e=t(72),i=t(73),o=t(7),u=t(38).Reflect;n.exports=u&&u.ownKeys||function ownKeys(t){var n=e.f(o(t)),r=i.f;return r?n.concat(r(t)):n}},{38:38,7:7,72:72,73:73}],81:[function(t,n,r){var e=t(38).parseFloat,i=t(102).trim;n.exports=1/e(t(103)+"-0")!==-(1/0)?function parseFloat(t){var n=i(String(t),3),r=e(n);return 0===r&&"-"==n.charAt(0)?-0:r}:e},{102:102,103:103,38:38}],82:[function(t,n,r){var e=t(38).parseInt,i=t(102).trim,o=t(103),u=/^[\-+]?0[xX]/;n.exports=8!==e(o+"08")||22!==e(o+"0x16")?function parseInt(t,n){var r=i(String(t),3);return e(r,n>>>0||(u.test(r)?16:10))}:e},{102:102,103:103,38:38}],83:[function(t,n,r){"use strict";var e=t(84),i=t(44),o=t(3);n.exports=function(){for(var t=o(this),n=arguments.length,r=Array(n),u=0,c=e._,f=!1;n>u;)(r[u]=arguments[u++])===c&&(f=!0);return function(){var e,o=this,u=arguments.length,a=0,s=0;if(!f&&!u)return i(t,r,o);if(e=r.slice(),f)for(;n>a;a++)e[a]===c&&(e[a]=arguments[s++]);for(;u>s;)e.push(arguments[s++]);return i(t,e,o)}}},{3:3,44:44,84:84}],84:[function(t,n,r){n.exports=t(38)},{38:38}],85:[function(t,n,r){n.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},{}],86:[function(t,n,r){var e=t(87);n.exports=function(t,n,r){for(var i in n)e(t,i,n[i],r);return t}},{87:87}],87:[function(t,n,r){var e=t(38),i=t(40),o=t(39),u=t(114)("src"),c="toString",f=Function[c],a=(""+f).split(c);t(23).inspectSource=function(t){return f.call(t)},(n.exports=function(t,n,r,c){var f="function"==typeof r;f&&(o(r,"name")||i(r,"name",n)),t[n]!==r&&(f&&(o(r,u)||i(r,u,t[n]?""+t[n]:a.join(String(n)))),t===e?t[n]=r:c?t[n]?t[n]=r:i(t,n,r):(delete t[n],i(t,n,r)))})(Function.prototype,c,function toString(){return"function"==typeof this&&this[u]||f.call(this)})},{114:114,23:23,38:38,39:39,40:40}],88:[function(t,n,r){n.exports=function(t,n){var r=n===Object(n)?function(t){return n[t]}:n;return function(n){return String(n).replace(t,r)}}},{}],89:[function(t,n,r){n.exports=Object.is||function is(t,n){return t===n?0!==t||1/t===1/n:t!=t&&n!=n}},{}],90:[function(t,n,r){var e=t(49),i=t(7),o=function(t,n){if(i(t),!e(n)&&null!==n)throw TypeError(n+": can't set as prototype!")};n.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(n,r,e){try{e=t(25)(Function.call,t(70).f(Object.prototype,"__proto__").set,2),e(n,[]),r=!(n instanceof Array)}catch(t){r=!0}return function setPrototypeOf(t,n){return o(t,n),r?t.__proto__=n:e(t,n),t}}({},!1):void 0),check:o}},{25:25,49:49,7:7,70:70}],91:[function(t,n,r){"use strict";var e=t(38),i=t(67),o=t(28),u=t(117)("species");n.exports=function(t){var n=e[t];o&&n&&!n[u]&&i.f(n,u,{configurable:!0,get:function(){return this}})}},{117:117,28:28,38:38,67:67}],92:[function(t,n,r){var e=t(67).f,i=t(39),o=t(117)("toStringTag");n.exports=function(t,n,r){t&&!i(t=r?t:t.prototype,o)&&e(t,o,{configurable:!0,value:n})}},{117:117,39:39,67:67}],93:[function(t,n,r){var e=t(94)("keys"),i=t(114);n.exports=function(t){return e[t]||(e[t]=i(t))}},{114:114,94:94}],94:[function(t,n,r){var e=t(38),i="__core-js_shared__",o=e[i]||(e[i]={});n.exports=function(t){return o[t]||(o[t]={})}},{38:38}],95:[function(t,n,r){var e=t(7),i=t(3),o=t(117)("species");n.exports=function(t,n){var r,u=e(t).constructor;return void 0===u||void 0==(r=e(u)[o])?n:i(r)}},{117:117,3:3,7:7}],96:[function(t,n,r){var e=t(34);n.exports=function(t,n){return!!t&&e(function(){n?t.call(null,function(){},1):t.call(null)})}},{34:34}],97:[function(t,n,r){var e=t(106),i=t(27);n.exports=function(t){return function(n,r){var o,u,c=String(i(n)),f=e(r),a=c.length;return f<0||f>=a?t?"":void 0:(o=c.charCodeAt(f),o<55296||o>56319||f+1===a||(u=c.charCodeAt(f+1))<56320||u>57343?t?c.charAt(f):o:t?c.slice(f,f+2):(o-55296<<10)+(u-56320)+65536)}}},{106:106,27:27}],98:[function(t,n,r){var e=t(50),i=t(27);n.exports=function(t,n,r){if(e(n))throw TypeError("String#"+r+" doesn't accept regex!");return String(i(t))}},{27:27,50:50}],99:[function(t,n,r){var e=t(32),i=t(34),o=t(27),u=/"/g,c=function(t,n,r,e){var i=String(o(t)),c="<"+n;return""!==r&&(c+=" "+r+'="'+String(e).replace(u,"&quot;")+'"'),c+">"+i+"</"+n+">"};n.exports=function(t,n){var r={};r[t]=n(c),e(e.P+e.F*i(function(){var n=""[t]('"');return n!==n.toLowerCase()||n.split('"').length>3}),"String",r)}},{27:27,32:32,34:34}],100:[function(t,n,r){var e=t(108),i=t(101),o=t(27);n.exports=function(t,n,r,u){var c=String(o(t)),f=c.length,a=void 0===r?" ":String(r),s=e(n);if(s<=f||""==a)return c;var l=s-f,h=i.call(a,Math.ceil(l/a.length));return h.length>l&&(h=h.slice(0,l)),u?h+c:c+h}},{101:101,108:108,27:27}],101:[function(t,n,r){"use strict";var e=t(106),i=t(27);n.exports=function repeat(t){var n=String(i(this)),r="",o=e(t);if(o<0||o==1/0)throw RangeError("Count can't be negative");for(;o>0;(o>>>=1)&&(n+=n))1&o&&(r+=n);return r}},{106:106,27:27}],102:[function(t,n,r){var e=t(32),i=t(27),o=t(34),u=t(103),c="["+u+"]",f="​",a=RegExp("^"+c+c+"*"),s=RegExp(c+c+"*$"),l=function(t,n,r){var i={},c=o(function(){return!!u[t]()||f[t]()!=f}),a=i[t]=c?n(h):u[t];r&&(i[r]=a),e(e.P+e.F*c,"String",i)},h=l.trim=function(t,n){return t=String(i(t)),1&n&&(t=t.replace(a,"")),2&n&&(t=t.replace(s,"")),t};n.exports=l},{103:103,27:27,32:32,34:34}],103:[function(t,n,r){n.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},{}],104:[function(t,n,r){var e,i,o,u=t(25),c=t(44),f=t(41),a=t(29),s=t(38),l=s.process,h=s.setImmediate,v=s.clearImmediate,p=s.MessageChannel,d=0,y={},g="onreadystatechange",b=function(){var t=+this;if(y.hasOwnProperty(t)){var n=y[t];delete y[t],n()}},x=function(t){b.call(t.data)};h&&v||(h=function setImmediate(t){for(var n=[],r=1;arguments.length>r;)n.push(arguments[r++]);return y[++d]=function(){c("function"==typeof t?t:Function(t),n)},e(d),d},v=function clearImmediate(t){delete y[t]},"process"==t(18)(l)?e=function(t){l.nextTick(u(b,t,1))}:p?(i=new p,o=i.port2,i.port1.onmessage=x,e=u(o.postMessage,o,1)):s.addEventListener&&"function"==typeof postMessage&&!s.importScripts?(e=function(t){s.postMessage(t+"","*")},s.addEventListener("message",x,!1)):e=g in a("script")?function(t){f.appendChild(a("script"))[g]=function(){f.removeChild(this),b.call(t)}}:function(t){setTimeout(u(b,t,1),0)}),n.exports={set:h,clear:v}},{18:18,25:25,29:29,38:38,41:41,44:44}],105:[function(t,n,r){var e=t(106),i=Math.max,o=Math.min;n.exports=function(t,n){return t=e(t),t<0?i(t+n,0):o(t,n)}},{106:106}],106:[function(t,n,r){var e=Math.ceil,i=Math.floor;n.exports=function(t){return isNaN(t=+t)?0:(t>0?i:e)(t)}},{}],107:[function(t,n,r){var e=t(45),i=t(27);n.exports=function(t){return e(i(t))}},{27:27,45:45}],108:[function(t,n,r){var e=t(106),i=Math.min;n.exports=function(t){return t>0?i(e(t),9007199254740991):0}},{106:106}],109:[function(t,n,r){var e=t(27);n.exports=function(t){return Object(e(t))}},{27:27}],110:[function(t,n,r){var e=t(49);n.exports=function(t,n){if(!e(t))return t;var r,i;if(n&&"function"==typeof(r=t.toString)&&!e(i=r.call(t)))return i;if("function"==typeof(r=t.valueOf)&&!e(i=r.call(t)))return i;if(!n&&"function"==typeof(r=t.toString)&&!e(i=r.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},{49:49}],111:[function(t,n,r){"use strict";if(t(28)){var e=t(58),i=t(38),o=t(34),u=t(32),c=t(113),f=t(112),a=t(25),s=t(6),l=t(85),h=t(40),v=t(86),p=t(106),d=t(108),y=t(105),g=t(110),b=t(39),x=t(89),m=t(17),w=t(49),S=t(109),_=t(46),E=t(66),O=t(74),F=t(72).f,P=t(118),M=t(114),A=t(117),I=t(12),j=t(11),N=t(95),k=t(130),R=t(56),T=t(54),L=t(91),C=t(9),U=t(8),G=t(67),D=t(70),W=G.f,B=D.f,V=i.RangeError,z=i.TypeError,K=i.Uint8Array,J="ArrayBuffer",Y="Shared"+J,q="BYTES_PER_ELEMENT",X="prototype",$=Array[X],H=f.ArrayBuffer,Z=f.DataView,Q=I(0),tt=I(2),nt=I(3),rt=I(4),et=I(5),it=I(6),ot=j(!0),ut=j(!1),ct=k.values,ft=k.keys,at=k.entries,st=$.lastIndexOf,lt=$.reduce,ht=$.reduceRight,vt=$.join,pt=$.sort,dt=$.slice,yt=$.toString,gt=$.toLocaleString,bt=A("iterator"),xt=A("toStringTag"),mt=M("typed_constructor"),wt=M("def_constructor"),St=c.CONSTR,_t=c.TYPED,Et=c.VIEW,Ot="Wrong length!",Ft=I(1,function(t,n){return Nt(N(t,t[wt]),n)}),Pt=o(function(){return 1===new K(new Uint16Array([1]).buffer)[0]}),Mt=!!K&&!!K[X].set&&o(function(){new K(1).set({})}),At=function(t,n){if(void 0===t)throw z(Ot);var r=+t,e=d(t);if(n&&!x(r,e))throw V(Ot);return e},It=function(t,n){var r=p(t);if(r<0||r%n)throw V("Wrong offset!");return r},jt=function(t){if(w(t)&&_t in t)return t;throw z(t+" is not a typed array!")},Nt=function(t,n){if(!(w(t)&&mt in t))throw z("It is not a typed array constructor!");return new t(n)},kt=function(t,n){return Rt(N(t,t[wt]),n)},Rt=function(t,n){for(var r=0,e=n.length,i=Nt(t,e);e>r;)i[r]=n[r++];return i},Tt=function(t,n,r){W(t,n,{get:function(){return this._d[r]}})},Lt=function from(t){var n,r,e,i,o,u,c=S(t),f=arguments.length,s=f>1?arguments[1]:void 0,l=void 0!==s,h=P(c);if(void 0!=h&&!_(h)){for(u=h.call(c),e=[],n=0;!(o=u.next()).done;n++)e.push(o.value);c=e}for(l&&f>2&&(s=a(s,arguments[2],2)),n=0,r=d(c.length),i=Nt(this,r);r>n;n++)i[n]=l?s(c[n],n):c[n];return i},Ct=function of(){for(var t=0,n=arguments.length,r=Nt(this,n);n>t;)r[t]=arguments[t++];return r},Ut=!!K&&o(function(){gt.call(new K(1))}),Gt=function toLocaleString(){return gt.apply(Ut?dt.call(jt(this)):jt(this),arguments)},Dt={copyWithin:function copyWithin(t,n){return U.call(jt(this),t,n,arguments.length>2?arguments[2]:void 0)},every:function every(t){return rt(jt(this),t,arguments.length>1?arguments[1]:void 0)},fill:function fill(t){return C.apply(jt(this),arguments)},filter:function filter(t){return kt(this,tt(jt(this),t,arguments.length>1?arguments[1]:void 0))},find:function find(t){return et(jt(this),t,arguments.length>1?arguments[1]:void 0)},findIndex:function findIndex(t){
return it(jt(this),t,arguments.length>1?arguments[1]:void 0)},forEach:function forEach(t){Q(jt(this),t,arguments.length>1?arguments[1]:void 0)},indexOf:function indexOf(t){return ut(jt(this),t,arguments.length>1?arguments[1]:void 0)},includes:function includes(t){return ot(jt(this),t,arguments.length>1?arguments[1]:void 0)},join:function join(t){return vt.apply(jt(this),arguments)},lastIndexOf:function lastIndexOf(t){return st.apply(jt(this),arguments)},map:function map(t){return Ft(jt(this),t,arguments.length>1?arguments[1]:void 0)},reduce:function reduce(t){return lt.apply(jt(this),arguments)},reduceRight:function reduceRight(t){return ht.apply(jt(this),arguments)},reverse:function reverse(){for(var t,n=this,r=jt(n).length,e=Math.floor(r/2),i=0;i<e;)t=n[i],n[i++]=n[--r],n[r]=t;return n},some:function some(t){return nt(jt(this),t,arguments.length>1?arguments[1]:void 0)},sort:function sort(t){return pt.call(jt(this),t)},subarray:function subarray(t,n){var r=jt(this),e=r.length,i=y(t,e);return new(N(r,r[wt]))(r.buffer,r.byteOffset+i*r.BYTES_PER_ELEMENT,d((void 0===n?e:y(n,e))-i))}},Wt=function slice(t,n){return kt(this,dt.call(jt(this),t,n))},Bt=function set(t){jt(this);var n=It(arguments[1],1),r=this.length,e=S(t),i=d(e.length),o=0;if(i+n>r)throw V(Ot);for(;o<i;)this[n+o]=e[o++]},Vt={entries:function entries(){return at.call(jt(this))},keys:function keys(){return ft.call(jt(this))},values:function values(){return ct.call(jt(this))}},zt=function(t,n){return w(t)&&t[_t]&&"symbol"!=typeof n&&n in t&&String(+n)==String(n)},Kt=function getOwnPropertyDescriptor(t,n){return zt(t,n=g(n,!0))?l(2,t[n]):B(t,n)},Jt=function defineProperty(t,n,r){return!(zt(t,n=g(n,!0))&&w(r)&&b(r,"value"))||b(r,"get")||b(r,"set")||r.configurable||b(r,"writable")&&!r.writable||b(r,"enumerable")&&!r.enumerable?W(t,n,r):(t[n]=r.value,t)};St||(D.f=Kt,G.f=Jt),u(u.S+u.F*!St,"Object",{getOwnPropertyDescriptor:Kt,defineProperty:Jt}),o(function(){yt.call({})})&&(yt=gt=function toString(){return vt.call(this)});var Yt=v({},Dt);v(Yt,Vt),h(Yt,bt,Vt.values),v(Yt,{slice:Wt,set:Bt,constructor:function(){},toString:yt,toLocaleString:Gt}),Tt(Yt,"buffer","b"),Tt(Yt,"byteOffset","o"),Tt(Yt,"byteLength","l"),Tt(Yt,"length","e"),W(Yt,xt,{get:function(){return this[_t]}}),n.exports=function(t,n,r,f){f=!!f;var a=t+(f?"Clamped":"")+"Array",l="Uint8Array"!=a,v="get"+t,p="set"+t,y=i[a],g=y||{},b=y&&O(y),x=!y||!c.ABV,S={},_=y&&y[X],P=function(t,r){var e=t._d;return e.v[v](r*n+e.o,Pt)},M=function(t,r,e){var i=t._d;f&&(e=(e=Math.round(e))<0?0:e>255?255:255&e),i.v[p](r*n+i.o,e,Pt)},A=function(t,n){W(t,n,{get:function(){return P(this,n)},set:function(t){return M(this,n,t)},enumerable:!0})};x?(y=r(function(t,r,e,i){s(t,y,a,"_d");var o,u,c,f,l=0,v=0;if(w(r)){if(!(r instanceof H||(f=m(r))==J||f==Y))return _t in r?Rt(y,r):Lt.call(y,r);o=r,v=It(e,n);var p=r.byteLength;if(void 0===i){if(p%n)throw V(Ot);if(u=p-v,u<0)throw V(Ot)}else if(u=d(i)*n,u+v>p)throw V(Ot);c=u/n}else c=At(r,!0),u=c*n,o=new H(u);for(h(t,"_d",{b:o,o:v,l:u,e:c,v:new Z(o)});l<c;)A(t,l++)}),_=y[X]=E(Yt),h(_,"constructor",y)):T(function(t){new y(null),new y(t)},!0)||(y=r(function(t,r,e,i){s(t,y,a);var o;return w(r)?r instanceof H||(o=m(r))==J||o==Y?void 0!==i?new g(r,It(e,n),i):void 0!==e?new g(r,It(e,n)):new g(r):_t in r?Rt(y,r):Lt.call(y,r):new g(At(r,l))}),Q(b!==Function.prototype?F(g).concat(F(b)):F(g),function(t){t in y||h(y,t,g[t])}),y[X]=_,e||(_.constructor=y));var I=_[bt],j=!!I&&("values"==I.name||void 0==I.name),N=Vt.values;h(y,mt,!0),h(_,_t,a),h(_,Et,!0),h(_,wt,y),(f?new y(1)[xt]==a:xt in _)||W(_,xt,{get:function(){return a}}),S[a]=y,u(u.G+u.W+u.F*(y!=g),S),u(u.S,a,{BYTES_PER_ELEMENT:n,from:Lt,of:Ct}),q in _||h(_,q,n),u(u.P,a,Dt),L(a),u(u.P+u.F*Mt,a,{set:Bt}),u(u.P+u.F*!j,a,Vt),u(u.P+u.F*(_.toString!=yt),a,{toString:yt}),u(u.P+u.F*o(function(){new y(1).slice()}),a,{slice:Wt}),u(u.P+u.F*(o(function(){return[1,2].toLocaleString()!=new y([1,2]).toLocaleString()})||!o(function(){_.toLocaleString.call([1,2])})),a,{toLocaleString:Gt}),R[a]=j?I:N,e||j||h(_,bt,N)}}else n.exports=function(){}},{105:105,106:106,108:108,109:109,11:11,110:110,112:112,113:113,114:114,117:117,118:118,12:12,130:130,17:17,25:25,28:28,32:32,34:34,38:38,39:39,40:40,46:46,49:49,54:54,56:56,58:58,6:6,66:66,67:67,70:70,72:72,74:74,8:8,85:85,86:86,89:89,9:9,91:91,95:95}],112:[function(t,n,r){"use strict";var e=t(38),i=t(28),o=t(58),u=t(113),c=t(40),f=t(86),a=t(34),s=t(6),l=t(106),h=t(108),v=t(72).f,p=t(67).f,d=t(9),y=t(92),g="ArrayBuffer",b="DataView",x="prototype",m="Wrong length!",w="Wrong index!",S=e[g],_=e[b],E=e.Math,O=e.RangeError,F=e.Infinity,P=S,M=E.abs,A=E.pow,I=E.floor,j=E.log,N=E.LN2,k="buffer",R="byteLength",T="byteOffset",L=i?"_b":k,C=i?"_l":R,U=i?"_o":T,G=function(t,n,r){var e,i,o,u=Array(r),c=8*r-n-1,f=(1<<c)-1,a=f>>1,s=23===n?A(2,-24)-A(2,-77):0,l=0,h=t<0||0===t&&1/t<0?1:0;for(t=M(t),t!=t||t===F?(i=t!=t?1:0,e=f):(e=I(j(t)/N),t*(o=A(2,-e))<1&&(e--,o*=2),t+=e+a>=1?s/o:s*A(2,1-a),t*o>=2&&(e++,o/=2),e+a>=f?(i=0,e=f):e+a>=1?(i=(t*o-1)*A(2,n),e+=a):(i=t*A(2,a-1)*A(2,n),e=0));n>=8;u[l++]=255&i,i/=256,n-=8);for(e=e<<n|i,c+=n;c>0;u[l++]=255&e,e/=256,c-=8);return u[--l]|=128*h,u},D=function(t,n,r){var e,i=8*r-n-1,o=(1<<i)-1,u=o>>1,c=i-7,f=r-1,a=t[f--],s=127&a;for(a>>=7;c>0;s=256*s+t[f],f--,c-=8);for(e=s&(1<<-c)-1,s>>=-c,c+=n;c>0;e=256*e+t[f],f--,c-=8);if(0===s)s=1-u;else{if(s===o)return e?NaN:a?-F:F;e+=A(2,n),s-=u}return(a?-1:1)*e*A(2,s-n)},W=function(t){return t[3]<<24|t[2]<<16|t[1]<<8|t[0]},B=function(t){return[255&t]},V=function(t){return[255&t,t>>8&255]},z=function(t){return[255&t,t>>8&255,t>>16&255,t>>24&255]},K=function(t){return G(t,52,8)},J=function(t){return G(t,23,4)},Y=function(t,n,r){p(t[x],n,{get:function(){return this[r]}})},q=function(t,n,r,e){var i=+r,o=l(i);if(i!=o||o<0||o+n>t[C])throw O(w);var u=t[L]._b,c=o+t[U],f=u.slice(c,c+n);return e?f:f.reverse()},X=function(t,n,r,e,i,o){var u=+r,c=l(u);if(u!=c||c<0||c+n>t[C])throw O(w);for(var f=t[L]._b,a=c+t[U],s=e(+i),h=0;h<n;h++)f[a+h]=s[o?h:n-h-1]},$=function(t,n){s(t,S,g);var r=+n,e=h(r);if(r!=e)throw O(m);return e};if(u.ABV){if(!a(function(){new S})||!a(function(){new S(.5)})){S=function ArrayBuffer(t){return new P($(this,t))};for(var H,Z=S[x]=P[x],Q=v(P),tt=0;Q.length>tt;)(H=Q[tt++])in S||c(S,H,P[H]);o||(Z.constructor=S)}var nt=new _(new S(2)),rt=_[x].setInt8;nt.setInt8(0,2147483648),nt.setInt8(1,2147483649),!nt.getInt8(0)&&nt.getInt8(1)||f(_[x],{setInt8:function setInt8(t,n){rt.call(this,t,n<<24>>24)},setUint8:function setUint8(t,n){rt.call(this,t,n<<24>>24)}},!0)}else S=function ArrayBuffer(t){var n=$(this,t);this._b=d.call(Array(n),0),this[C]=n},_=function DataView(t,n,r){s(this,_,b),s(t,S,b);var e=t[C],i=l(n);if(i<0||i>e)throw O("Wrong offset!");if(r=void 0===r?e-i:h(r),i+r>e)throw O(m);this[L]=t,this[U]=i,this[C]=r},i&&(Y(S,R,"_l"),Y(_,k,"_b"),Y(_,R,"_l"),Y(_,T,"_o")),f(_[x],{getInt8:function getInt8(t){return q(this,1,t)[0]<<24>>24},getUint8:function getUint8(t){return q(this,1,t)[0]},getInt16:function getInt16(t){var n=q(this,2,t,arguments[1]);return(n[1]<<8|n[0])<<16>>16},getUint16:function getUint16(t){var n=q(this,2,t,arguments[1]);return n[1]<<8|n[0]},getInt32:function getInt32(t){return W(q(this,4,t,arguments[1]))},getUint32:function getUint32(t){return W(q(this,4,t,arguments[1]))>>>0},getFloat32:function getFloat32(t){return D(q(this,4,t,arguments[1]),23,4)},getFloat64:function getFloat64(t){return D(q(this,8,t,arguments[1]),52,8)},setInt8:function setInt8(t,n){X(this,1,t,B,n)},setUint8:function setUint8(t,n){X(this,1,t,B,n)},setInt16:function setInt16(t,n){X(this,2,t,V,n,arguments[2])},setUint16:function setUint16(t,n){X(this,2,t,V,n,arguments[2])},setInt32:function setInt32(t,n){X(this,4,t,z,n,arguments[2])},setUint32:function setUint32(t,n){X(this,4,t,z,n,arguments[2])},setFloat32:function setFloat32(t,n){X(this,4,t,J,n,arguments[2])},setFloat64:function setFloat64(t,n){X(this,8,t,K,n,arguments[2])}});y(S,g),y(_,b),c(_[x],u.VIEW,!0),r[g]=S,r[b]=_},{106:106,108:108,113:113,28:28,34:34,38:38,40:40,58:58,6:6,67:67,72:72,86:86,9:9,92:92}],113:[function(t,n,r){for(var e,i=t(38),o=t(40),u=t(114),c=u("typed_array"),f=u("view"),a=!(!i.ArrayBuffer||!i.DataView),s=a,l=0,h=9,v="Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(",");l<h;)(e=i[v[l++]])?(o(e.prototype,c,!0),o(e.prototype,f,!0)):s=!1;n.exports={ABV:a,CONSTR:s,TYPED:c,VIEW:f}},{114:114,38:38,40:40}],114:[function(t,n,r){var e=0,i=Math.random();n.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+i).toString(36))}},{}],115:[function(t,n,r){var e=t(38),i=t(23),o=t(58),u=t(116),c=t(67).f;n.exports=function(t){var n=i.Symbol||(i.Symbol=o?{}:e.Symbol||{});"_"==t.charAt(0)||t in n||c(n,t,{value:u.f(t)})}},{116:116,23:23,38:38,58:58,67:67}],116:[function(t,n,r){r.f=t(117)},{117:117}],117:[function(t,n,r){var e=t(94)("wks"),i=t(114),o=t(38).Symbol,u="function"==typeof o,c=n.exports=function(t){return e[t]||(e[t]=u&&o[t]||(u?o:i)("Symbol."+t))};c.store=e},{114:114,38:38,94:94}],118:[function(t,n,r){var e=t(17),i=t(117)("iterator"),o=t(56);n.exports=t(23).getIteratorMethod=function(t){if(void 0!=t)return t[i]||t["@@iterator"]||o[e(t)]}},{117:117,17:17,23:23,56:56}],119:[function(t,n,r){var e=t(32),i=t(88)(/[\\^$*+?.()|[\]{}]/g,"\\$&");e(e.S,"RegExp",{escape:function escape(t){return i(t)}})},{32:32,88:88}],120:[function(t,n,r){var e=t(32);e(e.P,"Array",{copyWithin:t(8)}),t(5)("copyWithin")},{32:32,5:5,8:8}],121:[function(t,n,r){"use strict";var e=t(32),i=t(12)(4);e(e.P+e.F*!t(96)([].every,!0),"Array",{every:function every(t){return i(this,t,arguments[1])}})},{12:12,32:32,96:96}],122:[function(t,n,r){var e=t(32);e(e.P,"Array",{fill:t(9)}),t(5)("fill")},{32:32,5:5,9:9}],123:[function(t,n,r){"use strict";var e=t(32),i=t(12)(2);e(e.P+e.F*!t(96)([].filter,!0),"Array",{filter:function filter(t){return i(this,t,arguments[1])}})},{12:12,32:32,96:96}],124:[function(t,n,r){"use strict";var e=t(32),i=t(12)(6),o="findIndex",u=!0;o in[]&&Array(1)[o](function(){u=!1}),e(e.P+e.F*u,"Array",{findIndex:function findIndex(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),t(5)(o)},{12:12,32:32,5:5}],125:[function(t,n,r){"use strict";var e=t(32),i=t(12)(5),o="find",u=!0;o in[]&&Array(1)[o](function(){u=!1}),e(e.P+e.F*u,"Array",{find:function find(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),t(5)(o)},{12:12,32:32,5:5}],126:[function(t,n,r){"use strict";var e=t(32),i=t(12)(0),o=t(96)([].forEach,!0);e(e.P+e.F*!o,"Array",{forEach:function forEach(t){return i(this,t,arguments[1])}})},{12:12,32:32,96:96}],127:[function(t,n,r){"use strict";var e=t(25),i=t(32),o=t(109),u=t(51),c=t(46),f=t(108),a=t(24),s=t(118);i(i.S+i.F*!t(54)(function(t){Array.from(t)}),"Array",{from:function from(t){var n,r,i,l,h=o(t),v="function"==typeof this?this:Array,p=arguments.length,d=p>1?arguments[1]:void 0,y=void 0!==d,g=0,b=s(h);if(y&&(d=e(d,p>2?arguments[2]:void 0,2)),void 0==b||v==Array&&c(b))for(n=f(h.length),r=new v(n);n>g;g++)a(r,g,y?d(h[g],g):h[g]);else for(l=b.call(h),r=new v;!(i=l.next()).done;g++)a(r,g,y?u(l,d,[i.value,g],!0):i.value);return r.length=g,r}})},{108:108,109:109,118:118,24:24,25:25,32:32,46:46,51:51,54:54}],128:[function(t,n,r){"use strict";var e=t(32),i=t(11)(!1),o=[].indexOf,u=!!o&&1/[1].indexOf(1,-0)<0;e(e.P+e.F*(u||!t(96)(o)),"Array",{indexOf:function indexOf(t){return u?o.apply(this,arguments)||0:i(this,t,arguments[1])}})},{11:11,32:32,96:96}],129:[function(t,n,r){var e=t(32);e(e.S,"Array",{isArray:t(47)})},{32:32,47:47}],130:[function(t,n,r){"use strict";var e=t(5),i=t(55),o=t(56),u=t(107);n.exports=t(53)(Array,"Array",function(t,n){this._t=u(t),this._i=0,this._k=n},function(){var t=this._t,n=this._k,r=this._i++;return!t||r>=t.length?(this._t=void 0,i(1)):"keys"==n?i(0,r):"values"==n?i(0,t[r]):i(0,[r,t[r]])},"values"),o.Arguments=o.Array,e("keys"),e("values"),e("entries")},{107:107,5:5,53:53,55:55,56:56}],131:[function(t,n,r){"use strict";var e=t(32),i=t(107),o=[].join;e(e.P+e.F*(t(45)!=Object||!t(96)(o)),"Array",{join:function join(t){return o.call(i(this),void 0===t?",":t)}})},{107:107,32:32,45:45,96:96}],132:[function(t,n,r){"use strict";var e=t(32),i=t(107),o=t(106),u=t(108),c=[].lastIndexOf,f=!!c&&1/[1].lastIndexOf(1,-0)<0;e(e.P+e.F*(f||!t(96)(c)),"Array",{lastIndexOf:function lastIndexOf(t){if(f)return c.apply(this,arguments)||0;var n=i(this),r=u(n.length),e=r-1;for(arguments.length>1&&(e=Math.min(e,o(arguments[1]))),e<0&&(e=r+e);e>=0;e--)if(e in n&&n[e]===t)return e||0;return-1}})},{106:106,107:107,108:108,32:32,96:96}],133:[function(t,n,r){"use strict";var e=t(32),i=t(12)(1);e(e.P+e.F*!t(96)([].map,!0),"Array",{map:function map(t){return i(this,t,arguments[1])}})},{12:12,32:32,96:96}],134:[function(t,n,r){"use strict";var e=t(32),i=t(24);e(e.S+e.F*t(34)(function(){function F(){}return!(Array.of.call(F)instanceof F)}),"Array",{of:function of(){for(var t=0,n=arguments.length,r=new("function"==typeof this?this:Array)(n);n>t;)i(r,t,arguments[t++]);return r.length=n,r}})},{24:24,32:32,34:34}],135:[function(t,n,r){"use strict";var e=t(32),i=t(13);e(e.P+e.F*!t(96)([].reduceRight,!0),"Array",{reduceRight:function reduceRight(t){return i(this,t,arguments.length,arguments[1],!0)}})},{13:13,32:32,96:96}],136:[function(t,n,r){"use strict";var e=t(32),i=t(13);e(e.P+e.F*!t(96)([].reduce,!0),"Array",{reduce:function reduce(t){return i(this,t,arguments.length,arguments[1],!1)}})},{13:13,32:32,96:96}],137:[function(t,n,r){"use strict";var e=t(32),i=t(41),o=t(18),u=t(105),c=t(108),f=[].slice;e(e.P+e.F*t(34)(function(){i&&f.call(i)}),"Array",{slice:function slice(t,n){var r=c(this.length),e=o(this);if(n=void 0===n?r:n,"Array"==e)return f.call(this,t,n);for(var i=u(t,r),a=u(n,r),s=c(a-i),l=Array(s),h=0;h<s;h++)l[h]="String"==e?this.charAt(i+h):this[i+h];return l}})},{105:105,108:108,18:18,32:32,34:34,41:41}],138:[function(t,n,r){"use strict";var e=t(32),i=t(12)(3);e(e.P+e.F*!t(96)([].some,!0),"Array",{some:function some(t){return i(this,t,arguments[1])}})},{12:12,32:32,96:96}],139:[function(t,n,r){"use strict";var e=t(32),i=t(3),o=t(109),u=t(34),c=[].sort,f=[1,2,3];e(e.P+e.F*(u(function(){f.sort(void 0)})||!u(function(){f.sort(null)})||!t(96)(c)),"Array",{sort:function sort(t){return void 0===t?c.call(o(this)):c.call(o(this),i(t))}})},{109:109,3:3,32:32,34:34,96:96}],140:[function(t,n,r){t(91)("Array")},{91:91}],141:[function(t,n,r){var e=t(32);e(e.S,"Date",{now:function(){return(new Date).getTime()}})},{32:32}],142:[function(t,n,r){"use strict";var e=t(32),i=t(34),o=Date.prototype.getTime,u=function(t){return t>9?t:"0"+t};e(e.P+e.F*(i(function(){return"0385-07-25T07:06:39.999Z"!=new Date(-5e13-1).toISOString()})||!i(function(){new Date(NaN).toISOString()})),"Date",{toISOString:function toISOString(){if(!isFinite(o.call(this)))throw RangeError("Invalid time value");var t=this,n=t.getUTCFullYear(),r=t.getUTCMilliseconds(),e=n<0?"-":n>9999?"+":"";return e+("00000"+Math.abs(n)).slice(e?-6:-4)+"-"+u(t.getUTCMonth()+1)+"-"+u(t.getUTCDate())+"T"+u(t.getUTCHours())+":"+u(t.getUTCMinutes())+":"+u(t.getUTCSeconds())+"."+(r>99?r:"0"+u(r))+"Z"}})},{32:32,34:34}],143:[function(t,n,r){"use strict";var e=t(32),i=t(109),o=t(110);e(e.P+e.F*t(34)(function(){return null!==new Date(NaN).toJSON()||1!==Date.prototype.toJSON.call({toISOString:function(){return 1}})}),"Date",{toJSON:function toJSON(t){var n=i(this),r=o(n);return"number"!=typeof r||isFinite(r)?n.toISOString():null}})},{109:109,110:110,32:32,34:34}],144:[function(t,n,r){var e=t(117)("toPrimitive"),i=Date.prototype;e in i||t(40)(i,e,t(26))},{117:117,26:26,40:40}],145:[function(t,n,r){var e=Date.prototype,i="Invalid Date",o="toString",u=e[o],c=e.getTime;new Date(NaN)+""!=i&&t(87)(e,o,function toString(){var t=c.call(this);return t===t?u.call(this):i})},{87:87}],146:[function(t,n,r){var e=t(32);e(e.P,"Function",{bind:t(16)})},{16:16,32:32}],147:[function(t,n,r){"use strict";var e=t(49),i=t(74),o=t(117)("hasInstance"),u=Function.prototype;o in u||t(67).f(u,o,{value:function(t){if("function"!=typeof this||!e(t))return!1;if(!e(this.prototype))return t instanceof this;for(;t=i(t);)if(this.prototype===t)return!0;return!1}})},{117:117,49:49,67:67,74:74}],148:[function(t,n,r){var e=t(67).f,i=t(85),o=t(39),u=Function.prototype,c=/^\s*function ([^ (]*)/,f="name",a=Object.isExtensible||function(){return!0};f in u||t(28)&&e(u,f,{configurable:!0,get:function(){try{var t=this,n=(""+t).match(c)[1];return o(t,f)||!a(t)||e(t,f,i(5,n)),n}catch(t){return""}}})},{28:28,39:39,67:67,85:85}],149:[function(t,n,r){"use strict";var e=t(19);n.exports=t(22)("Map",function(t){return function Map(){return t(this,arguments.length>0?arguments[0]:void 0)}},{get:function get(t){var n=e.getEntry(this,t);return n&&n.v},set:function set(t,n){return e.def(this,0===t?0:t,n)}},e,!0)},{19:19,22:22}],150:[function(t,n,r){var e=t(32),i=t(60),o=Math.sqrt,u=Math.acosh;e(e.S+e.F*!(u&&710==Math.floor(u(Number.MAX_VALUE))&&u(1/0)==1/0),"Math",{acosh:function acosh(t){return(t=+t)<1?NaN:t>94906265.62425156?Math.log(t)+Math.LN2:i(t-1+o(t-1)*o(t+1))}})},{32:32,60:60}],151:[function(t,n,r){function asinh(t){return isFinite(t=+t)&&0!=t?t<0?-asinh(-t):Math.log(t+Math.sqrt(t*t+1)):t}var e=t(32),i=Math.asinh;e(e.S+e.F*!(i&&1/i(0)>0),"Math",{asinh:asinh})},{32:32}],152:[function(t,n,r){var e=t(32),i=Math.atanh;e(e.S+e.F*!(i&&1/i(-0)<0),"Math",{atanh:function atanh(t){return 0==(t=+t)?t:Math.log((1+t)/(1-t))/2}})},{32:32}],153:[function(t,n,r){var e=t(32),i=t(61);e(e.S,"Math",{cbrt:function cbrt(t){return i(t=+t)*Math.pow(Math.abs(t),1/3)}})},{32:32,61:61}],154:[function(t,n,r){var e=t(32);e(e.S,"Math",{clz32:function clz32(t){return(t>>>=0)?31-Math.floor(Math.log(t+.5)*Math.LOG2E):32}})},{32:32}],155:[function(t,n,r){var e=t(32),i=Math.exp;e(e.S,"Math",{cosh:function cosh(t){return(i(t=+t)+i(-t))/2}})},{32:32}],156:[function(t,n,r){var e=t(32),i=t(59);e(e.S+e.F*(i!=Math.expm1),"Math",{expm1:i})},{32:32,59:59}],157:[function(t,n,r){var e=t(32),i=t(61),o=Math.pow,u=o(2,-52),c=o(2,-23),f=o(2,127)*(2-c),a=o(2,-126),s=function(t){return t+1/u-1/u};e(e.S,"Math",{fround:function fround(t){var n,r,e=Math.abs(t),o=i(t);return e<a?o*s(e/a/c)*a*c:(n=(1+c/u)*e,r=n-(n-e),r>f||r!=r?o*(1/0):o*r)}})},{32:32,61:61}],158:[function(t,n,r){var e=t(32),i=Math.abs;e(e.S,"Math",{hypot:function hypot(t,n){for(var r,e,o=0,u=0,c=arguments.length,f=0;u<c;)r=i(arguments[u++]),f<r?(e=f/r,o=o*e*e+1,f=r):r>0?(e=r/f,o+=e*e):o+=r;return f===1/0?1/0:f*Math.sqrt(o)}})},{32:32}],159:[function(t,n,r){var e=t(32),i=Math.imul;e(e.S+e.F*t(34)(function(){return i(4294967295,5)!=-5||2!=i.length}),"Math",{imul:function imul(t,n){var r=65535,e=+t,i=+n,o=r&e,u=r&i;return 0|o*u+((r&e>>>16)*u+o*(r&i>>>16)<<16>>>0)}})},{32:32,34:34}],160:[function(t,n,r){var e=t(32);e(e.S,"Math",{log10:function log10(t){return Math.log(t)/Math.LN10}})},{32:32}],161:[function(t,n,r){var e=t(32);e(e.S,"Math",{log1p:t(60)})},{32:32,60:60}],162:[function(t,n,r){var e=t(32);e(e.S,"Math",{log2:function log2(t){return Math.log(t)/Math.LN2}})},{32:32}],163:[function(t,n,r){var e=t(32);e(e.S,"Math",{sign:t(61)})},{32:32,61:61}],164:[function(t,n,r){var e=t(32),i=t(59),o=Math.exp;e(e.S+e.F*t(34)(function(){return!Math.sinh(-2e-17)!=-2e-17}),"Math",{sinh:function sinh(t){return Math.abs(t=+t)<1?(i(t)-i(-t))/2:(o(t-1)-o(-t-1))*(Math.E/2)}})},{32:32,34:34,59:59}],165:[function(t,n,r){var e=t(32),i=t(59),o=Math.exp;e(e.S,"Math",{tanh:function tanh(t){var n=i(t=+t),r=i(-t);return n==1/0?1:r==1/0?-1:(n-r)/(o(t)+o(-t))}})},{32:32,59:59}],166:[function(t,n,r){var e=t(32);e(e.S,"Math",{trunc:function trunc(t){return(t>0?Math.floor:Math.ceil)(t)}})},{32:32}],167:[function(t,n,r){"use strict";var e=t(38),i=t(39),o=t(18),u=t(43),c=t(110),f=t(34),a=t(72).f,s=t(70).f,l=t(67).f,h=t(102).trim,v="Number",p=e[v],d=p,y=p.prototype,g=o(t(66)(y))==v,b="trim"in String.prototype,x=function(t){var n=c(t,!1);if("string"==typeof n&&n.length>2){n=b?n.trim():h(n,3);var r,e,i,o=n.charCodeAt(0);if(43===o||45===o){if(r=n.charCodeAt(2),88===r||120===r)return NaN}else if(48===o){switch(n.charCodeAt(1)){case 66:case 98:e=2,i=49;break;case 79:case 111:e=8,i=55;break;default:return+n}for(var u,f=n.slice(2),a=0,s=f.length;a<s;a++)if(u=f.charCodeAt(a),u<48||u>i)return NaN;return parseInt(f,e)}}return+n};if(!p(" 0o1")||!p("0b1")||p("+0x1")){p=function Number(t){var n=arguments.length<1?0:t,r=this;return r instanceof p&&(g?f(function(){y.valueOf.call(r)}):o(r)!=v)?u(new d(x(n)),r,p):x(n)};for(var m,w=t(28)?a(d):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),S=0;w.length>S;S++)i(d,m=w[S])&&!i(p,m)&&l(p,m,s(d,m));p.prototype=y,y.constructor=p,t(87)(e,v,p)}},{102:102,110:110,18:18,28:28,34:34,38:38,39:39,43:43,66:66,67:67,70:70,72:72,87:87}],168:[function(t,n,r){var e=t(32);e(e.S,"Number",{EPSILON:Math.pow(2,-52)})},{32:32}],169:[function(t,n,r){var e=t(32),i=t(38).isFinite;e(e.S,"Number",{isFinite:function isFinite(t){return"number"==typeof t&&i(t)}})},{32:32,38:38}],170:[function(t,n,r){var e=t(32);e(e.S,"Number",{isInteger:t(48)})},{32:32,48:48}],171:[function(t,n,r){var e=t(32);e(e.S,"Number",{isNaN:function isNaN(t){return t!=t}})},{32:32}],172:[function(t,n,r){var e=t(32),i=t(48),o=Math.abs;e(e.S,"Number",{isSafeInteger:function isSafeInteger(t){return i(t)&&o(t)<=9007199254740991}})},{32:32,48:48}],173:[function(t,n,r){var e=t(32);e(e.S,"Number",{MAX_SAFE_INTEGER:9007199254740991})},{32:32}],174:[function(t,n,r){var e=t(32);e(e.S,"Number",{MIN_SAFE_INTEGER:-9007199254740991})},{32:32}],175:[function(t,n,r){var e=t(32),i=t(81);e(e.S+e.F*(Number.parseFloat!=i),"Number",{parseFloat:i})},{32:32,81:81}],176:[function(t,n,r){var e=t(32),i=t(82);e(e.S+e.F*(Number.parseInt!=i),"Number",{parseInt:i})},{32:32,82:82}],177:[function(t,n,r){"use strict";var e=t(32),i=t(106),o=t(4),u=t(101),c=1..toFixed,f=Math.floor,a=[0,0,0,0,0,0],s="Number.toFixed: incorrect invocation!",l="0",h=function(t,n){for(var r=-1,e=n;++r<6;)e+=t*a[r],a[r]=e%1e7,e=f(e/1e7)},v=function(t){for(var n=6,r=0;--n>=0;)r+=a[n],a[n]=f(r/t),r=r%t*1e7},p=function(){for(var t=6,n="";--t>=0;)if(""!==n||0===t||0!==a[t]){var r=String(a[t]);n=""===n?r:n+u.call(l,7-r.length)+r}return n},d=function(t,n,r){return 0===n?r:n%2===1?d(t,n-1,r*t):d(t*t,n/2,r)},y=function(t){for(var n=0,r=t;r>=4096;)n+=12,r/=4096;for(;r>=2;)n+=1,r/=2;return n};e(e.P+e.F*(!!c&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!t(34)(function(){c.call({})})),"Number",{toFixed:function toFixed(t){var n,r,e,c,f=o(this,s),a=i(t),g="",b=l;if(a<0||a>20)throw RangeError(s);if(f!=f)return"NaN";if(f<=-1e21||f>=1e21)return String(f);if(f<0&&(g="-",f=-f),f>1e-21)if(n=y(f*d(2,69,1))-69,r=n<0?f*d(2,-n,1):f/d(2,n,1),r*=4503599627370496,n=52-n,n>0){for(h(0,r),e=a;e>=7;)h(1e7,0),e-=7;for(h(d(10,e,1),0),e=n-1;e>=23;)v(1<<23),e-=23;v(1<<e),h(1,1),v(2),b=p()}else h(0,r),h(1<<-n,0),b=p()+u.call(l,a);return a>0?(c=b.length,b=g+(c<=a?"0."+u.call(l,a-c)+b:b.slice(0,c-a)+"."+b.slice(c-a))):b=g+b,b}})},{101:101,106:106,32:32,34:34,4:4}],178:[function(t,n,r){"use strict";var e=t(32),i=t(34),o=t(4),u=1..toPrecision;e(e.P+e.F*(i(function(){return"1"!==u.call(1,void 0)})||!i(function(){u.call({})})),"Number",{toPrecision:function toPrecision(t){var n=o(this,"Number#toPrecision: incorrect invocation!");return void 0===t?u.call(n):u.call(n,t)}})},{32:32,34:34,4:4}],179:[function(t,n,r){var e=t(32);e(e.S+e.F,"Object",{assign:t(65)})},{32:32,65:65}],180:[function(t,n,r){var e=t(32);e(e.S,"Object",{create:t(66)})},{32:32,66:66}],181:[function(t,n,r){var e=t(32);e(e.S+e.F*!t(28),"Object",{defineProperties:t(68)})},{28:28,32:32,68:68}],182:[function(t,n,r){var e=t(32);e(e.S+e.F*!t(28),"Object",{defineProperty:t(67).f})},{28:28,32:32,67:67}],183:[function(t,n,r){var e=t(49),i=t(62).onFreeze;t(78)("freeze",function(t){return function freeze(n){return t&&e(n)?t(i(n)):n}})},{49:49,62:62,78:78}],184:[function(t,n,r){var e=t(107),i=t(70).f;t(78)("getOwnPropertyDescriptor",function(){return function getOwnPropertyDescriptor(t,n){return i(e(t),n)}})},{107:107,70:70,78:78}],185:[function(t,n,r){t(78)("getOwnPropertyNames",function(){return t(71).f})},{71:71,78:78}],186:[function(t,n,r){var e=t(109),i=t(74);t(78)("getPrototypeOf",function(){return function getPrototypeOf(t){return i(e(t))}})},{109:109,74:74,78:78}],187:[function(t,n,r){var e=t(49);t(78)("isExtensible",function(t){return function isExtensible(n){return!!e(n)&&(!t||t(n))}})},{49:49,78:78}],188:[function(t,n,r){var e=t(49);t(78)("isFrozen",function(t){return function isFrozen(n){return!e(n)||!!t&&t(n)}})},{49:49,78:78}],189:[function(t,n,r){var e=t(49);t(78)("isSealed",function(t){return function isSealed(n){return!e(n)||!!t&&t(n)}})},{49:49,78:78}],190:[function(t,n,r){var e=t(32);e(e.S,"Object",{is:t(89)})},{32:32,89:89}],191:[function(t,n,r){var e=t(109),i=t(76);t(78)("keys",function(){return function keys(t){return i(e(t))}})},{109:109,76:76,78:78}],192:[function(t,n,r){var e=t(49),i=t(62).onFreeze;t(78)("preventExtensions",function(t){return function preventExtensions(n){return t&&e(n)?t(i(n)):n}})},{49:49,62:62,78:78}],193:[function(t,n,r){var e=t(49),i=t(62).onFreeze;t(78)("seal",function(t){return function seal(n){return t&&e(n)?t(i(n)):n}})},{49:49,62:62,78:78}],194:[function(t,n,r){var e=t(32);e(e.S,"Object",{setPrototypeOf:t(90).set})},{32:32,90:90}],195:[function(t,n,r){"use strict";var e=t(17),i={};i[t(117)("toStringTag")]="z",i+""!="[object z]"&&t(87)(Object.prototype,"toString",function toString(){return"[object "+e(this)+"]"},!0)},{117:117,17:17,87:87}],196:[function(t,n,r){var e=t(32),i=t(81);e(e.G+e.F*(parseFloat!=i),{parseFloat:i})},{32:32,81:81}],197:[function(t,n,r){var e=t(32),i=t(82);e(e.G+e.F*(parseInt!=i),{parseInt:i})},{32:32,82:82}],198:[function(t,n,r){"use strict";var e,i,o,u=t(58),c=t(38),f=t(25),a=t(17),s=t(32),l=t(49),h=t(3),v=t(6),p=t(37),d=t(95),y=t(104).set,g=t(64)(),b="Promise",x=c.TypeError,m=c.process,w=c[b],m=c.process,S="process"==a(m),_=function(){},E=!!function(){try{var n=w.resolve(1),r=(n.constructor={})[t(117)("species")]=function(t){t(_,_)};return(S||"function"==typeof PromiseRejectionEvent)&&n.then(_)instanceof r}catch(t){}}(),O=function(t,n){return t===n||t===w&&n===o},F=function(t){var n;return!(!l(t)||"function"!=typeof(n=t.then))&&n},P=function(t){return O(w,t)?new M(t):new i(t)},M=i=function(t){var n,r;this.promise=new t(function(t,e){if(void 0!==n||void 0!==r)throw x("Bad Promise constructor");n=t,r=e}),this.resolve=h(n),this.reject=h(r)},A=function(t){try{t()}catch(t){return{error:t}}},I=function(t,n){if(!t._n){t._n=!0;var r=t._c;g(function(){for(var e=t._v,i=1==t._s,o=0,u=function(n){var r,o,u=i?n.ok:n.fail,c=n.resolve,f=n.reject,a=n.domain;try{u?(i||(2==t._h&&k(t),t._h=1),u===!0?r=e:(a&&a.enter(),r=u(e),a&&a.exit()),r===n.promise?f(x("Promise-chain cycle")):(o=F(r))?o.call(r,c,f):c(r)):f(e)}catch(t){f(t)}};r.length>o;)u(r[o++]);t._c=[],t._n=!1,n&&!t._h&&j(t)})}},j=function(t){y.call(c,function(){var n,r,e,i=t._v;if(N(t)&&(n=A(function(){S?m.emit("unhandledRejection",i,t):(r=c.onunhandledrejection)?r({promise:t,reason:i}):(e=c.console)&&e.error&&e.error("Unhandled promise rejection",i)}),t._h=S||N(t)?2:1),t._a=void 0,n)throw n.error})},N=function(t){if(1==t._h)return!1;for(var n,r=t._a||t._c,e=0;r.length>e;)if(n=r[e++],n.fail||!N(n.promise))return!1;return!0},k=function(t){y.call(c,function(){var n;S?m.emit("rejectionHandled",t):(n=c.onrejectionhandled)&&n({promise:t,reason:t._v})})},R=function(t){var n=this;n._d||(n._d=!0,n=n._w||n,n._v=t,n._s=2,n._a||(n._a=n._c.slice()),I(n,!0))},T=function(t){var n,r=this;if(!r._d){r._d=!0,r=r._w||r;try{if(r===t)throw x("Promise can't be resolved itself");(n=F(t))?g(function(){var e={_w:r,_d:!1};try{n.call(t,f(T,e,1),f(R,e,1))}catch(t){R.call(e,t)}}):(r._v=t,r._s=1,I(r,!1))}catch(t){R.call({_w:r,_d:!1},t)}}};E||(w=function Promise(t){v(this,w,b,"_h"),h(t),e.call(this);try{t(f(T,this,1),f(R,this,1))}catch(t){R.call(this,t)}},e=function Promise(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},e.prototype=t(86)(w.prototype,{then:function then(t,n){var r=P(d(this,w));return r.ok="function"!=typeof t||t,r.fail="function"==typeof n&&n,r.domain=S?m.domain:void 0,this._c.push(r),this._a&&this._a.push(r),this._s&&I(this,!1),r.promise},catch:function(t){return this.then(void 0,t)}}),M=function(){var t=new e;this.promise=t,this.resolve=f(T,t,1),this.reject=f(R,t,1)}),s(s.G+s.W+s.F*!E,{Promise:w}),t(92)(w,b),t(91)(b),o=t(23)[b],s(s.S+s.F*!E,b,{reject:function reject(t){var n=P(this),r=n.reject;return r(t),n.promise}}),s(s.S+s.F*(u||!E),b,{resolve:function resolve(t){if(t instanceof w&&O(t.constructor,this))return t;var n=P(this),r=n.resolve;return r(t),n.promise}}),s(s.S+s.F*!(E&&t(54)(function(t){w.all(t).catch(_)})),b,{all:function all(t){var n=this,r=P(n),e=r.resolve,i=r.reject,o=A(function(){var r=[],o=0,u=1;p(t,!1,function(t){var c=o++,f=!1;r.push(void 0),u++,n.resolve(t).then(function(t){f||(f=!0,r[c]=t,--u||e(r))},i)}),--u||e(r)});return o&&i(o.error),r.promise},race:function race(t){var n=this,r=P(n),e=r.reject,i=A(function(){p(t,!1,function(t){n.resolve(t).then(r.resolve,e)})});return i&&e(i.error),r.promise}})},{104:104,117:117,17:17,23:23,25:25,3:3,32:32,37:37,38:38,49:49,54:54,58:58,6:6,64:64,86:86,91:91,92:92,95:95}],199:[function(t,n,r){var e=t(32),i=t(3),o=t(7),u=(t(38).Reflect||{}).apply,c=Function.apply;e(e.S+e.F*!t(34)(function(){u(function(){})}),"Reflect",{apply:function apply(t,n,r){var e=i(t),f=o(r);return u?u(e,n,f):c.call(e,n,f)}})},{3:3,32:32,34:34,38:38,7:7}],200:[function(t,n,r){var e=t(32),i=t(66),o=t(3),u=t(7),c=t(49),f=t(34),a=t(16),s=(t(38).Reflect||{}).construct,l=f(function(){function F(){}return!(s(function(){},[],F)instanceof F)}),h=!f(function(){s(function(){})});e(e.S+e.F*(l||h),"Reflect",{construct:function construct(t,n){o(t),u(n);var r=arguments.length<3?t:o(arguments[2]);if(h&&!l)return s(t,n,r);if(t==r){switch(n.length){case 0:return new t;case 1:return new t(n[0]);case 2:return new t(n[0],n[1]);case 3:return new t(n[0],n[1],n[2]);case 4:return new t(n[0],n[1],n[2],n[3])}var e=[null];return e.push.apply(e,n),new(a.apply(t,e))}var f=r.prototype,v=i(c(f)?f:Object.prototype),p=Function.apply.call(t,v,n);return c(p)?p:v}})},{16:16,3:3,32:32,34:34,38:38,49:49,66:66,7:7}],201:[function(t,n,r){var e=t(67),i=t(32),o=t(7),u=t(110);i(i.S+i.F*t(34)(function(){Reflect.defineProperty(e.f({},1,{value:1}),1,{value:2})}),"Reflect",{defineProperty:function defineProperty(t,n,r){o(t),n=u(n,!0),o(r);try{return e.f(t,n,r),!0}catch(t){return!1}}})},{110:110,32:32,34:34,67:67,7:7}],202:[function(t,n,r){var e=t(32),i=t(70).f,o=t(7);e(e.S,"Reflect",{deleteProperty:function deleteProperty(t,n){var r=i(o(t),n);return!(r&&!r.configurable)&&delete t[n]}})},{32:32,7:7,70:70}],203:[function(t,n,r){"use strict";var e=t(32),i=t(7),o=function(t){this._t=i(t),this._i=0;var n,r=this._k=[];for(n in t)r.push(n)};t(52)(o,"Object",function(){var t,n=this,r=n._k;do if(n._i>=r.length)return{value:void 0,done:!0};while(!((t=r[n._i++])in n._t));return{value:t,done:!1}}),e(e.S,"Reflect",{enumerate:function enumerate(t){return new o(t)}})},{32:32,52:52,7:7}],204:[function(t,n,r){var e=t(70),i=t(32),o=t(7);i(i.S,"Reflect",{getOwnPropertyDescriptor:function getOwnPropertyDescriptor(t,n){return e.f(o(t),n)}})},{32:32,7:7,70:70}],205:[function(t,n,r){var e=t(32),i=t(74),o=t(7);e(e.S,"Reflect",{getPrototypeOf:function getPrototypeOf(t){return i(o(t))}})},{32:32,7:7,74:74}],206:[function(t,n,r){function get(t,n){var r,u,a=arguments.length<3?t:arguments[2];return f(t)===a?t[n]:(r=e.f(t,n))?o(r,"value")?r.value:void 0!==r.get?r.get.call(a):void 0:c(u=i(t))?get(u,n,a):void 0}var e=t(70),i=t(74),o=t(39),u=t(32),c=t(49),f=t(7);u(u.S,"Reflect",{get:get})},{32:32,39:39,49:49,7:7,70:70,74:74}],207:[function(t,n,r){var e=t(32);e(e.S,"Reflect",{has:function has(t,n){return n in t;
}})},{32:32}],208:[function(t,n,r){var e=t(32),i=t(7),o=Object.isExtensible;e(e.S,"Reflect",{isExtensible:function isExtensible(t){return i(t),!o||o(t)}})},{32:32,7:7}],209:[function(t,n,r){var e=t(32);e(e.S,"Reflect",{ownKeys:t(80)})},{32:32,80:80}],210:[function(t,n,r){var e=t(32),i=t(7),o=Object.preventExtensions;e(e.S,"Reflect",{preventExtensions:function preventExtensions(t){i(t);try{return o&&o(t),!0}catch(t){return!1}}})},{32:32,7:7}],211:[function(t,n,r){var e=t(32),i=t(90);i&&e(e.S,"Reflect",{setPrototypeOf:function setPrototypeOf(t,n){i.check(t,n);try{return i.set(t,n),!0}catch(t){return!1}}})},{32:32,90:90}],212:[function(t,n,r){function set(t,n,r){var c,l,h=arguments.length<4?t:arguments[3],v=i.f(a(t),n);if(!v){if(s(l=o(t)))return set(l,n,r,h);v=f(0)}return u(v,"value")?!(v.writable===!1||!s(h))&&(c=i.f(h,n)||f(0),c.value=r,e.f(h,n,c),!0):void 0!==v.set&&(v.set.call(h,r),!0)}var e=t(67),i=t(70),o=t(74),u=t(39),c=t(32),f=t(85),a=t(7),s=t(49);c(c.S,"Reflect",{set:set})},{32:32,39:39,49:49,67:67,7:7,70:70,74:74,85:85}],213:[function(t,n,r){var e=t(38),i=t(43),o=t(67).f,u=t(72).f,c=t(50),f=t(36),a=e.RegExp,s=a,l=a.prototype,h=/a/g,v=/a/g,p=new a(h)!==h;if(t(28)&&(!p||t(34)(function(){return v[t(117)("match")]=!1,a(h)!=h||a(v)==v||"/a/i"!=a(h,"i")}))){a=function RegExp(t,n){var r=this instanceof a,e=c(t),o=void 0===n;return!r&&e&&t.constructor===a&&o?t:i(p?new s(e&&!o?t.source:t,n):s((e=t instanceof a)?t.source:t,e&&o?f.call(t):n),r?this:l,a)};for(var d=(function(t){t in a||o(a,t,{configurable:!0,get:function(){return s[t]},set:function(n){s[t]=n}})}),y=u(s),g=0;y.length>g;)d(y[g++]);l.constructor=a,a.prototype=l,t(87)(e,"RegExp",a)}t(91)("RegExp")},{117:117,28:28,34:34,36:36,38:38,43:43,50:50,67:67,72:72,87:87,91:91}],214:[function(t,n,r){t(28)&&"g"!=/./g.flags&&t(67).f(RegExp.prototype,"flags",{configurable:!0,get:t(36)})},{28:28,36:36,67:67}],215:[function(t,n,r){t(35)("match",1,function(t,n,r){return[function match(r){"use strict";var e=t(this),i=void 0==r?void 0:r[n];return void 0!==i?i.call(r,e):new RegExp(r)[n](String(e))},r]})},{35:35}],216:[function(t,n,r){t(35)("replace",2,function(t,n,r){return[function replace(e,i){"use strict";var o=t(this),u=void 0==e?void 0:e[n];return void 0!==u?u.call(e,o,i):r.call(String(o),e,i)},r]})},{35:35}],217:[function(t,n,r){t(35)("search",1,function(t,n,r){return[function search(r){"use strict";var e=t(this),i=void 0==r?void 0:r[n];return void 0!==i?i.call(r,e):new RegExp(r)[n](String(e))},r]})},{35:35}],218:[function(t,n,r){t(35)("split",2,function(n,r,e){"use strict";var i=t(50),o=e,u=[].push,c="split",f="length",a="lastIndex";if("c"=="abbc"[c](/(b)*/)[1]||4!="test"[c](/(?:)/,-1)[f]||2!="ab"[c](/(?:ab)*/)[f]||4!="."[c](/(.?)(.?)/)[f]||"."[c](/()()/)[f]>1||""[c](/.?/)[f]){var s=void 0===/()??/.exec("")[1];e=function(t,n){var r=String(this);if(void 0===t&&0===n)return[];if(!i(t))return o.call(r,t,n);var e,c,l,h,v,p=[],d=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),y=0,g=void 0===n?4294967295:n>>>0,b=new RegExp(t.source,d+"g");for(s||(e=new RegExp("^"+b.source+"$(?!\\s)",d));(c=b.exec(r))&&(l=c.index+c[0][f],!(l>y&&(p.push(r.slice(y,c.index)),!s&&c[f]>1&&c[0].replace(e,function(){for(v=1;v<arguments[f]-2;v++)void 0===arguments[v]&&(c[v]=void 0)}),c[f]>1&&c.index<r[f]&&u.apply(p,c.slice(1)),h=c[0][f],y=l,p[f]>=g)));)b[a]===c.index&&b[a]++;return y===r[f]?!h&&b.test("")||p.push(""):p.push(r.slice(y)),p[f]>g?p.slice(0,g):p}}else"0"[c](void 0,0)[f]&&(e=function(t,n){return void 0===t&&0===n?[]:o.call(this,t,n)});return[function split(t,i){var o=n(this),u=void 0==t?void 0:t[r];return void 0!==u?u.call(t,o,i):e.call(String(o),t,i)},e]})},{35:35,50:50}],219:[function(t,n,r){"use strict";t(214);var e=t(7),i=t(36),o=t(28),u="toString",c=/./[u],f=function(n){t(87)(RegExp.prototype,u,n,!0)};t(34)(function(){return"/a/b"!=c.call({source:"a",flags:"b"})})?f(function toString(){var t=e(this);return"/".concat(t.source,"/","flags"in t?t.flags:!o&&t instanceof RegExp?i.call(t):void 0)}):c.name!=u&&f(function toString(){return c.call(this)})},{214:214,28:28,34:34,36:36,7:7,87:87}],220:[function(t,n,r){"use strict";var e=t(19);n.exports=t(22)("Set",function(t){return function Set(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function add(t){return e.def(this,t=0===t?0:t,t)}},e)},{19:19,22:22}],221:[function(t,n,r){"use strict";t(99)("anchor",function(t){return function anchor(n){return t(this,"a","name",n)}})},{99:99}],222:[function(t,n,r){"use strict";t(99)("big",function(t){return function big(){return t(this,"big","","")}})},{99:99}],223:[function(t,n,r){"use strict";t(99)("blink",function(t){return function blink(){return t(this,"blink","","")}})},{99:99}],224:[function(t,n,r){"use strict";t(99)("bold",function(t){return function bold(){return t(this,"b","","")}})},{99:99}],225:[function(t,n,r){"use strict";var e=t(32),i=t(97)(!1);e(e.P,"String",{codePointAt:function codePointAt(t){return i(this,t)}})},{32:32,97:97}],226:[function(t,n,r){"use strict";var e=t(32),i=t(108),o=t(98),u="endsWith",c=""[u];e(e.P+e.F*t(33)(u),"String",{endsWith:function endsWith(t){var n=o(this,t,u),r=arguments.length>1?arguments[1]:void 0,e=i(n.length),f=void 0===r?e:Math.min(i(r),e),a=String(t);return c?c.call(n,a,f):n.slice(f-a.length,f)===a}})},{108:108,32:32,33:33,98:98}],227:[function(t,n,r){"use strict";t(99)("fixed",function(t){return function fixed(){return t(this,"tt","","")}})},{99:99}],228:[function(t,n,r){"use strict";t(99)("fontcolor",function(t){return function fontcolor(n){return t(this,"font","color",n)}})},{99:99}],229:[function(t,n,r){"use strict";t(99)("fontsize",function(t){return function fontsize(n){return t(this,"font","size",n)}})},{99:99}],230:[function(t,n,r){var e=t(32),i=t(105),o=String.fromCharCode,u=String.fromCodePoint;e(e.S+e.F*(!!u&&1!=u.length),"String",{fromCodePoint:function fromCodePoint(t){for(var n,r=[],e=arguments.length,u=0;e>u;){if(n=+arguments[u++],i(n,1114111)!==n)throw RangeError(n+" is not a valid code point");r.push(n<65536?o(n):o(((n-=65536)>>10)+55296,n%1024+56320))}return r.join("")}})},{105:105,32:32}],231:[function(t,n,r){"use strict";var e=t(32),i=t(98),o="includes";e(e.P+e.F*t(33)(o),"String",{includes:function includes(t){return!!~i(this,t,o).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},{32:32,33:33,98:98}],232:[function(t,n,r){"use strict";t(99)("italics",function(t){return function italics(){return t(this,"i","","")}})},{99:99}],233:[function(t,n,r){"use strict";var e=t(97)(!0);t(53)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,n=this._t,r=this._i;return r>=n.length?{value:void 0,done:!0}:(t=e(n,r),this._i+=t.length,{value:t,done:!1})})},{53:53,97:97}],234:[function(t,n,r){"use strict";t(99)("link",function(t){return function link(n){return t(this,"a","href",n)}})},{99:99}],235:[function(t,n,r){var e=t(32),i=t(107),o=t(108);e(e.S,"String",{raw:function raw(t){for(var n=i(t.raw),r=o(n.length),e=arguments.length,u=[],c=0;r>c;)u.push(String(n[c++])),c<e&&u.push(String(arguments[c]));return u.join("")}})},{107:107,108:108,32:32}],236:[function(t,n,r){var e=t(32);e(e.P,"String",{repeat:t(101)})},{101:101,32:32}],237:[function(t,n,r){"use strict";t(99)("small",function(t){return function small(){return t(this,"small","","")}})},{99:99}],238:[function(t,n,r){"use strict";var e=t(32),i=t(108),o=t(98),u="startsWith",c=""[u];e(e.P+e.F*t(33)(u),"String",{startsWith:function startsWith(t){var n=o(this,t,u),r=i(Math.min(arguments.length>1?arguments[1]:void 0,n.length)),e=String(t);return c?c.call(n,e,r):n.slice(r,r+e.length)===e}})},{108:108,32:32,33:33,98:98}],239:[function(t,n,r){"use strict";t(99)("strike",function(t){return function strike(){return t(this,"strike","","")}})},{99:99}],240:[function(t,n,r){"use strict";t(99)("sub",function(t){return function sub(){return t(this,"sub","","")}})},{99:99}],241:[function(t,n,r){"use strict";t(99)("sup",function(t){return function sup(){return t(this,"sup","","")}})},{99:99}],242:[function(t,n,r){"use strict";t(102)("trim",function(t){return function trim(){return t(this,3)}})},{102:102}],243:[function(t,n,r){"use strict";var e=t(38),i=t(39),o=t(28),u=t(32),c=t(87),f=t(62).KEY,a=t(34),s=t(94),l=t(92),h=t(114),v=t(117),p=t(116),d=t(115),y=t(57),g=t(31),b=t(47),x=t(7),m=t(107),w=t(110),S=t(85),_=t(66),E=t(71),O=t(70),F=t(67),P=t(76),M=O.f,A=F.f,I=E.f,j=e.Symbol,N=e.JSON,k=N&&N.stringify,R="prototype",T=v("_hidden"),L=v("toPrimitive"),C={}.propertyIsEnumerable,U=s("symbol-registry"),G=s("symbols"),D=s("op-symbols"),W=Object[R],B="function"==typeof j,V=e.QObject,z=!V||!V[R]||!V[R].findChild,K=o&&a(function(){return 7!=_(A({},"a",{get:function(){return A(this,"a",{value:7}).a}})).a})?function(t,n,r){var e=M(W,n);e&&delete W[n],A(t,n,r),e&&t!==W&&A(W,n,e)}:A,J=function(t){var n=G[t]=_(j[R]);return n._k=t,n},Y=B&&"symbol"==typeof j.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof j},q=function defineProperty(t,n,r){return t===W&&q(D,n,r),x(t),n=w(n,!0),x(r),i(G,n)?(r.enumerable?(i(t,T)&&t[T][n]&&(t[T][n]=!1),r=_(r,{enumerable:S(0,!1)})):(i(t,T)||A(t,T,S(1,{})),t[T][n]=!0),K(t,n,r)):A(t,n,r)},X=function defineProperties(t,n){x(t);for(var r,e=g(n=m(n)),i=0,o=e.length;o>i;)q(t,r=e[i++],n[r]);return t},$=function create(t,n){return void 0===n?_(t):X(_(t),n)},H=function propertyIsEnumerable(t){var n=C.call(this,t=w(t,!0));return!(this===W&&i(G,t)&&!i(D,t))&&(!(n||!i(this,t)||!i(G,t)||i(this,T)&&this[T][t])||n)},Z=function getOwnPropertyDescriptor(t,n){if(t=m(t),n=w(n,!0),t!==W||!i(G,n)||i(D,n)){var r=M(t,n);return!r||!i(G,n)||i(t,T)&&t[T][n]||(r.enumerable=!0),r}},Q=function getOwnPropertyNames(t){for(var n,r=I(m(t)),e=[],o=0;r.length>o;)i(G,n=r[o++])||n==T||n==f||e.push(n);return e},tt=function getOwnPropertySymbols(t){for(var n,r=t===W,e=I(r?D:m(t)),o=[],u=0;e.length>u;)!i(G,n=e[u++])||r&&!i(W,n)||o.push(G[n]);return o};B||(j=function Symbol(){if(this instanceof j)throw TypeError("Symbol is not a constructor!");var t=h(arguments.length>0?arguments[0]:void 0),n=function(r){this===W&&n.call(D,r),i(this,T)&&i(this[T],t)&&(this[T][t]=!1),K(this,t,S(1,r))};return o&&z&&K(W,t,{configurable:!0,set:n}),J(t)},c(j[R],"toString",function toString(){return this._k}),O.f=Z,F.f=q,t(72).f=E.f=Q,t(77).f=H,t(73).f=tt,o&&!t(58)&&c(W,"propertyIsEnumerable",H,!0),p.f=function(t){return J(v(t))}),u(u.G+u.W+u.F*!B,{Symbol:j});for(var nt="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),rt=0;nt.length>rt;)v(nt[rt++]);for(var nt=P(v.store),rt=0;nt.length>rt;)d(nt[rt++]);u(u.S+u.F*!B,"Symbol",{for:function(t){return i(U,t+="")?U[t]:U[t]=j(t)},keyFor:function keyFor(t){if(Y(t))return y(U,t);throw TypeError(t+" is not a symbol!")},useSetter:function(){z=!0},useSimple:function(){z=!1}}),u(u.S+u.F*!B,"Object",{create:$,defineProperty:q,defineProperties:X,getOwnPropertyDescriptor:Z,getOwnPropertyNames:Q,getOwnPropertySymbols:tt}),N&&u(u.S+u.F*(!B||a(function(){var t=j();return"[null]"!=k([t])||"{}"!=k({a:t})||"{}"!=k(Object(t))})),"JSON",{stringify:function stringify(t){if(void 0!==t&&!Y(t)){for(var n,r,e=[t],i=1;arguments.length>i;)e.push(arguments[i++]);return n=e[1],"function"==typeof n&&(r=n),!r&&b(n)||(n=function(t,n){if(r&&(n=r.call(this,t,n)),!Y(n))return n}),e[1]=n,k.apply(N,e)}}}),j[R][L]||t(40)(j[R],L,j[R].valueOf),l(j,"Symbol"),l(Math,"Math",!0),l(e.JSON,"JSON",!0)},{107:107,110:110,114:114,115:115,116:116,117:117,28:28,31:31,32:32,34:34,38:38,39:39,40:40,47:47,57:57,58:58,62:62,66:66,67:67,7:7,70:70,71:71,72:72,73:73,76:76,77:77,85:85,87:87,92:92,94:94}],244:[function(t,n,r){"use strict";var e=t(32),i=t(113),o=t(112),u=t(7),c=t(105),f=t(108),a=t(49),s=t(38).ArrayBuffer,l=t(95),h=o.ArrayBuffer,v=o.DataView,p=i.ABV&&s.isView,d=h.prototype.slice,y=i.VIEW,g="ArrayBuffer";e(e.G+e.W+e.F*(s!==h),{ArrayBuffer:h}),e(e.S+e.F*!i.CONSTR,g,{isView:function isView(t){return p&&p(t)||a(t)&&y in t}}),e(e.P+e.U+e.F*t(34)(function(){return!new h(2).slice(1,void 0).byteLength}),g,{slice:function slice(t,n){if(void 0!==d&&void 0===n)return d.call(u(this),t);for(var r=u(this).byteLength,e=c(t,r),i=c(void 0===n?r:n,r),o=new(l(this,h))(f(i-e)),a=new v(this),s=new v(o),p=0;e<i;)s.setUint8(p++,a.getUint8(e++));return o}}),t(91)(g)},{105:105,108:108,112:112,113:113,32:32,34:34,38:38,49:49,7:7,91:91,95:95}],245:[function(t,n,r){var e=t(32);e(e.G+e.W+e.F*!t(113).ABV,{DataView:t(112).DataView})},{112:112,113:113,32:32}],246:[function(t,n,r){t(111)("Float32",4,function(t){return function Float32Array(n,r,e){return t(this,n,r,e)}})},{111:111}],247:[function(t,n,r){t(111)("Float64",8,function(t){return function Float64Array(n,r,e){return t(this,n,r,e)}})},{111:111}],248:[function(t,n,r){t(111)("Int16",2,function(t){return function Int16Array(n,r,e){return t(this,n,r,e)}})},{111:111}],249:[function(t,n,r){t(111)("Int32",4,function(t){return function Int32Array(n,r,e){return t(this,n,r,e)}})},{111:111}],250:[function(t,n,r){t(111)("Int8",1,function(t){return function Int8Array(n,r,e){return t(this,n,r,e)}})},{111:111}],251:[function(t,n,r){t(111)("Uint16",2,function(t){return function Uint16Array(n,r,e){return t(this,n,r,e)}})},{111:111}],252:[function(t,n,r){t(111)("Uint32",4,function(t){return function Uint32Array(n,r,e){return t(this,n,r,e)}})},{111:111}],253:[function(t,n,r){t(111)("Uint8",1,function(t){return function Uint8Array(n,r,e){return t(this,n,r,e)}})},{111:111}],254:[function(t,n,r){t(111)("Uint8",1,function(t){return function Uint8ClampedArray(n,r,e){return t(this,n,r,e)}},!0)},{111:111}],255:[function(t,n,r){"use strict";var e,i=t(12)(0),o=t(87),u=t(62),c=t(65),f=t(21),a=t(49),s=u.getWeak,l=Object.isExtensible,h=f.ufstore,v={},p=function(t){return function WeakMap(){return t(this,arguments.length>0?arguments[0]:void 0)}},d={get:function get(t){if(a(t)){var n=s(t);return n===!0?h(this).get(t):n?n[this._i]:void 0}},set:function set(t,n){return f.def(this,t,n)}},y=n.exports=t(22)("WeakMap",p,d,f,!0,!0);7!=(new y).set((Object.freeze||Object)(v),7).get(v)&&(e=f.getConstructor(p),c(e.prototype,d),u.NEED=!0,i(["delete","has","get","set"],function(t){var n=y.prototype,r=n[t];o(n,t,function(n,i){if(a(n)&&!l(n)){this._f||(this._f=new e);var o=this._f[t](n,i);return"set"==t?this:o}return r.call(this,n,i)})}))},{12:12,21:21,22:22,49:49,62:62,65:65,87:87}],256:[function(t,n,r){"use strict";var e=t(21);t(22)("WeakSet",function(t){return function WeakSet(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function add(t){return e.def(this,t,!0)}},e,!1,!0)},{21:21,22:22}],257:[function(t,n,r){"use strict";var e=t(32),i=t(11)(!0);e(e.P,"Array",{includes:function includes(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),t(5)("includes")},{11:11,32:32,5:5}],258:[function(t,n,r){var e=t(32),i=t(64)(),o=t(38).process,u="process"==t(18)(o);e(e.G,{asap:function asap(t){var n=u&&o.domain;i(n?n.bind(t):t)}})},{18:18,32:32,38:38,64:64}],259:[function(t,n,r){var e=t(32),i=t(18);e(e.S,"Error",{isError:function isError(t){return"Error"===i(t)}})},{18:18,32:32}],260:[function(t,n,r){var e=t(32);e(e.P+e.R,"Map",{toJSON:t(20)("Map")})},{20:20,32:32}],261:[function(t,n,r){var e=t(32);e(e.S,"Math",{iaddh:function iaddh(t,n,r,e){var i=t>>>0,o=n>>>0,u=r>>>0;return o+(e>>>0)+((i&u|(i|u)&~(i+u>>>0))>>>31)|0}})},{32:32}],262:[function(t,n,r){var e=t(32);e(e.S,"Math",{imulh:function imulh(t,n){var r=65535,e=+t,i=+n,o=e&r,u=i&r,c=e>>16,f=i>>16,a=(c*u>>>0)+(o*u>>>16);return c*f+(a>>16)+((o*f>>>0)+(a&r)>>16)}})},{32:32}],263:[function(t,n,r){var e=t(32);e(e.S,"Math",{isubh:function isubh(t,n,r,e){var i=t>>>0,o=n>>>0,u=r>>>0;return o-(e>>>0)-((~i&u|~(i^u)&i-u>>>0)>>>31)|0}})},{32:32}],264:[function(t,n,r){var e=t(32);e(e.S,"Math",{umulh:function umulh(t,n){var r=65535,e=+t,i=+n,o=e&r,u=i&r,c=e>>>16,f=i>>>16,a=(c*u>>>0)+(o*u>>>16);return c*f+(a>>>16)+((o*f>>>0)+(a&r)>>>16)}})},{32:32}],265:[function(t,n,r){"use strict";var e=t(32),i=t(109),o=t(3),u=t(67);t(28)&&e(e.P+t(69),"Object",{__defineGetter__:function __defineGetter__(t,n){u.f(i(this),t,{get:o(n),enumerable:!0,configurable:!0})}})},{109:109,28:28,3:3,32:32,67:67,69:69}],266:[function(t,n,r){"use strict";var e=t(32),i=t(109),o=t(3),u=t(67);t(28)&&e(e.P+t(69),"Object",{__defineSetter__:function __defineSetter__(t,n){u.f(i(this),t,{set:o(n),enumerable:!0,configurable:!0})}})},{109:109,28:28,3:3,32:32,67:67,69:69}],267:[function(t,n,r){var e=t(32),i=t(79)(!0);e(e.S,"Object",{entries:function entries(t){return i(t)}})},{32:32,79:79}],268:[function(t,n,r){var e=t(32),i=t(80),o=t(107),u=t(70),c=t(24);e(e.S,"Object",{getOwnPropertyDescriptors:function getOwnPropertyDescriptors(t){for(var n,r=o(t),e=u.f,f=i(r),a={},s=0;f.length>s;)c(a,n=f[s++],e(r,n));return a}})},{107:107,24:24,32:32,70:70,80:80}],269:[function(t,n,r){"use strict";var e=t(32),i=t(109),o=t(110),u=t(74),c=t(70).f;t(28)&&e(e.P+t(69),"Object",{__lookupGetter__:function __lookupGetter__(t){var n,r=i(this),e=o(t,!0);do if(n=c(r,e))return n.get;while(r=u(r))}})},{109:109,110:110,28:28,32:32,69:69,70:70,74:74}],270:[function(t,n,r){"use strict";var e=t(32),i=t(109),o=t(110),u=t(74),c=t(70).f;t(28)&&e(e.P+t(69),"Object",{__lookupSetter__:function __lookupSetter__(t){var n,r=i(this),e=o(t,!0);do if(n=c(r,e))return n.set;while(r=u(r))}})},{109:109,110:110,28:28,32:32,69:69,70:70,74:74}],271:[function(t,n,r){var e=t(32),i=t(79)(!1);e(e.S,"Object",{values:function values(t){return i(t)}})},{32:32,79:79}],272:[function(t,n,r){"use strict";var e=t(32),i=t(38),o=t(23),u=t(64)(),c=t(117)("observable"),f=t(3),a=t(7),s=t(6),l=t(86),h=t(40),v=t(37),p=v.RETURN,d=function(t){return null==t?void 0:f(t)},y=function(t){var n=t._c;n&&(t._c=void 0,n())},g=function(t){return void 0===t._o},b=function(t){g(t)||(t._o=void 0,y(t))},x=function(t,n){a(t),this._c=void 0,this._o=t,t=new m(this);try{var r=n(t),e=r;null!=r&&("function"==typeof r.unsubscribe?r=function(){e.unsubscribe()}:f(r),this._c=r)}catch(n){return void t.error(n)}g(this)&&y(this)};x.prototype=l({},{unsubscribe:function unsubscribe(){b(this)}});var m=function(t){this._s=t};m.prototype=l({},{next:function next(t){var n=this._s;if(!g(n)){var r=n._o;try{var e=d(r.next);if(e)return e.call(r,t)}catch(t){try{b(n)}finally{throw t}}}},error:function error(t){var n=this._s;if(g(n))throw t;var r=n._o;n._o=void 0;try{var e=d(r.error);if(!e)throw t;t=e.call(r,t)}catch(t){try{y(n)}finally{throw t}}return y(n),t},complete:function complete(t){var n=this._s;if(!g(n)){var r=n._o;n._o=void 0;try{var e=d(r.complete);t=e?e.call(r,t):void 0}catch(t){try{y(n)}finally{throw t}}return y(n),t}}});var w=function Observable(t){s(this,w,"Observable","_f")._f=f(t)};l(w.prototype,{subscribe:function subscribe(t){return new x(t,this._f)},forEach:function forEach(t){var n=this;return new(o.Promise||i.Promise)(function(r,e){f(t);var i=n.subscribe({next:function(n){try{return t(n)}catch(t){e(t),i.unsubscribe()}},error:e,complete:r})})}}),l(w,{from:function from(t){var n="function"==typeof this?this:w,r=d(a(t)[c]);if(r){var e=a(r.call(t));return e.constructor===n?e:new n(function(t){return e.subscribe(t)})}return new n(function(n){var r=!1;return u(function(){if(!r){try{if(v(t,!1,function(t){if(n.next(t),r)return p})===p)return}catch(t){if(r)throw t;return void n.error(t)}n.complete()}}),function(){r=!0}})},of:function of(){for(var t=0,n=arguments.length,r=Array(n);t<n;)r[t]=arguments[t++];return new("function"==typeof this?this:w)(function(t){var n=!1;return u(function(){if(!n){for(var e=0;e<r.length;++e)if(t.next(r[e]),n)return;t.complete()}}),function(){n=!0}})}}),h(w.prototype,c,function(){return this}),e(e.G,{Observable:w}),t(91)("Observable")},{117:117,23:23,3:3,32:32,37:37,38:38,40:40,6:6,64:64,7:7,86:86,91:91}],273:[function(t,n,r){var e=t(63),i=t(7),o=e.key,u=e.set;e.exp({defineMetadata:function defineMetadata(t,n,r,e){u(t,n,i(r),o(e))}})},{63:63,7:7}],274:[function(t,n,r){var e=t(63),i=t(7),o=e.key,u=e.map,c=e.store;e.exp({deleteMetadata:function deleteMetadata(t,n){var r=arguments.length<3?void 0:o(arguments[2]),e=u(i(n),r,!1);if(void 0===e||!e.delete(t))return!1;if(e.size)return!0;var f=c.get(n);return f.delete(r),!!f.size||c.delete(n)}})},{63:63,7:7}],275:[function(t,n,r){var e=t(220),i=t(10),o=t(63),u=t(7),c=t(74),f=o.keys,a=o.key,s=function(t,n){var r=f(t,n),o=c(t);if(null===o)return r;var u=s(o,n);return u.length?r.length?i(new e(r.concat(u))):u:r};o.exp({getMetadataKeys:function getMetadataKeys(t){return s(u(t),arguments.length<2?void 0:a(arguments[1]))}})},{10:10,220:220,63:63,7:7,74:74}],276:[function(t,n,r){var e=t(63),i=t(7),o=t(74),u=e.has,c=e.get,f=e.key,a=function(t,n,r){var e=u(t,n,r);if(e)return c(t,n,r);var i=o(n);return null!==i?a(t,i,r):void 0};e.exp({getMetadata:function getMetadata(t,n){return a(t,i(n),arguments.length<3?void 0:f(arguments[2]))}})},{63:63,7:7,74:74}],277:[function(t,n,r){var e=t(63),i=t(7),o=e.keys,u=e.key;e.exp({getOwnMetadataKeys:function getOwnMetadataKeys(t){return o(i(t),arguments.length<2?void 0:u(arguments[1]))}})},{63:63,7:7}],278:[function(t,n,r){var e=t(63),i=t(7),o=e.get,u=e.key;e.exp({getOwnMetadata:function getOwnMetadata(t,n){return o(t,i(n),arguments.length<3?void 0:u(arguments[2]))}})},{63:63,7:7}],279:[function(t,n,r){var e=t(63),i=t(7),o=t(74),u=e.has,c=e.key,f=function(t,n,r){var e=u(t,n,r);if(e)return!0;var i=o(n);return null!==i&&f(t,i,r)};e.exp({hasMetadata:function hasMetadata(t,n){return f(t,i(n),arguments.length<3?void 0:c(arguments[2]))}})},{63:63,7:7,74:74}],280:[function(t,n,r){var e=t(63),i=t(7),o=e.has,u=e.key;e.exp({hasOwnMetadata:function hasOwnMetadata(t,n){return o(t,i(n),arguments.length<3?void 0:u(arguments[2]))}})},{63:63,7:7}],281:[function(t,n,r){var e=t(63),i=t(7),o=t(3),u=e.key,c=e.set;e.exp({metadata:function metadata(t,n){return function decorator(r,e){c(t,n,(void 0!==e?i:o)(r),u(e))}}})},{3:3,63:63,7:7}],282:[function(t,n,r){var e=t(32);e(e.P+e.R,"Set",{toJSON:t(20)("Set")})},{20:20,32:32}],283:[function(t,n,r){"use strict";var e=t(32),i=t(97)(!0);e(e.P,"String",{at:function at(t){return i(this,t)}})},{32:32,97:97}],284:[function(t,n,r){"use strict";var e=t(32),i=t(27),o=t(108),u=t(50),c=t(36),f=RegExp.prototype,a=function(t,n){this._r=t,this._s=n};t(52)(a,"RegExp String",function next(){var t=this._r.exec(this._s);return{value:t,done:null===t}}),e(e.P,"String",{matchAll:function matchAll(t){if(i(this),!u(t))throw TypeError(t+" is not a regexp!");var n=String(this),r="flags"in f?String(t.flags):c.call(t),e=new RegExp(t.source,~r.indexOf("g")?r:"g"+r);return e.lastIndex=o(t.lastIndex),new a(e,n)}})},{108:108,27:27,32:32,36:36,50:50,52:52}],285:[function(t,n,r){"use strict";var e=t(32),i=t(100);e(e.P,"String",{padEnd:function padEnd(t){return i(this,t,arguments.length>1?arguments[1]:void 0,!1)}})},{100:100,32:32}],286:[function(t,n,r){"use strict";var e=t(32),i=t(100);e(e.P,"String",{padStart:function padStart(t){return i(this,t,arguments.length>1?arguments[1]:void 0,!0)}})},{100:100,32:32}],287:[function(t,n,r){"use strict";t(102)("trimLeft",function(t){return function trimLeft(){return t(this,1)}},"trimStart")},{102:102}],288:[function(t,n,r){"use strict";t(102)("trimRight",function(t){return function trimRight(){return t(this,2)}},"trimEnd")},{102:102}],289:[function(t,n,r){t(115)("asyncIterator")},{115:115}],290:[function(t,n,r){t(115)("observable")},{115:115}],291:[function(t,n,r){var e=t(32);e(e.S,"System",{global:t(38)})},{32:32,38:38}],292:[function(t,n,r){for(var e=t(130),i=t(87),o=t(38),u=t(40),c=t(56),f=t(117),a=f("iterator"),s=f("toStringTag"),l=c.Array,h=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],v=0;v<5;v++){var p,d=h[v],y=o[d],g=y&&y.prototype;if(g){g[a]||u(g,a,l),g[s]||u(g,s,d),c[d]=l;for(p in e)g[p]||i(g,p,e[p],!0)}}},{117:117,130:130,38:38,40:40,56:56,87:87}],293:[function(t,n,r){var e=t(32),i=t(104);e(e.G+e.B,{setImmediate:i.set,clearImmediate:i.clear})},{104:104,32:32}],294:[function(t,n,r){var e=t(38),i=t(32),o=t(44),u=t(83),c=e.navigator,f=!!c&&/MSIE .\./.test(c.userAgent),a=function(t){return f?function(n,r){return t(o(u,[].slice.call(arguments,2),"function"==typeof n?n:Function(n)),r)}:t};i(i.G+i.B+i.F*f,{setTimeout:a(e.setTimeout),setInterval:a(e.setInterval)})},{32:32,38:38,44:44,83:83}],295:[function(t,n,r){t(243),t(180),t(182),t(181),t(184),t(186),t(191),t(185),t(183),t(193),t(192),t(188),t(189),t(187),t(179),t(190),t(194),t(195),t(146),t(148),t(147),t(197),t(196),t(167),t(177),t(178),t(168),t(169),t(170),t(171),t(172),t(173),t(174),t(175),t(176),t(150),t(151),t(152),t(153),t(154),t(155),t(156),t(157),t(158),t(159),t(160),t(161),t(162),t(163),t(164),t(165),t(166),t(230),t(235),t(242),t(233),t(225),t(226),t(231),t(236),t(238),t(221),t(222),t(223),t(224),t(227),t(228),t(229),t(232),t(234),t(237),t(239),t(240),t(241),t(141),t(143),t(142),t(145),t(144),t(129),t(127),t(134),t(131),t(137),t(139),t(126),t(133),t(123),t(138),t(121),t(136),t(135),t(128),t(132),t(120),t(122),t(125),t(124),t(140),t(130),t(213),t(219),t(214),t(215),t(216),t(217),t(218),t(198),t(149),t(220),t(255),t(256),t(244),t(245),t(250),t(253),t(254),t(248),t(251),t(249),t(252),t(246),t(247),t(199),t(200),t(201),t(202),t(203),t(206),t(204),t(205),t(207),t(208),t(209),t(210),t(212),t(211),t(257),t(283),t(286),t(285),t(287),t(288),t(284),t(289),t(290),t(268),t(271),t(267),t(265),t(266),t(269),t(270),t(260),t(282),t(291),t(259),t(261),t(263),t(262),t(264),t(273),t(274),t(276),t(275),t(278),t(277),t(279),t(280),t(281),t(258),t(272),t(294),t(293),t(292),n.exports=t(23)},{120:120,121:121,122:122,123:123,124:124,125:125,126:126,127:127,128:128,129:129,130:130,131:131,132:132,133:133,134:134,135:135,136:136,137:137,138:138,139:139,140:140,141:141,142:142,143:143,144:144,145:145,146:146,147:147,148:148,149:149,150:150,151:151,152:152,153:153,154:154,155:155,156:156,157:157,158:158,159:159,160:160,161:161,162:162,163:163,164:164,165:165,166:166,167:167,168:168,169:169,170:170,171:171,172:172,173:173,174:174,175:175,176:176,177:177,178:178,179:179,180:180,181:181,182:182,183:183,184:184,185:185,186:186,187:187,188:188,189:189,190:190,191:191,192:192,193:193,194:194,195:195,196:196,197:197,198:198,199:199,200:200,201:201,202:202,203:203,204:204,205:205,206:206,207:207,208:208,209:209,210:210,211:211,212:212,213:213,214:214,215:215,216:216,217:217,218:218,219:219,220:220,221:221,222:222,223:223,224:224,225:225,226:226,227:227,228:228,229:229,23:23,230:230,231:231,232:232,233:233,234:234,235:235,236:236,237:237,238:238,239:239,240:240,241:241,242:242,243:243,244:244,245:245,246:246,247:247,248:248,249:249,250:250,251:251,252:252,253:253,254:254,255:255,256:256,257:257,258:258,259:259,260:260,261:261,262:262,263:263,264:264,265:265,266:266,267:267,268:268,269:269,270:270,271:271,272:272,273:273,274:274,275:275,276:276,277:277,278:278,279:279,280:280,281:281,282:282,283:283,284:284,285:285,286:286,287:287,288:288,289:289,290:290,291:291,292:292,293:293,294:294}],296:[function(t,n,r){(function(t){!function(t){"use strict";function wrap(t,n,r,e){var i=n&&n.prototype instanceof Generator?n:Generator,o=Object.create(i.prototype),u=new Context(e||[]);return o._invoke=makeInvokeMethod(t,r,u),o}function tryCatch(t,n,r){try{return{type:"normal",arg:t.call(n,r)}}catch(t){return{type:"throw",arg:t}}}function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}function defineIteratorMethods(t){["next","throw","return"].forEach(function(n){t[n]=function(t){return this._invoke(n,t)}})}function AsyncIterator(t){function invoke(n,r,e,o){var u=tryCatch(t[n],t,r);if("throw"!==u.type){var c=u.arg,f=c.value;return f&&"object"==typeof f&&i.call(f,"__await")?Promise.resolve(f.__await).then(function(t){invoke("next",t,e,o)},function(t){invoke("throw",t,e,o)}):Promise.resolve(f).then(function(t){c.value=t,e(c)},o)}o(u.arg)}function enqueue(t,r){function callInvokeWithMethodAndArg(){return new Promise(function(n,e){invoke(t,r,n,e)})}return n=n?n.then(callInvokeWithMethodAndArg,callInvokeWithMethodAndArg):callInvokeWithMethodAndArg()}"object"==typeof process&&process.domain&&(invoke=process.domain.bind(invoke));var n;this._invoke=enqueue}function makeInvokeMethod(t,n,e){var i=s;return function invoke(o,u){if(i===h)throw new Error("Generator is already running");if(i===v){if("throw"===o)throw u;return doneResult()}for(;;){var c=e.delegate;if(c){if("return"===o||"throw"===o&&c.iterator[o]===r){e.delegate=null;var f=c.iterator.return;if(f){var a=tryCatch(f,c.iterator,u);if("throw"===a.type){o="throw",u=a.arg;continue}}if("return"===o)continue}var a=tryCatch(c.iterator[o],c.iterator,u);if("throw"===a.type){e.delegate=null,o="throw",u=a.arg;continue}o="next",u=r;var d=a.arg;if(!d.done)return i=l,d;e[c.resultName]=d.value,e.next=c.nextLoc,e.delegate=null}if("next"===o)e.sent=e._sent=u;else if("throw"===o){if(i===s)throw i=v,u;e.dispatchException(u)&&(o="next",u=r)}else"return"===o&&e.abrupt("return",u);i=h;var a=tryCatch(t,n,e);if("normal"===a.type){i=e.done?v:l;var d={value:a.arg,done:e.done};if(a.arg!==p)return d;e.delegate&&"next"===o&&(u=r)}else"throw"===a.type&&(i=v,o="throw",u=a.arg)}}}function pushTryEntry(t){var n={tryLoc:t[0]};1 in t&&(n.catchLoc=t[1]),2 in t&&(n.finallyLoc=t[2],n.afterLoc=t[3]),this.tryEntries.push(n)}function resetTryEntry(t){var n=t.completion||{};n.type="normal",delete n.arg,t.completion=n}function Context(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(pushTryEntry,this),this.reset(!0)}function values(t){if(t){var n=t[u];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var e=-1,o=function next(){for(;++e<t.length;)if(i.call(t,e))return next.value=t[e],next.done=!1,next;return next.value=r,next.done=!0,next};return o.next=o}}return{next:doneResult}}function doneResult(){return{value:r,done:!0}}var r,e=Object.prototype,i=e.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},u=o.iterator||"@@iterator",c=o.toStringTag||"@@toStringTag",f="object"==typeof n,a=t.regeneratorRuntime;if(a)return void(f&&(n.exports=a));a=t.regeneratorRuntime=f?n.exports:{},a.wrap=wrap;var s="suspendedStart",l="suspendedYield",h="executing",v="completed",p={},d={};d[u]=function(){return this};var y=Object.getPrototypeOf,g=y&&y(y(values([])));g&&g!==e&&i.call(g,u)&&(d=g);var b=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(d);GeneratorFunction.prototype=b.constructor=GeneratorFunctionPrototype,GeneratorFunctionPrototype.constructor=GeneratorFunction,GeneratorFunctionPrototype[c]=GeneratorFunction.displayName="GeneratorFunction",a.isGeneratorFunction=function(t){var n="function"==typeof t&&t.constructor;return!!n&&(n===GeneratorFunction||"GeneratorFunction"===(n.displayName||n.name))},a.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,GeneratorFunctionPrototype):(t.__proto__=GeneratorFunctionPrototype,c in t||(t[c]="GeneratorFunction")),t.prototype=Object.create(b),t},a.awrap=function(t){return{__await:t}},defineIteratorMethods(AsyncIterator.prototype),a.AsyncIterator=AsyncIterator,a.async=function(t,n,r,e){var i=new AsyncIterator(wrap(t,n,r,e));return a.isGeneratorFunction(n)?i:i.next().then(function(t){return t.done?t.value:i.next()})},defineIteratorMethods(b),b[c]="Generator",b.toString=function(){return"[object Generator]"},a.keys=function(t){var n=[];for(var r in t)n.push(r);return n.reverse(),function next(){for(;n.length;){var r=n.pop();if(r in t)return next.value=r,next.done=!1,next}return next.done=!0,next}},a.values=values,Context.prototype={constructor:Context,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.tryEntries.forEach(resetTryEntry),!t)for(var n in this)"t"===n.charAt(0)&&i.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0],n=t.completion;if("throw"===n.type)throw n.arg;return this.rval},dispatchException:function(t){function handle(r,e){return o.type="throw",o.arg=t,n.next=r,!!e}if(this.done)throw t;for(var n=this,r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r],o=e.completion;
if("root"===e.tryLoc)return handle("end");if(e.tryLoc<=this.prev){var u=i.call(e,"catchLoc"),c=i.call(e,"finallyLoc");if(u&&c){if(this.prev<e.catchLoc)return handle(e.catchLoc,!0);if(this.prev<e.finallyLoc)return handle(e.finallyLoc)}else if(u){if(this.prev<e.catchLoc)return handle(e.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<e.finallyLoc)return handle(e.finallyLoc)}}}},abrupt:function(t,n){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc<=this.prev&&i.call(e,"finallyLoc")&&this.prev<e.finallyLoc){var o=e;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=n&&n<=o.finallyLoc&&(o=null);var u=o?o.completion:{};return u.type=t,u.arg=n,o?this.next=o.finallyLoc:this.complete(u),p},complete:function(t,n){if("throw"===t.type)throw t.arg;"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=t.arg,this.next="end"):"normal"===t.type&&n&&(this.next=n)},finish:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),resetTryEntry(r),p}},catch:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc===t){var e=r.completion;if("throw"===e.type){var i=e.arg;resetTryEntry(r)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:values(t),resultName:n,nextLoc:r},p}}}("object"==typeof t?t:"object"==typeof window?window:"object"==typeof self?self:this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1]);

/**
 * jquery-circle-progress - jQuery Plugin to draw animated circular progress bars:
 * {@link http://kottenator.github.io/jquery-circle-progress/}
 *
 * @author Rostyslav Bryzgunov <kottenator@gmail.com>
 * @version 1.2.2
 * @licence MIT
 * @preserve
 */
!function(i){if("function"==typeof define&&define.amd)define(["jquery"],i);else if("object"==typeof module&&module.exports){var t=require("jquery");i(t),module.exports=t}else i(jQuery)}(function(i){function t(i){this.init(i)}t.prototype={value:0,size:100,startAngle:-Math.PI,thickness:"auto",fill:{gradient:["#3aeabb","#fdd250"]},emptyFill:"rgba(0, 0, 0, .1)",animation:{duration:1200,easing:"circleProgressEasing"},animationStartValue:0,reverse:!1,lineCap:"butt",insertMode:"prepend",constructor:t,el:null,canvas:null,ctx:null,radius:0,arcFill:null,lastFrameValue:0,init:function(t){i.extend(this,t),this.radius=this.size/2,this.initWidget(),this.initFill(),this.draw(),this.el.trigger("circle-inited")},initWidget:function(){this.canvas||(this.canvas=i("<canvas>")["prepend"==this.insertMode?"prependTo":"appendTo"](this.el)[0]);var t=this.canvas;if(t.width=this.size,t.height=this.size,this.ctx=t.getContext("2d"),window.devicePixelRatio>1){var e=window.devicePixelRatio;t.style.width=t.style.height=this.size+"px",t.width=t.height=this.size*e,this.ctx.scale(e,e)}},initFill:function(){function t(){var t=i("<canvas>")[0];t.width=e.size,t.height=e.size,t.getContext("2d").drawImage(g,0,0,r,r),e.arcFill=e.ctx.createPattern(t,"no-repeat"),e.drawFrame(e.lastFrameValue)}var e=this,a=this.fill,n=this.ctx,r=this.size;if(!a)throw Error("The fill is not specified!");if("string"==typeof a&&(a={color:a}),a.color&&(this.arcFill=a.color),a.gradient){var s=a.gradient;if(1==s.length)this.arcFill=s[0];else if(s.length>1){for(var l=a.gradientAngle||0,o=a.gradientDirection||[r/2*(1-Math.cos(l)),r/2*(1+Math.sin(l)),r/2*(1+Math.cos(l)),r/2*(1-Math.sin(l))],h=n.createLinearGradient.apply(n,o),c=0;c<s.length;c++){var d=s[c],u=c/(s.length-1);i.isArray(d)&&(u=d[1],d=d[0]),h.addColorStop(u,d)}this.arcFill=h}}if(a.image){var g;a.image instanceof Image?g=a.image:(g=new Image,g.src=a.image),g.complete?t():g.onload=t}},draw:function(){this.animation?this.drawAnimated(this.value):this.drawFrame(this.value)},drawFrame:function(i){this.lastFrameValue=i,this.ctx.clearRect(0,0,this.size,this.size),this.drawEmptyArc(i),this.drawArc(i)},drawArc:function(i){if(0!==i){var t=this.ctx,e=this.radius,a=this.getThickness(),n=this.startAngle;t.save(),t.beginPath(),this.reverse?t.arc(e,e,e-a/2,n-2*Math.PI*i,n):t.arc(e,e,e-a/2,n,n+2*Math.PI*i),t.lineWidth=a,t.lineCap=this.lineCap,t.strokeStyle=this.arcFill,t.stroke(),t.restore()}},drawEmptyArc:function(i){var t=this.ctx,e=this.radius,a=this.getThickness(),n=this.startAngle;i<1&&(t.save(),t.beginPath(),i<=0?t.arc(e,e,e-a/2,0,2*Math.PI):this.reverse?t.arc(e,e,e-a/2,n,n-2*Math.PI*i):t.arc(e,e,e-a/2,n+2*Math.PI*i,n),t.lineWidth=a,t.strokeStyle=this.emptyFill,t.stroke(),t.restore())},drawAnimated:function(t){var e=this,a=this.el,n=i(this.canvas);n.stop(!0,!1),a.trigger("circle-animation-start"),n.css({animationProgress:0}).animate({animationProgress:1},i.extend({},this.animation,{step:function(i){var n=e.animationStartValue*(1-i)+t*i;e.drawFrame(n),a.trigger("circle-animation-progress",[i,n])}})).promise().always(function(){a.trigger("circle-animation-end")})},getThickness:function(){return i.isNumeric(this.thickness)?this.thickness:this.size/14},getValue:function(){return this.value},setValue:function(i){this.animation&&(this.animationStartValue=this.lastFrameValue),this.value=i,this.draw()}},i.circleProgress={defaults:t.prototype},i.easing.circleProgressEasing=function(i){return i<.5?(i=2*i,.5*i*i*i):(i=2-2*i,1-.5*i*i*i)},i.fn.circleProgress=function(e,a){var n="circle-progress",r=this.data(n);if("widget"==e){if(!r)throw Error('Calling "widget" method on not initialized instance is forbidden');return r.canvas}if("value"==e){if(!r)throw Error('Calling "value" method on not initialized instance is forbidden');if("undefined"==typeof a)return r.getValue();var s=arguments[1];return this.each(function(){i(this).data(n).setValue(s)})}return this.each(function(){var a=i(this),r=a.data(n),s=i.isPlainObject(e)?e:{};if(r)r.init(s);else{var l=i.extend({},a.data());"string"==typeof l.fill&&(l.fill=JSON.parse(l.fill)),"string"==typeof l.animation&&(l.animation=JSON.parse(l.animation)),s=i.extend(l,s),s.el=a,r=new t(s),a.data(n,r)}})}});

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// https://github.com/sroucheray/event-class
var multiChannelSep = /(?:,|\s)+/g;
var channelSep = /:+/g;
var channelsSymbol = Symbol('channels');

var EventClass = function () {
    function EventClass() {
        _classCallCheck(this, EventClass);

        this[channelsSymbol] = {};
    }

    _createClass(EventClass, [{
        key: '_getChannels',
        value: function _getChannels(channelString) {
            return channelString.trim().split(multiChannelSep);
        }
    }, {
        key: '_getNameSpaces',
        value: function _getNameSpaces(channel) {
            var namespaces = [];
            var splittedChannels = channel.trim().split(channelSep);

            for (var i = splittedChannels.length; i >= 1; i--) {
                namespaces.push(splittedChannels.slice(0, i).join(':'));
            }

            return namespaces;
        }
    }, {
        key: 'trigger',
        value: function trigger(event, data) {
            var channels = this._getChannels(event);

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = channels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var channel = _step.value;

                    var namespaces = this._getNameSpaces(channel);
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = namespaces[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var namespace = _step2.value;

                            if (!this[channelsSymbol][namespace]) {
                                continue;
                            }

                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = this[channelsSymbol][namespace][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var callback = _step3.value;

                                    callback.call(this, data);
                                }
                            } catch (err) {
                                _didIteratorError3 = true;
                                _iteratorError3 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                        _iterator3.return();
                                    }
                                } finally {
                                    if (_didIteratorError3) {
                                        throw _iteratorError3;
                                    }
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'on',
        value: function on(event, callback) {
            var channels = this._getChannels(event);

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = channels[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var channel = _step4.value;

                    if (!this[channelsSymbol][channel]) {
                        this[channelsSymbol][channel] = [];
                    }

                    this[channelsSymbol][channel].push(callback);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    }, {
        key: 'off',
        value: function off(event, callback) {
            var channels = this._getChannels(event);

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = channels[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var channel = _step5.value;

                    if (!this[channelsSymbol][channel]) {
                        return;
                    }

                    var index = this[channelsSymbol][channel].indexOf(callback);

                    if (index > -1) {
                        this[channelsSymbol][channel].splice(index, 1);
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        }
    }, {
        key: 'once',
        value: function once(event, callback) {
            function offCallback() {
                this.off(event, callback);
                this.off(event, offCallback);
            }

            this.on(event, callback);
            this.on(event, offCallback);
        }
    }]);

    return EventClass;
}();

/**
 * Book classes representing the entire comic. Loads
 * all of the pages and handles what happens when they
 * want to navigate between pages.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */


var Book = function (_EventClass) {
    _inherits(Book, _EventClass);

    /**
     * Creates a new instance of the Book class. Sets all the
     * initial varaibles and listens for events on the application.
     *
     * @constructs Book
     * @param  {Panelz}  app    Panelz app instance
     * @param  {Object} config Configuration options
     */
    function Book(app, config) {
        _classCallCheck(this, Book);

        /**
         * Configuration options
         * @type {Object}
         */
        var _this = _possibleConstructorReturn(this, (Book.__proto__ || Object.getPrototypeOf(Book)).call(this));

        _this.config = config;
        /**
         * Panelz app instance
         * @type {Panelz}
         */
        _this.app = app;
        /**
         * Title of the comic
         * @type {String}
         */
        _this.title = config.title || 'Unknown title';
        /**
         * Size of the comic.
         * @type {Number}
         */
        _this.size = config.size || 0;
        /**
         * How many pages have been loaded
         * @type {Number}
         */
        _this.loaded = 0;
        /**
         * How much of the book has been loaded in bytes
         * @type {Number}
         */
        _this.loadedSize = 0;
        /**
         * Whether or not the book has been fully loaded
         * @type {Boolean}
         */
        _this.isLoaded = false;
        /**
         * Whether or not the user should be allowed to
         * pan all the pages or not.
         * @type {Boolean}
         */
        _this.panFrozen = false;
        /**
         * How much the user has zoomed in on the book
         * @type {Number}
         */
        _this.zoomPanAmount = 0;

        _this.setEventListeners();
        _this.pages = [];
        config.pages.forEach(function (pageConfig, index) {
            pageConfig.panels = pageConfig.panels || [];
            var page = new Page(this.app, this, pageConfig, index);
            page.on('load', this.onPageLoaded.bind(this));
            this.pages.push(page);
        }.bind(_this));
        return _this;
    }

    /**
     * Getter for the size of the comic
     *
     * @return {Number}
     */


    _createClass(Book, [{
        key: 'getReadableSize',


        /**
         * Gets a readable size of the comic, as it is in bytes.
         *
         * @param  {Number} size Size in bytes
         * @return {String}
         */
        value: function getReadableSize(size) {
            var bytes = typeof size !== 'undefined' ? size : this.size;
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes == 0) return '0 Byte';
            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
        }
    }, {
        key: 'setEventListeners',


        /**
         * Application event listeners
         */
        value: function setEventListeners() {
            this.on('pageSet', this.messagePageNum.bind(this));
            this.on('load:book', this.messagePageNum.bind(this));
            this.app.on('user:skipToPage', this.skipToPage.bind(this));
            this.app.on('user:panend', this.onPanEnd.bind(this));
            this.app.on('user:pageForward', this.pageForward.bind(this));
            this.app.on('user:pageBackward', this.pageBackward.bind(this));
            this.app.on('change:mode', this.onModeChange.bind(this));
        }

        /**
         * When a page is loaded, update the total number of pages
         * loaded. If that's all of them, trigger the book loaded method.
         *
         * @param {Page} page Page instance
         */

    }, {
        key: 'onPageLoaded',
        value: function onPageLoaded(page) {
            this.loaded += 1;
            this.loadedSize += parseInt(page.size);
            if (this.loaded === this.pages.length) {
                this.onBookLoaded();
            }
        }

        /**
         * Book has loaded. Set the current page and determine whether
         * or not to zoom in on a panel. Otherwise set all the pages
         * left positions to be offset to each other.
         *
         * Waits 1200ms to trigger the loaded event due to the progress
         * timer animation taking 1200ms to update.
         *
         * @fires Book#load:book
         */

    }, {
        key: 'onBookLoaded',
        value: function onBookLoaded() {
            var lastRead = this.app.settings.getBookSetting('page');
            var pageToSet = lastRead ? lastRead : 0;
            this.setCurrentPage(this.pages[pageToSet]);

            // Zoom to panel on start
            if (this.app.mode === PANEL_ZOOM_MODE && this.currentPage.hasPanels()) {
                var panel = false;
                if (this.app.settings.getBookSetting('panel') !== false) {
                    this.currentPage.zoomToPanel(this.currentPage.panels[this.app.settings.getBookSetting('panel')]);
                } else if (!this.currentPage.SHOW_PAGE_ON_ENTER) {
                    this.currentPage.zoomToPanel(this.currentPage.getFirstPanel());
                } else {
                    this.currentPage.nextPanel = this.currentPage.getFirstPanel();
                }
            }

            this.pages.forEach(function (page, index) {
                page.setLeftPosition(pageToSet);
                if (this.app.mode === PAGE_MODE || this.currentPage.index === index) {
                    page.$container.animate({
                        opacity: 1
                    }, { duration: 650, easing: 'easeOutSine' });
                }
            }.bind(this));
            this.buildPageIndex();
            setTimeout(function () {
                this.isLoaded = true;
                /**
                 * Load book event
                 *
                 * @event Book#load:book:<setting>
                 * @type {Object}
                 * @property {Book} Book class instance
                 */
                this.trigger('load:book', this);
                $('.loading').addClass('loading--hidden');
            }.bind(this), 1200);
        }

        /**
         * When there is a mode change, setup the book for that mode.
         *
         * @param  {String} mode Mode of app
         */

    }, {
        key: 'onModeChange',
        value: function onModeChange(mode) {
            if (mode === PAGE_MODE) {
                this.setForPageMode();
            } else {
                this.setForPanelZoomMode();
            }
        }

        /**
         * Pan has ended. Check to see if a new page needs to be set
         * as the current page and snap (animate) all the pages to
         * their respective positions.
         *
         * @param  {Object} e Event object
         * @return {[type]}    [description]
         */

    }, {
        key: 'onPanEnd',
        value: function onPanEnd(e) {
            if (this.panFrozen) {
                return;
            }
            var currentPage = this.currentPage;
            this.pages.forEach(function (page) {
                if (page.shouldBeSetAsCurrent(e)) {
                    this.setCurrentPage(page);
                }
            }.bind(this));
            this.snapPagesToCurrent();
            if (this.currentPage === currentPage && currentPage.isLast) {
                this.onEndReached();
            }
        }

        /**
         * The end of the comic has been reached. Message the user.
         */

    }, {
        key: 'onEndReached',
        value: function onEndReached() {
            this.app.message('End of comic');
        }

        /**
         * If the settings allow, message the user the current page number.
         */

    }, {
        key: 'messagePageNum',
        value: function messagePageNum() {
            if (this.isLoaded && this.app.settings.get('showPageChangeMessage')) {
                this.app.message('Page ' + this.currentPage.num);
            }
        }

        /**
         * Builds the page index so the user can jump to any page
         * wherever they are in the comic.
         */

    }, {
        key: 'buildPageIndex',
        value: function buildPageIndex() {
            this.pages.forEach(function (page) {
                var $page = $('.page-list__page--template').clone().removeClass('page-list__page--template');
                $page.attr('data-skip-to-page', page.index + 1);
                $page.find('.page-list__image').attr('src', page.config.url);
                $page.find('.page-list__number').text(page.index + 1);
                $('.page-list').append($page);
            }.bind(this));
        }

        /**
         * Sets the current page of the comic.
         *
         * @param {Page} page Page class instance
         * @fires Book#pageSet
         */

    }, {
        key: 'setCurrentPage',
        value: function setCurrentPage(page) {
            if (this.currentPage && this.currentPage.panels.length) {
                this.currentPage.resetZoom();
                this.currentPage.currentPanel = false;
            }
            if (this.app.mode === PANEL_ZOOM_MODE && this.currentPage) {
                this.currentPage.$container.animate({
                    opacity: 0
                }, { duration: 550, easing: 'easeOutSine' });
            }
            this.currentPage = page;
            if (this.app.mode === PANEL_ZOOM_MODE) {
                this.currentPage.$container.css('left', 0).animate({
                    opacity: 1
                }, { duration: 550, easing: 'easeOutSine' });
            }

            /**
             * Page Set event
             *
             * @event Book#pageSet
             * @type {Object}
             * @property {Page} Page instance of current page
             */
            this.trigger('pageSet', page);

            this.app.settings.rememberBookSetting('page', page.index);
        }

        /**
         * Sets up all the pages for Page Mode. All of the
         * pages need to be side by side so the user can
         * pan left and right through them.
         */

    }, {
        key: 'setForPageMode',
        value: function setForPageMode() {
            console.log('Set For Page mode');
            var currentIndex = this.currentPage.index;
            this.pages.forEach(function (page) {
                page.setLeftPosition(currentIndex);
                page.$container.css('opacity', 1);
            }.bind(this));
            this.currentPage.zoomOut();
        }

        /**
         * Sets up all the pages for Panel Zoom Mode. All of
         * the pages can stack on top of each other, with the
         * "active" page on top. If this page has panels,
         * zoom in on one of them, either the first one or if
         * they were double tapping, the panel they double
         * tapped on (if settings allow it)
         */

    }, {
        key: 'setForPanelZoomMode',
        value: function setForPanelZoomMode() {
            console.log('Set for Panel Zoom mode');
            this.pages.forEach(function (page) {
                page.resetScale();
                page.$container.css('left', 0).css('opacity', 0);
            }.bind(this));
            this.currentPage.$container.css('opacity', 1);
            if (this.currentPage.panels.length) {
                var lastUserEvent = this.app.getLastUserEvent();
                var panel = lastUserEvent && lastUserEvent.type === "doubletap" && this.app.settings.get('detectPanelOnDoubleTap') ? this.currentPage.findPanelWithPos(lastUserEvent.center.x, lastUserEvent.center.y) : this.currentPage.getFirstPanel();
                this.currentPage.zoomToPanel(panel);
            }
        }

        /**
         * Gets the next page instance in the sequence.
         *
         * @return {Array}
         */

    }, {
        key: 'getNextPage',
        value: function getNextPage() {
            return this.pages[this.currentPage.index + 1];
        }

        /**
         * Gets the previous page instance in the sequence.
         *
         * @return {Array}
         */

    }, {
        key: 'getPreviousPage',
        value: function getPreviousPage() {
            return this.pages[this.currentPage.index - 1];
        }

        /**
         * Snaps all the pages relative to the current page.
         */

    }, {
        key: 'snapPagesToCurrent',
        value: function snapPagesToCurrent() {
            var amount = -this.currentPage.left;
            this.pages.forEach(function (page) {
                page.snapTo(amount);
            });
        }

        /**
         * Pages the user forward in the book. If they are in Panel
         * Zoom Mode, it will move them forward by panels. If they
         * are in page mode, it will move them forward an entire page.
         *
         * @return {Boolean}
         */

    }, {
        key: 'pageForward',
        value: function pageForward() {
            if (this.app.mode === PANEL_ZOOM_MODE && this.currentPage.panels.length) {
                // Zoom in on the next panel and bail from method
                if (this.currentPage.hasNextPanel()) {
                    console.log('Zoom to next panel');
                    return this.currentPage.zoomToPanel(this.currentPage.getNextPanel());
                }
                // Currently zoomed on a panel, but there are no next panels, we need to zoom out
                // and bail from method (if they don't want to show page on exit)
                if (this.currentPage.currentPanel !== false && !this.currentPage.hasNextPanel()) {
                    console.log('Zoom out');
                    this.currentPage.previousPanel = this.currentPage.getLastPanel();
                    if (this.currentPage.isLast && !this.currentPage.hasNextPanel()) {
                        this.onEndReached();
                    }
                    if (this.app.settings.get('showPageOnExit')) {
                        this.currentPage.zoomOut();
                        return true;
                    }
                }
            }

            // No panels to zoom on, we're zoomed out, but this is the last page
            if (this.currentPage.isLast) {
                return this.onEndReached() && false;
            }

            // No panels to zoom on, we're zoomed out, so move on to the next page
            this.setCurrentPage(this.getNextPage());
            if (this.app.mode === PAGE_MODE) {
                this.snapPagesToCurrent();
            }
            return this.currentPage.onPageEnterForward();
        }

        /**
         * Pages the user backward in the book. If they are in Panel
         * Zoom Mode, it will move them backward by panels. If they
         * are in page mode, it will move them backward an entire page.
         *
         * @return {Boolean}
         */

    }, {
        key: 'pageBackward',
        value: function pageBackward() {
            if (this.app.mode === PANEL_ZOOM_MODE && this.currentPage.panels.length) {
                // Zoom in on the next panel and bail from method
                if (this.currentPage.hasPreviousPanel()) {
                    console.log('Zoom to last panel');
                    return this.currentPage.zoomToPanel(this.currentPage.getPreviousPanel());
                }
                // Currently zoomed on a panel, but there are no next panels, we need to zoom out
                // and bail from the method (if they don't want to show page on enter)
                if (this.currentPage.currentPanel !== false && !this.currentPage.hasPreviousPanel()) {
                    console.log('Zoom out');
                    this.currentPage.nextPanel = this.currentPage.getFirstPanel();
                    if (this.app.settings.get('showPageOnEnter')) {
                        this.currentPage.zoomOut();
                        return true;
                    }
                }
            }

            // No panels to zoom on, we're zoomed out, but this is the last page
            if (this.currentPage.isFirst) {
                return false;
            }

            // No panels to zoom on, we're zoomed out, so move on to the next page
            this.setCurrentPage(this.getPreviousPage());
            if (this.app.mode === PAGE_MODE) {
                this.snapPagesToCurrent();
            }
            return this.currentPage.onPageEnterBackward();
        }

        /**
         * Skips to specific page in the sequence. In order to do so,
         * we need to to take care of a few things. First, make sure
         * the current page is zoomed out (may or may not be), set
         * the current page to the requested page, set all the pages
         * left positions to account for moving to the new page,
         * and then set the page for whatever mode we're in.
         *
         * @param  {Number} pageNum Page number to skip to
         */

    }, {
        key: 'skipToPage',
        value: function skipToPage(pageNum) {
            var page = this.pages[pageNum - 1];
            this.currentPage.zoomOut();
            this.setCurrentPage(page);
            this.pages.forEach(function (page) {
                page.setLeftPosition(pageNum - 1);
                page.$container.css('opacity', 1);
            }.bind(this));
            if (this.app.mode === PAGE_MODE) {
                this.setForPageMode();
            } else {
                this.setForPanelZoomMode();
            }
        }
    }, {
        key: 'size',
        get: function get() {
            return this._size;
        }

        /**
         * Setter for the size of the comic. If the size is
         * zero or a non number, go through all the pages to
         * determine the total comic size.
         *
         * Also initializes the progress loader.
         *
         * @param  {Number} size Size of the comic
         */
        ,
        set: function set(size) {
            if (!size) {
                size = 0;
                this.config.pages.forEach(function (pageConfig) {
                    size += parseInt(pageConfig.size);
                });
            }
            this._size = size;
            $('.loading__progress').circleProgress({
                value: 0.2,
                size: 80,
                startAngle: Math.PI * 1.5,
                fill: '#55a1e6'
            });
            $('[data-comic-size]').text(this.getReadableSize());
        }

        /**
         * Gets the currently loaded size of the comic.
         *
         * @return {Number}
         */

    }, {
        key: 'loadedSize',
        get: function get() {
            return this._loadedSize;
        }

        /**
         * Update the total loaded size. Updates the progress
         * loader element for the user.
         *
         * @param  {Number} size Size to add to total
         */
        ,
        set: function set(size) {
            this._loadedSize = size;
            var percent = this.loadedSize / this.size;
            var degrees = 360 * percent;

            $('.loading__progress').circleProgress('value', percent);
            $('[data-loaded-size]').text(this.getReadableSize(this.loadedSize));
        }
    }]);

    return Book;
}(EventClass);

/**
 * The Menu class handles the center tap popup menu
 * and adds context to a few of the buttons.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */


var Menu = function (_EventClass2) {
    _inherits(Menu, _EventClass2);

    /**
     * Creates a new Menu instance by establishing the
     * main element as a jQuery object and listening
     * for events on the application instance.
     *
     * @constructs Menu
     * @param {Panelz}   app      Panelz app instance
     * @param {Book}     Book     Book instance
     * @param {Tutorial} Tutorial Tutorial instance
     */
    function Menu(app, Book, Tutorial) {
        _classCallCheck(this, Menu);

        var _this2 = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));

        _this2.app = app;
        _this2.book = Book;
        _this2.tutorial = Tutorial;
        _this2.$menu = $('.viewport__menu');

        _this2.setEventListeners();
        _this2.onModeChange(_this2.app.mode);
        return _this2;
    }

    /**
     * Listens for user touch events or application mode changes
     */


    _createClass(Menu, [{
        key: 'setEventListeners',
        value: function setEventListeners() {
            $('body').on('touchend click', '.menu__option--mode', this.onModeToggleClick.bind(this));
            $('body').on('touchend', this.onTouchEnd.bind(this));
            this.app.on('change:mode', this.onModeChange.bind(this));
            this.app.on('show:menu', this.show.bind(this));
            this.book.on('load:book', this.setTitleBar.bind(this));
            this.book.on('pageSet', this.onPageSet.bind(this));
            this.tutorial.on('done', this.onTutorialDone.bind(this));
        }

        /**
         * Sets the menu title bar with book data, like the title, current
         * page number, and total number of pages.
         */

    }, {
        key: 'setTitleBar',
        value: function setTitleBar() {
            $('[data-book-title]').text(this.book.title);
            $('[data-total-pages]').text(this.book.pages.length);
            $('[data-page-num]').text(this.book.currentPage.num);
        }

        /**
         * Adds an activation class to a given menu option
         *
         * @param  {String} option Menu option to activate
         */

    }, {
        key: 'activateOption',
        value: function activateOption(option) {
            this.$menu.find('.menu__option--' + option).addClass('menu__option--active');
        }

        /**
         * Removes an activation class to a given menu option
         *
         * @param  {String} option Menu option to deactivate
         */

    }, {
        key: 'deactivateOption',
        value: function deactivateOption(option) {
            this.$menu.find('.menu__option--' + option).removeClass('menu__option--active');
        }

        /**
         * Shows the menu by adding an active CSS class. Sometimes
         * multiple events get fired in one interaction, so a --was-shown
         * modifier class has been added in another specific use case. If
         * that class is not present, then we can show the menu.
         */

    }, {
        key: 'show',
        value: function show() {
            if (!this.$menu.hasClass('viewport__menu--was-shown')) {
                this.$menu.addClass('viewport__menu--active');
            }
        }

        /**
         * Hides the menu by removing the active CSS class.
         * @return {[type]} [description]
         */

    }, {
        key: 'hide',
        value: function hide() {
            this.$menu.removeClass('viewport__menu--active');
        }

        /**
         * The user has clicked on the mode toggle button, tell the
         * application to switch modes.
         *
         * @param  {Object} e Tap event object
         */

    }, {
        key: 'onModeToggleClick',
        value: function onModeToggleClick(e) {
            e.preventDefault();
            this.app.switchModes();
        }

        /**
         * The application's mode has been changed. Update the
         * wording of our mode toggle button to maintain context.
         *
         * @param  {String} mode Mode that was switched to
         */

    }, {
        key: 'onModeChange',
        value: function onModeChange(mode) {
            var readable = this.app.getReadableModeText(mode, true);
            if (mode === PAGE_MODE) {
                this.$menu.find('.menu__option--mode').html(readable);
            } else {
                this.$menu.find('.menu__option--mode').html(readable);
            }
        }

        /**
         * When a new page has been set, set the current page text
         * to reflect the current page number.
         *
         * @param {Page} page Page instance of the new current page
         */

    }, {
        key: 'onPageSet',
        value: function onPageSet(page) {
            $('[data-page-num]').text(page.num);
        }

        /**
         * When the tutorial is finished, show the menu and message the
         * user about being able to find the tutorial in the settings menu.
         */

    }, {
        key: 'onTutorialDone',
        value: function onTutorialDone() {
            this.show();
            this.app.message('The tutorial is always available in the settings menu at the bottom right.', 5000);
        }

        /**
         * Touch events and click events both get fired sometimes. To prevent
         * hiding the menu when we just showed it, add a special class to
         * indicate that it was just shown.
         *
         * @param {Object} e Event object
         */

    }, {
        key: 'onTouchEnd',
        value: function onTouchEnd(e) {
            this.$menu.removeClass('viewport__menu--was-shown');
            if (this.$menu.hasClass('viewport__menu--active')) {
                setTimeout(function () {
                    this.$menu.removeClass('viewport__menu--active').addClass('viewport__menu--was-shown');
                }.bind(this), 500);
            }
        }
    }]);

    return Menu;
}(EventClass);

;

/**
 * Directional number used by the HammerJS
 * library to indicate a left pan.
 *
 * @constant
 * @type {Number}
 * @default
 */
var PAN_LEFT_DIR = 2;

/**
 * Directional number used by the HammerJS
 * library to indicate a right pan.
 *
 * @constant
 * @type {Number}
 * @default
 */
var PAN_RIGHT_DIR = 4;

/**
 * Page class representing a comic page. Represents the
 * actual image on the screen, as well as all the calculations
 * for panning/zooming and determining which panel should
 * be zoomed on/zooming on panels.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */

var Page = function (_EventClass3) {
    _inherits(Page, _EventClass3);

    /**
     * Creates a new instance of the Page class. Sets all
     * the initial variables needed by this class and
     * a few event listeners for setting changes. This
     * constructor also initializes all the panels, if any,
     * as new classes and stores them in a local array property.
     *
     * @constructs Page
     * @param  {Panelz} app    Panelz app instance
     * @param  {Book}   Book   Book instance
     * @param  {Object} config Configuration options
     * @param  {Number} index  Which index within the book this page is
     */
    function Page(app, Book, config, index) {
        _classCallCheck(this, Page);

        /**
         * Keep a reference to the app instance as
         * a local property
         * @type {Panelz}
         */
        var _this3 = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this));

        _this3.app = app;
        /**
         * Book class reference as local property
         * @type {Book}
         */
        _this3.book = Book;
        /**
         * The configuration options for this page
         * @type {Object}
         */
        _this3.config = config;
        /**
         * Which index within the book this page is
         * @type {Number}
         */
        _this3.index = index;
        /**
         * The Page number
         * @type {Number}
         */
        _this3.num = index + 1;
        /**
         * If the index is 0, this is the first page
         * @type {Boolean}
         */
        _this3.isFirst = index === 0;
        /**
         * If the index is the very last index, using
         * the book configuration object to count, this
         * would be the last page
         * @type {Boolean}
         */
        _this3.isLast = index === _this3.book.config.pages.length - 1;
        /**
         * Size of the page image element, in bytes, used for
         * calculating total book size and wait time for loading
         * @type {Number}
         */
        _this3.size = config.size || 0;
        /**
         * Whether or not this is the current page
         * @type {Boolean}
         */
        _this3.isCurrentPage = false;
        /**
         * Current scale of the page image element
         * @type {Number}
         */
        _this3.scale = 1;
        /**
         * Number that keeps track of the last scale size
         * between starting/stopping events like pinching
         * @type {Number}
         */
        _this3.lastScale = 1;
        /**
         * Whether or not the left edge is visible and
         * the page element should be panned normally
         * @type {Boolean}
         */
        _this3.leftEdge = true;
        /**
         * Whether or not the right edge is visible and
         * the page element should be panned normally
         * @type {Boolean}
         */
        _this3.rightEdge = true;
        /**
         * Holds all of the panels objects for this page.
         * @type {Array}
         */
        _this3.panels = [];
        /**
         * Holds the current panel being zoomed on, if any
         * @type {Boolean}
         */
        _this3.currentPanel = false;
        /**
         * Which panel comes before the current one, if any
         * @type {Boolean}
         */
        _this3.previousPanel = false;
        /**
         * Which panel comes after the current one, if any
         * @type {Boolean}
         */
        _this3.nextPanel = false;
        /**
         * Holds the jQuery element containing the page container
         * @type {Object}
         */
        _this3.$container = false;
        /**
         * Holds the jQuery image element
         * @type {Object}
         */
        _this3.$element = false;
        /**
         * Original/actual width of page image
         * @type {Number}
         */
        _this3.originalWidth = 0;
        /**
         * Original/actual height of page image
         * @type {Number}
         */
        _this3.originalHeight = 0;
        /**
         * Holds how far left an image sits within
         * a container in order to be centered
         * @type {Number}
         */
        _this3.originalLeft = 0;
        /**
         * When panning, we adjust the margin. Holds the
         * original left position at the start of a pan
         * @type {Number}
         */
        _this3.elementOriginalLeft = 0;
        /**
         * When panning, we adjust the margin. Holds the
         * original top position at the start of a pan
         * @type {Number}
         */
        _this3.elementOriginalTop = 0;
        /**
         * Object representing the origin of a punch event.
         * Should have an x/y property
         * @type {Object}
         */
        _this3.pinchOrigin = {};
        /**
         * Speed in ms at which the panel transition animation
         * should occur. Treated like a constant although it
         * can be changed through the settings by the user.
         * @type {Number}
         */
        _this3.PANEL_ANIMATION_SPEED = _this3.app.settings.get('panelTransitions');
        /**
         * Whether or not to show the entire page when it
         * becomes current. Applies for Panel Zoom Mode only.
         * @type {Boolean}
         */
        _this3.SHOW_PAGE_ON_ENTER = _this3.app.settings.get('showPageOnEnter');
        /**
         * Whether or not to show the entire page before moving
         * to a new page. Applies for Panel Zoom Mode only.
         * @type {Boolean}
         */
        _this3.SHOW_PAGE_ON_EXIT = _this3.app.settings.get('showPageOnExit');
        /**
         * How many pixels a page needs to be panned before
         * snapping fully to the next or previous page.
         * @type {Number}
         */
        _this3.TURN_THRESHHOLD = 30;
        /**
         * Maximum scale value when pinching
         * @type {Number}
         */
        _this3.MAX_SCALE = 3;

        _this3.setEventListeners();

        _this3.panels = [];
        config.panels.forEach(function (panel, index) {
            this.panels.push(new Panel(this, panel, index));
        }.bind(_this3));
        return _this3;
    }

    /**
     * When setting the configation property, set the
     * internal property. Also kick off loading the
     * image from the config url
     *
     * @param  {Object} config Configuration options
     */


    _createClass(Page, [{
        key: 'setEventListeners',


        /**
         * Sets all event listeners for internal classes
         */
        value: function setEventListeners() {
            this.on('load:page', this.centerInViewPort.bind(this));
            this.app.settings.on('change:panelTransitions', this.onSettingsChange.bind(this));
            this.app.settings.on('change:showPageOnEnter', this.onSettingsChange.bind(this));
            this.app.settings.on('change:showPageOnExit', this.onSettingsChange.bind(this));
            this.app.on("user:panstart", this.onPanStart.bind(this));
            this.app.on("user:pan", this.onPan.bind(this));
            this.app.on("user:panleft", this.onPanLeft.bind(this));
            this.app.on("user:panright", this.onPanRight.bind(this));
            this.app.on('user:pinchstart', this.onPinchStart.bind(this));
            this.app.on("user:pinch", this.onPinch.bind(this));
            this.app.on("user:pinchend", this.onPinchEnd.bind(this));
            this.app.on('resize', this.setPosition.bind(this));
            this.book.on('pageSet', this.setCurrentPageStatus.bind(this));
        }

        /**
         * When certain settings are changed, update our local
         * property references to those settings
         *
         * @param  {Object} data Event data for the settings change
         */

    }, {
        key: 'onSettingsChange',
        value: function onSettingsChange(data) {
            switch (data.setting) {
                case 'panelTransitions':
                    this.PANEL_ANIMATION_SPEED = data.value;
                    break;
                case 'showPageOnEnter':
                    this.SHOW_PAGE_ON_ENTER = data.value;
                    break;
                case 'showPageOnExit':
                    this.SHOW_PAGE_ON_EXIT = data.value;
                    break;
            }
        }

        /**
         * Checks to see if a page class instance is this
         * page instance. If it is, this should be the
         * current page.
         *
         * @param {Page} page Page instance
         */

    }, {
        key: 'setCurrentPageStatus',
        value: function setCurrentPageStatus(page) {
            this.isCurrentPage = page.index === this.index;
        }

        /**
         * Loads the page element into an img tag and when it
         * has been loaded, initiates a page load method.
         */

    }, {
        key: 'loadPageElement',
        value: function loadPageElement() {
            $("<img />").attr("src", this.config.url).on('load', this.onPageLoaded.bind(this));
        }

        /**
         * When the page has been loaded, set a container element
         * and a property holding the image itself. The page needs
         * to be centered in the viewport and its original dimensions
         * pulled in so we can perform sizing calculations.
         *
         * @param  {Object} e Event object
         * @fires Page#load:page
         */

    }, {
        key: 'onPageLoaded',
        value: function onPageLoaded(e) {
            this.$container = this.app.addPageMarkupToViewPort($('<div />').addClass('book__page page'));
            this.$element = $(e.currentTarget).addClass('page__image').appendTo(this.$container);
            this.originalWidth = this.$element.width();
            this.originalHeight = this.$element.height();
            /**
             * Load page event
             *
             * @event Page#load:page
             * @type {Object}
             * @property {Page} Current page instance
             */
            this.trigger('load:page', this);
        }

        /**
         * When a user initiates a pan event, we need to set the original
         * positions and zoom amount and use that number when calculating
         * how far the pan delta needs to be offset by.
         *
         * @param  {Object} e Event object
         */

    }, {
        key: 'onPanStart',
        value: function onPanStart(e) {
            this.elementOriginalLeft = parseInt(this.$element.css("margin-left"), 10);
            this.elementOriginalTop = parseInt(this.$element.css("margin-top"), 10);
            this.originalLeft = parseInt(this.$container.css("left"), 10);
            this.book.zoomPanAmount = 0;
        }

        /**
         * When the user pans, they are allowed to pan up or down
         * if they are zoomed in on a panel (via pinching). If
         * they are not zoomed in or the pan direction is not left
         * or right, then return true to event further pan events
         * from registering and screwing things up.
         *
         * @param  {Object} e Event object
         * @return {boolean}
         */

    }, {
        key: 'onPan',
        value: function onPan(e) {
            // If the page is zoomed, allow them to pan up. Pan left and
            // right is handled by specific event handlers below.
            if (this.isZoomed()) {
                var deltaY = this.elementOriginalTop + e.deltaY;
                var restrictedPosition = this.restrictPosition(0, deltaY);
                this.$element.css({
                    "margin-top": restrictedPosition.top
                });
            } else if (e.offsetDirection !== PAN_LEFT_DIR && e.offsetDirection !== PAN_RIGHT_DIR) {
                return true;
            }
        }

        /**
         * The user wants to pan left. There are several use cases that
         * need to be accounted for. If the user is zoomed in on the
         * current page image/element, than only the element itself
         * should be allowed to be panned. If the right edge has been
         * reached (visible), than the entire page (and all the other
         * pages), should also pan together. This is accomplished by
         * "pan freezing" the entire book when an edge is not visible
         * and "un pan freezing" the entire book when it is.
         *
         * panleft = rightedge = forward
         *
         * @param  {Object} e Event object
         */

    }, {
        key: 'onPanLeft',
        value: function onPanLeft(e) {
            if (this.isZoomed()) {
                var maxLeft = (this.getWidth() * this.scale - this.getFullWidth()) / 2;
                var minLeft = maxLeft * -1;
                if (this.getWidth() * this.scale < this.getFullWidth()) {
                    maxLeft = 0;
                }
                var deltaX = this.elementOriginalLeft + e.deltaX;
                var left = Math.min(maxLeft, Math.max(deltaX, minLeft));

                var rightEdgeBefore = this.rightEdge;
                this.rightEdge = left <= minLeft ? true : false;
                if (rightEdgeBefore !== this.rightEdge && this.rightEdge) {
                    this.book.panFrozen = false;
                    this.book.zoomPanAmount = e.deltaX;
                }

                if (this.book.panFrozen) {
                    this.$element.css({
                        "margin-left": left
                    });
                }
            } else if (this.book.panFrozen) {
                // Helps make sure the other pages are set correctly (math isn't quite right)
                this.setLeftPosition(this.book.currentPage.index);
            }

            if (!this.book.panFrozen) {
                this.left = this.originalLeft + e.deltaX - this.book.zoomPanAmount;
                this.$container.css({
                    "left": this.left
                });

                if (this.isCurrentPage && this.scale !== 1 && this.left < 0 && !this.rightEdge) {
                    this.book.panFrozen = true;
                }
            }
        }
        /**
         * The user wants to pan right. There are several use cases that
         * need to be accounted for. If the user is zoomed in on the
         * current page image/element, than only the element itself
         * should be allowed to be panned. If the left edge has been
         * reached (visible), than the entire page (and all the other
         * pages), should also pan together. This is accomplished by
         * "pan freezing" the entire book when an edge is not visible
         * and "un pan freezing" the entire book when it is.
         *
         * panright = leftedge = backward
         *
         * @param  {Object} e Event object
         */

    }, {
        key: 'onPanRight',
        value: function onPanRight(e) {
            if (this.isZoomed()) {
                var maxLeft = (this.getWidth() * this.scale - this.getFullWidth()) / 2;
                var minLeft = maxLeft * -1;
                if (this.getWidth() * this.scale < this.getFullWidth()) {
                    maxLeft = 0;
                }
                var deltaX = this.elementOriginalLeft + e.deltaX;
                var left = Math.min(maxLeft, Math.max(deltaX, minLeft));

                var leftEdgeBefore = this.leftEdge;
                this.leftEdge = left == maxLeft ? true : false;
                if (leftEdgeBefore !== this.leftEdge && this.leftEdge) {
                    this.book.panFrozen = false;
                    this.book.zoomPanAmount = e.deltaX;
                }

                if (this.book.panFrozen) {
                    this.$element.css({
                        "margin-left": left
                    });
                }
            } else if (this.book.panFrozen) {
                // Helps make sure the other pages are set correctly (math isn't quite right)
                this.setLeftPosition(this.book.currentPage.index);
            }

            if (!this.book.panFrozen) {
                this.left = this.originalLeft + e.deltaX - this.book.zoomPanAmount;
                this.$container.css({
                    "left": this.left
                });
                if (this.isCurrentPage && this.scale !== 1 && this.left >= 0 && !this.leftEdge) {
                    this.book.panFrozen = true;
                }
            }
        }

        /**
         * When starting a pinch event, record the images current
         * left and top position (margin) in order to calculate
         * the total offset with the pinch delta. Also records
         * the punch origin in case the user wants to pan the
         * entire image while they are pinching.
         *
         * @param  {Object} e Event class
         */

    }, {
        key: 'onPinchStart',
        value: function onPinchStart(e) {
            this.pinchOrigin = e.center;
            this.elementOriginalLeft = parseInt(this.$element.css("margin-left"), 10);
            this.elementOriginalTop = parseInt(this.$element.css("margin-top"), 10);
        }

        /**
         * The user is pinching, so magnify the image by the
         * pinch scale. This method also moves the image should
         * they want to pan while they are pinching by taking
         * the delta of the current pinch center and the original
         * pinch center. Not perfect, but works.
         *
         * @param  {Object} e Event class
         */

    }, {
        key: 'onPinch',
        value: function onPinch(e) {
            if (!this.isCurrentPage) {
                return;
            }

            if (this.app.mode !== PAGE_MODE) {
                this.app.switchModes();
            }
            this.magnify(e.scale * this.lastScale);

            var deltaX = -1 * (this.pinchOrigin.x - e.center.x);
            var deltaY = -1 * (this.pinchOrigin.y - e.center.y);
            this.$element.css({
                "margin-left": this.elementOriginalLeft + deltaX * e.scale,
                "margin-top": this.elementOriginalTop + deltaY * e.scale
            });
        }

        /**
         * At the end of a pinch reset the left and right position so
         * it sits at the min/max position and isn't mostly offscreen.
         * Also normalze the scale if it's less than one (smaller than
         * the viewport) or greater than the max scale value).
         *
         * @param  {Object} e Event class
         */

    }, {
        key: 'onPinchEnd',
        value: function onPinchEnd(e) {
            if (!this.isCurrentPage) {
                return;
            }

            this.pinchOrigin = {};

            this.book.panFrozen = true;

            var left = parseInt(this.$element.css("margin-left"), 10);
            var top = parseInt(this.$element.css("margin-top"), 10);
            var restrictedPosition = this.restrictPosition(left, top);
            this.$element.css({
                'margin-left': restrictedPosition.left,
                'margin-top': restrictedPosition.top
            });

            if (this.scale < 1) {
                return this.resetScale();
            }

            if (this.scale > this.MAX_SCALE) {
                this.magnify(this.MAX_SCALE, true);
                var left = parseInt(this.$element.css("margin-left"), 10);
                var top = parseInt(this.$element.css("margin-top"), 10);
                var restrictedPosition = this.restrictPosition(left, top);
                this.$element.css({
                    'margin-left': restrictedPosition.left,
                    'margin-top': restrictedPosition.top
                });
                this.lastScale = this.scale;
                return;
            }

            this.lastScale = this.scale;
        }

        /**
         * When this page is entering as the current page and
         * in panel zoom mode, we have to setup the next/previous
         * panels. If they user doesn't want to show the page
         * on enter, then automatically zoom them to the first panel.
         */

    }, {
        key: 'onPageEnterForward',
        value: function onPageEnterForward() {
            if (this.app.mode === PANEL_ZOOM_MODE && this.panels.length) {
                this.nextPanel = this.getFirstPanel();
                this.previousPanel = this.getPreviousPanel();
                if (!this.SHOW_PAGE_ON_ENTER) {
                    this.zoomToPanel(this.nextPanel);
                }
            }
        }

        /**
         * When this page is entering as the current page, but from
         * a succeeding page, setup the next/previous panels. If the user
         * doesn't want to show page on exit, zoom them into the last panel.
         * @return {[type]} [description]
         */

    }, {
        key: 'onPageEnterBackward',
        value: function onPageEnterBackward() {
            if (this.app.mode === PANEL_ZOOM_MODE && this.panels.length) {
                this.previousPanel = this.getLastPanel();
                this.nextPanel = this.getNextPanel();
                if (!this.SHOW_PAGE_ON_EXIT) {
                    this.zoomToPanel(this.previousPanel);
                }
            }
        }

        /**
         * Check to see if this page is zoomed. Can only be considered
         * zoomed if it's the current page and the scale is not 1.
         *
         * @return {Boolean}
         */

    }, {
        key: 'isZoomed',
        value: function isZoomed() {
            return this.isCurrentPage && this.scale !== 1;
        }

        /**
         * Set the page's starting position by centering it in the
         * viewport and setting its left offset (relative to the
         * books current page index). If we're in panel zoom mode
         * and there is a current panel, zoom in on it.
         */

    }, {
        key: 'setPosition',
        value: function setPosition() {
            this.centerInViewPort(false);
            this.setLeftPosition(this.book.currentPage.index);
            if (this.app.mode === PANEL_ZOOM_MODE && this.currentPanel) {
                this.zoomToPanel(this.currentPanel, false);
            }
        }

        /**
         * Uses the math to center this page in the viewport. Uses
         * the pages original size compared to the viewport size
         * to determine how to best fit it to the center of the screen.
         *
         * @param  {Boolean} animate Whether or not to animate the centering
         */

    }, {
        key: 'centerInViewPort',
        value: function centerInViewPort(animate) {
            var viewPortWidth = this.app.getViewPortSize().width;
            var viewPortHeight = this.app.getViewPortSize().height;
            var width = viewPortWidth;
            var height = this.getOriginalHeight() * viewPortWidth / this.getOriginalWidth();

            if (height > viewPortHeight) {
                height = viewPortHeight;
                width = this.getOriginalWidth() * viewPortHeight / this.getOriginalHeight();
            }

            var top = (viewPortHeight - height) / 2;
            var left = (viewPortWidth - width) / 2;

            this.$container.width(viewPortWidth).height(viewPortHeight);

            this.$element.animate({
                top: top,
                left: left,
                width: width,
                height: height,
                'margin-left': 0,
                'margin-top': 0
            }, {
                duration: animate ? this.PANEL_ANIMATION_SPEED : 0,
                easing: 'easeOutSine'
            });
        }

        /**
         * Restricts a left and top position to their maximum or
         * minimum values. This normalizes a "requested" position
         * with the best position available (so they can't over pan).
         *
         * @param  {Number} left Requested left position
         * @param  {Number} top  Requested top position
         * @return {Object}
         */

    }, {
        key: 'restrictPosition',
        value: function restrictPosition(left, top) {
            // Calculate the restrained left position
            var maxLeft = (this.getFullWidth() - this.getWidth() * this.scale) / 2;
            var minLeft = maxLeft * -1;
            if (this.getWidth() * this.scale < this.getFullWidth()) {
                minLeft = maxLeft = 0;
            }
            left = Math.min(minLeft, Math.max(maxLeft, left));

            // Calculate the restrained top position
            var maxTop = (this.getFullHeight() - this.getHeight() * this.scale) / 2;
            var minTop = maxTop * -1;
            if (this.getHeight() * this.scale < this.getFullHeight()) {
                minTop = maxTop = 0;
            }
            top = Math.min(minTop, Math.max(maxTop, top));
            return {
                left: left,
                top: top,
                minLeft: minLeft,
                maxLeft: maxLeft,
                minTop: minTop,
                maxTop: maxTop
            };
        }

        /**
         * Checks to see if this page should be set as the current
         * page. This method is requested when a user is panning
         * manually and part of multiple pages may be visible at the
         * same time. If the page passes the TURN THRESHHOLD, it
         * should be set as current.
         *
         * @param  {Object} e Event Object
         * @return {Boolean}
         */

    }, {
        key: 'shouldBeSetAsCurrent',
        value: function shouldBeSetAsCurrent(e) {
            if (this.isFirst && this.left > 0) {
                return true;
            }
            if (this.isLast && this.left < 0) {
                return true;
            }
            if (e.deltaX < 0 && this.left > 0 && this.left < this.getFullWidth() - this.TURN_THRESHHOLD) {
                return true;
            }
            if (e.deltaX > 0 && this.left + this.getFullWidth() > this.TURN_THRESHHOLD && this.left + this.getFullWidth() < this.getFullWidth()) {
                return true;
            }
            return false;
        }

        /**
         * Finds a panel given a x and y coordinate. This is a little
         * tricky because we have the original panel sizes, which need
         * to be converted to the current panel size and then whether
         * or not the x y coordinate is inside of THAT. Math=hard
         *
         * Returns the panel class instance if the panel is found.
         *
         * @param  {Number} x X coordinate
         * @param  {Number} y Y coordinate
         * @return {Panel}
         */

    }, {
        key: 'findPanelWithPos',
        value: function findPanelWithPos(x, y) {
            var found = false;
            if (this.panels.length) {
                var left = this.getLeft();
                var top = this.getTop();
                this.panels.forEach(function (panel) {
                    var convertedX = left + panel.x * this.getWidth() / this.getOriginalWidth();
                    var convertedY = top + panel.y * this.getHeight() / this.getOriginalHeight();
                    var convertedXMax = left + convertedX + panel.width * this.getWidth() / this.getOriginalWidth();
                    var convertedYMax = top + convertedY + panel.height * this.getHeight() / this.getOriginalHeight();
                    if (!found && x > convertedX && x <= convertedXMax && y > convertedY && y <= convertedYMax) {
                        found = panel;
                    }
                }.bind(this));
            }
            return found;
        }

        /**
         * Magnifies a page to a given scale. Animates by adding
         * a class that will animate a transform change, changes the
         * transform scale, then removes the class afterward.
         *
         * @param  {Number}  amount  Scale amount
         * @param  {Boolean} animate Whether or not to animate the scale
         */

    }, {
        key: 'magnify',
        value: function magnify(amount, animate) {
            var animateClass = animate ? 'page__image--transition' : '';

            this.scale = amount;

            this.$element.addClass(animateClass).css({
                transform: 'scale(' + this.scale + ')'
            });

            if (animate) {
                setTimeout(function () {
                    this.$element.removeClass('page__image--transition');
                }.bind(this), 260);
            }
        }

        /**
         * Resets the scale back 0 and unfreezes everything.
         *
         * @param  {Boolean} animate Whether or not to animate the scale change
         */

    }, {
        key: 'resetScale',
        value: function resetScale(animate) {
            this.magnify(1, animate);
            this.lastScale = 1;
            this.leftEdge = true;
            this.rightEdge = true;
            this.book.panFrozen = false;
            this.$element.css({
                'margin-left': 0,
                'margin-top': 0
            });
        }

        /**
         * Snaps the page to a left position by a given amount.
         * Animates this change which gives the appearance of "snapping"
         *
         * @param  {Number} amount Amount needed to snap
         */

    }, {
        key: 'snapTo',
        value: function snapTo(amount) {
            this.left = this.left + amount;
            this.originalLeft = this.left;
            this.$container.animate({
                left: this.left
            }, {
                duration: 250,
                easing: 'easeOutSine',
                complete: function () {
                    if (!this.isCurrentPage && this.scale !== 1) {
                        this.resetScale();
                    }
                    // Makes sure the left position is correct
                    this.setLeftPosition(this.book.currentPage.index);
                }.bind(this)
            });
        }

        /**
         * Sets the left position of the page given a page offset.
         * This should lay out each page side by side (or stack
         * them if the offset is 0)
         *
         * @param {Number} offset Number of pages to offset
         */

    }, {
        key: 'setLeftPosition',
        value: function setLeftPosition(offset) {
            if (typeof offset === 'undefined') {
                offset = 0;
            }
            this.left = (this.index - offset) * this.app.getViewPortSize().width;
            this.originalLeft = this.left;
            this.$container.css('left', this.left);
        }

        /**
         * Checks to see if this page has any panels.
         *
         * @return {Boolean}
         */

    }, {
        key: 'hasPanels',
        value: function hasPanels() {
            return this.panels.length !== 0;
        }

        /**
         * Sets the current panel and determines the next and previous panels.
         *
         * @param {Panel} panel Panel to set to current
         */

    }, {
        key: 'setCurrentPanel',
        value: function setCurrentPanel(panel) {
            this.currentPanel = panel;

            this.nextPanel = panel !== false ? panel.nextPanel !== false ? this.panels[panel.nextPanel] : false : false;

            this.previousPanel = panel !== false ? panel.previousPanel !== false ? this.panels[panel.previousPanel] : false : false;
        }

        /**
         * Checks to see if there is a previous panel set.
         *
         * @return {Boolean}
         */

    }, {
        key: 'hasPreviousPanel',
        value: function hasPreviousPanel() {
            return this.previousPanel !== false;
        }

        /**
         * Getter for the previous panel.
         *
         * @return {Panel}
         */

    }, {
        key: 'getPreviousPanel',
        value: function getPreviousPanel() {
            return this.previousPanel;
        }

        /**
         * Gets the very last panel in the panels array.
         *
         * @return {Panel}
         */

    }, {
        key: 'getLastPanel',
        value: function getLastPanel() {
            return this.panels[this.panels.length - 1];
        }

        /**
         * Checks to see if there is a next panel
         *
         * @return {Boolean}
         */

    }, {
        key: 'hasNextPanel',
        value: function hasNextPanel() {
            return this.nextPanel !== false;
        }

        /**
         * Gets the next panel instance.
         *
         * @return {Panel}
         */

    }, {
        key: 'getNextPanel',
        value: function getNextPanel() {
            return this.nextPanel;
        }

        /**
         * Gets the very first panel in the panel array
         *
         * @return {Panel}
         */

    }, {
        key: 'getFirstPanel',
        value: function getFirstPanel() {
            return this.panels.length ? this.panels[0] : false;
        }

        /**
         * Zooms into a specific panel on a page. Given the original
         * image size, and the original panel size and location, use
         * some maths to determine what the new size of the panel would
         * be if it were best fit and centered on the screen. Again,
         * maths is hard.
         *
         * @param  {Panel}   panel   Panel instance
         * @param  {Boolean} animate Whether or not to animate the zoom
         * @return {Boolean}
         */

    }, {
        key: 'zoomToPanel',
        value: function zoomToPanel(panel, animate) {
            var viewPortWidth = this.app.getViewPortSize().width;
            var viewPortHeight = this.app.getViewPortSize().height;

            var width = panel.getWidth() >= panel.getHeight() ? viewPortWidth : panel.getWidth() * viewPortHeight / panel.getHeight();
            var height = panel.getHeight() > panel.getWidth() ? viewPortHeight : panel.getHeight() * viewPortWidth / panel.getWidth();

            if (width > viewPortWidth) {
                width = viewPortWidth;
                height = panel.getHeight() * viewPortWidth / panel.getWidth();
            }

            if (height > viewPortHeight) {
                height = viewPortHeight;
                width = panel.getWidth() * viewPortHeight / panel.getHeight();
            }

            var pageHeight = height * this.getOriginalHeight() / panel.getHeight();
            var pageWidth = width * this.getOriginalWidth() / panel.getWidth();

            var top = panel.getTopPos() * pageHeight / this.getOriginalHeight();
            var left = panel.getLeftPos() * pageWidth / this.getOriginalWidth();

            animate = typeof animate === 'undefined' ? true : animate;

            this.$element.animate({
                'top': -top + (viewPortHeight - height) / 2,
                'left': -left + (viewPortWidth - width) / 2,
                width: pageWidth,
                height: pageHeight
            }, {
                duration: animate ? this.PANEL_ANIMATION_SPEED : 0,
                easing: 'easeOutSine'
            });

            // Set letterboxing with the leftover width and height
            this.app.setLetterBoxing(viewPortWidth - width, viewPortHeight - height, animate);

            this.setCurrentPanel(panel);
            this.app.settings.rememberBookSetting('panel', panel.index);
            return true;
        }

        /**
         * Zooms the page out from a panel by resetting the page and
         * getting rid of the letterboxing.
         */

    }, {
        key: 'zoomOut',
        value: function zoomOut() {
            this.app.setLetterBoxing(0, 0);
            this.resetZoom();
        }

        /**
         * Resets the zoom level of a page.
         */

    }, {
        key: 'resetZoom',
        value: function resetZoom() {
            this.setCurrentPanel(false);
            this.centerInViewPort(true);
            this.app.settings.rememberBookSetting('panel', false);
        }

        /**
         * Gets the original image element width
         *
         * @return {Number}
         */

    }, {
        key: 'getOriginalWidth',
        value: function getOriginalWidth() {
            return this.originalWidth;
        }

        /**
         * Gets the original image element height
         *
         * @return {Number}
         */

    }, {
        key: 'getOriginalHeight',
        value: function getOriginalHeight() {
            return this.originalHeight;
        }

        /**
         * Gets the current top position of the image element
         * by grabbing and parsing the css "top" property
         *
         * @return {Number}
         */

    }, {
        key: 'getTop',
        value: function getTop() {
            return parseInt(this.$element.css('top'));
        }

        /**
         * Gets the current left position of the image element
         * by grabbing and parsing the css "left" property
         *
         * @return {Number}
         */

    }, {
        key: 'getLeft',
        value: function getLeft() {
            return parseInt(this.$element.css('left'));
        }

        /**
         * Gets the image element's current width
         *
         * @return {Number}
         */

    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this.$element.width();
        }

        /**
         * Gets the container width
         *
         * @return {Number}
         */

    }, {
        key: 'getFullWidth',
        value: function getFullWidth() {
            return this.$container.width();
        }

        /**
         * Gets the image element's current height
         *
         * @return {Number}
         */

    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this.$element.height();
        }

        /**
         * Gets the container height
         *
         * @return {Number}
         */

    }, {
        key: 'getFullHeight',
        value: function getFullHeight() {
            return this.$container.height();
        }
    }, {
        key: 'config',
        set: function set(config) {
            this._config = config;
            this.loadPageElement();
        }

        /**
         * Gets the configuration internal
         *
         * @return {Object}
         */
        ,
        get: function get() {
            return this._config;
        }
    }]);

    return Page;
}(EventClass);

/**
 * Class for representing the a panel within a page.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */


var Panel = function () {
    /**
     * Initializes the new panel object. Sets a number
     * of local properties based on the passed in configuration
     *
     * @constructs Panel
     * @param  {Page}   page   Page class instance
     * @param  {Object} config Configuration
     * @param  {Number} index  Index of panels within page
     */
    function Panel(page, config, index) {
        _classCallCheck(this, Panel);

        this.page = page;
        this.index = index;
        this.x = config.x;
        this.y = config.y;
        this.width = config.width;
        this.height = config.height;
        this.nextPanel = this.page.config.panels[index + 1] ? index + 1 : false;
        this.previousPanel = this.page.config.panels[index - 1] ? index - 1 : false;
    }

    /**
     * Gets the width of the panel.
     *
     * @return {Number}
     */


    _createClass(Panel, [{
        key: 'getWidth',
        value: function getWidth() {
            return this.width;
        }

        /**
         * Gets the height of the panel.
         *
         * @return {Number}
         */

    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this.height;
        }

        /**
         * Gets the x value
         *
         * @return {Number}
         */

    }, {
        key: 'getLeftPos',
        value: function getLeftPos() {
            return this.x;
        }

        /**
         * Gets the y value
         *
         * @return {Number}
         */

    }, {
        key: 'getTopPos',
        value: function getTopPos() {
            return this.y;
        }
    }]);

    return Panel;
}();

/**
 * Constant holding the string value of Page Mode
 * for comparisons and setters.
 *
 * @constant
 * @type {String}
 * @default
 */


var PAGE_MODE = 'PAGE_MODE';

/**
 * Constant holding the string value of Panel Zoom
 * Mode for comparisons and setters.
 *
 * @constant
 * @type {String}
 * @default
 */
var PANEL_ZOOM_MODE = 'PANEL_ZOOM_MODE';

/**
 * Constant holding the string value of paging forward
 * for comparisons and setters.
 *
 * @constant
 * @type {String}
 * @default
 */
var PAGE_BACK = 'PAGE_BACK';

/**
 * Constant holding the string value of paging backward
 * for comparisons and setters.
 *
 * @constant
 * @type {String}
 * @default
 */
var PAGE_FORWARD = 'PAGE_FORWARD';

/**
 * Constant holding the string value of toggling
 * the main menu for comparisons and setters.
 *
 * @constant
 * @type {String}
 * @default
 */
var TOGGLE_MAIN_MENU = 'TOGGLE_MAIN_MENU';
/**
 * String value for no letterbox styling
 * @constant
 * @type {String}
 * @default
 */
var LETTERBOX_STYLE_NONE = 'no';
/**
 * Opacity value for no letterbox styling
 * @constant
 * @type {Number}
 * @default
 */
var LETTERBOX_STYLE_NONE_VALUE = 0;
/**
 * String value for opaque letterbox styling
 * @constant
 * @type {String}
 * @default
 */
var LETTERBOX_STYLE_OPAQUE = 'opaque';
/**
 * Opacity value for opaque letterbox styling
 * @constant
 * @type {Number}
 * @default
 */
var LETTERBOX_STYLE_OPAQUE_VALUE = 0.75;
/**
 * String value for the solid letterbox styling
 * @constant
 * @type {String}
 * @default
 */
var LETTERBOX_STYLE_SOLID = 'solid';
/**
 * Opacity value for the solid letterbox styling
 * @constant
 * @type {Number}
 * @default
 */
var LETTERBOX_STYLE_SOLID_VALUE = 1;
/**
 * The main client class for the Panelz application.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */

var Panelz = function (_EventClass4) {
    _inherits(Panelz, _EventClass4);

    /**
     * Takes in a configuration object for the
     * application settings.
     *
     * @constructs Panelz
     * @param config
     */
    function Panelz(config) {
        _classCallCheck(this, Panelz);

        var _this4 = _possibleConstructorReturn(this, (Panelz.__proto__ || Object.getPrototypeOf(Panelz)).call(this));

        _this4.DEFAULTS = {
            /**
             * The container to load the comic reader into.
             * Should be a jQuery selector
             *
             * @type {String}
             * @default
             */
            container: '.panelz-creator-container',

            /**
             * ID of the book to load when fetching the data.
             * This value is required if a <#comic> object
             * has not been provided.
             *
             * @type {String}
             * @default
             */
            id: false,

            /**
             * Object of comic data to load into the reader. Must
             * contain an id, title, and array of pages. Each page
             * object must look like the following:
             *     {
             *         url: "<urlOfImage>",
             *         size: <size> //in bytes
             *         panels: [
             *             {
             *                 x: xCoordinateOfPanel
             *                 y: yCoordinateOfPanel
             *                 width: widthOfPanel
             *                 height: heightOfPanel
             *             }
             *             ...
             *         ]
             *     }
             * The panels array within each page can be empty if the
             * page contains to panels to zoom to for the Panel Zoom feature.
             *
             * @type {Object}
             * @default
             */
            comic: {
                id: false,
                title: false,
                pages: []
            },

            /**
             * Supply a custom list of endpoints. The Panelz reader
             * only requires a single endpoint for fetching comic data
             * via the supplied <#id> configuration.
             *
             * The {id} placeholder will be swapped for the supplied
             * <#id> configuration parameter.
             *
             * @type {Object}
             * @default
             */
            endpoints: {
                get: '/comic/{id}'
            },
            /**
             * Directory where the tutorial images are stored
             *
             * @type {String}
             * @default
             */
            tutorialImageLocation: '../dist/images/'
        };

        _this4.config = $.extend(true, {}, _this4.DEFAULTS, config);

        _this4.settings = new Settings(_this4);

        /**
         * If the user has supplied an id in the configuration,
         * fetch the book data using the <#endpoint.get> endpoint.
         * Otherwise we should have a <#comic> data object to use.
         */
        if (_this4.config.id) {
            _this4.fetchBookData();
        } else {
            _this4.setupBook();
        }
        return _this4;
    }

    /**
     * When setting the config object, use this setter to set
     * a few of the items contained within the object.
     *
     * @param  {Object} config Configuration options
     */


    _createClass(Panelz, [{
        key: 'getEndpoint',


        /**
         * Gets a specific endpoint from the array of endpoints. Replaces
         * the {id} placeholder with the id set in the configuration.
         *
         * @param  {String} endpoint Which endpoint to grab from the array
         * @return {String}
         */
        value: function getEndpoint(endpoint) {
            return this.endpoints[endpoint].replace('{id}', this.config.id);
        }

        /**
         * Uses the {get} endpoint to fetch book data.
         */

    }, {
        key: 'fetchBookData',
        value: function fetchBookData() {
            $.ajax({
                url: this.getEndpoint('get'),
                method: 'GET',
                success: this.onBookDataFetched.bind(this),
                error: this.onRequestError.bind(this)
            });
        }

        /**
         * When book data has fetched, set internal configuration
         * options and proceed with setting up the comic with the
         * returned object. Assumes a valid return format.
         *
         * @param  {Object} comic Object data outlined in configuration
         */

    }, {
        key: 'onBookDataFetched',
        value: function onBookDataFetched(comic) {
            this.config.comic = comic;
            this.setupBook();
        }

        /**
         * The request to grab comic data has failed. Currently
         * does nothing more than output the response to the console.
         */

    }, {
        key: 'onRequestError',
        value: function onRequestError(response) {
            console.log('ERROR FETCHING BOOK DATA!', response);
        }

        /**
         * The reader is ready to setup. Initialize all the objects
         * needed to run the reader and setup event listeners.
         */

    }, {
        key: 'setupBook',
        value: function setupBook() {
            this.setInitialMode();

            this.tutorial = new Tutorial(this, this.settings, {
                imageLocation: this.config.tutorialImageLocation
            });
            this.viewport = new ViewPort(this);
            this.book = new Book(this, this.config.comic);
            this.menu = new Menu(this, this.book, this.tutorial);

            this.setEventListeners();
        }

        /**
         * Sets the initial mode of the reader. If the reader has
         * read this comic before, their previous mode will be
         * remembered and used. Otherwise it will check their
         * settings preferences and fall back on PAGE_MODE.
         */

    }, {
        key: 'setInitialMode',
        value: function setInitialMode() {
            if (this.settings.getBookSetting('mode')) {
                this.mode = this.settings.getBookSetting('mode');
            } else {
                this.mode = this.settings.get('startInPanelZoom') ? PANEL_ZOOM_MODE : PAGE_MODE;
            }
        }

        /**
         * Sets event listeners on initialized objects. In this
         * case, we're listening for when the comic has been
         * fully loaded.
         */

    }, {
        key: 'setEventListeners',
        value: function setEventListeners() {
            this.on('user:doubletap', this.switchModes.bind(this));
            this.book.on('load', this.onBookLoaded.bind(this));
        }

        /**
         * Pass along the loaded book event so other objects
         * only have to listen to and know about the app object.
         *
         * @param  {Book} book The class object representing a comic
         * @fires  Panelz#load:book
         */

    }, {
        key: 'onBookLoaded',
        value: function onBookLoaded(book) {
            /**
             * Load book event.
             *
             * @event Panelz#load:book
             * @type {object}
             * @property {Book} Book loaded
             */
            this.trigger('load:book', book);
        }

        /**
         * Getter for the comicc ID
         *
         * @return {Mixed}
         */

    }, {
        key: 'getComicId',
        value: function getComicId() {
            return this.config.comic.id;
        }

        /**
         * Switches the application between the two modes,
         * PAGE_MODE and PANEL_ZOOM_MODE. Messages the user
         * about the mode change so they know what mode they are in.
         */

    }, {
        key: 'switchModes',
        value: function switchModes() {
            var mode = this.mode === PAGE_MODE ? PANEL_ZOOM_MODE : PAGE_MODE;

            this.setMode(mode);

            this.message(this.getReadableModeText());
        }

        /**
         * Sets the current application mode. Makes sure the user's
         * change is remembered in the settings and then triggers
         * an event for other objects to hook into.
         *
         * @param {String} mode Which mode to set.
         * @fires Panelz#change:mode
         */

    }, {
        key: 'setMode',
        value: function setMode(mode) {
            this.mode = mode;
            this.settings.rememberBookSetting('mode', mode);
            /**
             * Change mode event
             *
             * @event Panelz#change:mode
             * @type {String}
             * @property {string} mode - What mode was set
             */
            this.trigger('change:mode', mode);
        }

        /**
         * Gets the human readable version of the current or passed
         * in mode. Takes the string and breaks it into something readable.
         * PANEL_ZOOM_MODE -> Panel Zoom Mode
         *
         * @param  {String}  mode        Optional mode, otherwise use current mode
         * @param  {Boolean} insertBreak Whether or not to insert a break element
         * @return {String}
         */

    }, {
        key: 'getReadableModeText',
        value: function getReadableModeText(mode, insertBreak) {
            if (!mode) {
                mode = this.mode;
            }
            return mode.replace(/_/g, ' ').toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
                return a.toUpperCase();
            }).replace(' Mode', insertBreak ? '<br />Mode' : ' Mode');
        }

        /**
         * Sets the letterboxing in the viewport. Passes in the
         * width and height available for use and whether or not
         * the transition should be animated.
         *
         * @param {Number}  width   Width left to work with
         * @param {Number}  height  Height left to work with
         * @param {Boolean} animate Animate letterbox transition
         */

    }, {
        key: 'setLetterBoxing',
        value: function setLetterBoxing(width, height, animate) {
            this.viewport.setLetterBoxing(width, height, animate);
        }

        /**
         * Gets the current size of the viewport as an object
         * containing the width and height.
         *
         * @return {Object}
         */

    }, {
        key: 'getViewPortSize',
        value: function getViewPortSize() {
            return {
                width: this.viewport.getWidth(),
                height: this.viewport.getHeight()
            };
        }

        /**
         * Returns the last user event object recorded.
         *
         * @return {Object}
         */

    }, {
        key: 'getLastUserEvent',
        value: function getLastUserEvent() {
            return this.viewport.getLastUserEvent();
        }

        /**
         * Appends a jQuery <#$markup> object to the viewport.
         *
         * @param {Object} $markup jQuery element representing the page
         * @return {Object}
         */

    }, {
        key: 'addPageMarkupToViewPort',
        value: function addPageMarkupToViewPort($markup) {
            return $markup.appendTo(this.viewport.$element);
        }

        /**
         * Displays a message for the user within the viewport.
         *
         * @param  {String} message Message to display
         * @param  {Number} time    Time in ms to display the message
         */

    }, {
        key: 'message',
        value: function message(_message, time) {
            this.viewport.message(_message, time);
        }
    }, {
        key: 'config',
        set: function set(config) {
            this.endpoints = config.endpoints;
            this.$container = $(config.container);
            config.app = this;
            this._config = config;
        }

        /**
         * Gets the configuration object internal.
         *
         * @return {Object}
         */
        ,
        get: function get() {
            return this._config;
        }

        /**
         * When setting the $container property, append the the
         * markup needed to run the Panelz reader.
         *
         * @param  {Object} $container jQuery object to append markup to
         */

    }, {
        key: '$container',
        set: function set($container) {
            this._$container = $container.append(PANELZ_MARKUP);
        }

        /**
         * Gets the $container object internal.
         *
         * @return {Object}
         */
        ,
        get: function get() {
            return _$container;
        }
    }]);

    return Panelz;
}(EventClass);

/**
 * Handles the various user settings for the user. Keeps
 * track of selections made by the user as well as how
 * those selections are stored (local storage).
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */


var Settings = function (_EventClass5) {
    _inherits(Settings, _EventClass5);

    /**
     * Initializes the settings class with defaults and loads
     * in saved preferences from local storage.
     *
     * @constructs Settings
     * @param {Panelz} app The Panelz class app instance\
     */
    function Settings(app) {
        _classCallCheck(this, Settings);

        var _this5 = _possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).call(this));

        _this5.DEFAULTS = {
            /**
             * Left hand mode preference
             * @type {Boolean}
             */
            leftHandMode: false,

            /**
             * Whether or not to start in
             * panel zoom mode
             * @type {Boolean}
             */
            startInPanelZoom: false,

            /**
             * Speed of panel transitions
             * 0|250|650
             * @type {Number}
             */
            panelTransitions: 250,

            /**
             * Letter boxing style
             * solid|opaque|none
             * @type {String}
             */
            letterboxing: 'solid',

            /**
             * Whether or not to detect panels
             * on double tapping
             * @type {Boolean}
             */
            detectPanelOnDoubleTap: true,

            /**
             * Shows a page on enter in panel zoom mode
             * @type {Boolean}
             */
            showPageOnEnter: false,

            /**
             * Shows a page on exit in panel zoom mode
             * @type {Boolean}
             */
            showPageOnExit: false,

            /**
             * Whether or not to show the tutorial
             * @type {Boolean}
             */
            showTutorial: true,

            /**
             * Whether or not to show a panel change
             * message in the viewport
             * @type {Boolean}
             */
            showPageChangeMessage: false
        };

        /**
         * What key to store the users preferences at
         * @type {String}
         */
        _this5.storageKey = 'panelz_3.0';

        _this5.app = app;
        _this5.localSettings = _this5.getLocalSettings();
        _this5.loadConfig($.extend({}, _this5.DEFAULTS, _this5.getUserSettings()));
        _this5.setFields();
        _this5.setEventListeners();
        return _this5;
    }

    /**
     * Event listeners for listening to changes or whether or not
     * they want to reset or clear their settings.
     */


    _createClass(Settings, [{
        key: 'setEventListeners',
        value: function setEventListeners() {
            $('[name="' + this.keys().join('"],[name="') + '"]').on('change', this.onFieldChange.bind(this));
            $('body').on('click', '[data-reset-settings]', this.reset.bind(this));
            $('body').on('click', '[data-clear-data]', this.clear.bind(this));
        }

        /**
         * Loads the settings configuration by looping through
         * the keys and setting them.
         *
         * @param  {Object} config Settings configuration
         */

    }, {
        key: 'loadConfig',
        value: function loadConfig(config) {
            this.config = {};
            Object.keys(config).forEach(function (setting) {
                this.set(setting, config[setting]);
            }.bind(this));
        }

        /**
         * Loops through all of the settings and sets each
         * field value and whether or not they should each
         * be checked/filled out
         */

    }, {
        key: 'setFields',
        value: function setFields() {
            this.keys().forEach(this.setField.bind(this));
        }

        /**
         * Sets an interface field with the value and status
         * from a given setting value. Assumes that the input
         * shares the same name value as the setting itself.
         *
         * @param {String} setting Which setting to set
         */

    }, {
        key: 'setField',
        value: function setField(setting) {
            var $fields = $('[name="' + setting + '"]');
            var value = this.get(setting);
            // May be a radio button, so may have several fields
            $fields.each(function (index, field) {
                var $this = $(field);
                var fieldVal = $this.val();
                // If it's a checkbox condition, set the true/value
                // property of the checked field
                if ($this.is(':checkbox')) {
                    $this.prop('checked', !!value);
                    // For radios, we need to normalize the field value to turn
                    // true/false strings into booleans and string numbers
                    // into actual numbers
                } else if ($this.is(':radio') && this.normalizeValue(fieldVal) == value) {
                    $this.prop('checked', true);
                }
            }.bind(this));
        }

        /**
         * Normalizes a value into it's proper type. String numbers
         * are turned into actual integers and true/false strings
         * are turned into true booleans.
         *
         * @param  {Mixed} val Value to normalize
         * @return {Mixed}
         */

    }, {
        key: 'normalizeValue',
        value: function normalizeValue(val) {
            val = isNaN(parseFloat(val)) ? val : parseInt(val);
            val = val === 'false' ? false : val;
            val = val === 'true' ? true : val;

            return val;
        }

        /**
         * When a field is changed, set the settings accordingly.
         * If the field has a certain attribute, message the user
         * that the setting has changed.
         *
         * @param  {Object} e Event object
         */

    }, {
        key: 'onFieldChange',
        value: function onFieldChange(e) {
            var $field = $(e.currentTarget);
            var val = $field.val();
            var name = $field.attr('name');

            if ($field.is(':checkbox')) {
                val = $field.is(':checked');
            }

            this.set(name, this.normalizeValue(val));

            // If the field has a data-readable attribute, we can message the
            // user with the human readable string of the field
            if ($field.closest('.pane__item[data-readable]').length) {
                var readableFieldLabel = $field.closest('.pane__item[data-readable]').attr('data-readable');
                var readableTitle = $field.closest('.pane[data-readable]').attr('data-readable');
                this.app.message(readableTitle + ' set to ' + readableFieldLabel);
            }
        }

        /**
         * Resets all the settings and messages the user.
         */

    }, {
        key: 'reset',
        value: function reset() {
            this.loadConfig(this.DEFAULTS);
            this.setFields();
            this.app.message('Settings reset');
        }

        /**
         * Clears all the settings, including all of the
         * settings for every comic they have viewed.
         */

    }, {
        key: 'clear',
        value: function clear() {
            this.localSettings = {};
            localStorage.removeItem(this.storageKey);
            this.reset();
            this.app.message('Application data cleared');
        }

        /**
         * Gets a specific setting
         *
         * @param  {String} setting Which setting to grab
         * @return {Mixed}
         */

    }, {
        key: 'get',
        value: function get(setting) {
            return this.config[setting];
        }

        /**
         * Sets a setting. Triggers a change event in the
         * settings, making sure to send out the old values
         * as well as the new value.
         *
         * @param {String} setting Setting to set
         * @param {Mixed} val      What value to set the setting to
         * @fires Settings#change:<setting>
         */

    }, {
        key: 'set',
        value: function set(setting, val) {
            var oldVal = this.get(setting);
            this.config[setting] = val;
            this.setUserSettings();
            /**
             * Setting event
             *
             * @event Settings#change:<setting>
             * @type {Object}
             * @property {Object} setting, what setting was changed
             */
            this.trigger('change:' + setting, {
                setting: setting,
                value: val,
                oldValue: oldVal,
                settings: this.config
            });
        }

        /**
         * Returns all the configuration keys
         *
         * @return {Array} Array of configuration keys
         */

    }, {
        key: 'keys',
        value: function keys() {
            return Object.keys(this.config);
        }

        /**
         * Gets the settings saved via local storage. If the pull
         * from local storage fails for some reason catch the
         * exception and return an empty object.
         *
         * @return {Object} Local settings object
         */

    }, {
        key: 'getLocalSettings',
        value: function getLocalSettings() {
            try {
                var localSettings = JSON.parse(localStorage.getItem(this.storageKey));
                console.log('Local Settings:', localSettings);
                return localSettings ? localSettings : {};
            } catch (Exception) {
                return {};
            }
        }

        /**
         * Sets local storage with the local settings object
         */

    }, {
        key: 'setLocalSettings',
        value: function setLocalSettings() {
            localStorage.setItem(this.storageKey, JSON.stringify(this.localSettings));
        }

        /**
         * Remembers a setting in local storage. Triggers a
         * save of the entire local settings object.
         *
         * @param  {String} key Setting to set
         * @param  {Mixed}  val What to set the value to
         */

    }, {
        key: 'remember',
        value: function remember(key, val) {
            this.localSettings[key] = val;
            this.setLocalSettings();
        }

        /**
         * Gets a local setting via a given key.
         *
         * @param  {String} key Setting to grab
         * @return {Mixed}
         */

    }, {
        key: 'getLocalSetting',
        value: function getLocalSetting(key) {
            return this.localSettings[key];
        }

        /**
         * Gets all the book specific settings.
         *
         * @param {Boolean} allBooks Return all books or just this one
         * @return {Object}
         */

    }, {
        key: 'getBookSettings',
        value: function getBookSettings(allBooks) {
            var books = this.getLocalSetting('comics') || {};
            return allBooks ? books : books[this.app.getComicId()] || {};
        }

        /**
         * Remembers a setting specific to the current comic/book.
         *
         * @param  {String} key Setting to set
         * @param  {Mixed}  val Value to set for setting
         */

    }, {
        key: 'rememberBookSetting',
        value: function rememberBookSetting(key, val) {
            var books = this.getBookSettings(true);
            var bookSettings = books[this.app.getComicId()] || {};
            bookSettings[key] = val;
            books[this.app.getComicId()] = bookSettings;
            this.remember('comics', books);
        }

        /**
         * Gets a book/comic specific setting
         *
         * @param  {String} key Setting to get
         * @return {Mixed}
         */

    }, {
        key: 'getBookSetting',
        value: function getBookSetting(key) {
            return this.getBookSettings()[key];
        }

        /**
         * Gets all the user settings.
         *
         * @return {Object}
         */

    }, {
        key: 'getUserSettings',
        value: function getUserSettings() {
            return this.getLocalSetting('settings') ? this.getLocalSetting('settings') : {};
        }

        /**
         * Set user preferences by remembering them
         * to local storage.
         */

    }, {
        key: 'setUserSettings',
        value: function setUserSettings() {
            this.remember('settings', this.config);
        }
    }]);

    return Settings;
}(EventClass);

/**
 * Class for showing and handling the beginners tutorial that
 * appears in front of loading the comic (unless the reader has
 * turned this option off or completed the tutorial previously)
 *
 * The tutorial shows mp4 videos on repeat as the reader steps
 * through. At the end of the tutorial, the user is asked if
 * they want to customize settings. This is also handled by this
 * class and portion of the interface, as it's another way
 * to introduce the reader to the various options available to them.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */


var Tutorial = function (_EventClass6) {
    _inherits(Tutorial, _EventClass6);

    /**
     * Initializes the tutorial class with an interactable interface
     * than can listen to touch events via the HammerJS library.
     *
     * @constructs Tutorial
     * @param  {Panelz}   app      The Panelz class app instance
     * @param  {Settings} settings Settings class instance
     */
    function Tutorial(app, settings, config) {
        _classCallCheck(this, Tutorial);

        var _this6 = _possibleConstructorReturn(this, (Tutorial.__proto__ || Object.getPrototypeOf(Tutorial)).call(this));

        _this6.app = app;
        _this6.settings = settings;
        _this6.config = config;

        _this6.interactable = new Hammer.Manager($('.tutorial')[0]);
        _this6.interactable.add(new Hammer.Swipe());

        _this6.addEventListeners();
        _this6.setImageLocations();

        if (_this6.settings.get('showTutorial')) {
            _this6.show();
        }
        return _this6;
    }

    /**
     * Adds the various event listeners needed. Listens for user
     * interactions and settings changes.
     */


    _createClass(Tutorial, [{
        key: 'addEventListeners',
        value: function addEventListeners() {
            $('body').on('click', '[data-tutorial-next]', this.next.bind(this));
            $('body').on('click', '[data-tutorial-back]', this.back.bind(this));
            $('body').on('click', '[data-tutorial-done]', this.done.bind(this));
            $('body').on('change activate', '[data-tutorial-image]', this.swapImage.bind(this));
            $('body').on('change', '.tutorial [name="startInPanelZoom"]', this.setBeginnerMode.bind(this));

            this.settings.on('change:showTutorial', this.toggle.bind(this));

            this.interactable.on('swipeleft', this.next.bind(this));
            this.interactable.on('swiperight', this.back.bind(this));
        }

        /**
         * User has interacted with the tutorial and wants to proceed
         * to the next item in the tutorial. This method also employs
         * hot loading the video of the next panel.
         *
         * @param  {Object} e Event object
         */

    }, {
        key: 'next',
        value: function next(e) {
            var $panel = $('.tutorial__panel:not(.tutorial__panel--hidden)');
            if ($panel.next().length) {
                $panel.addClass('tutorial__panel--hidden');
                var $nextPanel = $panel.next();
                var $imageLoader = $nextPanel.find('[data-tutorial-image]');
                if ($imageLoader.length) {
                    if ($imageLoader.is('video')) {
                        this.swapImage({ currentTarget: $imageLoader[0] });
                    } else {
                        $nextPanel.find('[data-tutorial-image]:checked').trigger('activate');
                    }
                }
                $nextPanel.removeClass('tutorial__panel--hidden');
            }
        }

        /**
         * User has interacted with a tutorial and wants to go back
         * to the previous item in the tutorial.
         *
         * @param  {Object} e Event object
         */

    }, {
        key: 'back',
        value: function back(e) {
            var $panel = $('.tutorial__panel:not(.tutorial__panel--hidden)');
            if ($panel.prev().length) {
                $panel.addClass('tutorial__panel--hidden');
                $panel.prev().removeClass('tutorial__panel--hidden');
            }
        }

        /**
         * When the tutorial is done, make sure their settings are remembered.
         * Since the settings can be altered through the tutorial, make sure
         * the settings fields are set properly.
         *
         * @fires Tutorial#done
         */

    }, {
        key: 'done',
        value: function done() {
            this.settings.set('showTutorial', false);
            this.settings.setFields();
            /**
             * Triggers the tutorial done event
             *
             * @event Tutorial#done
             * @type {object}
             */
            this.trigger('done');
        }

        /**
         * Swaps the image/video when the user selects one of
         * the tutorial options. This is to show the user different
         * image/videos for each option.
         *
         * @param  {Object} e Event object]
         */

    }, {
        key: 'swapImage',
        value: function swapImage(e) {
            var $this = $(e.currentTarget);
            var imageSrc = $this.attr('data-tutorial-image');
            var $video = $this.closest('.tutorial__content').find('.tutorial__image video');
            $video.closest('.tutorial__image').removeClass('tutorial__image--loaded');
            $video.find('source').attr('src', imageSrc);
            $video[0].load();
            $video[0].addEventListener('loadeddata', function () {
                $video.closest('.tutorial__image').addClass('tutorial__image--loaded');
                $video[0].play();
            }, false);
        }

        /**
         * Updates all the image source locations with the configuration
         * option. This allows the installer to put the tutorial images
         * wherever they want.
         */

    }, {
        key: 'setImageLocations',
        value: function setImageLocations() {
            $('[data-tutorial-image]').each(function (index, element) {
                var $image = $(element);
                $image.attr('data-tutorial-image', this.imageUrl($image.attr('data-tutorial-image')));
            }.bind(this));
        }

        /**
         * Sets the mode on the application when they check
         * or uncheck a specific radio box.
         *
         * @param {Object} e Event object
         */

    }, {
        key: 'setBeginnerMode',
        value: function setBeginnerMode(e) {
            var $checkbox = $(e.currentTarget);
            var mode = $checkbox.is(':checked') ? PANEL_ZOOM_MODE : PAGE_MODE;
            this.app.setMode(mode);
        }

        /**
         * Toggles whether or not the tutorial is shown or hidden.
         *
         * @param {Object} e Event object
         */

    }, {
        key: 'toggle',
        value: function toggle(e) {
            if (e.value === true) {
                this.show();
            } else {
                this.hide();
            }
        }

        /**
         * Shows the tutorial interface.
         */

    }, {
        key: 'show',
        value: function show() {
            $('.tutorial__panel').addClass('tutorial__panel--hidden').first().removeClass('tutorial__panel--hidden');
            $('.tutorial').removeClass('tutorial--hidden');
        }

        /**
         * Hides the tutorial interface.
         */

    }, {
        key: 'hide',
        value: function hide() {
            $('.tutorial').addClass('tutorial--hidden');
        }

        /**
         * Returns a full image path based on the config value
         * of where the images are stored.
         *
         * @param  {String} image Which image
         * @return {String}
         */

    }, {
        key: 'imageUrl',
        value: function imageUrl(image) {
            return this.config.imageLocation + image;
        }
    }]);

    return Tutorial;
}(EventClass);

/**
 * The ViewPort class represents the viewport available to the user
 * and viewing the comic. All pages and panels have to be sized to
 * fit within this viewport. It also handles and dispatches user
 * interaction events.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */


var ViewPort = function (_EventClass7) {
    _inherits(ViewPort, _EventClass7);

    /**
     * Initiates the ViewPort class, by setting properties,
     * listening to application and interaction events, and
     * setting up the viewport for use.
     *
     * @constructs ViewPort
     * @param {Panelz} app Panelz app instance
     */
    function ViewPort(app) {
        _classCallCheck(this, ViewPort);

        /**
         * Panelz application instance
         * @type {Panelz}
         */
        var _this7 = _possibleConstructorReturn(this, (ViewPort.__proto__ || Object.getPrototypeOf(ViewPort)).call(this));

        _this7.app = app;
        /**
         * Settings class instance, derived from
         * an application property.
         * @type {Settings}
         */
        _this7.settings = app.settings;
        /**
         * jQuery object holding the viewport element
         * @type {Object}
         */
        _this7.$element = $('.viewport');
        /**
         * jQuery object holding the viewport container
         * @todo Switch this to be the container passed in the initial config
         * @type {Object}
         */
        _this7.$container = $(window);
        /**
         * jQuery object holding the horizontal letter box
         * @type {Object}
         */
        _this7.$horizontalLetterBox = $('.letterbox__horizontal');
        /**
         * jQuery object holding the vertical letter box
         * @type {Object}
         */
        _this7.$verticalLetterBox = $('.letterbox__vertical');
        /**
         * The interactable object the user can swipe or perform
         * user interactions on. Should be a HammerJS instance.
         * @type {Object}
         */
        _this7.interactable = false;
        /**
         * Holds the last user event to occur.
         * @type {Object}
         */
        _this7.e = false;
        /**
         * Whether or not the user is currently performing the
         * pinch interaction on the interactable element.
         * @type {Boolean}
         */
        _this7.pinching = false;
        /**
         * Function holding the message timeout.
         * @type {Function}
         */
        _this7.messageTimeout = false;
        /**
         * Minimum x coordinate for the page back tap zone.
         * @type {Number}
         */
        _this7.PAGE_BACK_MIN = 0;
        /**
         * Maximum x coordinate for the page back tap zone.
         * @type {Number}
         */
        _this7.PAGE_BACK_MAX = 0;
        /**
         * Minimum x coordinate for the page forward tap zone.
         * @type {Number}
         */
        _this7.PAGE_FORWARD_MIN = 0;
        /**
         * Maximum x coordinate for the page forward tap zone.
         * @type {Number}
         */
        _this7.PAGE_FORWARD_MAX = 0;
        /**
         * What percentage of the page on the left and right
         * is allocated to a page turn tap zone.
         * @type {Number}
         */
        _this7.PAGE_TURN_THRESHOLD = 0.25;
        /**
         * The style of letterbox to use when showing. This
         * value may change when the user update their settings.
         * @type {String}
         */
        _this7.LETTERBOX_STYLE = _this7.settings.get('letterboxing');
        /**
         * Whether or not to switch the left and right tap zones for
         * moving the book forward and backward. This value may change
         * when the user updates their settings.
         * @type {Boolean}
         */
        _this7.LEFT_HAND_MODE = _this7.settings.get('leftHandMode');

        _this7.setInteractable();
        _this7.setEventListeners();
        _this7.setViewPortSize();
        _this7.setTapThresholds();
        _this7.setLetterBoxStyle();
        return _this7;
    }

    /**
     * Sets the interactable object by initiating the HammerJS library.
     * Enables the relevant touch events and registers them accordingly.
     */


    _createClass(ViewPort, [{
        key: 'setInteractable',
        value: function setInteractable() {
            this.interactable = new Hammer.Manager(this.$element.find('.viewport__interactable')[0]);

            var pan = new Hammer.Pan({ threshold: 20, enable: this.canRecognizePan.bind(this) });
            var pinch = new Hammer.Pinch({ threshold: 0, enable: this.canRecognizePinch.bind(this), domEvents: true });
            var singletap = new Hammer.Tap({ threshold: 2, posThreshold: 150 });
            var doubletap = new Hammer.Tap({ event: 'doubletap', taps: 2, threshold: 2, posThreshold: 150 });
            var swipe = new Hammer.Swipe({ enable: this.canRecognizeSwipe.bind(this) });

            this.interactable.add([pan, doubletap, singletap, swipe, pinch]);

            doubletap.recognizeWith(singletap);

            singletap.requireFailure(doubletap);
            pan.requireFailure(pinch);
        }

        /**
         * Sets event listeners on DOM elements and the application instance.
         */

    }, {
        key: 'setEventListeners',
        value: function setEventListeners() {
            $('body').on('click', '[data-open-pane]', this.onOpenPane);
            $('body').on('click', '.pane__item, .tutorial__menu-item', this.onPaneMenuItemClick);
            $('body').on('click', '[data-skip-to-page]', this.onSkipToPageClick.bind(this));
            $('body').on('click activate', '[data-close]', this.onCloseClick);
            this.$container.on('resize', this.setViewPortSize.bind(this));
            this.app.on('load:book', this.onBookLoaded.bind(this));
            this.settings.on('change:letterboxing', this.onLetterboxSettingsChange.bind(this));
            this.settings.on('change:leftHandMode', this.onLeftHandModeSettingsChange.bind(this));
        }

        /**
         * User wants to open a pane, do so by removing a hidden class.
         *
         * @param {Object} e Event object
         */

    }, {
        key: 'onOpenPane',
        value: function onOpenPane(e) {
            $('.pane--' + $(this).attr('data-open-pane')).removeClass('pane--hidden');
        }

        /**
         * On a pane menu item click, make sure the item is checked/unchecked accordingly
         *
         * @param {Object} e Event object
         */

    }, {
        key: 'onPaneMenuItemClick',
        value: function onPaneMenuItemClick(e) {
            if (!$(e.target).is(':radio, :checkbox, .checkbox__label')) {
                var $input = $(this).find(':radio, :checkbox');
                var checked = $input.is(':radio') ? true : !$input.prop('checked');
                $input.prop('checked', checked).trigger('change');
                $input.closest('.pane--modal').find('[data-close]').trigger('activate');
            }
        }

        /**
         * The skip to page item has been clicked so trigger an app
         * notification event to respond to.
         * @param {Object} e Event object
         * @fires Panelz#user:skipToPage
         */

    }, {
        key: 'onSkipToPageClick',
        value: function onSkipToPageClick(e) {
            var $this = $(e.currentTarget);
            var page = $this.attr('data-skip-to-page');
            $this.closest('.pane').find('[data-close]').trigger('activate');
            /**
             * User skip to page event
             *
             * @event Panelz#user:skipToPage
             * @type {Object}
             * @property {Page} Page instance to skip to
             */
            this.app.trigger('user:skipToPage', page);
        }

        /**
         * User wants to close a pane, add the CSS hidden class to hide it
         * @param {Object} e Event object
         */

    }, {
        key: 'onCloseClick',
        value: function onCloseClick(e) {
            e.preventDefault();
            var $this = $(this);
            $this.closest('.pane').addClass('pane--hidden');
            $this.closest('.pane').find('.pane__content')[0].scrollTop = 0;
        }

        /**
         * The book/comic has been loaded, so we can add the interaction
         * events. All of the interaction events are then passed up
         * to the application for other classes to hook into.
         *
         * @param {Book} book The book that was loaded
         */

    }, {
        key: 'onBookLoaded',
        value: function onBookLoaded(book) {
            console.log('Book loaded');
            this.interactable.on('pinchstart', this.passUserEventToApplication.bind(this));
            this.interactable.on('pinch', this.passUserEventToApplication.bind(this));
            this.interactable.on('pinchmove', this.passUserEventToApplication.bind(this));
            this.interactable.on('pinchin', this.passUserEventToApplication.bind(this));
            this.interactable.on('pinchout', this.passUserEventToApplication.bind(this));
            this.interactable.on('pinchend', this.passUserEventToApplication.bind(this));
            this.interactable.on('panstart', this.passUserEventToApplication.bind(this));
            this.interactable.on('pan', this.passUserEventToApplication.bind(this));
            this.interactable.on('panleft', this.passUserEventToApplication.bind(this));
            this.interactable.on('panright', this.passUserEventToApplication.bind(this));
            this.interactable.on('panend', this.passUserEventToApplication.bind(this));
            this.interactable.on('doubletap', this.passUserEventToApplication.bind(this));
            this.interactable.on('tap', this.passUserEventToApplication.bind(this));
            this.interactable.on('swipeleft', this.passUserEventToApplication.bind(this));
            this.interactable.on('swiperight', this.passUserEventToApplication.bind(this));
            // Resize the book
            $(window).on('resize orientationchange', this.onResize.bind(this));
        }

        /**
         * When the letterboxing setting changes, update the
         * letterbox style accordingly.
         *
         * @param  {Object} data Settings event object
         */

    }, {
        key: 'onLetterboxSettingsChange',
        value: function onLetterboxSettingsChange(data) {
            this.LETTERBOX_STYLE = data.value;
            this.setLetterBoxStyle();
        }

        /**
         * When the left hand mode setting changes, update the
         * tap zones/thresholds accordingly.
         *
         * @param  {Object} data Settings event object
         */

    }, {
        key: 'onLeftHandModeSettingsChange',
        value: function onLeftHandModeSettingsChange(data) {
            this.LEFT_HAND_MODE = data.value;
            this.setTapThresholds();
        }

        /**
         * Passes a user interaction event up to the application. Some
         * of the user events have special cases.
         *
         * @param  {Object} data Settings event object
         * @fires  Panelz#user:<interaction>
         * @return {Boolean}
         */

    }, {
        key: 'passUserEventToApplication',
        value: function passUserEventToApplication(e) {
            // Hammer likes to fire pan and pinch events, so set
            // a property which will allow us to disable pan events
            // while the user is performing pinching
            if (e.type === 'pinchstart') {
                this.pinching = true;
            }
            // Hammer is throwing pan events after a pinch end,
            // so add some delay before turning pinching off
            if (e.type === 'pinchend') {
                setTimeout(function () {
                    this.pinching = false;
                }.bind(this), 100);
            }
            // On a tap, we have to figure out where they tapped
            // and trigger the correct event
            if (e.type === 'tap') {
                this.app.trigger('user:tap', e);
                var cmd = this.findTapZone(e.center.x, e.center.y);
                if (cmd === PAGE_FORWARD) {
                    return this.app.trigger('user:pageForward', e);
                } else if (cmd === PAGE_BACK) {
                    return this.app.trigger('user:pageBackward', e);
                } else if (cmd === TOGGLE_MAIN_MENU) {
                    return this.app.trigger('show:menu');
                } else {
                    return true;
                }
            }
            // Translate the swipeleft event
            if (e.type === 'swipeleft') {
                e.type = 'pageForward';
            }
            // Translate the swiperight event
            if (e.type === 'swiperight') {
                e.type = 'pageBackward';
            }

            this.registerUserEvent(e);

            /**
             * User interaction event
             *
             * @event Panelz#user:<interaction>
             * @type {Object}
             * @property {Object} Interaction event
             */
            this.app.trigger('user:' + e.type, e);
        }

        /**
         * Saves a user event to a local property.
         *
         * @param  {Object} e Event Object
         */

    }, {
        key: 'registerUserEvent',
        value: function registerUserEvent(e) {
            this.e = e;
        }

        /**
         * Returns the last user event object recorded.
         *
         * @return {Object}
         */

    }, {
        key: 'getLastUserEvent',
        value: function getLastUserEvent() {
            return this.e;
        }

        /**
         * Recognize the user pinch event only in Page Mode.
         *
         * @return {Boolean}
         */

    }, {
        key: 'canRecognizePinch',
        value: function canRecognizePinch() {
            return this.app.mode === PAGE_MODE;
        }

        /**
         * Recognize the user pan event only when in page mode
         * and if the user is not currently also pinching.
         *
         * @return {Boolean}
         */

    }, {
        key: 'canRecognizePan',
        value: function canRecognizePan() {
            return this.app.mode === PAGE_MODE && !this.pinching;
        }

        /**
         * Recognize the user swipe event only when in panel zoom mode
         *
         * @return {Boolean}
         */

    }, {
        key: 'canRecognizeSwipe',
        value: function canRecognizeSwipe() {
            return this.app.mode === PANEL_ZOOM_MODE;
        }

        /**
         * Sets the view port size to the width and height of the
         * container element.
         */

    }, {
        key: 'setViewPortSize',
        value: function setViewPortSize() {
            this.$element.width(this.$container.outerWidth());
            this.$element.height(this.$container.outerHeight());
        }

        /**
         * Sets where the tap zones are. In normal mode, it uses
         * the tap threshold to calculate a percentage of the screen
         * used for the left and right to be used as forward/back
         * with the leftover center area used as the menu toggle.
         *
         * If left hand mode, switches the left and right zones.
         */

    }, {
        key: 'setTapThresholds',
        value: function setTapThresholds() {
            if (this.LEFT_HAND_MODE) {
                this.PAGE_BACK_MIN = this.getWidth() - this.getWidth() * this.PAGE_TURN_THRESHOLD;
                this.PAGE_BACK_MAX = this.getWidth();
                this.PAGE_FORWARD_MIN = 0;
                this.PAGE_FORWARD_MAX = this.getWidth() * this.PAGE_TURN_THRESHOLD;
            } else {
                this.PAGE_FORWARD_MIN = this.getWidth() - this.getWidth() * this.PAGE_TURN_THRESHOLD;
                this.PAGE_FORWARD_MAX = this.getWidth();
                this.PAGE_BACK_MIN = 0;
                this.PAGE_BACK_MAX = this.getWidth() * this.PAGE_TURN_THRESHOLD;
            }
        }

        /**
         * Figures out what tap zone a pair of x and y coordinates are in.
         * returns the string constant associated with the correct tap zone.
         *
         * @param  {Number} x X coordinate
         * @param  {Number} y Y coordinate
         * @return {String}
         */

    }, {
        key: 'findTapZone',
        value: function findTapZone(x, y) {
            if (x >= this.PAGE_BACK_MIN && x <= this.PAGE_BACK_MAX) {
                return PAGE_BACK;
            }
            if (x >= this.PAGE_FORWARD_MIN && x <= this.PAGE_FORWARD_MAX) {
                return PAGE_FORWARD;
            }
            return TOGGLE_MAIN_MENU;
        }

        /**
         * Sets letterboxing style given leftover width and height to work with.
         * The left over size is divided in half to put letterboxes on both sides.
         * @param {Number}  width   Left over width
         * @param {Number}  height  Left over height
         * @param {Boolean} animate Whether or not to animate the letterboxes
         */

    }, {
        key: 'setLetterBoxing',
        value: function setLetterBoxing(width, height, animate) {
            var horizSize = height > 0 ? height / 2 : 0;
            var vertSize = width > 0 ? width / 2 : 0;
            var speed = this.settings.get('panelTransitions');
            animate = typeof animate === 'undefined' ? true : animate;
            this.$horizontalLetterBox.animate({
                height: horizSize
            }, {
                duration: animate ? speed : 0,
                easing: 'easeOutSine'
            });
            this.$verticalLetterBox.animate({
                width: vertSize
            }, {
                duration: animate ? speed : 0,
                easing: 'easeOutSine'
            });
        }

        /**
         * Sets the letterbox style by setting the opacity.
         */

    }, {
        key: 'setLetterBoxStyle',
        value: function setLetterBoxStyle() {
            var opacity = this.LETTERBOX_STYLE === LETTERBOX_STYLE_NONE ? LETTERBOX_STYLE_NONE_VALUE : this.LETTERBOX_STYLE === LETTERBOX_STYLE_OPAQUE ? LETTERBOX_STYLE_OPAQUE_VALUE : LETTERBOX_STYLE_SOLID_VALUE;

            this.$horizontalLetterBox.css('opacity', opacity);
            this.$verticalLetterBox.css('opacity', opacity);
        }

        /**
         * Gets the width of the viewport.
         *
         * @return {Number}
         */

    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this.$element.outerWidth();
        }

        /**
         * Gets the height of the viewport.
         *
         * @return {Number}
         */

    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this.$element.outerHeight();
        }

        /**
         * Shows a message in the viewport for the user. Disappears
         * after a set or passed in amount of time.
         *
         * @param  {String} text Message to display
         * @param  {Number} time Time to show message in ms
         */

    }, {
        key: 'message',
        value: function message(text, time) {
            var $messageContainer = $('.viewport__message');
            var $message = $('.message__text');

            time = typeof time === 'undefined' ? 3000 : time;

            clearTimeout(this.messageTimeout);

            $message.text(text);
            $messageContainer.removeClass('viewport__message--hide');
            this.messageTimeout = setTimeout(function () {
                clearTimeout(this.messageTimeout);
                $messageContainer.addClass('viewport__message--hide');
            }, time);
        }

        /**
         * On resize, make sure the viewport and tap thresholds have
         * been adjusted to fit the new size of the container.
         *
         * @param {Object} e Event object
         * @fires Panelz#resize
         */

    }, {
        key: 'onResize',
        value: function onResize(e) {
            this.setViewPortSize();
            this.setTapThresholds();
            /**
             * Resize event
             *
             * @event Panelz#resize
             * @type {Object}
             * @property {Object} Resize event
             */
            this.app.trigger('resize', e);
        }
    }]);

    return ViewPort;
}(EventClass);

;

var PANELZ_MARKUP = '\n    <div class="tutorial tutorial--hidden">\n        <div class="tutorial__panel">\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--skip" data-tutorial-done>Skip</button>\n            </div>\n            <div class="tutorial__content">\n                <div class="heading heading--lg">Welcome to Panelz</div>\n                <div class="heading heading--secondary">Here are some terms to get you started:</div>\n                <p><strong>Page Mode</strong> (default) - View the full page and all of its panels as you read.</p>\n                <p><strong>Panel Zoom Mode</strong> - This mode will guide you along your comic, panel by panel.</p>\n            </div>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" style="visibility: hidden">Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-next>Next</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--skip" data-tutorial-done>Skip</button>\n            </div>\n            <div class="tutorial__content">\n                <div class="tutorial__image">\n                    <video autoplay="autoplay" loop="loop" muted playsinline data-tutorial-image="tutorial-taps.mp4">\n                        <source type="video/mp4" />\n                    </video>\n                </div>\n                <p><strong>Left Tap</strong> - Navigates backwards one panel or page.</p>\n                <p><strong>Right Tap</strong> - Navigates forward one panel or page.</p>\n                <p><strong>Center Tap</strong> - Open or close the menu.</p>\n            </div>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-next>Next</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--skip" data-tutorial-done>Skip</button>\n            </div>\n            <div class="tutorial__content">\n                <div class="tutorial__image">\n                    <video autoplay="autoplay" loop="loop" muted playsinline data-tutorial-image="tutorial-double-taps.mp4">\n                        <source type="video/mp4" />\n                    </video>\n                </div>\n                <p><strong>Double tap</strong> - Switch between Page Mode and Panel Zoom Mode.</p>\n                <p>The panel that was tapped will be detected and zoomed on when switching to Panel Zoom mode. This option can be changed in the settings.\n            </div>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-next>Next</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--skip" data-tutorial-done>Skip</button>\n            </div>\n            <div class="tutorial__content">\n                <div class="heading heading--secondary">You can also swipe to navigate!</div>\n                <div class="tutorial__image">\n                    <video autoplay="autoplay" loop="loop" muted playsinline data-tutorial-image="tutorial-swipes.mp4">\n                        <source type="video/mp4" />\n                    </video>\n                </div>\n            </div>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                    <li class="tutorial__progress-step"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-next>Next</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <div class="tutorial__content">\n                <div class="heading heading--secondary">That\'s it!</div>\n                <p>Do you want to take a moment and customize a few Panel Zoom settings?</p>\n                <div class="tutorial__center-cta">\n                    <p><button class="tutorial__button" data-tutorial-next>Customize Settings</button></p>\n                    <p><button class="tutorial__button tutorial__button--link" data-tutorial-done>No thanks, I\'m ready to read!</button></p>\n                </div>\n            </div>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-done style="visibility: hidden">Done</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--skip" data-tutorial-done>Cancel</button>\n            </div>\n            <form class="tutorial__content">\n                <div class="heading heading--secondary heading--secondary-with-helper">Letterboxing</div>\n                <p>Set what style is used when blocking off a panel from the rest of the page.</p>\n                <div class="tutorial__image tutorial__image--small">\n                    <video autoplay="autoplay" loop="loop" muted playsinline>\n                        <source type="video/mp4" />\n                    </video>\n                </div>\n                <ul class="tutorial__menu">\n                    <li class="tutorial__menu-item">\n                        <div class="radio">\n                          <input type="radio" value="no" id="no-letterboxing-tut" name="letterboxing" data-tutorial-image="tutorial-letterboxing-none.mp4"/>\n                          <label for="no-letterboxing-tut" class="radio__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            No letterboxing\n                        </div>\n                    </li>\n                    <li class="tutorial__menu-item">\n                        <div class="radio">\n                          <input type="radio" value="opaque" id="opaque-letterboxing-tut" name="letterboxing" data-tutorial-image="tutorial-letterboxing-opaque.mp4"/>\n                          <label for="opaque-letterboxing-tut" class="radio__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Opaque letterboxing\n                        </div>\n                    </li>\n                    <li class="tutorial__menu-item">\n                        <div class="radio">\n                          <input type="radio" value="solid" id="solid-letterboxing-tut" name="letterboxing" data-tutorial-image="tutorial-letterboxing-solid.mp4"/>\n                          <label for="solid-letterboxing-tut" class="radio__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Solid letterboxing (default)\n                        </div>\n                    </li>\n                </ul>\n            </form>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-next>Next</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <form class="tutorial__content">\n                <div class="heading heading--secondary">Panel Transitions</div>\n                <div class="tutorial__image tutorial__image--small">\n                    <video autoplay="autoplay" loop="loop" muted playsinline>\n                        <source type="video/mp4" />\n                    </video>\n                </div>\n                <ul class="tutorial__menu">\n                    <li class="tutorial__menu-item">\n                        <div class="radio">\n                            <input type="radio" value="0" id="no-animation-tut" name="panelTransitions" data-tutorial-image="tutorial-animations-none.mp4"/>\n                            <label for="no-animation-tut" class="radio__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            No animations\n                        </div>\n                    </li>\n                    <li class="tutorial__menu-item">\n                        <div class="radio">\n                            <input type="radio" value="650" id="slow-animation-tut" name="panelTransitions" data-tutorial-image="tutorial-animations-slow.mp4"/>\n                            <label for="slow-animation-tut" class="radio__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Slow animations\n                        </div>\n                    </li>\n                    <li class="tutorial__menu-item">\n                        <div class="radio">\n                            <input type="radio" value="250" id="fast-animation-tut" name="panelTransitions" data-tutorial-image="tutorial-animations-fast.mp4"/>\n                            <label for="fast-animation-tut" class="radio__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Fast animations (default)\n                        </div>\n                    </li>\n                </ul>\n            </form>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                    <li class="tutorial__progress-step"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-next>Next</button>\n            </div>\n        </div>\n        <div class="tutorial__panel tutorial__panel--hidden">\n            <form class="tutorial__content">\n                <div class="heading heading--secondary">Additional Panel Zoom Settings</div>\n                <ul class="tutorial__menu">\n                    <li class="tutorial__menu-item">\n                        <div class="checkbox">\n                            <input type="checkbox" value="true" id="startInPanelZoom-tut" name="startInPanelZoom" />\n                            <label for="startInPanelZoom-tut" class="checkbox__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Start new books in Panel Zoom Mode\n                        </div>\n                    </li>\n                    <li class="tutorial__menu-item">\n                        <div class="checkbox">\n                            <input type="checkbox" value="true" id="detectPanelOnDoubleTap-tut" name="detectPanelOnDoubleTap" />\n                            <label for="detectPanelOnDoubleTap-tut" class="checkbox__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Detect panel on double tap\n                            <p class="tutorial__menu-helper-text">Zooms to the panel that is double tapped on when switching to Panel Zoom Mode, otherwise defaults to the first panel</p>\n                        </div>\n                    </li>\n                    <li class="tutorial__menu-item">\n                        <div class="checkbox">\n                          <input type="checkbox" value="true" id="showPageOnEnter-tut" name="showPageOnEnter" />\n                          <label for="showPageOnEnter-tut" class="checkbox__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Show full page on enter\n                        </div>\n                    </li>\n                    <li class="tutorial__menu-item">\n                        <div class="checkbox">\n                            <input type="checkbox" value="true" id="showPageOnExit-tut" name="showPageOnExit" />\n                            <label for="showPageOnExit-tut" class="checkbox__label"></label>\n                        </div>\n                        <div class="tutorial__menu-item-text">\n                            Show full page on exit\n                        </div>\n                    </li>\n                </ul>\n            </form>\n            <div class="tutorial__cta">\n                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button style="visibility: hidden">\n                <ul class="tutorial__progress">\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step"></li>\n                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>\n                </ul>\n                <button class="tutorial__button" data-tutorial-done>Done</button>\n            </div>\n        </div>\n    </div>\n    <div class="viewport">\n        <div class="viewport__interactable"></div>\n        <div class="viewport__loading loading">\n            <div class="loading__progress"><span data-loaded-size class="loading__size"></span></div>\n            <p>Loading Comic...</p>\n        </div>\n        <div class="letterbox">\n            <div class="letterbox__horizontal letterbox__horizontal--top"></div>\n            <div class="letterbox__horizontal letterbox__horizontal--bottom"></div>\n            <div class="letterbox__vertical letterbox__vertical--left"></div>\n            <div class="letterbox__vertical letterbox__vertical--right"></div>\n        </div>\n        <div class="viewport__message viewport__message--hide message">\n            <div class="message__text"></div>\n        </div>\n        <ul class="viewport__menu viewport__menu--top menu menu--top">\n            <li class="menu__list-item">\n                <div class="menu__text" data-book-title>Unknown Title</div>\n            </li>\n            <li class="menu__list-item">\n                <div class="menu__text">\n                    <span data-page-num>0</span>/<span data-total-pages>0</span>\n                </div>\n            </li>\n        </ul>\n        </ul>\n        <ul class="viewport__menu menu">\n            <li class="menu__list-item">\n                <div href="#" class="menu__option" data-open-pane="pages">\n                    <i class="fa fa-clone fa-flip-horizontal menu__icon" aria-hidden="true"></i>\n                    <span class="menu__label">Pages</span>\n                </div>\n            </li>\n            <li class="menu__list-item">\n                <div class="menu__option menu__option--mode">\n                    Panel<br />Zoom\n                </div>\n            </li>\n            <li class="menu__list-item">\n                <div class="menu__option" data-open-pane="settings">\n                    <i class="fa fa-sliders menu__icon" aria-hidden="true"></i>\n                    <span class="menu__label">Settings</span>\n                </div>\n            </li>\n        </ul>\n        <div class="panes">\n            <div class="panes__pane pane pane--pages pane--hidden">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Pages</span>\n                        <span class="pane__close" data-close>\n                            <i class="fa fa-times" aria-hidden="true"></i>\n                        </span>\n                    </div>\n                    <div class="pane__content">\n                        <ul class="page-list">\n                            <li class="page-list__page page-list__page--template" data-skip-to-page="">\n                                <img src="" class="page-list__image" />\n                                <span class="page-list__number"></span>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--settings pane--full pane--hidden">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Settings</span>\n                        <span class="pane__close" data-close>\n                            <i class="fa fa-times" aria-hidden="true"></i>\n                        </span>\n                    </div>\n                    <div class="pane__content">\n                        <div class="pane__heading">Panel Zoom</div>\n                        <ul class="pane__menu">\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Start new books in Panel Zoom Mode</p>\n                                </div>\n                                <div class="checkbox">\n                                  <input type="checkbox" value="true" id="startInPanelZoom" name="startInPanelZoom" />\n                                  <label for="startInPanelZoom" class="checkbox__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-open-pane="animations">\n                                <div class="pane__text">\n                                    <p class="pane__option">Animate Transitions</p>\n                                    <p class="pane__helper-text">Animate panel-to-panel transitions in Panel Zoom mode</p>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-open-pane="letterboxing">\n                                <div class="pane__text">\n                                    <p class="pane__option">Letterboxing</p>\n                                    <p class="pane__helper-text">Use bars to mask content outside of the current panel</p>\n                                </div>\n                            </li>\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Detect panel on double tap</p>\n                                    <p class="pane__helper-text">Zooms to the panel that is double tapped on when switching to Panel Zoom Mode</p>\n                                </div>\n                                <div class="checkbox">\n                                  <input type="checkbox" value="true" id="detectPanelOnDoubleTap" name="detectPanelOnDoubleTap" />\n                                  <label for="detectPanelOnDoubleTap" class="checkbox__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Show page on enter</p>\n                                    <p class="pane__helper-text">Show full page on transitioning to a new page</p>\n                                </div>\n                                <div class="checkbox">\n                                  <input type="checkbox" value="true" id="showPageOnEnter" name="showPageOnEnter" />\n                                  <label for="showPageOnEnter" class="checkbox__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Show page on exit</p>\n                                    <p class="pane__helper-text">Show full page before transitioning to a new page</p>\n                                </div>\n                                <div class="checkbox">\n                                  <input type="checkbox" value="true" id="showPageOnExit" name="showPageOnExit" />\n                                  <label for="showPageOnExit" class="checkbox__label"></label>\n                                </div>\n                            </li>\n                        </ul>\n                        <div class="pane__heading">General</div>\n                        <ul class="pane__menu">\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Left-Handed Mode</p>\n                                    <p class="pane__helper-text">Tap the left side of your screen to advance pages or panels</p>\n                                </div>\n                                <div class="checkbox">\n                                  <input type="checkbox" value="true" id="leftHanded" name="leftHandMode" />\n                                  <label for="leftHanded" class="checkbox__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item">\n                                <div class="pane__text">\n                                    <p class="pane__option">Page Change Message</p>\n                                    <p class="pane__helper-text">Shows a message when changing pages</p>\n                                </div>\n                                <div class="checkbox">\n                                  <input type="checkbox" value="true" id="showPageChangeMessage" name="showPageChangeMessage" />\n                                  <label for="showPageChangeMessage" class="checkbox__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-open-pane="tutorial">\n                                <div class="pane__text">\n                                    <p class="pane__option">Tutorial</p>\n                                    <p class="pane__helper-text">Toggles the tutorial screens on or off</p>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-open-pane="reset">\n                                <div class="pane__text">\n                                    <p class="pane__option">Reset</p>\n                                    <p class="pane__helper-text">Resets all app settings to their defaults</p>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-open-pane="clearData">\n                                <div class="pane__text">\n                                    <p class="pane__option">Clear Data</p>\n                                    <p class="pane__helper-text">Clears all data, including local storage and all user settings</p>\n                                </div>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--tutorial pane--modal pane--hidden" data-readable="Tutorial">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Tutorial</span>\n                    </div>\n                    <div class="pane__content">\n                        <ul class="pane__menu">\n                            <li class="pane__item" data-readable="shown">\n                                <div class="pane__text">\n                                    <p class="pane__option">Show</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="true" id="show-tutorial" name="showTutorial" />\n                                  <label for="show-tutorial" class="radio__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-readable="hidden">\n                                <div class="pane__text">\n                                    <p class="pane__option">Hide</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="false" id="hide-tutorial" name="showTutorial" />\n                                  <label for="hide-tutorial" class="radio__label"></label>\n                                </div>\n                            </li>\n                        </ul>\n                        <div class="pane__actions">\n                            <button class="pane__button" data-close>Cancel</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--letterboxing pane--modal pane--hidden" data-readable="Letterboxing">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Letterboxing</span>\n                    </div>\n                    <form class="pane__content">\n                        <ul class="pane__menu">\n                            <li class="pane__item" data-readable="none">\n                                <div class="pane__text">\n                                    <p class="pane__option">No letterboxing</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="no" id="no-letterboxing" name="letterboxing" />\n                                  <label for="no-letterboxing" class="radio__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-readable="opaque">\n                                <div class="pane__text">\n                                    <p class="pane__option">Opaque letterboxing</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="opaque" id="opaque-letterboxing" name="letterboxing" />\n                                  <label for="opaque-letterboxing" class="radio__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-readable="solid">\n                                <div class="pane__text">\n                                    <p class="pane__option">Solid letterboxing (default)</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="solid" id="solid-letterboxing" name="letterboxing"/>\n                                  <label for="solid-letterboxing" class="radio__label"></label>\n                                </div>\n                            </li>\n                        </ul>\n                        <div class="pane__actions">\n                            <button class="pane__button" data-close>Cancel</button>\n                        </div>\n                    </form>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--animations pane--modal pane--hidden" data-readable="Animate Transitions">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Animate Transitions</span>\n                    </div>\n                    <form class="pane__content">\n                        <ul class="pane__menu">\n                            <li class="pane__item" data-readable="none">\n                                <div class="pane__text">\n                                    <p class="pane__option">No animation</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="0" id="no-animation" name="panelTransitions" />\n                                  <label for="no-animation" class="radio__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-readable="slow">\n                                <div class="pane__text">\n                                    <p class="pane__option">Slow animations</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="650" id="slow-animation" name="panelTransitions" />\n                                  <label for="slow-animation" class="radio__label"></label>\n                                </div>\n                            </li>\n                            <li class="pane__item" data-readable="fast">\n                                <div class="pane__text">\n                                    <p class="pane__option">Fast animations (default)</p>\n                                </div>\n                                <div class="radio">\n                                  <input type="radio" value="250" id="fast-animation" name="panelTransitions" />\n                                  <label for="fast-animation" class="radio__label"></label>\n                                </div>\n                            </li>\n                        </ul>\n                        <div class="pane__actions">\n                            <button class="pane__button" data-close>Cancel</button>\n                        </div>\n                    </form>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--reset pane--modal pane--hidden">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Reset Settings</span>\n                    </div>\n                    <div class="pane__content">\n                        <p>Are you sure you want to reset to the default settings?</p>\n                        <div class="pane__actions">\n                            <button class="pane__button" data-close>Cancel</button>\n                            <button class="pane__button" data-close data-reset-settings>Reset</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="panes__pane pane pane--clearData pane--modal pane--hidden">\n                <div class="pane__container">\n                    <div class="pane__header">\n                        <span>Clear Data</span>\n                    </div>\n                    <div class="pane__content">\n                        <p>Are you sure you want to clear all application data?</p>\n                        <div class="pane__actions">\n                            <button class="pane__button" data-close>Cancel</button>\n                            <button class="pane__button" data-close data-clear-data>Clear</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n';