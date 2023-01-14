# 🗺️ gmap-locator

<p align="center">
  <a href="https://badge.fury.io/js/gmap-locator">
    <img src="https://badge.fury.io/js/gmap-locator.svg" alt="npm version">
  </a>
  <a href="https://github.com/lontarscript/gmap-locator/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="gmap-locator is released under the MIT license." />
  </a>
</p>

Get google maps location of latitude and longitude just from location name. The latitude dan longitude scraped from [Google Maps](https://www.google.co.id/maps) with [Puppeteer](https://pptr.dev/).

## Get Started
Install via npm globally:
```
npm i -g gmap-locator
```
## Basic Usage
```
gmap-locator [INPUT_ARGUMENTS] [INPUT_FILEPATH] [OUTPUT_ARGUMENTS] [OUTPUT_FILEPATH]
```
example commands
```
gmap-locator -i countries.csv -o output.csv 
```
> Note: input and output only support with format `.csv` or `.json`
## License
[MIT](https://opensource.org/licenses/MIT)
