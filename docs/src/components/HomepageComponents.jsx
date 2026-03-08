import {paramCase} from 'param-case';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

import Docs_svg from "../../static/img/docs.svg";
import More_svg from "../../static/img/more.svg";

import Slack_svg from '../../static/img/social/slack.svg';
import GitHub_svg from '../../static/img/social/github.svg';

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

export function RunaCapitalBadge() {
  return (
    <a
      href="https://runacap.com/ross-index/annual-2022/"
      target="_blank"
      rel="noopener"
    >
      <img
        style={{width: '260px', height: '56px'}}
        src="https://runacap.com/wp-content/uploads/2023/02/Annual_ROSS_badge_white_2022.svg"
        alt="ROSS Index - Fastest Growing Open-Source Startups | Runa Capital"
        width="260"
        height="56"
      />
    </a>
  )
}

/* simple card for layout, no interactivity */
export function HomepageCard({id, icon, title, description}) {
  return (
    <div className="homepage-card card-content" id={id || paramCase(title)}>
      <div className="title">
        {icon && <img className="icon" src={icon}/>}
        <span className="heading">{title}</span>
      </div>
      <div className="description">{description}</div>
    </div>
  );
}

/* richer product-feature card */
export function ProductCard({id, icon, title, description, docs, readmore}) {
  return (
    <div className="product-card card-content" id={id || paramCase(title)}>
      <div className="title">
        <a href={docs}>
          {icon && <img className="icon" src={icon}/>}
          <div className="heading">{title}</div>
        </a>
      </div>
      <div className="description">{description}</div>
      <div className="footnotes">
        {docs && <div className="link"><a href={docs}><Docs_svg/> Docs</a></div>}
        {readmore && <div className="link"><Link to={readmore}><More_svg/> More</Link></div>}
      </div>
    </div>
  );
}


export function SocialIcon({cta, to, img}) {
  return (
    <Link to={to}>
      <img src={img} alt={cta} title={cta}/>
    </Link>
  );
}

export function SocialCard({}) {
  return (
    <div className="social-card card-content">
      <Link to="https://join.slack.com/t/deepfence-community/shared_invite/zt-podmzle9-5X~qYx8wMaLt9bGWwkSdgQ">
        <Slack_svg/>
      </Link>
      <Link to="https://github.com/deepfence">
        <GitHub_svg/>
      </Link>
    </div>
  );
}
