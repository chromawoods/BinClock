# BinClock
Binary clock written in JavaScript. This is a rewrite of an older script of mine that was written years prior to this version. I wanted to rebuild it without looking at the old code and then compare them to see how/if my coding style had improved. I think it has. The new version is about half the number of locs while still being more readable.

The script starts by creating 3 ordered lists in a container element. Each list has 6 list items (binary values) and should be read rtl, or downwards-up if in mobile viewport.

Each second, the script iterates the list items and sets a CSS class, indicating whether the binary is 0 or 1.

## Live demo
https://weber.nu/dev/binclock/
