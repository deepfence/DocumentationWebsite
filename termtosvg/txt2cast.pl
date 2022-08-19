#!/usr/bin/perl -w

use strict;

print '{"version": 2, "width": 80, "height": 19, "timestamp": 1660229813, "env": {"SHELL": "/bin/bash", "TERM": "xterm-256color"}}';
print "\n";

my $time = 0;
my $prompt = "~";
my $writedelayshort = 0.01;
my $writedelaylong = 0.1;
my $typedelay = 0.1;


sub do_type( $ );
sub do_typefast( $ );
sub do_prompt( $ );
sub do_pause( $ );
sub do_write( $ );
sub do_writedelayshort( $ );
sub do_writedelaylong( $ );
sub do_typedelay( $ );


while( <STDIN> ) {
	chomp;
	my( $verb, $param) = split / /, $_, 2;

	next if( !$verb || $verb eq "#" );


	if( $verb eq "type" ) {
		do_type( $param ); next;
	}
	if( $verb eq "typefast" ) {
		do_typefast( $param ); next;
	}
	if( $verb eq "prompt" ) {
		do_prompt( $param ); next;
	}
	if( $verb eq "pause" ) {
		do_pause( $param ); next;
	}
	if( $verb eq "write" ) {
		do_write( $param ); next;
	}
	if( $verb eq "writedelayshort" ) {
		do_writedelayshort( $param ); next;
	}	
	if( $verb eq "writedelaylong" ) {
		do_writedelaylong( $param ); next;
	}	
	if( $verb eq "typedelay" ) {
		do_typedelay( $param ); next;
	}	
	print STDERR "Unrecognised verb '$verb' at line $.\n";
}

sub put( $ ) {
	my $l = shift;
	print "[$time, \"o\", \"$l\"]\n";
}

sub do_type( $ ) {
	my $p = shift;

	my @p = split //, $p;
	while( @p ) {
		my $l = shift @p;
		if( $l eq '\\' ) {
			$l .= shift @p;
		}
		put $l;
		$time += $typedelay;
	}
}

sub do_typefast( $ ) {
	my $p = shift;

	my @p = split / /, $p;
	while( @p ) {
		my $w = shift @p;
		put $w. ' ';
		$time += $typedelay;
	}
}

sub do_prompt( $ ) {
	my $p = shift;

	if( $p ) { $prompt = $p; }

	put( "\\u001b[00;32muser\@host\\u001b[00m:\\u001b[00;34m$prompt\\u001b[00m\$ " ); 
}

sub do_pause( $ ) {
	my $p = shift;

	$time += $p || 2;
}

sub do_write( $ ) {
	my $p = shift;

	# text contains literal \r and \r\n
	# want to write each line that ends \r or \r\n and then pause (short or long)

	my $thedelay = $writedelayshort;
	while( $p ) {
		my $i = index( $p, '\r' );
		if( $i == -1 ) {
			$i = length( $p )-2;
			$thedelay = $writedelaylong;
		} else {
			my $n = substr( $p, $i+2, 2 );
			if( $n eq "\\n" ) {
				$i += 2;
				$thedelay = $writedelaylong;
			}	
		}

		put( substr( $p, 0, $i+2 ) );
		$time += $thedelay;
		$p = substr( $p, $i+2 );
	}
}

sub do_writedelayshort( $ ) {
	my $p = shift;

	$writedelayshort = $p;
}

sub do_writedelaylong( $ ) {
	my $p = shift;

	$writedelaylong = $p;
}

sub do_typedelay( $ ) {
	my $p = shift;

	$typedelay = $p;
}
