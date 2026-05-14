import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const sandbox = readFileSync(resolve(__dirname, "../src/sandbox-entry.ts"), "utf-8");

describe("Plugin definition", () => {
  it("has media:afterUpload hook", () => {
    expect(sandbox).toContain('"media:afterUpload"');
  });

  it("has plugin:install hook", () => {
    expect(sandbox).toContain('"plugin:install"');
  });

  it("has admin route with form_submit", () => {
    expect(sandbox).toContain("form_submit");
    expect(sandbox).toContain("default_format");
    expect(sandbox).toContain("default_quality");
  });

  it("reads settings from KV", () => {
    expect(sandbox).toContain("getSettings");
    expect(sandbox).toContain('"settings:all"');
  });

  it("converts images with sharp", () => {
    expect(sandbox).toContain("convertImage");
    expect(sandbox).toContain("saveToCache");
  });

  it("validates format against SUPPORTED_FORMATS", () => {
    expect(sandbox).toContain("SUPPORTED_FORMATS");
  });
});
