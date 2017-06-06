

dta = read.csv("WorldHexData.csv", stringsAsFactors = FALSE)



dtaNew = read.csv("worlddata.info.csv", stringsAsFactors = FALSE, sep = ";")

dtaNew$Country.or.Area = dtaNew$Country..en.

dtaNewName = "Currency.code"
# add new data row.
colName = "CurrencyCode"

dta[[colName]] = NA
for(i in 1:dim(dta)[1]){
  val = dtaNew[dtaNew$Country.or.Area == dta$Country[i],dtaNewName]
  if(length(val) > 0){
    dta[i,colName] = val[1]
  } else {
    val = dtaNew[dtaNew$Country.or.Area == dta$CountryA[i],dtaNewName]
    if(length(val) > 0){
      dta[i,colName] = val[1]
    } else {
      val = dtaNew[dtaNew$Country.or.Area == dta$CountryB[i],dtaNewName]
      if(length(val) > 0){
        dta[i,colName] = val[1]
      }
    }
  }
}

unique(dtaNew$Country.or.Area[which(!dtaNew$Country.or.Area %in% dta$Country & !dtaNew$Country.or.Area %in% dta$CountryA  & !dtaNew$Country.or.Area %in% dta$CountryB)])

# dta$UN = TRUE

write.csv(dta,file = "WorldHexData.csv" ,row.names = FALSE)
