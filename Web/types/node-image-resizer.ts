declare module 'node-image-resizer' {
  interface Options {
    /**
     * Destination path for generated image.
     */
    path?: string;
    /**
     * Used to create file name based on source file name.
     */
    prefix?: string;
    /**
     * Used to create file name based on source file name.
     */
    suffix?: string;
    /**
     * Width of the new image (in px).
     */
    width?: number;
    /**
     * Height of the new image (in px).
     */
    height?: number;
    /**
     * Adjust the contrast by a value -1 to +1.
     */
    contrast?: number;
    /**
     * Adjust the brightness by a value -1 to +1.
     */
    brightness?: number;
    /**
     * Set the quality of saved JPEG by a value 0 - 100.
     */
    quality?: number;
    /**
     * Normalize the channels in the new image.
     */
    normalize?: boolean;
  }

  export interface ResizeConfig {
    all: Options;
    versions: Options[];
  }

  function Resize(source: string, settings: ResizeConfig): Promise<string>;

  export default Resize;
}
