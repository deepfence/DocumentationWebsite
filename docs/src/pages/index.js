import React, {useEffect, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import {
  HomepageCard as Card,
  HomepageSection as Section,
  ProductCard,
  RunaCapitalBadge,
  SocialCard,
  SwagCard
} from '../components/HomepageComponents';

// import ReactPlayer from 'react-player';


function HeroBanner() {
  const fetchData = () => {
    fetch(`https://community.deepfence.io/gh-cache/orgs/deepfence/repos`)
      .then((response) => response.json())
      .then((data) => setGitHubData(data));
    fetch(`https://community.deepfence.io/gh-cache/orgs/aya-rs/repos`)
      .then((response) => response.json())
      .then((data) => setAyaGitHubData(data));
    fetch(`https://community.deepfence.io/dh-cache/v2/repositories/deepfenceio/deepfence_agent_ce`)
      .then((response) => response.json())
      .then((data) => setDockerHubData(data));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [githubData, setGitHubData] = useState([]);
  const [ayaGithubData, setAyaGitHubData] = useState([]);
  const [dockerhubData, setDockerHubData] = useState([]);

  function getStars(deepfenceData, ayaGithubData) {
    /* If this GET has failed, check browser console messages and community.deepfence.io/gh-cache/ configuration.
    
       We try to route all GitHub api calls through https://community.deepfence.io/gh-cache/ ; see also the patch to
       github-buttons. The gh-cache will cache GitHub API requests to reduce the load on GitHub and reduce the
       likelihood of exceeding their rate limits and getting a 403 response */

    let stars = 0
    const repos = ['ThreatMapper', 'SecretScanner', 'YaraHunter', 'PacketStreamer', 'FlowMeter', 'ebpfguard'];
    if (Array.isArray(deepfenceData)) {
      stars = deepfenceData.reduce((acc, curr) => {
        return repos.includes(curr.name) ? acc + curr.stargazers_count : acc;
      }, 0);
    }

    let ayaStars = 0
    const ayaRepos = ['aya'];
    if (Array.isArray(ayaGithubData)) {
      ayaStars = ayaGithubData.reduce((acc, curr) => {
        return ayaRepos.includes(curr.name) ? acc + curr.stargazers_count : acc;
      }, 0);
    }

    if (stars + ayaStars > 0) return `${(stars + ayaStars).toLocaleString()} GitHub Stars`;

    return "Be Part of the Wave";
  }

  function getPulls(data) {
    /* If this GET has failed, check browser console messages and community.deepfence.io/dh-proxy configuration.*/
    var pulls = data.pull_count;

    if (pulls > 0) return `${pulls.toLocaleString()} ThreatMapper Pulls`;

    return "Multi Cloud, Multi Modality";
  }

  return (
    <div className={styles.hero} id="hero">
      <div className={styles.heroInner}>
        <h1>
          Deepfence Community
        </h1>
        <Section title="Featured as one of the fastest-growing open-source startups" HeadingTag="h3">
          <RunaCapitalBadge/>
        </Section>
        <Section title="Open Source is at the core of what we do, trusted by 1,000's of community users."
                 HeadingTag="h3">
          <Card
            title="100% Open Source"
            description="Deepfence open source projects are completely open source. No phone-home, no limits, no hidden features."
          />
          <Card
            title={getPulls(dockerhubData)}
            description="Deepfence ThreatMapper finds threats hidden in thousands of production platforms - Cloud, Serverless, Containers."
          />
          <Card
            title={getStars(githubData, ayaGithubData)}
            description="Across multiple repos, Deepfence projects are amongst the fastest adopted security solutions for cloud-native apps."
          />
        </Section>
      </div>
    </div>
  );
}

function OpenSourceProducts() {
  return (
    <div>
      <Section>
        <ProductCard
          title="Deepfence ThreatMapper"
          description="Hunt for threats in production platforms, and rank them based on their risk-of-exploit."
          icon="/img/products/threatmapper.svg"
          gh="deepfence/ThreatMapper"
          docs="/threatmapper/docs"
          readmore="https://deepfence.io/threatmapper"
        />
        {/*<div className="homepage-card card-content" id="video">*/}
        {/*  <ReactPlayer controls url='/img/threatmapper-intro.mp4' width="100%" height="100%"/>*/}
        {/*</div>*/}
        <ProductCard
          title="Deepfence SecretScanner"
          description="Find unprotected secrets, tokens and authentication keys in containers and file systems."
          icon="/img/products/secretscanner.svg"
          gh="deepfence/SecretScanner"
          docs="/docs/secretscanner"
        />
        <ProductCard
          title="Deepfence YaraHunter"
          description="Use YARA rules to scan builds, containers and filesystems to find indicators of malware."
          icon="/img/products/yarahunter.svg"
          gh="deepfence/YaraHunter"
          docs="/docs/yarahunter"
        />
        <ProductCard
          title="Deepfence PacketStreamer"
          description="A lightweight packet collector, supporting distributed hosts, clouds and kubernetes."
          icon="/img/products/packetstreamer.svg"
          gh="deepfence/PacketStreamer"
          docs="/docs/packetstreamer"
        />
        <ProductCard
          title="Deepfence FlowMeter"
          description="Employ machine learning techniques to classify network flows based on packet headers."
          icon="/img/products/flowmeter.svg"
          gh="deepfence/FlowMeter"
          docs="/docs/flowmeter"
        />
        <ProductCard
          title="Aya"
          description="Aya is an eBPF library built with a focus on operability and developer experience. It does not rely on libbpf nor bcc - it's built from the ground up purely in Rust, using only the libc crate to execute syscalls."
          icon="https://aya-rs.dev/assets/images/crabby.svg"
          gh="aya-rs/aya"
          docs="https://aya-rs.dev/book"
        />
        <ProductCard
          title="Ebpfguard"
          description="Ebpfguard is an Aya based library for seamless utilization of LSM BPF hooks"
          // icon="/img/products/ebpfguard.svg"
          gh="deepfence/ebpfguard"
          docs="/docs/ebpfguard"
        />
      </Section>
    </div>
  );
}

function EnterpriseProducts() {
  return (
    <div>
      <Section title="Deepfence Enterprise Products" className="two-cols">
        <ProductCard
          title="Deepfence ThreatStryker"
          description="Observe, correlate, learn, and act to protect your cloud-native applications, across clouds and on-prem locations.  Built on ThreatMapper, ThreatStryker adds runtime telemetry, attack storyboarding, and targetted protection."
          icon="/img/products/threatstryker.svg"
          docs="/threatstryker/docs/"
          readmore="https://deepfence.io/threatstryker"
        />
        <ProductCard
          title="Deepfence Cloud"
          description="A self-service portal where you can deploy dedicated, fully-managed ThreatStryker instances.  Empower your teams to secure and protect their cloud-native applications, at scale and across clouds and on-prem locations."
          icon="/img/products/cloud.svg"
          docs="/threatstryker/docs/cloud/"
          readmore="https://deepfence.io/cloud/"
        />
      </Section>
    </div>
  );
}

function Community() {
  return (
    <div>
      <Section title="Join in the Open-Source Community" className="two-cols">
        <SocialCard/>
        <SwagCard/>
      </Section>
    </div>
  );
}


export default function HomePage() {
  const {siteConfig, siteMetadata} = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main>
        <HeroBanner/>
        <div className={styles.maincontent}>
          <OpenSourceProducts/>
          <EnterpriseProducts/>
          <Community/>
        </div>
      </main>
    </Layout>
  );
}
