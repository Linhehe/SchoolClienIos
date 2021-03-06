angular.module('starter.services', [])
    .factory('jpushService',['$http','$window','$document',function($http,$window,$document){
      var jpushServiceFactory={};

      //var jpushapi=$window.plugins.jPushPlugin;

      //启动极光推送
      var _init=function(config,setTagsWithAliasCallback){
        $window.plugins.jPushPlugin.init();
        //$window.plugins.jPushPlugin.setDebugMode(true);
        //设置tag和Alias触发事件处理
        //document.addEventListener('jpush.setTagsWithAlias',setTagsWithAliasCallback,false);
        document.addEventListener('jpush.openNotification',config.stac,false);
        //打开推送消息事件处理
        $window.plugins.jPushPlugin.openNotificationInAndroidCallback=config.oniac;
        //$window.plugins.jPushPlugin.receiveNotificationIniOSCallback = config.stac;

      }
      //获取状态
      var _isPushStopped=function(fun){
        $window.plugins.jPushPlugin.isPushStopped(fun)
      }
      //停止极光推送
      var _stopPush=function(){
        $window.plugins.jPushPlugin.stopPush();
      }

      //重启极光推送
      var _resumePush=function(){
        $window.plugins.jPushPlugin.resumePush();
      }

      //设置标签和别名
      var _setTagsWithAlias=function(tags,alias){
        $window.plugins.jPushPlugin.setTagsWithAlias(tags,alias);
      }

      //设置标签
      var _setTags=function(tags){
        $window.plugins.jPushPlugin.setTags(tags);
      }

      //设置别名
      var _setAlias=function(alias){
        $window.plugins.jPushPlugin.setAlias(alias);
      }

      jpushServiceFactory.init=_init;
      jpushServiceFactory.isPushStopped=_isPushStopped;
      jpushServiceFactory.stopPush=_stopPush;
      jpushServiceFactory.resumePush=_resumePush;

      jpushServiceFactory.setTagsWithAlias=_setTagsWithAlias;
      jpushServiceFactory.setTags=_setTags;
      jpushServiceFactory.setAlias=_setAlias;

      return jpushServiceFactory;
    }])




