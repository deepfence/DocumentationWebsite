#!/usr/bin/perl -w

use strict;
use Getopt::Long;
use File::Copy;

my $product = shift @ARGV;

# Elements to add to the frontmatter, per product
# For reference: https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter
my %image = (
  threatstryker => "/img/social/threatstryker.jpg",
  secretscanner => "/img/social/secretscanner.jpg",
  packetstreamer => "/img/social/packetstreamer.jpg",
  flowmeter => "/img/social/flowmeter.jpg",
  yarahunter => "/img/social/yarahunter.jpg"
  # TODO(tjonak): ebpfguard image
);

my %keywords = (
  threatstryker => "[vulnerability, threat, appsecurity, CVE, MITRE, TTP, supply chain, graph, attack path, eBPF, attack signal, indicator of compromise]",
  secretscanner => "[secret, secret scanning, token, key, password, container, image]",
  packetstreamer => "[tcpdump, distributed, remote, pcap, packet]",
  flowmeter => "[pcap, packet, ML, machine learning]",
  yarahunter => "[yara, scan, container, image, filesystem, malware]",
  ebpfguard => "[eBPF,LSM,rust]"
);



my $fromdir = undef;
my $todir   = undef;
my $verbose = undef;

GetOptions ("from=s"   => \$fromdir,
            "to=s"     => \$todir,
            "verbose"  => \$verbose);

do {
  print "Copying $product docs from $fromdir to $todir\n";
  print "\n" 
} if $verbose;


sub processDir( $$ );
sub processMarkdown( $$ );

processDir( "$fromdir/$product", "$todir/$product" );

print "Done\n" if $verbose;
exit 0;

# --------------------------------

sub processDir( $$ ) {
  my( $from, $to ) = @_;

  print "Processing $from to $to\n" if $verbose;

  if( ! -d $to ) {
    mkdir $to or die "Cannot mkdir $to: $!";
    print "  mkdir $to\n" if $verbose;
  };

  opendir( my $dh, $from ) or die "Can't open $from: $!";

  while (readdir $dh) {
    
    next if $_ =~ /^\./; # skip .files

    print "  Considering $_\n" if $verbose;

    if( -d "$from/$_" ) {
      print "  recursing into $from/$_\n" if $verbose;
      processDir( "$from/$_", "$to/$_" );
      next;
    };

    if( -f "$from/$_" && $_ =~ /\.md$/ ) {
      print "  process markdown $from/$_ to $to/$_\n" if $verbose;
      processMarkdown( "$from/$_", "$to/$_" );
      next;
    }

    if( -f "$from/$_" ) {
      print "  copy $from/$_ to $to/$_\n" if $verbose;
      copy( "$from/$_","$to/$_") or die "Copy $from/$_ to $to/$_ failed: $!";
      next;
    }

    print "  I don't know what to do with $_, sorry!\n";
  }
  closedir $dh;
}

sub processMarkdown( $$ ) {
  my( $from, $to ) = @_;

  my @frontmatter;
  my $markdown;

  open IN, "<$from" or die "Cannot open $from: $!";
  my $line = <IN>;
  if( $line =~ /^---\s+$/ ) {
    # There is some frontmatter content, terminated with '---'
    $line = <IN>;
    while( $line !~ /^---\s+$/ ) {
      push @frontmatter, $line;
      $line = <IN>;
    }
    $line = <IN>;
  }
  # $line is now the first line of markdown content
  local $/;
  $markdown = $line.<IN>;
  close IN;
  
  # customise the front-matter
  # 
  push @frontmatter, "image: $image{$product}\n" if defined $image{$product};
  push @frontmatter, "keywords: $keywords{$product}\n" if defined $keywords{$product};
  #push @frontmatter, "hide_table_of_contents: true\n";

  open OUT, ">$to" or die "Cannot open $to: $!";
  if( @frontmatter ) {
    print OUT "---\n", @frontmatter, "---\n";
  }
  print OUT $markdown;
  close OUT;
}


