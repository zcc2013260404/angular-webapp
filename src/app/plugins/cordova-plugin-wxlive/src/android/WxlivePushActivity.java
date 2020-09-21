package daimarufeng.wxlive;

import android.app.Activity;
import android.content.Intent;
import android.hardware.Camera;
import android.os.Bundle;
import android.util.Log;

import com.qiniu.pili.droid.streaming.AVCodecType;
import com.qiniu.pili.droid.streaming.AudioSourceCallback;
import com.qiniu.pili.droid.streaming.CameraStreamingSetting;
import com.qiniu.pili.droid.streaming.MediaStreamingManager;
import com.qiniu.pili.droid.streaming.StreamStatusCallback;
import com.qiniu.pili.droid.streaming.StreamingProfile;
import com.qiniu.pili.droid.streaming.StreamingSessionListener;
import com.qiniu.pili.droid.streaming.StreamingState;
import com.qiniu.pili.droid.streaming.StreamingStateChangedListener;

import java.net.URISyntaxException;
import java.nio.ByteBuffer;
import java.util.List;

import www.ahhmtl.com.MainActivity;

public class WxlivePushActivity extends Activity
        implements StreamingStateChangedListener, StreamStatusCallback, AudioSourceCallback, StreamingSessionListener {
    CameraPreviewFrameView mCameraPreviewSurfaceView;
    private MediaStreamingManager mMediaStreamingManager;
    private StreamingProfile mProfile;
    private String TAG = "WxlivePushActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(MResource.getIdByName(this, "layout", "activity_camera_streaming"));
        init();
    }

    private void init() {
        //get form you server
        String publishURLFromServer = "rtmp://pili-publish.zhibo.ahhmtl.com/weixinglive/test2?e=1597638449&token=eKqUJNbp75vfComMi5Xy_0cRD-eWUnVKbUA7NTSV:pmR2hdUVfVkMvtOQDvhO9YlN5ss=";
//        mCameraPreviewSurfaceView = findViewById(R.id.cameraPreview_surfaceView);
        mCameraPreviewSurfaceView = findViewById(MResource.getIdByName(this, "id", "activity_camera_streaming"));
        try {
            //encoding setting
            mProfile = new StreamingProfile();
            mProfile.setVideoQuality(StreamingProfile.VIDEO_QUALITY_HIGH1)
                    .setAudioQuality(StreamingProfile.AUDIO_QUALITY_MEDIUM2)
                    .setEncodingSizeLevel(StreamingProfile.VIDEO_ENCODING_HEIGHT_480)
                    .setEncoderRCMode(StreamingProfile.EncoderRCModes.QUALITY_PRIORITY)
                    .setPublishUrl(publishURLFromServer);
            //preview setting
            CameraStreamingSetting camerasetting = new CameraStreamingSetting();
            camerasetting.setCameraId(Camera.CameraInfo.CAMERA_FACING_BACK)
                    .setContinuousFocusModeEnabled(true)
                    .setCameraPrvSizeLevel(CameraStreamingSetting.PREVIEW_SIZE_LEVEL.MEDIUM)
                    .setCameraPrvSizeRatio(CameraStreamingSetting.PREVIEW_SIZE_RATIO.RATIO_16_9);
            //streaming engine init and setListener
            mMediaStreamingManager = new MediaStreamingManager(this, mCameraPreviewSurfaceView, AVCodecType.SW_VIDEO_WITH_SW_AUDIO_CODEC);  // soft codec
            mMediaStreamingManager.prepare(camerasetting, mProfile);
            mMediaStreamingManager.setStreamingStateListener(this);
            mMediaStreamingManager.setStreamingSessionListener(this);
            mMediaStreamingManager.setStreamStatusCallback(this);
            mMediaStreamingManager.setAudioSourceCallback(this);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onStateChanged(StreamingState streamingState, Object extra) {
        Log.e(TAG, "streamingState = " + streamingState + "extra = " + extra);
        switch (streamingState) {
            case PREPARING:
                Log.e(TAG, "PREPARING");
                break;
            case READY:
                Log.e(TAG, "READY");
                // start streaming when READY
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        if (mMediaStreamingManager != null) {
                            mMediaStreamingManager.startStreaming();
                        }
                    }
                }).start();
                break;
            case CONNECTING:
                Log.e(TAG, "连接中");
                break;
            case STREAMING:
                Log.e(TAG, "推流中");
                // The av packet had been sent.
                break;
            case SHUTDOWN:
                Log.e(TAG, "直播中断");
                // The streaming had been finished.
                break;
            case IOERROR:
                // Network connect error.
                Log.e(TAG, "网络连接失败");
                break;
            case OPEN_CAMERA_FAIL:
                Log.e(TAG, "摄像头打开失败");
                // Failed to open camera.
                break;
            case DISCONNECTED:
                Log.e(TAG, "已经断开连接");
                // The socket is broken while streaming
                break;
            case TORCH_INFO:
                Log.e(TAG, "开启闪光灯");
                break;
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        mMediaStreamingManager.resume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        // You must invoke pause here.
        mMediaStreamingManager.pause();
    }

    @Override
    public void notifyStreamStatusChanged(StreamingProfile.StreamStatus status) {
        Log.e(TAG, "StreamStatus = " + status);
    }

    @Override
    public void onAudioSourceAvailable(ByteBuffer srcBuffer, int size, long tsInNanoTime, boolean isEof) {
    }

    @Override
    public boolean onRecordAudioFailedHandled(int code) {
        Log.i(TAG, "onRecordAudioFailedHandled");
        return false;
    }

    @Override
    public boolean onRestartStreamingHandled(int code) {
        Log.i(TAG, "onRestartStreamingHandled");
        new Thread(new Runnable() {
            @Override
            public void run() {
                if (mMediaStreamingManager != null) {
                    mMediaStreamingManager.startStreaming();
                }
            }
        }).start();
        return false;
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }

    @Override
    public Camera.Size onPreviewSizeSelected(List<Camera.Size> list) {
        return null;
    }

    @Override
    public int onPreviewFpsSelected(List<int[]> list) {
        return -1;
    }
}
