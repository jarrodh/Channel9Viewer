(function () {
    "use strict";

    var HOME_FEED = "http://channel9.msdn.com/Feeds/RSS";
    var videoPosts = new WinJS.Binding.List();

    function getBlogPosts() {
        //var title;
        //var feedUri = new Windows.Foundation.Uri(HOME_FEED);
        //var client = new Windows.Web.Syndication.SyndicationClient();

        //client.retrieveFeedAsync(feedUri).done(function (feed) {
        //    title = feed.title.text;
        //});

        WinJS.xhr({ url: HOME_FEED }).then(function (response) {
            var items = response.responseXML.querySelectorAll("item");
            var itemCount = items.length;
            for (var i = 0; i < itemCount; i++) {
                var item = items[i];
                var article = {};

                article.title = item.querySelector("title").textContent;
                article.published = item.querySelector("pubDate").textContent;
                article.link = item.querySelector("link").textContent;
                article.video = item.querySelector("enclosure") ? item.querySelector("enclosure").getAttribute("url") : null;
                var thumbs = item.querySelectorAll("thumbnail");
                if (thumbs.length > 1) {
                    article.thumbnail = thumbs[1].getAttribute("url");
                }
                else {
                    article.thumbnail = thumbs[0].getAttribute("url");
                }
                article.description = item.querySelector("description").textContent;
                videoPosts.push(article);
            }
        }).done(function () {
            ExtendedSplash.remove();
            return videoPosts;
        });
    }

    getBlogPosts();
    WinJS.Namespace.define("FreshContent", {
        articles: videoPosts
        //articleGroups:
    });
})();