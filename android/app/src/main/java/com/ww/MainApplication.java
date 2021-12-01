package com.ww;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
//import io.invertase.firebase.RNFirebasePackage;
//import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;
//import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
//import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
//facebook
import com.facebook.reactnative.androidsdk.FBSDKPackage;
// Add these
//import io.invertase.firebase.RNFirebasePackage;
//import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
//import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
//import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
//

//import io.invertase.firebase.modules.app.ReactNativeFirebaseAppPackage;
//import io.invertase.firebase.modules.messaging.RNFirebaseMessagingPackage;

//import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
//import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
//
import com.imagepicker.ImagePickerPackage;
//
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
//
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();

          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
            //packages.add(new ImagePickerPackage());
           //packages.add(new RNFirebaseMessagingPackage());

         // packages.add(new  FBSDKPackage());


          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.ww.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
