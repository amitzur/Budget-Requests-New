/**
 * Created by JetBrains RubyMine.
 * User: amit
 * Date: 3/31/12
 * Time: 7:19 PM
 * To change this template use File | Settings | File Templates.
 */
(function(){window.perform_acrobat_detection=function(){var a={name:null,acrobat:null,acrobat_ver:null};navigator&&navigator.userAgent.toLowerCase().indexOf("chrome")>-1?a.name="chrome":navigator&&navigator.userAgent.toLowerCase().indexOf("msie")>-1?a.name="ie":navigator&&navigator.userAgent.toLowerCase().indexOf("firefox")>-1?a.name="firefox":navigator&&navigator.userAgent.toLowerCase().indexOf("msie")>-1&&(a.name="other");try{if(a.name=="ie"){var b=null;try{b=new ActiveXObject("AcroPDF.PDF")}catch(c){}if(!b)try{b=new ActiveXObject("PDF.PdfCtrl")}catch(c){}if(!b)return a.acrobat==null,a;var d=b.GetVersions().split(",");d=d[0].split("="),a.acrobat="installed",a.acrobat_ver=parseFloat(d[1])}else if(a.name=="chrome"){for(key in navigator.plugins)if(navigator.plugins[key].name=="Chrome PDF Viewer"||navigator.plugins[key].name=="Adobe Acrobat")a.acrobat="installed",a.acrobat_ver=parseInt(navigator.plugins[key].version)||"Chome PDF Viewer"}else if(navigator.plugins!=null){var e=navigator.plugins["Adobe Acrobat"];if(e==null)return a.acrobat=null,a;a.acrobat="installed",a.acrobat_ver=parseInt(e.version[0])}}catch(c){a.acrobat_ver=null}return a}})();