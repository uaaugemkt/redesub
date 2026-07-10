/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUBSCRIBER_PORTAL_URL?: string;
  readonly VITE_SPEED_TEST_EMBED_URL?: string;
  readonly VITE_HERO_VIDEO_SRC?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
