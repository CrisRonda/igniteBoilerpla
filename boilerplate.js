const { mergeDeepRight, pipe, assoc, omit, __ } = require("ramda");
const REACT_NATIVE_VERSION = "0.61.5";

// función para instalar y copiar todos nuestros archivos
async function install(context) {
  const APP_PATH = process.cwd();
  const PLUGIN_PATH = __dirname;
  // Variables necesarias para la instalación
  const {
    filesystem,
    parameters,
    ignite,
    reactNative,
    print,
    system,
    template
  } = context;

  const name = parameters.third;
  print.info(print.colors.green(`Inicio de la construcción del proyecto`));
  const spinner = print
    .spin(`Usando la plantilla ${print.colors.cyan("BossBoilerplate")}`)
    .succeed();

  // Instalamos react native
  const rnInstall = await reactNative.install({
    name,
    version: REACT_NATIVE_VERSION
  });
  if (rnInstall.exitCode > 0) {
    process.exit(rnInstall.exitCode);
  }

  // Copiamos todos los directorios del boilerplate
  spinner.text = "▸ Copiando Archivos ...";
  spinner.start();
  filesystem.copy(`${PLUGIN_PATH}/boilerplate/App`, `${APP_PATH}/App`, {
    overwrite: true
  });

  spinner.stop();

  // Generamos los archivos necesarios para la ejecución de nuestro proyecto
  spinner.text = "▸ Generando todos los archivos del template";
  spinner.start();
  const templates = [
    { template: "index.js.ejs", target: "index.js" },
    { template: "App.js.ejs", target: "App.js" }
  ];

  await ignite.copyBatch(
    context,
    templates,
    { name: name },
    {
      quiet: true,
      directory: `${PLUGIN_PATH}/boilerplate`
    }
  );

  // Transformación del package.json para todos las dependencias de desarrollo

  const rawJson = await template.generate({
    directory: `${ignite.ignitePluginPath()}/boilerplate`,
    template: "package.json.ejs"
  });
  //Paseamos a JSON
  const newPackageJson = JSON.parse(rawJson);

  //Leemos el package.json creado por el proyecto
  const currentPackage = filesystem.read("package.json", "json");

  // Realizamos un merge de los package.json
  const newPackage = pipe(
    assoc(
      "dependencies",
      mergeDeepRight(currentPackage.dependencies, newPackageJson.dependencies)
    ),
    assoc(
      "devDependencies",
      mergeDeepRight(
        currentPackage.devDependencies,
        newPackageJson.devDependencies
      )
    ),
    assoc(
      "scripts",
      mergeDeepRight(currentPackage.scripts, newPackageJson.scripts)
    ),
    mergeDeepRight(
      __,
      omit(["dependencies", "devDependencies", "scripts"], newPackageJson)
    )
  )(currentPackage);
  // Escribimos en el package.json existente
  filesystem.write("package.json", newPackage, { jsonIndent: 2 });

  spinner.stop();

  // Instalamos dependencias
  spinner.text = "▸ Instalando las dependencias de este proyecto Prrr";
  spinner.start();
  await system.run("yarn install");
  spinner.stop();

  // Linkeamos las dependencias que sean necesarias
  spinner.text = `▸ linking de las librerias espera prrr`;
  spinner.start();
  await system.spawn("npx react-native link", { stdio: "ignore" });
  spinner.stop();

  // Indicamos si estamos en modo debug
  try {
    // pass along the debug flag if we're running in that mode
    const debugFlag = parameters.options.debug ? "--debug" : "";

    await system.spawn(
      `npx ignite-cli add ${__dirname} ${debugFlag} --compiled-build`,
      { stdio: "inherit" }
    );

    // Ejemplo para la instalación de i18n en modo debug
    // await system.spawn(`npx ignite-cli add i18n ${debugFlag}`, { stdio: 'inherit' })
  } catch (e) {
    ignite.log(e);
    throw e;
  }

  // // initialize git
  // const gitExists = await filesystem.exists(".git");
  // if (!gitExists && !parameters.options["skip-git"] && system.which("git")) {
  //   spinner.text = "setting up git";
  //   spinner.start();
  //   await system.run('git init && git add . && git commit -m"Initial commit"');
  //   spinner.succeed();
  // }

  // Impresión por pantalla que esta listo el proyecto
  print.info("");
  print.info("🍽 Ya esta listo el proyecto!");
  print.info("");
  print.info(print.colors.green(`  cd ${name}/`));
  print.info(
    print.colors.green(" Si estas en IOs 📲 npx react-native run-ios")
  );
  print.info(
    print.colors.green(" Si estas en Android 📱 npx react-native run-android")
  );
  print.info("");
}

module.exports = { install };
