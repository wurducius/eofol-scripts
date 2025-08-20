const DOCKER_INSTANCE_NAME = "eofol-test"
const DOCKER_PORT = 8080

const scriptPath = `${__dirname}/../scripts/`
const dockerPath = `${__dirname.replace("c:\\", "/mnt/c/").replace("C:\\", "/mnt/c/")}/docker`
  .replaceAll("\\", "/")
  .replace("bin/", "")
const dockerPathWin = `${__dirname}/docker`.replace("bin/", "")

const SCRIPTS = [
  { cmd: "start", run: `node ${scriptPath}start.cjs` },
  { cmd: "build", run: `node ${scriptPath}build.cjs` },
  { cmd: "serve", run: `node ${scriptPath}serve.cjs` },
  { cmd: "clean", run: `node ${scriptPath}clean.cjs` },
  { cmd: "reinstall", run: `node ${scriptPath}reinstall.cjs` },
  { cmd: "reinstall-f", run: `node ${scriptPath}reinstall.cjs -f` },
  { cmd: "deploy", run: `node ${scriptPath}deploy.cjs` },
  { cmd: "lighthouse", run: `node ${scriptPath}lighthouse.cjs` },
  { cmd: "dev", run: `node ${scriptPath}start.cjs` },
  { cmd: "analyze", run: `node ${scriptPath}build.cjs --analyze` },
  { cmd: "release", run: [`node ${scriptPath}build.cjs`, `node ${scriptPath}deploy.cjs`] },
  { cmd: "local", run: [`node ${scriptPath}build.cjs`, `node ${scriptPath}serve.cjs`] },
  { cmd: "docker-stop", run: `bash ${dockerPath}/docker-stop.sh` },
  { cmd: "docker-build", run: `docker build -t ${DOCKER_INSTANCE_NAME} ${dockerPathWin}` },
  { cmd: "docker-run", run: `docker run -p ${DOCKER_PORT}:${DOCKER_PORT} ${DOCKER_INSTANCE_NAME}` },
  {
    cmd: "docker-test",
    run: [
      `bash ${dockerPath}/docker-stop.sh`,
      `docker build -t ${DOCKER_INSTANCE_NAME} ${dockerPathWin}`,
      `docker run -p ${DOCKER_PORT}:${DOCKER_PORT} ${DOCKER_INSTANCE_NAME}`,
    ],
  },
]

module.exports = SCRIPTS
