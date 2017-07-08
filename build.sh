ionic cordova build --release --prod android

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore poubelle.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk poubelle

rm poubelle.apk

~/Code/sdk/android/build-tools/23.0.2/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk poubelle.apk
