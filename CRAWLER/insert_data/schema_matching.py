# -*- coding: utf-8 -*-
"""Schema_matching.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/13yJLfm8_PicAhbsRvaFwZjfwL90y0iYI
"""

from google.colab import drive
drive.mount('/content/drive')

cd /content/drive/MyDrive/Final_Project

!git clone https://github.com/namhoai1811/DATN.git

cd DATN/

pip install fuzzywuzzy

import numpy,datetime,re
import pandas as pd
import numpy as np
from fuzzywuzzy import fuzz
from fuzzywuzzy import process
from difflib import SequenceMatcher

tentative_engagements = []
free_bds = []
corresponacy1 = []

def matchingtablebyheaders(tbl1,tbl2):
    # For matching
    Pref=np.zeros((len(tbl1),len(tbl2)))
        #assign the matching ratio between tbl1 and tbl2
    for i in range(len(tbl1)):
        for j in range(len(tbl2)):
            Pref[i,j] = np.int(100*SequenceMatcher(None,tbl1[i].lower(),tbl2[j].lower()).ratio())
    return Pref

def listofpreferencespertable(tbl1,tbl2,Pref):
        #for chotot
    ipref_tom=np.zeros((len(tbl1),len(tbl2)),dtype=np.int8)
    #for bds
    ipref_bds=np.zeros((len(tbl2),len(tbl1)),dtype=np.int8)
    pref_bds=np.zeros((len(tbl2),len(tbl1)),dtype=np.int8)
    preferred_rankings_data_1 = {}
    preferred_rankings_data_2 = {}
    #create list of preferred_rankings_chotot with header
    #assign the array indexs of Pref sorted by the actual values decending based on the lenght of tbl2 (17)
    for i in range(len(tbl2)):
        ipref_tom[:,i]=np.argsort(Pref[:,i])
        ipref_tom[:,i]=ipref_tom[::-1,i]
        preferred_rankings_data_1[i] = ipref_tom[:,i]
        #pref_tom[:,i]=np.sort(Pref[:,i])
        #pref_tom[:,i]=pref_tom[::-1,i]
    #ipref_tom

    #create list of preferred_rankings_bds with header
    #assign the array indexs of Pref sorted by the actual values decending based on the lenght of tbl1 (13)
    for i in range(len(tbl1)):
        #get indexs values of rows and store them in the rows as well
        ipref_bds[:,i] = np.argsort(Pref[i,:])
        ipref_bds[:,i] = ipref_bds[::-1,i]
        preferred_rankings_data_2[i] = ipref_bds[:,i]
        #pref_bds[:,i] = np.sort(Pref[i,:])
      #  pref_bds[:,i] = pref_bds[::-1,i]
    #ipref_bds
    return preferred_rankings_data_2,preferred_rankings_data_1

#Imdb which still need to propose and get accepted successfully
#Keep track of the headers that "may" end up together
def init_free_bds(preferred_rankings_imdb):
    for imdb in preferred_rankings_imdb.keys():
        free_bds.append(imdb)

def begin_matching(bds,preferred_rankings_data_1,preferred_rankings_data_2):
    #  '''Find the first free Tomaten available to a bds at any given time'''
    #print(preferred_rankings_data_1[bds])
    for tomate in preferred_rankings_data_1[bds]:
        #Boolean for whether tomate is taken or not
        taken_match = [couple for couple in tentative_engagements if tomate == couple [:][1]]
        if (len(taken_match) == 0):
            #tentatively engage the man and woman
            tentative_engagements.append([bds, tomate])
            free_bds.remove(bds)
            break
        elif (len(taken_match) > 0):

            current_bds = list(preferred_rankings_data_2[tomate].tolist()).index(taken_match[0][0])
            potential_bds = list(preferred_rankings_data_2[tomate].tolist()).index(bds)

            if (current_bds < potential_bds):
                ii=[]

            else:
                free_bds.remove(bds)
                #The old bds is now single
                free_bds.append(taken_match[0][0])
                #Update the fiance of the tomaten (tentatively)
                taken_match[0][0] = bds
                break

