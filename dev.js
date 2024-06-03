const fs = require('fs')
const path = require('path')

const filename = path.join(__dirname, 'largefile.txt')
const numberOfLines = 5000
const lineContent =
  '27788765138#####https://tgames.bcsocial.net/#tgWebAppData=query_id%3DAAFiKfM-AgAAAGIp8z4d9S9s%26user%3D%257B%2522id%2522%253A5351090530%252C%2522first_name%2522%253A%2522Ma-CodeR%25C2%25AE%2522%252C%2522last_name%2522%253A%2522%2522%252C%2522username%2522%253A%2522macoder7%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26auth_date%3D1717421291%26hash%3D47ce44d0529ca5fdd53ea35010ad54b3e83615dd26540e364d3a31458f2a892f&tgWebAppVersion=6.7&tgWebAppPlatform=android&tgWebAppSideMenuUnavail=1'
const lineBreak = '\n'

// Create a write stream
const writeStream = fs.createWriteStream(filename)

// Write 5000 lines to the file
for (let i = 0; i < numberOfLines; i++) {
  writeStream.write(lineContent + lineBreak)
}

// Close the stream
writeStream.end(() => {
  console.log(`File ${filename} has been created with ${numberOfLines} lines.`)
})
