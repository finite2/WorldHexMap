

dta = read.csv("WorldHexData.csv", stringsAsFactors = FALSE)

dta$pop_jul2017 = as.numeric(dta$pop_jul2017)


for(i in 1:dim(dta)[1]){
  for(j in 1:dim(dta)[2]){
    dta[i,j] = iconv(dta[i,j], to = "utf8")
  }
}


ls = list()


for(i in 1:dim(dta)[1]){
  l = list()
  for(j in 1:dim(dta)[2]){
    l[[names(dta)[j]]] = dta[i,j]
  }

  ls[[i]] = l
  l = list()
  l[[1]] = list(x = dta$x[i], y = dta$y[i])
  ls[[i]]$hexes_one = l
}



source(paste0("C:/Users/",user,"/Dropbox/R/maps/mapweight_byPOP.R"))

for(i in 1:length(ls)){

  h = hex[which(ls[[i]]$Country == hex$country),]
  if(dim(h)[1] > 0){
  l = list()
  for(j in 1:dim(h)[1]){
  l[[j]] = list(x = h$x[j], y = h$y[j])
  }
  ls[[i]]$hexes_pop = l
  } else {
    print(ls[[i]]$Country)
  }
}

source(paste0("C:/Users/",user,"/Dropbox/R/maps/mapweight_bySize.R"))

for(i in 1:length(ls)){

  h = hex[which(ls[[i]]$Country == hex$country),]
  if(dim(h)[1] > 0){
    l = list()
    for(j in 1:dim(h)[1]){
      l[[j]] = list(x = h$x[j], y = h$y[j])
    }
    ls[[i]]$hexes_size = l
  } else {
    print(ls[[i]]$Country)
  }
}

hex$country[which(!hex$country %in% dta$Country)]

meta = list(
hexes_pop = list(
  xmin = -50,
  xmax = 107,
  ymin = -29,
  ymax = 12
),
hexes_one = list(
  xmin = -36,
  xmax = 45,
  ymin = -3,
  ymax = 22
),
hexes_size = list(
  xmin = -70,
  xmax = 115,
  ymin = -39,
  ymax = 19
)
)

saveList = list(meta = meta, data = ls)

library(jsonlite)
sink(paste0("C:/Users/",user,"/Dropbox/R/maps/Map_graphs/hexData/WorldHexData_multi.json"))
cat(toJSON(saveList, auto_unbox = TRUE))
sink()

sink(paste0("C:/Users/",user,"/Dropbox/R/maps/Map_graphs/hexData/WorldHexData_multi.js"))
cat("hexData =",toJSON(saveList, auto_unbox = TRUE))
sink()

# toJSON(dta, dataframe = "rows", auto_unbox = TRUE)
