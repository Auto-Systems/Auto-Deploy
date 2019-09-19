// UI/bin/lib/Icons.ts
import sharp, { Sharp } from 'sharp';

export const createSize = (fileName: string, w: number, h: number): sharp.Sharp => sharp(fileName).resize(w, h);

type FileSize = [number, number];
export const createSizes = async (fileName: string, sizes: FileSize[]): Promise<sharp.OutputInfo[]> =>
  Promise.all(
    sizes.map(([w, h]) =>
      createSize(fileName, w, h)
        .png()
        .toFile(`dist/public/favicon-${w}x${h}.png`)
    )
  );

export const generateIcons = async (fileName: string): Promise<sharp.OutputInfo[]> => {
  const sizes: FileSize[] = [
    [32, 32],
    [57, 57],
    [76, 76],
    [96, 96],
    [120, 120],
    [128, 128],
    [144, 144],
    [152, 152],
    [180, 180],
    [192, 192],
    [196, 196],
    [228, 228],
    [512, 512]
  ];
  return createSizes(fileName, sizes);
};
