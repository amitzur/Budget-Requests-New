/**
 * Created by JetBrains RubyMine.
 * User: amit
 * Date: 3/31/12
 * Time: 7:19 PM
 * To change this template use File | Settings | File Templates.
 */
(function() {

window.perform_acrobat_detection = function() {
    //
    // The returned object
    //
    var browser_info = {
        name: null,
        acrobat : null,
        acrobat_ver : null
    };

    if(navigator && (navigator.userAgent.toLowerCase()).indexOf("chrome") > -1) browser_info.name = "chrome";
    else if(navigator && (navigator.userAgent.toLowerCase()).indexOf("msie") > -1) browser_info.name = "ie";
    else if(navigator && (navigator.userAgent.toLowerCase()).indexOf("firefox") > -1) browser_info.name = "firefox";
    else if(navigator && (navigator.userAgent.toLowerCase()).indexOf("msie") > -1) browser_info.name = "other";


    try {
        if(browser_info.name == "ie") {
            var control = null;

            //
            // load the activeX control
            //
            try
            {
                // AcroPDF.PDF is used by version 7 and later
                control = new ActiveXObject('AcroPDF.PDF');
            }
            catch (e){}

            if (!control)
            {
                try
                {
                    // PDF.PdfCtrl is used by version 6 and earlier
                    control = new ActiveXObject('PDF.PdfCtrl');
                }
                catch (e) {}
            }

            if(!control)
            {
                browser_info.acrobat == null;
                return browser_info;
            }

            var version = control.GetVersions().split(',');
            version = version[0].split('=');
            browser_info.acrobat = "installed";
            browser_info.acrobat_ver = parseFloat(version[1]);
        }
        else if(browser_info.name == "chrome")
        {
            for(key in navigator.plugins)
            {
                if(navigator.plugins[key].name == "Chrome PDF Viewer" || navigator.plugins[key].name == "Adobe Acrobat")
                {
                    browser_info.acrobat = "installed";
                    browser_info.acrobat_ver = parseInt(navigator.plugins[key].version) || "Chome PDF Viewer";
                }
            }
        }
        //
        // NS3+, Opera3+, IE5+ Mac, Safari (support plugin array):  check for Acrobat plugin in plugin array
        //
        else if(navigator.plugins != null)
        {
            var acrobat = navigator.plugins['Adobe Acrobat'];
            if(acrobat == null)
            {
                browser_info.acrobat = null;
                return browser_info;
            }
            browser_info.acrobat = "installed";
            browser_info.acrobat_ver = parseInt(acrobat.version[0]);
        }


    }
    catch(e)
    {
        browser_info.acrobat_ver = null;
    }

    return browser_info;
}
})();