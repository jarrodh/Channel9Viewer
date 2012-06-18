(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {

        itemInvoked: function (args) {
            //var groupKey = FreshContent.groups.
            var selectedPost = FreshContent.articles.getItem(args.detail.itemIndex);
            WinJS.Navigation.navigate("/pages/videoPost/videoPost.html", selectedPost);
        },

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            var listView = element.querySelector("#freshContent").winControl;
            listView.itemDataSource = FreshContent.articles.dataSource;
            listView.itemTemplate = element.querySelector("#freshItemTemplate");
            listView.oniteminvoked = this.itemInvoked.bind(this);
        }
    });
})();