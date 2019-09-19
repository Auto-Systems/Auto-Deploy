// API/src/Provisioner/SSH/Provisioner.ts
import { provisionerMethod } from '../Decorators/MethodDecorator';
import { ProvisionerModule } from '../Decorators/ProvisionerClass';
import { outputFile, pathExists, readFile } from 'fs-extra';
import { ssh as forgessh, pki } from 'node-forge';
import SSH2Promise from '@johnls/ssh2-promise';
import { AddAuthenticationInput, File } from '../types';
import SFTP from '@johnls/ssh2-promise/dist/sftp';
import { Writable, Readable } from 'stream';

const { rsa } = pki;

const timeout = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

@ProvisionerModule({ name: 'SSH' })
export class SSHProvisioner {
  public privKey: string;
  public SSH: SSH2Promise;
  public SFTP: SFTP;

  @provisionerMethod({ type: 'initProvisioner' })
  public async initProvisioner(host: string): Promise<void> {
    this.SSH = new SSH2Promise({
      host: host,
      username: 'root',
      identity: 'id_rsa',
    });
  }

  @provisionerMethod({ type: 'initFiles' })
  public async initSFTPFiles(): Promise<void> {
    this.SFTP = this.SSH.sftp();
  }

  @provisionerMethod({ type: 'createWriteStream' })
  public async createSFTPWriteStream(filePath: string): Promise<Writable> {
    return this.SFTP.createWriteStream(filePath);
  }

  @provisionerMethod({ type: 'listDirectory' })
  public async listSFTPDir(dirPath: string): Promise<File[]> {
    return this.SFTP.readdir(dirPath);
  }

  @provisionerMethod({ type: 'createReadStream' })
  public async createSFTPReadSteam(filePath: string): Promise<Readable> {
    return this.SFTP.createReadStream(filePath);
  }

  @provisionerMethod({ type: 'closeConnection' })
  public async closeConnection(): Promise<void> {
    this.SSH.close();
  }

  @provisionerMethod({ type: 'runCommand' })
  public async execCommand(cmd: string): Promise<string> {
    const args = cmd.split(' ');
    const bin = args.shift() as string;
    const { stdout, stderr } = await this.SSH.exec(bin, args) as {  stdout: string, stderr: string } ;
    return stdout + stderr
  }

  @provisionerMethod({ type: 'loadKeys' })
  public async loadSSHKeys(): Promise<void> {
    if (!(await pathExists(`id_rsa`))) {
      let {
        publicKey: publicRSAKey,
        privateKey: privateRSAKey,
      } = await rsa.generateKeyPair({ bits: 4096, workers: 4 });
      let privSSHKey = forgessh.privateKeyToOpenSSH(privateRSAKey);
      let pubSSHKey = forgessh.publicKeyToOpenSSH(publicRSAKey);
      await Promise.all([
        outputFile('id_rsa', privSSHKey),
        outputFile('id_rsa.pub', pubSSHKey),
      ]);
      this.privKey = 'id_rsa';
    } else {
      this.privKey = 'id_rsa';
    }
  }

  @provisionerMethod({ type: 'addAuthentication' })
  public async addAuthentication(
    input: AddAuthenticationInput,
  ): Promise<any[]> {
    let ssh = new SSH2Promise(input);
    let pubKeyFS = await await readFile('id_rsa.pub');
    let pubKey = await pubKeyFS.toString();
    let socket = await ssh.shell();
    await socket.write(`echo '${input.password}' | sudo -S ls\n`);
    await socket.write('sudo su root\n');
    await socket.write(`echo '${pubKey}' >> ~/.ssh/authorized_keys \n`);
    await timeout(1500);
    return await ssh.close();
  }
}
