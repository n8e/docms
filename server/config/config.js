module.exports = {
  "database": 'mongodb://localhost/docms' || 'mongodb://root:abc123@ds027749.mongolab.com:27749/userstory',
  "port": process.env.PORT || 3000,
  "secretKey": "YourSecretKey"
};