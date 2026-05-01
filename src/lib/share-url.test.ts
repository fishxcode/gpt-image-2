import assert from "node:assert/strict";
import test from "node:test";
import { DEFAULT_CONFIG } from "./config-store";
import { buildPromptShareUrl, buildShareUrl } from "./share-url";

const location = {
  origin: "https://gpt-image-2.fishxcode.com",
  pathname: "/",
} as Location;
const galleryLocation = {
  origin: "https://gpt-image-2.fishxcode.com",
  pathname: "/gallery",
} as Location;

test("buildShareUrl includes config params and prompt when provided", () => {
  const url = new URL(buildShareUrl(DEFAULT_CONFIG, location, "  shared prompt  "));

  assert.equal(url.origin, location.origin);
  assert.equal(url.pathname, location.pathname);
  assert.equal(url.searchParams.get("model"), DEFAULT_CONFIG.model);
  assert.equal(url.searchParams.get("size"), DEFAULT_CONFIG.size);
  assert.equal(url.searchParams.get("prompt"), "shared prompt");
});

test("buildShareUrl omits empty prompt", () => {
  const url = new URL(buildShareUrl(DEFAULT_CONFIG, location, "   "));

  assert.equal(url.searchParams.has("prompt"), false);
});

test("buildPromptShareUrl shares only prompt", () => {
  const url = new URL(buildPromptShareUrl(galleryLocation, "  prompt only  "));

  assert.equal(url.origin, galleryLocation.origin);
  assert.equal(url.pathname, "/");
  assert.equal(url.searchParams.get("prompt"), "prompt only");
  assert.equal(url.searchParams.has("apiKey"), false);
  assert.equal(url.searchParams.has("apiUrl"), false);
  assert.equal(url.searchParams.has("model"), false);
});