def stable_matching(preferred_rankings_data_1,preferred_rankings_data_2):
    '''Matching algorithm until stable match terminates'''
    while (len(free_bds) > 0):
        # print((free_bds))
        for imdb in free_bds:

            begin_matching(imdb,preferred_rankings_data_1,preferred_rankings_data_2)
        # print((free_bds))
        # break

def check_short_matching(COL1,COL2):
    rate = 0.0
    if str(COL1) == 'nan' or str(COL2) == 'nan' :
        return 0
    COL1 = str(COL1)
    COL2 = str(COL2)
    sw = (fuzz.SequenceMatcher(None,COL1, COL2).ratio())
    return sw #/(max(len(COL1),len(COL2))*1.0)

def check_match(st1,st2):
    str1 = np.array((st1.values).astype(str))
    str2 = np.array((st2.values).astype(str))
    # ret = np.zeros((len(str1),len(str2)))
    ret = np.zeros((len(str1)))

    for i in range(len(str1)):
        tmp = -1
        for j in range(len(str2)):
            # ret[i,j] = check_short_matching(str1[i],str2[j])
            tmp = max(tmp, check_short_matching(str1[i],str2[j]))
        ret[i] = tmp
    return numpy.average(ret)

def matchingtablebyvalues(DATA_1_DF_SAMPLE,DATA_2_DF_SAMPLE,tbl1,tbl2):
    dd = []
    ret = []
    value1 = []
    value2 = []
    index_i = 0
    Pref=np.zeros((len(tbl1),len(tbl2)))
    for i in DATA_1_DF_SAMPLE:
        dd = []
        index_j = 0
        for j in DATA_2_DF_SAMPLE:
            table1 = DATA_1_DF_SAMPLE[i]
            table2 = DATA_2_DF_SAMPLE[j]
            value1 = (table1.values).astype(str)
            value2 = (table2.values).astype(str)
            #dd.append([ 100* (check_match(table1, table2)),i,j])
            Pref[index_i,index_j] = 100 * (np.float(check_match(table1, table2)))
            index_j+=1
        index_i+=1
    return Pref

def outputforvalues(tbl1,tbl2,Pref):
    i = 0
    for item in tentative_engagements:
        matching=Pref[item[0],item[1]]
        print(tbl1[item[0]] + " -----" ,tbl2[item[1]],':',matching)

"""# alonhadatt vs alonhadatmb"""

alonhadat = pd.read_csv("/content/drive/MyDrive/Final_Project/DATN/CRAWLER/data-standard/alonhadat.csv", index_col=0)

# alonhadatmb = pd.read_csv("/content/drive/MyDrive/Final_Project/IT5420_20222/data-standard/data/alonhadatmb.csv", index_col=0)

# alonhadat = pd.concat([alonhadatt, alonhadatmb])
# alonhadat = alonhadat.reset_index(drop=True)

alonhadat.info()



alonhadat = pd.DataFrame(alonhadat[['title', 'description', 'price', 'square', 'type', 'name_contact', 'phone_contact', 'date', 'direct', 'district', 'province', 'street', 'ward', 'floor', 'juridical', 'bedroom', 'length', 'width', 'link_image', 'url_page', 'kitchen', 'parking', 'terrace']])

batdongsan123 = pd.read_csv("/content/drive/MyDrive/Final_Project/DATN/CRAWLER/data-standard/bds123.csv", index_col=0)

batdongsan123t = pd.read_csv("/content/drive/MyDrive/Final_Project/IT5420_20222/data-standard/data/bds123t.csv", index_col=0)

# batdongsan123 = pd.concat([batdongsan123mb, batdongsan123t])
# batdongsan123 = batdongsan123.reset_index(drop=True)

batdongsan123['length'] = '0 m'
batdongsan123['width'] = '0 m'

batdongsan123.info()

