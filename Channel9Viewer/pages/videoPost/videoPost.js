// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var originalUrl;

    function openInBrowser(args) {
        Windows.System.Launcher.launchUriAsync(new Windows.Foundation.Uri(originalUrl));
    }

    var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
    dataTransferManager.addEventListener("datarequested", shareArticleHandler);

    function shareArticleHandler(arg) {
        var requestData = arg.request.data;

        requestData.properties.title = "Sharing a Channel 9 video";
        //var videoUrl = document.getElementById("videoPlayback").getAttribute("src");
        //requestData.setUri(new Windows.Foundation.Uri(videoUrl));
        var description = document.getElementById("description").innerHTML;
        description = "For the original article " + "<a href='" + originalUrl + "'>click here.</a>" + description;

        var htmlDesc = Windows.ApplicationModel.DataTransfer.HtmlFormatHelper.createHtmlFormat(description);
        requestData.setHtmlFormat(htmlDesc);
    }

    WinJS.UI.Pages.define("/pages/videoPost/videoPost.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            originalUrl = options.data.link;
            WinJS.Binding.processAll(null, options.data);

            document.getElementById("browserCommand").addEventListener("click", openInBrowser, false);
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />
            /// <param name="viewState" value="Windows.UI.ViewManagement.ApplicationViewState" />
            /// <param name="lastViewState" value="Windows.UI.ViewManagement.ApplicationViewState" />

            // TODO: Respond to changes in viewState.
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            stopPlayback();
        }
    });

    function stopPlayback() {
        var video = document.getElementById("videoPlayback");
        video.pause();
    }
})();
