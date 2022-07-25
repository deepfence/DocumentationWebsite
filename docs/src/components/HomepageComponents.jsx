import React from 'react';
import { paramCase } from 'param-case';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

export function HomepageSection({
  id,
  title,
  children,
  description,
  className,
  HeadingTag = 'h2',
}) {
  return (
    <div
      className={clsx(
        'homepage-section',
        className
      )}
    >
      {title && <HeadingTag id={id ?? paramCase(title)}>{title}</HeadingTag>}
      {description && <p className="section-description">{description}</p>}
      <div className="section-content">{children}</div>
    </div>
  );
}

/* simple card for layout, no interactivity */
export function HomepageCard({ id, icon, title, description }) {
  return (
    <div className="homepage-card card-content" id={id || paramCase(title)}>
      <div className="title">
        {icon && <img class="icon" src={icon} />}
        <span classname="heading">{title}</span>
      </div>
      <div className="description">{description}</div>
    </div>
  );
}

/* richer product-feature card */
export function ProductCard({ id, icon, title, description, ghstars, ghlink, docs, readmore }) {
  return (
      <div className="product-card card-content" id={id || paramCase(title)}>
        <div className="title">
          {icon && <img class="icon" src={icon} />}
          <div class="heading">{title}</div>
        </div>
        <div className="description">{description}</div>
        <div className="footnotes">
          { ghstars  && <div class="ghstars"><Link to={`${ghlink}/stargazers`}>{ghstars}</Link></div> }
          { ghlink   && <div class="ghlink"><Link to={ghlink}>source</Link></div> }
          { docs     && <div class="docs"><Link to={docs}>docs</Link></div> }
          { readmore && <div class="readmore"><Link to={readmore}>read more</Link></div> }
        </div>
      </div>
  );
}

export function SocialIcon( { cta, to, img } ) {
  return (
    <Link to={to}>
      <img src={img} alt={cta} title={cta} />
    </Link>
  );
}

export function SocialCard( {} ) {
  return (
    <div className="social-card card-content">
      <SocialIcon
        cta="Join Deepfence on Slack"
        to="https://join.slack.com/t/deepfence-community/shared_invite/zt-podmzle9-5X~qYx8wMaLt9bGWwkSdgQ"
        img="/img/social/Slack_icon_2019.svg" />
      <SocialIcon
        cta="Find Deepfence on GitHub"
        to="https://github.com/deepfence"
        img="/img/github.svg" />
      <SocialIcon
        cta="Follow Deepfence on Twitter"
        to="https://twitter.com/deepfence?lang=en"
        img="/img/social/Twitter-logo.svg" />
      <SocialIcon
        cta="Connect with Deepfence on LinkedIn"
        to="https://www.linkedin.com/company/deepfence-inc"
        img="/img/social/linkedin.svg" />
      <SocialIcon
        cta="Review ThreatMapper on G2"
        to="https://www.g2.com/products/threatmapper"
        img="/img/social/g2.svg" />
    </div>
  );
}

export function SwagCard( {} ) {
  return (
    <div className="social-card card-content">
      <Link to="https://go.deepfence.io/community-monthly-swag-sign-up">
        <div class="swagcontainer">
          <img src="/img/social/swag.jpg" />
          <div class="swagtext">Sign up each month for a chance to win a Deepfence swag kit. Support Deepfence with pride!</div>
        </div>
      </Link>
    </div>
  );
}

/*export function SwagCard( {} ) {
  return (
    <div className="social-card card-content">
      <div class="swagcontainer">
        <Link to="https://go.deepfence.io/community-monthly-swag-sign-up">
          <img src="/img/social/swag.jpg" />
          <
        </Link>
      </div>
    </div>
  );
}*/