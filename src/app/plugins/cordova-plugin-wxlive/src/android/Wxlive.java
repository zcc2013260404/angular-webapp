package daimarufeng.wxlive;

import android.app.Activity;
import android.content.Intent;
import android.widget.Toast;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;

/**
 * This class echoes a string called from JavaScript.
 */
public class Wxlive extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("showToast")) {
            String message = args.getString(0);
//            this.showToast(message, callbackContext);
            this.startLive(message, callbackContext);
            return true;
        } else if (action.equals("startLive")) {
            String message = args.getString(0);
            this.startLive(message, callbackContext);
            return true;
        }
        return false;
    }

    private void showToast(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
            Activity activity = this.cordova.getActivity();
            android.widget.Toast.makeText(activity, message, Toast.LENGTH_SHORT).show();
            callbackContext.success(message + "悠");
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }

    private void startLive(String message, CallbackContext callbackContext) {
        Activity activity = this.cordova.getActivity();
        Intent intent = new Intent(activity, WxlivePushActivity.class);
        activity.startActivity(intent);
        callbackContext.success("直播中...");
    }

}
