# World Hex Map

This is a d3js driven data visualisation of the world countries. There are three hex maps: one per country, one weighted by population and one weighted by size. There is a drop down to add a variety of metrics for each country. There is also a drop down to toggle showing only the UN countries or not.

## Disclaimer

The hex maps were all designed by me and hence any spacial irregularities are a consequence of this process. I used Google maps to attempt to make a map which clearly resembled the world in each case, particularly difficult in the one hex per country map. The decision to include some colonised islands and not others was slightly biased towards British colonies and was also driven by the availability of data for these islands. The inclusion and/or exclusion of any country or disputed territory was not intended to offend.

## Data

The data was collected from a variety of sources including:

- [Wikipedia](https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_area)
- [UN data](http://data.un.org/)
- [www.worlddata.info](https://www.worlddata.info/)

Some missing data was filled in using Google. Due the number of sources and replacement of missing data there is no guarantee that the data is accurate and it is certainly not up to date.

The datasets are stored in the hexData folder.

## Framework

The underlying framework makes it easy to add new data to the existing graph. I have included the R files asis. For the multiple hex per country the hex locations are created in mapweight_by*.R. These were then merged with the rest of the data using convert_to_JSON.R. The world_addData.R file was used to add data from other csv files.

## Licence

Copyright 2017 Peter Dutton.

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.