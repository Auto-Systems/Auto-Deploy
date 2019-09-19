// API/src/Configuration/parseConfigurationFile.ts
import { parse } from 'yaml';
import pEvent from 'p-event';
import { getActiveProvisioner } from 'API/Modules/Provisioners/getActiveProvisioner';
import { Field, InputType } from 'type-graphql';
import { verify } from 'jsonwebtoken';
import { config } from 'API/config';

@InputType()
export class ENV {
  @Field()
  key: string;

  @Field()
  value: string;
}

interface ConfigurationFile {
  name: string;
  copyFiles?: string[];
  copyDirs?: string[];
  install?: string[];
  exec?: string[];
}

interface CopyFiles {
  from: string;
  to: string;
}

interface CopyDirs {
  from: string;
  to: string;
}

interface Configuration {
  name: string;
  copyFiles: CopyFiles[];
  copyDirs: CopyDirs[];
  install: string[];
  exec: string[];
}

export function parseConfigurationFile(file: string): Configuration {
  const config = parse(file) as ConfigurationFile;

  let Configuration: Configuration = {
    name: config.name,
    copyFiles: [],
    copyDirs: [],
    install: config.install || [],
    exec: config.exec || [],
  };

  if (config.copyFiles) {
    for (const copy of config.copyFiles) {
      const files = copy.split(':');
      Configuration.copyFiles.push({ from: files[0], to: files[1] });
    }
  }
  if (config.copyDirs) {
    for (const copy of config.copyDirs) {
      const files = copy.split(':');
      Configuration.copyDirs.push({ from: files[0], to: files[1] });
    }
  }

  return Configuration;
}

interface HostArgs {
  sourceHost: string;
  destHost: string;
}

export async function processCopyFiles(
  { sourceHost, destHost }: HostArgs,
  copy: CopyFiles,
): Promise<void> {
  const [SourceProvision, DestProvision] = await Promise.all([
    getActiveProvisioner(),
    getActiveProvisioner(),
  ]);

  await Promise.all([SourceProvision.loadKeys(), DestProvision.loadKeys()]);

  await Promise.all([
    SourceProvision.initProvisioner(sourceHost),
    DestProvision.initProvisioner(destHost),
  ]);

  await Promise.all([SourceProvision.initFiles(), DestProvision.initFiles()]);

  const [readStream, writeStream] = await Promise.all([
    SourceProvision.createReadStream(copy.from),
    DestProvision.createWriteStream(copy.to),
  ]);

  readStream.pipe(writeStream);

  return pEvent(writeStream, 'finish');
}

export async function processCopyDirs(
  { sourceHost, destHost }: HostArgs,
  copy: CopyDirs,
): Promise<void[]> {
  const SourceProvision = await getActiveProvisioner();
  await SourceProvision.loadKeys();

  await SourceProvision.initProvisioner(sourceHost);

  await SourceProvision.initFiles();

  const sourceFiles = await SourceProvision.listDirectory(copy.from);
  return Promise.all(
    sourceFiles.map(({ filename }) =>
      processCopyFiles(
        { sourceHost, destHost },
        { from: `${copy.from}/${filename}`, to: `${copy.to}/${filename}` },
      ),
    ),
  );
}

export async function processInstall(
  host: string,
  pkgs: string[],
): Promise<string> {
  const Provision = await getActiveProvisioner();
  await Provision.loadKeys();

  await Provision.initProvisioner(host);

  return Provision.runCommand(
    `apt-get update > /dev/null 2>&1 ;echo "$?" && apt-get install -y ${pkgs.join(
      ' ',
    )} > /dev/null 2>&1 ;echo "$?"`,
  );
}

export function decodeENV(secrets: ENV[]): ENV[] {
  return secrets.map(({ key, value }) => ({
    key,
    value: verify(value, config.secretKey) as string,
  }));
}

export async function processEXEC(
  host: string,
  cmds: string[],
  secrets?: ENV[],
): Promise<string> {
  const Provision = await getActiveProvisioner();

  await Provision.loadKeys();

  await Provision.initProvisioner(host);

  let results: string[] = [];

  const configENVs: { [name: string]: string } = {};
  for (const { key, value } of secrets || []) configENVs[key] = value;

  for (const exec of cmds) {
    const cmd = exec.replace(/\$\{(.*)\}/, '${configENVs.$1}');
    const evaledCMD = eval(`\`${cmd}\``);
    console.log(`${evaledCMD}`);
    results.push(await Provision.runCommand(evaledCMD));
  }

  return 'HelloWorld';
}
