from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector


app = Flask(__name__)
# Abilita CORS su tutte le route per permettere ad Angular (es. localhost:4200) di accedere ai dati
CORS(app)


# CONFIGURAZIONE CONNESSIONE TiDB / MYSQL
def get_db_connection():
    return mysql.connector.connect(
        host="gateway01.eu-central-1.prod.aws.tidbcloud.com",        # Es: gateway01.eu-central-1.prod.aws.tidbcloud.com o localhost
        user="4YczBAy4EkXu3NC.root",          # Es: root o l'utente creato su TiDB Cloud
        password="NxDXZfoRtXspjiX4",
        database="scuola",
        port=4000                      # TiDB Cloud usa solitamente la porta 4000 (MySQL standard usa 3306)
    )


# Funzione ausiliaria per convertire i risultati delle query (tuple) in dizionari JSON (chiave-valore)
def query_to_json(sql, params=None):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True) # Specifica dictionary=True per ottenere chiavi come i nomi delle colonne
    try:
        cursor.execute(sql, params or ())
        result = cursor.fetchall()
        return result
    except Exception as e:
        print(f"Errore Query: {e}")
        return []
    finally:
        cursor.close()
        conn.close()


# ----------------- ROUTE API PER ANGULAR -----------------


# 1. Seleziona tutte le classi (Tabella: classi)
@app.route('/api/classi', methods=['GET'])
def get_classi():
    sql = "SELECT id_classe, nome, sezione, indirizzo, id_anno FROM classi"
    res = query_to_json(sql)
    return jsonify(res)


# 2. Seleziona una singola classe per ID
@app.route('/api/classi/<int:id_classe>', methods=['GET'])
def get_classe_by_id(id_classe):
    sql = "SELECT id_classe, nome, sezione, indirizzo, id_anno FROM classi WHERE id_classe = %s"
    res = query_to_json(sql, (id_classe,))
    if len(res) > 0:
        return jsonify(res[0]) # Ritorna l'oggetto singolo anziché l'array
    return jsonify({"error": "Classe non trovata"}), 404


# 3. Seleziona gli studenti filtrati per id_classe (Tabella: studenti)
@app.route('/api/studenti', methods=['GET'])
def get_studenti():
    id_classe = request.args.get('id_classe')
    if id_classe:
        sql = "SELECT id_studente, cognome, nome, codice_fiscale, data_nascita, id_classe FROM studenti WHERE id_classe = %s"
        res = query_to_json(sql, (id_classe,))
    else:
        sql = "SELECT id_studente, cognome, nome, codice_fiscale, data_nascita, id_classe FROM studenti"
        res = query_to_json(sql)
    return jsonify(res)


# 4. Seleziona il profilo anagrafico di un singolo studente
@app.route('/api/studenti/<int:id_studente>', methods=['GET'])
def get_studente_by_id(id_studente):
    sql = "SELECT id_studente, cognome, nome, codice_fiscale, data_nascita, id_classe FROM studenti WHERE id_studente = %s"
    res = query_to_json(sql, (id_studente,))
    if len(res) > 0:
        return jsonify(res[0])
    return jsonify({"error": "Studente non trovato"}), 404


# 5. Seleziona l'orario/insegnamenti filtrati per id_classe (Tabella: insegnamenti)
@app.route('/api/insegnamenti', methods=['GET'])
def get_insegnamenti():
    id_classe = request.args.get('id_classe')
    if id_classe:
        sql = "SELECT id_insegnamento, id_docente, id_materia, id_classe, giorno, ora_inizio, ora_fine FROM insegnamenti WHERE id_classe = %s"
        res = query_to_json(sql, (id_classe,))
        return jsonify(res)
    return jsonify([])


# 6. Seleziona i voti filtrati per id_studente (Tabella: voti)
@app.route('/api/voti', methods=['GET'])
def get_voti():
    id_studente = request.args.get('id_studente')
    if id_studente:
        sql = "SELECT id_voto, valore, data, tipo_verifica, nota, id_studente, id_insegnamento FROM voti WHERE id_studente = %s ORDER BY data DESC"
        res = query_to_json(sql, (id_studente,))
        return jsonify(res)
    return jsonify([])


# 7. Seleziona le assenze filtrate per id_studente (Tabella: assenze)
@app.route('/api/assenze', methods=['GET'])
def get_assenze():
    id_studente = request.args.get('id_studente')
    if id_studente:
        sql = "SELECT id_assenza, data, tipo, giustificata, nota, id_studente FROM assenze WHERE id_studente = %s ORDER BY data DESC"
        res = query_to_json(sql, (id_studente,))
        return jsonify(res)
    return jsonify([])


# Avvio dell'applicazione sulla porta 3000 (coerente con l'apiUrl impostato nel ScuolaService di Angular)
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)
