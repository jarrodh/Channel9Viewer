// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;

    var splash = null; // Variable to hold the splash screen object.
    var coordinates = { x: 0, y: 0, width: 0, height: 0 }; // Object to store splash screen image coordinates. It will be initialized during activation.

    WinJS.strictProcessing();

    //function onSplashScreenDismissed() {
    //    // Include code to be executed when the system has transitioned from the splash screen to the extended splash screen (application's first view).
    //    dismissed = true;

    //    //setTimeout(function () {
    //    //    ExtendedSplash.remove();
    //    //}, 2000);
        
    //}

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.

                // Retrieve splash screen object
                splash = args.detail.splashScreen;
                // Retrieve the window coordinates of the splash screen image.
                coordinates = splash.imageLocation;
                // Create and display the extended splash screen using the splash screen object and the same image specified for the system splash screen.
                ExtendedSplash.show(splash, "/images/splashscreen.png");

                // Register an event handler to be executed when the splash screen has been dismissed.
                //splash.addEventListener("dismissed", onSplashScreenDismissed, false);
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }
            args.setPromise(WinJS.UI.processAll().then(function () {
                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    return nav.navigate(Application.navigator.home);
                }
            }));
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();
})();
