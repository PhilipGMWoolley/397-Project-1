from flask import Flask, jsonify, request
from flask_cors import CORS

app=Flask(__name__)
CORS(app)

class Input():
	def __init__(self, cytogenetics, bm_blast, hemoglobin, platelets, anc):
		self.cytogenetics = cytogenetics
		self.bm_blast = bm_blast
		self.hemoglobin = hemoglobin
		self.platelets = platelets
		self.anc = anc




@app.route('/')
def index():
    #this is where we load the index page with the form on it
    return jsonify("hello world")
	
@app.route('/score', methods=['POST'])
def receive_input():
	input = Input('', 0, 0 ,0 ,0)
	content=request.get_json()
	input.cytogenetics = content["cytogenetics"]
	temp1 = content["bm_blast"]
	input.bm_blast = int(temp1)
	temp2 = content["hemoglobin"]
	input.hemoglobin = int(temp2)
	temp3 = content["platelets"]
	input.platelets = int(temp3)
	temp4 = content["anc"]
	input.anc = int(temp4)
	return calculate_score(input.cytogenetics, input.bm_blast, input.hemoglobin, input.platelets, input.anc)

def calculate_score(cytogenetics: str, bm_blast: int, hemoglobin: int,
         platelets: int, anc: int):
    """Calculates both the IPSS-R score and category. See ipssr_scorer for
    parameter description.

    Returns:
        IPSS-R score (int) and category (string).
    """

    score = ipssr_scorer(cytogenetics, bm_blast, hemoglobin, platelets, anc)
    return jsonify(Score=score, Category=category(score))


def ipssr_scorer(cytogenetics: str, bm_blast: int, hemoglobin: int,
                 platelets: int, anc: int):
    """Calculates the risk of Myelodysplastic Syndromes based on the Revised
    International Prognostic Scoring System (IPSS-R).

    Args:
        cytogenetics: Cytogenetic prognostic subgroup (categorical). Valid
          categories are "Very Good," "Good," "Intermediate," "Poor," and
          "Very Poor."
        bm_blast: Bone marrow (BM) blast (percent). Typical range is 0-30%.
        hemoglobin: Hemoglobin (g/dL). Typical range is 4-20 g/dL.
        platelets: Platelet count (10^9/L). Typical range is 0-2000*10^9 L.
        anc: Absolute neutrophil count (10^9/L). Typical range is 0-15*x10^9 L.

    Raises:
        KeyError: Invalid cytogenetic category.
        TypeError: Cytogenetic category must be string and all else integers.

    Returns:
        IPSSR numerical score. A lower score correlates to a lower risk.
    """

    cyto_dict = {'very good': 0,
                 'good': 1,
                 'intermediate': 2,
                 'poor': 3,
                 'very poor': 4,
                 }

    prognostic = 0

    try:
        prognostic = cyto_dict[str.lower(cytogenetics)]
    except KeyError:
        print('Valid cytogenetic values:' + str(list(cyto_dict.keys())))
    except TypeError:
        print('Cytogenetic value must be a string.')

    try:
        if 2 < bm_blast < 5:
            prognostic += 1
        elif 5 <= bm_blast <= 10:
            prognostic += 2
        elif bm_blast > 10:
            prognostic += 3

        if 8 <= hemoglobin < 10:
            prognostic += 1
        elif hemoglobin < 8:
            prognostic += 1.5

        if 50 <= platelets < 100:
            prognostic += 0.5
        elif platelets < 50:
            prognostic += 1

        if anc < 0.8:
            prognostic += 0.5
    except TypeError:
        print('BM blast, hemoglobin, and platelets must all be integers.')
    return prognostic


def category(ipssr_score: int):
    """Determine the category based on the IPSS-R.

    Raises:
        TypeError: ipssr_score must be an integer.

    Returns:
        IPSS-R category as a string.
    """
    try:
        if ipssr_score <= 1.5:
            return 'Very Low'
        elif 1.5 < ipssr_score <= 3:
            return 'Low'
        elif 3 < ipssr_score <= 4.5:
            return 'Intermediate'
        elif 4.5 < ipssr_score <= 6:
            return 'High'
        return 'Very High'
    except TypeError:
        print('IPSS-R score must be an integer.')
