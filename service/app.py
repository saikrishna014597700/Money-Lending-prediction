from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource, fields
from sklearn.externals import joblib
import numpy as np
import pickle
# import joblib

flask_app = Flask(__name__)
app = Api(app = flask_app, 
          version = "1.0", 
          title = "ML React App", 
          description = "Predict results using a trained model")

name_space = app.namespace('prediction', description='Prediction APIs')

model = app.model('Prediction params', 
                  {'textField1': fields.String(required = True, 
                                               description="Text Field 1", 
                                               help="Text Field 1 cannot be blank"),
                  'textField2': fields.String(required = True, 
                                               description="Text Field 2", 
                                               help="Text Field 2 cannot be blank"),
                  'select1': fields.Integer(required = True, 
                                            description="Select 1", 
                                            help="Select 1 cannot be blank"),
                  'select2': fields.Integer(required = True, 
                                            description="Select 2", 
                                            help="Select 2 cannot be blank"),
                  'select3': fields.Integer(required = True, 
                                            description="Select 3", 
                                            help="Select 3 cannot be blank")})

# loaded_model = pickle.load(open('final.pkl', 'rb'))


# classifier = joblib.load('classifier.joblib')
def endresult(data):
    print("in endresult")
    k=np.zeros(120)
    # for i in data:
    #     print(type(i))
    k[0]=float(data[0])
    k[1]=data[1]              #in months
    k[2]=float(data[2])
    k[3]=float(data[3])
    k[4]=float(data[4])
    k[5]=data[5]                #debt to income ratio
    k[6]=float(data[6])   #date (YYYY)
    k[7]=float(data[7])
    k[8]=float(data[8])
    k[9]=float(data[9])
    k[10]=float(data[10])
    k[11]=float(data[11])
    k[12]=float(data[12])
    k[13]=np.log10(float(data[13])+1)   #income
    k[14]=float(data[14])
    k[15]=np.log10(float(data[15])+1)
    
    print("data is",data)
    grades={"A2":16,"A3":17,"A4":18,"A5":19,"B1":20,"B2":21,"B3":22,"B4":23,"B5":24,"C1":25,"C2":26,"C3":27,"C4":28,"C5":29
        ,"D1":30,"D2":31,"D3":32,"D4":33,"D5":34,"E1":35,"E2":36,"E3":37,"E4":38,"E5":39,"F1":40,"F2":41,"F3":42,"F4":43
            ,"F5":44,"G1":45,"G2":46,"G3":47,"G4":48,"G5":49}
    
    k[grades[data[16]]]=1
    
    home={"OTHER":50,"OWN":51,"RENT":52}
    
    k[home[data[17]]]=1
    
    verification={"Source Verified":53,"Verified":54}
    
    k[verification[data[18]]]=1
    
    purposes={"credit card":55,"debt consolidation":56,"educational":57,"home improvement":58,"house":59,"major purchase":60
            ,"medical":61,"moving":62,"other":63,"renewable energy":64,"small business":65,"vacation":66,
            "wedding":67}
    
    k[purposes[data[19]]]=1
    
    states={"AL":68,"AR":69,"AZ":70,"CA":71,"CO":72,"CT":73,"DC":74,"DE":75,"FL":76,"GA":77,"HI":78,"IA":79,"ID":80,"IL":81
            ,"IN":82,"KS":83,"KY":84,"LA":85,"MA":86,"MD":87,"ME":88,"MI":89,"MN":90,"MO":91,"MS":92,"MT":93,"NC":94,
            "ND":95,"NE":96,"NH":97,"NJ":98,"NM":99,"NV":100,"NY":101,"OH":102,"OK":103,"OR":104,"PA":105,"RI":106,"SC":107
            ,"SD":108,"TN":109,"TX":110,"UT":111,"A":112,"VT":113,"WA":114,"WI":115,"WV":116,"WY":117}
    
    k[states[data[20]]]=1
    
    #initial listing status
    k[118]=1
    
    if data[21]=="joint":
        k[119]=1
    else:
        k[119]=0
        
    k=k.reshape(1,-1)
    # print("k is",k)
    

    loaded_model = pickle.load(open('final.pkl', 'rb'))

    # loaded_model = joblib.load('grad1.pkl')
    
    result = loaded_model.predict(k)
    
    print("result is",result)
    
    result_prob= loaded_model.predict_proba(k)[:,1]
    print(str(result_prob))
    arr=[result,result_prob]
    return arr

@name_space.route("/")
class MainClass(Resource):

    def options(self):
        
        
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "*")
        return response
    

    @app.expect(model)      
    def post(self):
        try: 
            formData = request.json
            data = [val for val in formData.values()]
            print("Hii RA")
            
            response = jsonify({
                "statusCode": 200,
                "status": "Prediction made",
                "result": "Prediction: " + str(endresult(data))
                })
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        except Exception as error:
            return jsonify({
                "statusCode": 500,
                "status": "Could not make prediction",
                "error": str(error)
            })