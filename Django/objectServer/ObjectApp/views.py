from django.shortcuts import render
import csv
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
import json
import pandas as pd
import sqlite3
import ast


@csrf_exempt
def upload_csv(request):
    if request.method == 'POST':
        # Parse the CSV data from the request body
        body = json.loads(request.body)
        csv_data = body['csv_data']

        lst = list()
        for row in csv_data[1:]:
            dct = dict()
            if row[0] == '':
                continue
            dct[csv_data[0][0]] = row[0]
            dct[csv_data[0][-1]] = row[-1]
            dct[csv_data[0][1]] = str([x.strip('"') for x in row[1:-1]])
            lst.append(dct)
        df = pd.DataFrame(lst)
        df[csv_data[0][-1]] = pd.to_datetime(df[csv_data[0][-1]])
        
        conn = sqlite3.connect('object.db')
        table_name = 'objecttable'
        df.to_sql(table_name, conn, if_exists='replace', index=False)
        conn.close()
        return JsonResponse({'status': 'success'})
    else:
        return JsonResponse({'error': 'Invalid request method'})
    

def results_db(request):
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')
    print(start_date, end_date)

    conn = sqlite3.connect('object.db')
    df = pd.read_sql_query('''SELECT * from objecttable
                            where timestamp between '{}' and '{}' '''
                           .format(start_date, end_date), conn)
    

    result_dict = df.to_dict('records')
    lst = list()
    report_lst = list()
    for row in result_dict:
        dct = dict()
        dct['image_name'] = row['image_name']
        dct['timestamp'] = row['timestamp']
        dct['objects_detected'] = ", ".join(ast.literal_eval(row['objects_detected']))
        lst.append(dct)
        for RP in dct['objects_detected'].split(','):
            report_lst.append(RP)
    report_df = pd.Series(report_lst).value_counts().reset_index().rename(columns={'index':'threat', 0:'occurance'})
    print(report_df)
    report_df.to_csv(r'report.csv', index=False)
    return JsonResponse({'results': lst})
 