def main():
    tentative_engagements.clear()
    free_bds.clear()
    #add data
    # DATA_SAMPLE_1,tbl1,DATA_SAMPLE_2,tbl2=importdatasets()
    DATA_SAMPLE_1 = alonhadat.sample(50).astype(str)

    header_1 = list(alonhadat.columns.values)
    tbl1 = np.array(header_1)

    DATA_SAMPLE_2 = alonhadat.sample(50).astype(str)

    header_2 = list(alonhadat.columns.values)
    tbl2 = np.array(header_2)

    #creation templates
    Pref_header=matchingtablebyheaders(tbl1,tbl2)
    Pref_values=matchingtablebyvalues(DATA_SAMPLE_1,DATA_SAMPLE_2,tbl1,tbl2)
    Pref = (0.5*Pref_header + 0.5*Pref_values)
    preferred_rankings_imdb,preferred_rankings_tomatoes=listofpreferencespertable(tbl1,tbl2,Pref)
    # print(preferred_rankings_tomatoes)
    init_free_bds(preferred_rankings_imdb)
    stable_matching(preferred_rankings_imdb,preferred_rankings_tomatoes)
    # print(tentative_engagements)
    outputforvalues(tbl1,tbl2,Pref)



main()

batdongsan123 = batdongsan123.rename(columns={'acreage': 'square'})
batdongsan123 = batdongsan123.rename(columns={'direction': 'direct'})

batdongsan123 = pd.DataFrame(batdongsan123[['title', 'description', 'price', 'square', 'type', 'name_contact', 'phone_contact', 'date', 'direct', 'district', 'province', 'street', 'ward', 'floor', 'juridical', 'bedroom', 'length', 'width', 'link_image', 'url_page', 'kitchen', 'parking', 'terrace']])

"""# alonhadat vs ibatdongsan"""

ibatdongsan = pd.read_csv("/content/drive/MyDrive/Final_Project/DATN/CRAWLER/data-standard/ibds.csv", index_col=0)

ibatdongsan.info()

def main():
    tentative_engagements.clear()
    free_bds.clear()
    #add data
    # DATA_SAMPLE_1,tbl1,DATA_SAMPLE_2,tbl2=importdatasets()
    DATA_SAMPLE_1 = alonhadat.sample(50).astype(str)

    header_1 = list(alonhadat.columns.values)
    tbl1 = np.array(header_1)

    DATA_SAMPLE_2 = ibatdongsan.sample(50).astype(str)

    header_2 = list(ibatdongsan.columns.values)
    tbl2 = np.array(header_2)

    #creation templates
    Pref_header=matchingtablebyheaders(tbl1,tbl2)
    Pref_values=matchingtablebyvalues(DATA_SAMPLE_1,DATA_SAMPLE_2,tbl1,tbl2)
    Pref = (0.5*Pref_header + 0.5*Pref_values)
    preferred_rankings_imdb,preferred_rankings_tomatoes=listofpreferencespertable(tbl1,tbl2,Pref)
    # print(preferred_rankings_tomatoes)
    init_free_bds(preferred_rankings_imdb)
    stable_matching(preferred_rankings_imdb,preferred_rankings_tomatoes)
    # print(tentative_engagements)
    outputforvalues(tbl1,tbl2,Pref)



main()

ibatdongsan = ibatdongsan.rename(columns={'area': 'square'})
ibatdongsan = ibatdongsan.rename(columns={'brief': 'description'})

ibatdongsan = pd.DataFrame(ibatdongsan[['title', 'description', 'price', 'square', 'type', 'name_contact', 'phone_contact', 'date', 'direct', 'district', 'province', 'street', 'ward', 'floor', 'juridical', 'bedroom', 'length', 'width', 'link_image', 'url_page', 'kitchen', 'parking', 'terrace']])

"""# alonhadat vs nhadat24h"""

nhadat24h = pd.read_csv("/content/drive/MyDrive/Final_Project/DATN/CRAWLER/data-standard/nhadat24h.csv", index_col=0)

nhadat24h.info()

nhadat24h['name_contact'] = np.nan
nhadat24h['phone_contact'] = np.nan

