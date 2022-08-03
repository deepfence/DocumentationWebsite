import React from 'react';
import { paramCase } from 'param-case';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import GitHubButton from 'react-github-btn';

import Docs_svg from "../../static/img/docs.svg";
import More_svg from "../../static/img/more.svg";

import Slack_svg from '../../static/img/social/slack.svg';
import GitHub_svg from '../../static/img/social/github.svg';
import LinkedIn_svg from '../../static/img/social/linkedin.svg';
import Twitter_svg from '../../static/img/social/twitter.svg';
import G2_svg from '../../static/img/social/g2.svg';
import {useEffect, useState} from 'react';

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
  const [githubData, setGithubData] = useState([])
  return (
    <div className="homepage-card card-content" id={id || paramCase(title)}>
      <div className="title">
        {icon && <img className="icon" src={icon} />}
        <span className="heading">{title}</span>
      </div>
      <div className="description">{description}</div>
    </div>
  );
}

/* richer product-feature card */
export function ProductCard({ id, icon, title, description, gh, docs, readmore }) {
  return (
      <div className="product-card card-content" id={id || paramCase(title)}>
        <div className="title">
          {icon && <img className="icon" src={icon} />}
          <div className="heading">{title}</div>
        </div>
        <div className="description">{description}</div>
        <div className="footnotes">
          { gh       && <div className="ghbutton"><GitHubButton href={`https://github.com/${gh}`} data-color-scheme="no-preference: light; light: light; dark: dark;" data-show-count="true" aria-label="Star {gh} on GitHub">GitHub</GitHubButton></div> }
          { gh       && <div className="ghbutton"><GitHubButton href={`https://github.com/${gh}/fork`} data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-repo-forked" data-show-count="true" aria-label="Fork {gh} on GitHub"></GitHubButton></div> }
          { docs     && <div className="link"><Link to={docs}><Docs_svg/> Docs</Link></div> }
          { readmore && <div className="link"><Link to={readmore}><More_svg/> More</Link></div> }
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
      <Link to="https://join.slack.com/t/deepfence-community/shared_invite/zt-podmzle9-5X~qYx8wMaLt9bGWwkSdgQ">
        <Slack_svg/>
      </Link>
      <Link to="https://github.com/deepfence">
        <GitHub_svg/>
      </Link>
      <Link to="https://twitter.com/deepfence?lang=en">
        <Twitter_svg/>
      </Link>
      <Link to="https://www.linkedin.com/company/deepfence-inc">
        <LinkedIn_svg/>
      </Link>
      <Link to="https://www.g2.com/products/threatmapper">
        <G2_svg/>
      </Link>
    </div>
  );
}

export function SwagCard( {} ) {
  return (
    <div className="social-card card-content">
      <Link to="https://go.deepfence.io/community-monthly-swag-sign-up">
        <div className="swagcontainer">
          <img src="/img/social/swag.png" />
          <div className="swagtext">Sign up each month for a chance to win a Deepfence swag kit. Support Deepfence with pride!</div>
        </div>
      </Link>
    </div>
  );
}
