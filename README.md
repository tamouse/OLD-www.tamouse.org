# www.tamouse.org

Redesigned to use the Inspinia Landing Page theme.

Restructured to be stock Jekyll building, no more Gulp, Node.

Uses Guard and LiveReload to provide view as you change capability.

## Develop

Running `npm start` will launch a guard script that will continuously
watch and build the site.

You can also run `bundle exec guard`, which is all `npm start` does
anyway.

## To Deploy

The build directory, `_site` by default, can be pointed to the
repository for the remote site. The branch `deploy` should be
set as the default branch.

Running `npm run publish` will automatically re-build the site and
then push the site out to it's deployed spot.

Otherwise the commands are:

``` bash
$ bundle exec jekyll build
$ cd _site
$ git add --all
$ git commit --message '<commit message>'
$ git push -fu origin deploy
$ cd ..
```