def main():
    tentative_engagements.clear()
    free_bds.clear()
    #add data
    # DATA_SAMPLE_1,tbl1,DATA_SAMPLE_2,tbl2=importdatasets()
    DATA_SAMPLE_1 = alonhadat.sample(50).astype(str)

    header_1 = list(alonhadat.columns.values)
    tbl1 = np.array(header_1)

    DATA_SAMPLE_2 = nhadat24h.sample(50).astype(str)

    header_2 = list(nhadat24h.columns.values)
    tbl2 = np.array(header_2)

    #creation templates
    Pref_header=matchingtablebyheaders(tbl1,tbl2)
    Pref_values=matchingtablebyvalues(DATA_SAMPLE_1,DATA_SAMPLE_2,tbl1,tbl2)
    Pref = (0.5*Pref_header + 0.5*Pref_values)
    preferred_rankings_imdb,preferred_rankings_tomatoes=listofpreferencespertable(tbl1,tbl2,Pref)
    # print(preferred_rankings_tomatoes)
    init_free_bds(preferred_rankings_imdb)
    stable_matching(preferred_rankings_imdb,preferred_rankings_tomatoes)
    # print(tentative_engagements)
    outputforvalues(tbl1,tbl2,Pref)



main()

nhadat24h = nhadat24h.rename(columns={'ground_area': 'square'})

nhadat24h = pd.DataFrame(nhadat24h[['title', 'description', 'price', 'square', 'type', 'name_contact', 'phone_contact', 'date', 'direct', 'district', 'province', 'street', 'ward', 'floor', 'juridical', 'bedroom', 'length', 'width', 'link_image', 'url_page', 'kitchen', 'parking', 'terrace']])







"""# alonhadat vs cenhome"""

cenhome = pd.read_csv("/content/drive/MyDrive/Final_Project/DATN/CRAWLER/data-standard/cenhome.csv", index_col=0)

cenhome.info()

cenhome['square'] = np.nan
cenhome['direct'] = np.nan
cenhome['juridical'] = np.nan
cenhome['length'] = np.nan
cenhome['width'] = np.nan
cenhome['kitchen'] = np.nan
cenhome['parking'] = np.nan
cenhome['terrace'] = np.nan

def main():
    tentative_engagements.clear()
    free_bds.clear()
    #add data
    # DATA_SAMPLE_1,tbl1,DATA_SAMPLE_2,tbl2=importdatasets()
    DATA_SAMPLE_1 = alonhadat.sample(50).astype(str)

    header_1 = list(alonhadat.columns.values)
    tbl1 = np.array(header_1)

    DATA_SAMPLE_2 = cenhome.sample(50).astype(str)

    header_2 = list(cenhome.columns.values)
    tbl2 = np.array(header_2)

    #creation templates
    Pref_header=matchingtablebyheaders(tbl1,tbl2)
    Pref_values=matchingtablebyvalues(DATA_SAMPLE_1,DATA_SAMPLE_2,tbl1,tbl2)
    Pref = (0.5*Pref_header + 0.5*Pref_values)
    preferred_rankings_imdb,preferred_rankings_tomatoes=listofpreferencespertable(tbl1,tbl2,Pref)
    # print(preferred_rankings_tomatoes)
    init_free_bds(preferred_rankings_imdb)
    stable_matching(preferred_rankings_imdb,preferred_rankings_tomatoes)
    # print(tentative_engagements)
    outputforvalues(tbl1,tbl2,Pref)



main()

cenhome = pd.DataFrame(cenhome[['title', 'description', 'price', 'square', 'type', 'name_contact', 'phone_contact', 'date', 'direct', 'district', 'province', 'street', 'ward', 'floor', 'juridical', 'bedroom', 'length', 'width', 'link_image', 'url_page', 'kitchen', 'parking', 'terrace']])

"""# Concat data to one table"""

dataset = pd.concat([alonhadat, batdongsan123, ibatdongsan, nhadat24h, cenhome])

dataset = dataset.reset_index(drop=True)

dataset

dataset.to_csv("/content/drive/MyDrive/Final_Project/DATN/CRAWLER/schema/all_dataset_after_schema-matching.csv", index=False, header=True)
