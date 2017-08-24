
'use strict';
angular.module('starter.controllers', ['ionic', 'ngCordova'])


.controller('AppCtrl', function($rootScope, $scope, $http, $ionicModal, $ionicPopover, $timeout, $state) {
    //$scope.showspiner = false;
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.user = function() {
      if(!$rootScope.currentUser){
        $state.go('app.login');
      }else{
        $scope.user = $rootScope.currentUser;
      }
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, ionicMaterialMotion, $location, $ionicHistory, $http, $state, $auth, $rootScope) {

	$scope.loginData = {};
	$scope.loginError = true;
	$scope.loginErrorText;
    $scope.loginData.username = 'ericsbet@gmail.com';
    $scope.loginData.password = '1234';
    $scope.$watch('loginData.username + loginData.password', function(newValue,oldValue) {
        if(newValue){
            $scope.loginErrorText;

        }else{
            //console.log('they are the same');
        }
    });

    $scope.login = function() {
        $scope.loginErrorText;
        $scope.showspiner = true;


       $http.post('http://adriansafety.websandbox.nl/authenticate',{
            'username': $scope.loginData.username,
            'password': $scope.loginData.password,

        }).success(function(data, status, headers, config) {

            $rootScope.currentUser = data.user;
            if($rootScope.currentUser){
                $state.go('app.homepage');

            }else{
                $scope.loginErrorText = "Incorrect Credentials, Please try again!";
                $scope.showspiner = false;
            }

        }).error(function(data, status) {
				 $scope.loginErrorText = "Incorrect Credentials, Please try again!";
                $scope.showspiner = false;
        });

    }
    $scope.$parent.clearFabs();

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 1);

    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    // Set Ink
    ionicMaterialInk.displayEffect();
})


.controller('MenuCtrl', function($scope, $ionicPopup){
	$scope.showPopupShare = function() {
	  var popup = $ionicPopup.show({
		templateUrl: 'templates/menu/share.tpl',
		title: 'Invite using',
		cssClass: 'popup-share',
		scope: $scope,
		buttons: [
		  { text: 'Cancel' }
		]
	  });
	$scope.closePopupShare = function(){popup.close()};
	};
})


.controller('recoverpwdCtrl', function($scope, $http, $state, $ionicPopup, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
  
    $scope.data = {};

    $scope.requestpwd = function(){
        var alertpop = $ionicPopup.alert({
            title:'Contact Admin',
            template:'Please contact admin to reset your password',
            okText:'Ok',
        });
        alertpop.then(function (res) {
           if(res){
               //do something
            } else{

            }
        })
      $http.post('http://adrian.websandbox.nl/api/requestpwd',{
        'email' : $scope.data.email,
      }
      ).success(function(data, status, headers, config) {
        //$scope.user_requestpwd = data.user;
        if(data.user){
          $scope.user_requestpwd = "Password sent to your email.";
        }else{
          $scope.user_requestpwd = "Email you provided does not exist, re-type email or contact admin.";
        }

      }).error(function(data, status) { 
      //$scope.errors = data.errors;
      });

    }


    $scope.$parent.clearFabs();

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('SignupCtrl', function($scope, $http, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Header
        $scope.faults = [];
        $scope.success =false;

        $scope.pwdmatch =false;
        $scope.password = "";
        $scope.re_password = "";

        $scope.$watch('password + re_password', function() {
            if($scope.password === $scope.re_password){
                $scope.pwdmatch =true;
            }else{
                $scope.pwdmatch =false;
            }
        });


        $scope.signup = function(){

            $http.post('http://sparkcommunication.websandbox.nl/api/addnewuser',{
                'fname': $scope.fname,
                'lname': $scope.lname,
                'mobile': $scope.mobile,
                'idno': $scope.idno,
                'region': $scope.signup.region,
                'email': $scope.email,
                'password': $scope.password,

            }).success(function(data, status, headers, config) {
                $scope.registereduser = data.registereduser;
                $scope.success =true;

            }).error(function(data, status) {
                //$scope.errors = data.errors;
            });
        }

        $scope.$parent.clearFabs();

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            $scope.$parent.hideHeader();
        }, 0);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
    })

.controller('AboutCtrl', function($scope, $rootScope, $state, $http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.user = $rootScope.currentUser;
    if(!$scope.user){
      $state.go('app.login');
    }
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(false);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('LogoutCtrl', function( $rootScope, $scope, $http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion ) {
    $scope.user = $rootScope.currentUser;
    if(!$scope.user){
      $state.go('app.login');
    }
    $scope.logout = function(){

        $http.get('http://sparkcommunication.websandbox.nl/logout').success(function(data, status, headers, config) {
            console.log('Successfully logged out'); 

        }).error(function(data, status) { 
            console.log('failed logged out'); 

        });
    }
})

.controller('HomepageCtrl', function($scope, $rootScope, $http, $filter, $state, $cordovaBarcodeScanner, $ionicPlatform, $ionicPopup, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

    $scope.user = $rootScope.currentUser;
    if(!$scope.user){
        $state.go('app.login');
    }

    $scope.articles = [];
    // $http.get('https://newsapi.org/v1/articles?source=abc-news-au&apiKey=3bef2fd411a640dd92dbf3ac79636b3d').success(function(data, status, headers, config) {
    //       $scope.articles = data.articles;
    //       console.log(data);
    var source = ['abc-news-au','bild']
    $http({
        method: 'GET',
        url: 'https://newsapi.org/v1/articles',
        params: {
          source: 'abc-news-au',
          apiKey: '3bef2fd411a640dd92dbf3ac79636b3d'
        }
    }).success(function(data, status, headers, config) {
            $scope.articles = data.articles;
            console.log(data);
    }).error(function(data, status) {
            console.log('Failed to load articles');

    });
    
    })


.controller('TechnologyCtrl', function($http, $rootScope, $scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {

    $scope.user = $rootScope.currentUser;
    if(!$scope.user){
      $state.go('app.login');
    }

$scope.user = $rootScope.currentUser;
    if(!$scope.user){
        $state.go('app.login');
    }

    $scope.technology = [];
    $http.get('https://newsapi.org/v1/sources?language=en').success(function(data, status, headers, config) {
          $scope.technology = data.sources;
          console.log(data);
    
    }).error(function(data, status) {
            console.log('Failed to load sources');

    });
    
    })

.controller('TechArticlesCtrl', function($http, $rootScope, $scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {

    $scope.user = $rootScope.currentUser;
    if(!$scope.user){
        $state.go('app.login');
    }

    $scope.tech_articles = [];
    $http({
        method: 'GET',
        url: 'https://newsapi.org/v1/articles',
        params: {
          source: 'ars-technica',
          apiKey: '3bef2fd411a640dd92dbf3ac79636b3d'
        }
    }).success(function(data, status, headers, config) {
            $scope.tech_articles = data.articles;
            console.log(data);
    }).error(function(data, status) {
            console.log('Failed to load articles');

    });
    
    })