import { copy, mkdir, remove, writeJSON, pathExists } from 'fs-extra';
import ParcelBundler from 'parcel-bundler';
import { entryPointHandler, CSS } from './CSSManifest';
import { generateIcons } from './Icons';

export const build = async (watch: boolean = false): Promise<void> => {
  await remove('dist');
  await mkdir('dist');

  if (await pathExists('public')) await copy('public', 'dist/public');

  await Promise.all([copy('package.json', 'dist/package.json'), copy('package-lock.json', 'dist/package-lock.json')]);

  const bundler = new ParcelBundler('UI/client.tsx', {
    outDir: 'dist/public',
    watch,
    target: 'browser',
    contentHash: true,
    sourceMaps: false,
    cache: false
  });

  // @ts-ignore
  bundler.on('bundled', bundle =>
    // @ts-ignore
    bundler.options.entryFiles.length > 1 ? bundle.childBundles.forEach(entryPointHandler) : entryPointHandler(bundle)
  );

  await bundler.bundle();

  process.env['BABEL_ENV'] = 'server';
  const serverBundler = new ParcelBundler(['server/index.ts', 'server/server.urls', 'server/service-worker.ts'], {
    outDir: 'dist/server',
    watch,
    target: 'node',
    contentHash: true,
    sourceMaps: false,
    cache: false
  });

  // @ts-ignore
  serverBundler.on('bundled', bundle =>
    // @ts-ignore
    bundler.options.entryFiles.length > 1 ? bundle.childBundles.forEach(entryPointHandler) : entryPointHandler(bundle)
  );
  try {
    await serverBundler.bundle();
  } catch {
    console.log('Server Build Error');
  }

  await writeJSON('dist/CSS.json', CSS);
};
