angular.module('starter', ['ionic',  'ngCordova', 'starter.controllers', 'starter.services','ionic-material', 'ionMdInput',  'satellizer', 'angularPayments'])

.run(function($ionicPlatform , $ionicHistory, $ionicPopup, $cordovaNetwork, $rootScope) {

    $ionicPlatform.ready(function() {

        // Check for network [internet] connection
        if(window.Connection) {
          if(navigator.connection.type == Connection.NONE) {
            $ionicPopup.confirm({
              title: 'No Internet Connection',
              content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
            })
            .then(function(result) {
              if(!result) {
                ionic.Platform.exitApp();
              }
            });
          }
        }
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

    .run(function($rootScope, $ionicPlatform, $ionicHistory, $cordovaToast){
        $ionicPlatform.registerBackButtonAction(function(e){
            if ($rootScope.backButtonPressedOnceToExit) {
                ionic.Platform.exitApp();
            }

            else if ($ionicHistory.backView()) {
                $ionicHistory.goBack();
            }
            else {
                $rootScope.backButtonPressedOnceToExit = true;
                $cordovaToast.showShortCenter("Press back button again to exit",function(a){},function(b){}
                );
                setTimeout(function(){
                    $rootScope.backButtonPressedOnceToExit = false;
                },2000);
            }
            e.preventDefault();
            return false;
        },101);

    })


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $authProvider) {


    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    $stateProvider

    // setup an abstract state for the tabs directive

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })


    .state('app.about', {
        url: '/about',
        views: {
            'menuContent': {
                templateUrl: 'templates/about.html',
                controller: 'AboutCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.homepage', {
        url: '/homepage',
        views: {
            'menuContent': {
                templateUrl: 'templates/homepage.html',
                controller: 'HomepageCtrl'
            },
        }
    })

    .state('app.technology', {
        url:'/technology',
            views: {
                'menuContent': {
                    templateUrl: 'templates/technology.html',
                    controller: 'TechnologyCtrl'
                },
            }
        })

.state('app.tech_articles', {
        url:'/tech_articles',
            views: {
                'menuContent': {
                    templateUrl: 'templates/tech_articles.html',
                    controller: 'TechArticlesCtrl'
                },
            }
        })


    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.logout', {
        url: '/logout',
        views: {
            'menuContent': {
                templateUrl: 'templates/logout.html',
                controller: 'LogoutCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.recover_password', {
        url: '/recover_password',
        views: {
            'menuContent': {
                templateUrl: 'templates/recover_password.html',
                controller: 'recoverpwdCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    });


        

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');

})



