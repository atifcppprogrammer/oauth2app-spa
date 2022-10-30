const copyStaticFiles = require('esbuild-copy-static-files')
const esbuild = require("esbuild");
const path = require("path");

const [isServer, isClient] = [
  process.argv[2] === "server",
  process.argv[2] === "client"
];

if (!isServer && !isClient) {
  console.error('script requires "server" or "client" as argument');
  process.exit(1);
}

let buildConfig = { bundle: true, watch: true };

if (isClient) {
  const clientRoot = path.resolve(__dirname, "src/client");
  const outdir = "dist/client";
  buildConfig = {
    ...buildConfig,
    entryPoints: [path.join(clientRoot, "index.js")],
    loader: { ".js": "jsx" },
    outdir,
    plugins: [
      copyStaticFiles({
        src: path.join(clientRoot, "public"),
        recursive: true,
        dest: outdir
      })
    ]
  };
}

if (isServer) {
  const serverRoot = path.resolve(__dirname, "src/server");
  buildConfig = {
    ...buildConfig,
    entryPoints: [path.join(serverRoot, "index.js")],
    platform: "node",
    outdir: "dist"
  };
}

esbuild.build(buildConfig)
  .then(() => console.log(
    `watching for changes to ${process.argv[2]} source files`
  ))
  .catch(error => {
    console.trace(error);
    process.exit(1);
  });