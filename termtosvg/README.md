# Building animated SVGs

## Overview

 * Create an asciicast v2 recording of the terminal session
 * Tidy it up and convert it to the deepfence text cast format
 * Run through `txt2cast` to create clean ascii cast, then `termtosvg render` to create the SVG

## Create the initial Asciicast

```
# Create virtualenv named '.venv'
python3 -m venv .venv
# Activate virtualenv
source .venv/bin/activate
pip3 install termtosvg
```

## Prepare the environment

Test the commands you want to record, and put them in a note / script

## Record

```
termtosvg record

# perform your commands, one at a time, leaving several seconds between each

exit
```

## Create the text cast script

This is the cleaned-up, properly-timed version of your script.  Start with the asciicast recording you made at the previous step.

Look at some of the example scripts (`*.txt`) for hints.

## Build your svg

Run this from within the venv where termtosvg is available:

```
# the makefile is a little rough, and needs tidying up!
make
```

## Errors?

Sometimes can encounter difficult-to-debug syntax errors.

Common mistakes include:

 * Leaving a trailing `"]` at the end of a line
 * Not escaping `"` in the middle of a line