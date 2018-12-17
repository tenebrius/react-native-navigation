package com.reactnativenavigation.utils;

import android.util.Log;

import java.util.HashMap;
import java.util.Map;

@SuppressWarnings("WeakerAccess")
public class Time {
    private static Map<String, Long> tagsToStartTime = new HashMap<>();
    private static Now now = new Now();

    public static <T> T log(String tag, Functions.Unit<T> unit) {
        log(tag);
        T t = unit.get();
        log(tag);
        return t;
    }

    public static void log(String tag) {
        if (tagsToStartTime.containsKey(tag)) {
            Log.i(tag, "Elapsed: " + (now() - time(tag)));
        } else {
            Log.i(tag, "logging start");
        }
        tagsToStartTime.put(tag, now());
    }

    private static long now() {
        return now.now();
    }

    private static long time(String tag) {
        return tagsToStartTime.get(tag);
    }
}
