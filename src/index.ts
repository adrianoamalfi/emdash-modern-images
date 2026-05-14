import type { PluginDescriptor } from "emdash";

export function modernImagesPlugin(): PluginDescriptor {
  return {
    id: "modern-images",
    version: "1.0.0",
    format: "standard",
    entrypoint: "emdash-plugin-modern-images/sandbox",
    capabilities: ["media:read"],
    storage: {
      conversions: {
        indexes: ["storageKey", "format", "width"],
      },
    },
    adminPages: [
      {
        path: "/settings",
        label: "Modern Images",
        icon: "image",
      },
    ],
  };
}
