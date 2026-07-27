/// <reference path="../.astro/types.d.ts" />

interface Window {
  bloxbgmTrackEvent?: (eventName: string, params?: Record<string, unknown>) => void;
  dataLayer?: IArguments[];
  gtag?: (...args: unknown[]) => void;
}
