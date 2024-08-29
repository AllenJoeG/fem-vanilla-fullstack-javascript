
curl -i http://localhost:3000/users

echo
echo
echo

curl \
  --silent \
  -i \
  -X POST \
  -d '{"name": "human", "age": 17, "email": "human@human.com" }' \
  http://localhost:3000/users