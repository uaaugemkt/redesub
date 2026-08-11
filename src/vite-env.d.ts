/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUBSCRIBER_PORTAL_URL?: string;
  readonly VITE_SPEED_TEST_URL?: string;
  readonly VITE_SPEED_TEST_EMBED_URL?: string;
  readonly VITE_HERO_VIDEO_SRC?: string;
  readonly VITE_GOOGLE_REVIEWS_URL?: string;
  readonly VITE_INSTAGRAM_HANDLE?: string;
  readonly VITE_INSTAGRAM_PROFILE_URL?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_SHOW_BUSINESS_PLAN_EXAMPLES?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
