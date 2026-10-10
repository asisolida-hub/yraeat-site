#!/bin/sh
set -eu

site_output_dir=dist
rm -rf -- "$site_output_dir"
mkdir -p "$site_output_dir/assets"
cp index.html styles.css site.js "$site_output_dir/"
cp assets/logo-originale-yraeat.webp assets/cucina-illustrativa.png assets/catering-illustrativo.png "$site_output_dir/assets/"
