import pandas as pd
from fugue.api import fugue_sql
import json

### Import csv file
data = pd.read_csv('./csv/data.csv')
df = pd.DataFrame(data)

### Inspecting data
df.head(15)
df.shape # (89010, 61)
df.dtypes
# df.info()
df.describe()

### Transform data

# Delete duplicates
df.drop_duplicates

# Missing values
df.fillna(0, inplace=True)

# Delete rows without indicators
df_filtered_index = df[df['1960'] == 0].index
df.drop(df_filtered_index, inplace=True)
df.reset_index(drop=True, inplace=True)
df.head(15)
df.shape # (35468, 61)

# Delete empty column n° 60
df.pop(df.columns[-1])
# df.info()

### Export to csv file
df.to_csv('cleaned_data.csv', index=False)

### SQL: DDM - DDL

# Group by Country Name and Filter by South America Countries
query = """
  SELECT 
    `Country Code` AS `code`,
    `Country Name` AS `country`,
    `Indicator Name` AS `indicator`,
    `2010`,
    `2011`,
    `2012`,
    `2013`,
    `2014`,
    `2015`
  FROM 
    df 
  WHERE 
    `Country Name` IN ('Argentina','Bolivia','Brazil','Chile','Colombia','Ecuador','French Guiana','Guyana','Paraguay','Peru','Suriname','Uruguay','Venezuela')
  AND 
    `Indicator Name` IN ('Population, male','Population, male (% of total)','Population, female','Population, female (% of total)','Population, total')
  PRINT
"""
# Export sql data to data csv
sql_table = fugue_sql(query)
df2 = pd.DataFrame(sql_table)
df2.to_csv('cleaned_data_after_sql.csv', index=False)
