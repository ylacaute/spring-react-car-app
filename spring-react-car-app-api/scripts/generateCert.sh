#!/bin/sh

keytool -genkey -keyalg RSA -alias spring-react-car-app-api -keyalg RSA -keystore ../src/main/resources/keystore.jks -storepass secret -validity 3650 -keysize 2048
