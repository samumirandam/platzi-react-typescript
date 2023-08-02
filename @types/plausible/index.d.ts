type Options = {
  callback?: () => void;
  props?: Record<string, string | number | undefined | null>;
};

interface Window {
  plausible: (event: string, options?: Options) => void;
}
