run:
	find . \( -name '*.py' -o -name '*.env' \) | entr -r flask --app main run --port=8080

run-public:
	find . \( -name '*.py' -o -name '*.env' \) | entr -r flask --app main run --port=8080 --host=192.168.0.105
