


dta = read.csv("WorldHexData.csv", stringsAsFactors = FALSE)



hexagon = function(x,y, sideLength = 1, col = 3){
  polygon(x + sideLength * c(0,1,1,0,-1,-1),y + sideLength * c(2,1,-1,-2,-1,1)/sqrt(3), border = NA, col = col)
}

par(mar=c(0,0,0,0))
plot(1:10,type = "n", xlim = c(-42,40), ylim = c(-5,40), asp=1, xaxs = "i", yaxs = "i", axes = FALSE, xlab ="", ylab ="")

for(i in 1:dim(dta)[1]){
  if(!is.na(dta$x[i]) & !is.na(dta$y[i])){
    hexagon(dta$x[i],sqrt(3)*dta$y[i], 0.9, col = c(2,3)[1+dta$UN[i]])
    text(dta$x[i],sqrt(3)*dta$y[i],label = substr(dta$country[i],1,2))
  }
}

dta$pop_jul2016 = gsub(",","",dta$pop_jul2016)
dta$pop_jul2017 = gsub(",","",dta$pop_jul2017)
for(i in 1:dim(dta)[1]){
  for(j in 1:dim(dta)[2]){
    dta[i,j] = iconv(dta[i,j], to = "utf8")
  }
}

library(rjson)


setwd("C:/Users/pdutton/Dropbox/R/maps/data")


dtaGender = read.csv("UNdata_GenderPopulation.csv", stringsAsFactors = FALSE)
dtaGender = dtaGender[order(dtaGender$Year, decreasing = TRUE),]

#for(i in 1:dim(dtaGender)[1]){
#  dtaGender$Country[i] = iconv(dtaGender$Country[i], to = "utf8")
#}



sink("WorldHexData.json")
cat(toJSON(dta))
sink()

# dta$UN = TRUE

write.csv(dta,file = "WorldHexData.csv" ,row.names = FALSE)
