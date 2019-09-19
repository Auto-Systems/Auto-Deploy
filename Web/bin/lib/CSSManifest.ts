import { ParcelBundle } from 'parcel-bundler';
import path from 'path';

export const CSS: { [any: string]: string } = {};

/**
 * Feed the manifest exploring childBundles recursively
 * @param {Bundle} bundle
 * @param {Object} manifestValue
 * @param {string} publicURL
 */
export const feedManifestValue = (bundle: ParcelBundle, manifestValue: { [key: string]: string }, publicURL: string): void => {
  const output = path.join(publicURL, path.basename(bundle.name || ''));

  const input = bundle.entryAsset
    ? bundle.entryAsset.relativeName
    : bundle.assets.size
    ? bundle.assets.values().next().value.relativeName
    : null;
  if (input && !manifestValue[input]) {
    manifestValue[input] = output;
    if (output.includes('css')) CSS[bundle.parentBundle.entryAsset.relativeName] = output;
  }
  bundle.childBundles.forEach(bundle => feedManifestValue(bundle, manifestValue, publicURL));
};

export const entryPointHandler = (bundle: ParcelBundle): void => {
  const publicURL = '/';

  const manifestValue = {};
  feedManifestValue(bundle, manifestValue, publicURL);
};
