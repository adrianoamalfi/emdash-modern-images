import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const source = readFileSync(resolve(__dirname, "../src/index.ts"), "utf-8");

describe("Plugin descriptor", () => {
  it("exports modernImagesPlugin function", () => {
    expect(source).toContain("export function modernImagesPlugin");
  });

  it("has correct plugin id", () => {
    expect(source).toContain('id: "modern-images"');
  });

  it("has standard format", () => {
    expect(source).toContain('format: "standard"');
  });

  it("declares media:read capability", () => {
    expect(source).toContain("media:read");
  });

  it("has admin settings page", () => {
    expect(source).toContain('"/settings"');
    expect(source).toContain("Modern Images");
  });

  it("declares conversions storage collection", () => {
    expect(source).toContain("conversions");
  });
});
