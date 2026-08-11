import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_PROFILE_HREF,
} from "../config/integrations";
import {
  formatInstagramHandle,
  getDisplayInstagramPosts,
  hasInstagramPosts,
  INSTAGRAM_FEED,
  type InstagramPost,
} from "../lib/instagram";
import Reveal from "../components/ui/Reveal";

function InstagramGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

function PostCard({ post }: { post: InstagramPost }) {
  const preview = post.thumbnailUrl || post.mediaUrl;
  const isVideo = post.mediaType === "VIDEO";
  const label = post.caption?.trim()
    ? `Abrir publicação no Instagram: ${post.caption.trim().slice(0, 80)}`
    : "Abrir publicação no Instagram";

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="instagram-feed__card"
      aria-label={label}
    >
      <span className="instagram-feed__media">
        <img src={preview} alt="" loading="lazy" decoding="async" />
        {isVideo ? (
          <span className="instagram-feed__badge" aria-hidden="true">
            Vídeo
          </span>
        ) : null}
        <span className="instagram-feed__hover" aria-hidden="true">
          <InstagramGlyph />
        </span>
      </span>
    </a>
  );
}

export default function InstagramSection() {
  const posts = getDisplayInstagramPosts(INSTAGRAM_FEED);
  const showFeed = hasInstagramPosts(INSTAGRAM_FEED);
  const handleLabel = formatInstagramHandle(INSTAGRAM_HANDLE);
  const profileHref = INSTAGRAM_PROFILE_HREF;

  return (
    <section
      className={`instagram-feed section ${showFeed ? "" : "instagram-feed--empty"}`.trim()}
      id="instagram"
      aria-labelledby="instagram-title"
    >
      <div className="container">
        <Reveal>
          <header className="section__header section__header--center instagram-feed__header">
            <span className="eyebrow">Siga a RedeSub</span>
            <h2 className="section__title" id="instagram-title">
              Acompanhe a RedeSub no Instagram
            </h2>
            <p className="section__desc">
              Novidades, campanhas e conteúdos para você ficar por dentro de tudo
              que acontece na RedeSub.
            </p>
            {handleLabel ? (
              <p className="instagram-feed__handle">{handleLabel}</p>
            ) : null}
          </header>
        </Reveal>

        {showFeed ? (
          <div className="instagram-feed__grid" role="list">
            {posts.map((post, index) => (
              <Reveal key={post.id} delay={Math.min(index * 30, 180)} className="instagram-feed__cell">
                <div role="listitem">
                  <PostCard post={post} />
                </div>
              </Reveal>
            ))}
          </div>
        ) : null}

        {profileHref ? (
          <Reveal delay={showFeed ? 60 : 40}>
            <div className="instagram-feed__actions">
              <a
                href={profileHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--md"
              >
                <InstagramGlyph />
                Seguir no Instagram
              </a>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
