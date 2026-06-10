from flask import Flask, request, jsonify

app = Flask(__name__)

# In-memory data store
tasks = []

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks), 200

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    task = data.get('task')
    if task:
        tasks.append(task)
        return jsonify({'message': 'Task added'}), 201
    return jsonify({'error': 'No task provided'}), 400

@app.route('/tasks/<int:index>', methods=['DELETE'])
def delete_task(index):
    if 0 <= index < len(tasks):
        removed = tasks.pop(index)
        return jsonify({'message': 'Task deleted', 'task': removed}), 200
    return jsonify({'error': 'Invalid index'}), 404

if __name__ == '__main__':
    app.run(debug=True)
