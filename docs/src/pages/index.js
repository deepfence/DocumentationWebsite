import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import {
  HomepageCard as Card,
  HomepageSection as Section,
  ProductCard,
  RunaCapitalBadge,
  SocialCard,
} from '../components/HomepageComponents';

// import ReactPlayer from 'react-player';


function HeroBanner() {
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
            title="Cloud-Native Security"
            description="Deepfence ThreatMapper finds threats hidden in thousands of production platforms - Cloud, Serverless, Containers."
          />
          <Card
            title="Fast Community Adoption"
            description="Across multiple repos, Deepfence projects are among the fastest adopted security solutions for cloud-native apps."
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
          docs="/threatmapper/docs"
          readmore="https://threatmapper.org"
        />
        <ProductCard
          title="Deepfence SecretScanner"
          description="Find unprotected secrets, tokens and authentication keys in containers and file systems."
          icon="/img/products/secretscanner.svg"
          docs="/docs/secretscanner"
        />
        <ProductCard
          title="Deepfence YaraHunter"
          description="Use YARA rules to scan builds, containers and filesystems to find indicators of malware."
          icon="/img/products/yarahunter.svg"
          docs="/docs/yarahunter"
        />
        <ProductCard
          title="Deepfence PacketStreamer"
          description="A lightweight packet collector, supporting distributed hosts, clouds and kubernetes."
          icon="/img/products/packetstreamer.svg"
          docs="/docs/packetstreamer"
        />
        <ProductCard
          title="Deepfence FlowMeter"
          description="Employ machine learning techniques to classify network flows based on packet headers."
          icon="/img/products/flowmeter.svg"
          docs="/docs/flowmeter"
        />
        <ProductCard
          title="Aya"
          description="Aya is an eBPF library built with a focus on operability and developer experience. It does not rely on libbpf nor bcc - it's built from the ground up purely in Rust, using only the libc crate to execute syscalls."
          icon="https://aya-rs.dev/assets/images/crabby.svg"
          docs="https://aya-rs.dev/book"
        />
        <ProductCard
          title="Ebpfguard"
          description="Ebpfguard is an Aya based library for seamless utilization of LSM BPF hooks"
          // icon="/img/products/ebpfguard.svg"
          docs="/docs/ebpfguard"
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
          <Community/>
        </div>
      </main>
    </Layout>
  );
}
