define("text",["module"],function(e){"use strict";var t,n,i,r,o,a=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],l=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,s=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,c="undefined"!=typeof location&&location.href,u=c&&location.protocol&&location.protocol.replace(/\:/,""),d=c&&location.hostname,f=c&&(location.port||void 0),g={},p=e.config&&e.config()||{};return t={version:"2.0.10",strip:function(e){if(e){e=e.replace(l,"");var t=e.match(s);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:p.createXhr||function(){var e,t,n;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(t=0;3>t;t+=1){n=a[t];try{e=new ActiveXObject(n)}catch(i){}if(e){a=[n];break}}return e},parseName:function(e){var t,n,i,r=!1,o=e.indexOf("."),a=0===e.indexOf("./")||0===e.indexOf("../");return-1!==o&&(!a||o>1)?(t=e.substring(0,o),n=e.substring(o+1,e.length)):t=e,i=n||t,o=i.indexOf("!"),-1!==o&&(r="strip"===i.substring(o+1),i=i.substring(0,o),n?n=i:t=i),{moduleName:t,ext:n,strip:r}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,i,r){var o,a,l,s=t.xdRegExp.exec(e);return s?(o=s[2],a=s[3],a=a.split(":"),l=a[1],a=a[0],!(o&&o!==n||a&&a.toLowerCase()!==i.toLowerCase()||(l||a)&&l!==r)):!0},finishLoad:function(e,n,i,r){i=n?t.strip(i):i,p.isBuild&&(g[e]=i),r(i)},load:function(e,n,i,r){if(r.isBuild&&!r.inlineText)return void i();p.isBuild=r.isBuild;var o=t.parseName(e),a=o.moduleName+(o.ext?"."+o.ext:""),l=n.toUrl(a),s=p.useXhr||t.useXhr;return 0===l.indexOf("empty:")?void i():void(!c||s(l,u,d,f)?t.get(l,function(n){t.finishLoad(e,o.strip,n,i)},function(e){i.error&&i.error(e)}):n([a],function(e){t.finishLoad(o.moduleName+"."+o.ext,o.strip,e,i)}))},write:function(e,n,i,r){if(g.hasOwnProperty(n)){var o=t.jsEscape(g[n]);i.asModule(e+"!"+n,"define(function () { return '"+o+"';});\n")}},writeFile:function(e,n,i,r,o){var a=t.parseName(n),l=a.ext?"."+a.ext:"",s=a.moduleName+l,c=i.toUrl(a.moduleName+l)+".js";t.load(s,i,function(n){var i=function(e){return r(c,e)};i.asModule=function(e,t){return r.asModule(e,c,t)},t.write(e,s,i,o)},o)}},"node"===p.env||!p.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]?(n=require.nodeRequire("fs"),t.get=function(e,t,i){try{var r=n.readFileSync(e,"utf8");0===r.indexOf("\ufeff")&&(r=r.substring(1)),t(r)}catch(o){i(o)}}):"xhr"===p.env||!p.env&&t.createXhr()?t.get=function(e,n,i,r){var o,a=t.createXhr();if(a.open("GET",e,!0),r)for(o in r)r.hasOwnProperty(o)&&a.setRequestHeader(o.toLowerCase(),r[o]);p.onXhr&&p.onXhr(a,e),a.onreadystatechange=function(t){var r,o;4===a.readyState&&(r=a.status,r>399&&600>r?(o=new Error(e+" HTTP status: "+r),o.xhr=a,i(o)):n(a.responseText),p.onXhrComplete&&p.onXhrComplete(a,e))},a.send(null)}:"rhino"===p.env||!p.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?t.get=function(e,t){var n,i,r="utf-8",o=new java.io.File(e),a=java.lang.System.getProperty("line.separator"),l=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(o),r)),s="";try{for(n=new java.lang.StringBuffer,i=l.readLine(),i&&i.length()&&65279===i.charAt(0)&&(i=i.substring(1)),null!==i&&n.append(i);null!==(i=l.readLine());)n.append(a),n.append(i);s=String(n.toString())}finally{l.close()}t(s)}:("xpconnect"===p.env||!p.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(i=Components.classes,r=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),o="@mozilla.org/windows-registry-key;1"in i,t.get=function(e,t){var n,a,l,s={};o&&(e=e.replace(/\//g,"\\")),l=new FileUtils.File(e);try{n=i["@mozilla.org/network/file-input-stream;1"].createInstance(r.nsIFileInputStream),n.init(l,1,0,!1),a=i["@mozilla.org/intl/converter-input-stream;1"].createInstance(r.nsIConverterInputStream),a.init(n,"utf-8",n.available(),r.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),a.readString(n.available(),s),a.close(),n.close(),t(s.value)}catch(c){throw new Error((l&&l.path||"")+": "+c)}}),t}),define("text!QuickViewTemplate.html",[],function(){return'<div id="quick-view-container">\n    <div class="preview-content">\n    </div>\n</div>'}),define("main",["require","exports","module","text!QuickViewTemplate.html"],function(e,t,n){"use strict";function i(){Q&&(Q.visible?(Q.marker.clear(),E.empty(),w.hide(),w.removeClass("active")):window.clearTimeout(Q.hoverTimer),Q=null)}function r(e,t,n,i){var r=w.outerWidth(),o=n-w.outerHeight()-B,a=t-r/2,l={top:o,left:a-W,height:w.outerHeight()+B,width:r+2*W},s=N.getElementClipSize($(e.getRootElement()),l);F.hide(),s.left>0?a+=s.left:s.right>0&&(a-=s.right),s.top>0?(o=i+B,w.removeClass("preview-bubble-above").addClass("preview-bubble-below")):w.removeClass("preview-bubble-below").addClass("preview-bubble-above"),w.css({left:a,top:o}).addClass("active")}function o(e,t){var n=e.offset();return t.clientX>=n.left&&t.clientX<=n.left+e.width()&&t.clientY>=n.top&&t.clientY<=n.top+e.height()}function a(e,t,n,o){var a,l,s=e._codeMirror,c=/url\(([^\)]*)\)/gi;if("string"===n.type)a=n.string;else for(l=c.exec(o);l&&!(t.ch<l.index);){if(t.ch<=l.index+l[0].length){a=l[1];break}l=c.exec(o)}if(!a)return null;a=a.replace(/(^['"])|(['"]$)/g,"");var u,d,f,g=e.document.file.fullPath,p=U.parseUrl(a),v=""!==p.protocol&&-1!==D.indexOf(p.protocol.trim().toLowerCase()),m=p.filenameExtension.replace(/^\./,""),h=X.getLanguageForExtension(m),b=h&&h.getId(),x="image"===b||"svg"===b;if(v&&(x||!m&&C)?f=a:!v&&x&&(f=O.getUrl(A.join(T.getDirectoryPath(g),a))),!f)return null;l?(u={line:t.line,ch:l.index},d={line:t.line,ch:l.index+l[0].length}):(u={line:t.line,ch:n.start},d={line:t.line,ch:n.end});var M="<div class='image-preview'>    <img src=\""+f+'"></div>',y=s.charCoords(u),k=(s.charCoords(d).left-y.left)/2+y.left,I=function(){w.hide(),w.find(".image-preview > img").on("load",function(){E.append("<div class='img-size'>"+this.naturalWidth+" &times; "+this.naturalHeight+" "+_.UNIT_PIXELS+"</div>"),w.show(),r(e,Q.xpos,Q.ytop,Q.ybot)}).on("error",function(e){e.preventDefault(),i()})};return{start:u,end:d,content:M,onShow:I,xpos:k,ytop:y.top,ybot:y.bottom,_imgPath:f}}function l(e,t,n){var i=e.document.getLine(t.line),r=a(e,t,n,i);return r?(r.visible=!1,r.editor=e,r):null}function s(e){var t=I.getCurrentFullEditor();if(t&&e){var n,i,r=t.getInlineWidgets();for(n=0;n<r.length;n++){var a=r[n].editor&&$(r[n].editor.getRootElement()),l=r[n].$htmlContent;if(a&&o(a,e)){i=r[n].editor;break}if(l&&o(l,e))return}return i||o($(t.getRootElement()),e)&&(i=t),i}}function c(e,t){var n,o;if(e||(e=s(x)),!e||!e._codeMirror)return void i();o=e._codeMirror;var a=o.coordsChar({left:x.clientX,top:x.clientY});a.ch>=e.document.getLine(a.line).length||(t?Q=t:(n=R.getTokenAt(o,a),Q=$.extend({},Q,l(e,a,n))),Q&&Q.start&&Q.end&&(Q.marker=o.markText(Q.start,Q.end,{className:"quick-view-highlight"}),E.append(Q.content),w.show(),Q.visible=!0,Q.onShow?Q.onShow():r(e,Q.xpos,Q.ytop,Q.ybot)))}function u(){if(M=null,x){var e=!1,t=null;if(Q&&Q.visible){if(t=s(x),t&&t._codeMirror){var n=t._codeMirror,r=n.coordsChar({left:x.clientX,top:x.clientY});if(Q.start&&Q.end&&t.posWithinRange(r,Q.start,Q.end,!0)&&r.ch<t.document.getLine(r.line).length)return}e=!0}i(),Q={},Q.hoverTimer=window.setTimeout(function(){c(t)},e?0:V)}}function d(e){if(x=null,b){if(e.which)return void i();x={clientX:e.clientX,clientY:e.clientY},M||(M=window.requestAnimationFrame(u))}}function f(e,t,n){i(),n&&n.document&&n.document.off("change",i),t&&t.document&&t.document.on("change",i)}function g(){y.get(H).setChecked(b)}function p(e,t){C!==e&&(C=e,t||(q.set("extensionlessImagePreview",b),q.save()))}function v(e,t){if(b!==e){b=e;var n=$("#editor-holder")[0];b?(n.addEventListener("mousemove",d,!0),n.addEventListener("scroll",i,!0),n.addEventListener("mouseout",i,!0),f(null,I.getActiveEditor(),null),I.on("activeEditorChange",f)):(n.removeEventListener("mousemove",d,!0),n.removeEventListener("scroll",i,!0),n.removeEventListener("mouseout",i,!0),f(null,null,I.getActiveEditor()),I.off("activeEditorChange",f),i()),t||(q.set("enabled",b),q.save())}g()}function m(){v(!b)}function h(e){i(),x={clientX:e.xpos,clientY:Math.floor((e.ybot+e.ytop)/2)},c(e.editor,e)}var b,w,E,x,M,C,y=(brackets.getModule("utils/ColorUtils"),brackets.getModule("command/CommandManager")),k=brackets.getModule("command/Commands"),I=(brackets.getModule("language/CSSUtils"),brackets.getModule("editor/EditorManager")),L=brackets.getModule("utils/ExtensionUtils"),T=brackets.getModule("file/FileUtils"),P=brackets.getModule("command/Menus"),S=brackets.getModule("preferences/PreferencesManager"),X=brackets.getModule("language/LanguageManager"),_=brackets.getModule("strings"),N=brackets.getModule("utils/ViewUtils"),R=brackets.getModule("utils/TokenUtils"),U=brackets.getModule("thirdparty/path-utils/path-utils"),A=brackets.getModule("filesystem/impls/filer/BracketsFiler").Path,O=brackets.getModule("filesystem/impls/filer/UrlCache"),F=brackets.getModule("editor/InlineProviderIndicator"),j=e("text!QuickViewTemplate.html"),q=null,H="view.enableQuickView",V=350,B=15,W=5,D=["data:","http:","https:","ftp:","file:"];q=S.getExtensionPrefs("quickview"),q.definePreference("enabled","boolean",!0,{description:_.DESCRIPTION_QUICK_VIEW_ENABLED}),q.definePreference("extensionlessImagePreview","boolean",!0,{description:_.DESCRIPTION_EXTENSION_LESS_IMAGE_PREVIEW});var Q=null;w=$(j).appendTo($("body")),E=w.find(".preview-content"),L.loadStyleSheet(n,"QuickView.less"),y.register(_.CMD_ENABLE_QUICK_VIEW,H,m),P.getMenu(P.AppMenuBar.VIEW_MENU).addMenuItem(H,null,P.AFTER,k.VIEW_TOGGLE_INSPECTION),v(q.get("enabled"),!0),p(q.get("extensionlessImagePreview"),!0),q.on("change","enabled",function(){v(q.get("enabled"),!0)}),q.on("change","extensionlessImagePreview",function(){p(q.get("extensionlessImagePreview"))}),t._queryPreviewProviders=l,t._forceShow=h});