# Mi primer boilerplate con Ignite & React Native

Este es una prueba de Ignite para generar boilerplates customizados 

# Antes de empezar 
Debes contar con la version de ignite-cli 3.5.1 

# ¿Qué contiene?
Puede generar dos pantallas con los siguientes comandos: 
- `ignite g screen MyScreen` creará una pantalla con un `View` y un `Text`
- `ignite g maps MyMap` creará una pantalla con un componente `Map`

*Para este último no olvides agregar en el AndroidManifest dentro de la etiqueta `Application` tu APIKEY de Maps*

`<meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="TU_API_KEY"/>`

## ¿Cómo probar?
 1) `git clone ...`
 2) `yarn install` o `npm install`
 3) `cd ..`
 4) `ignite new myProyect -b ./igniteBoilerplate`
 5) `cd myProyect/`
 6) Enjoy it!
