const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const { Directive } = require("domelementtype");
const pdfkit = require("pdfkit");

function getIssuesHtml(url, topic, repoName){
    request(url, function(error, response, html){
        if(error){
            console.log(error);
        }
        else{
            getIssues(html);
        }
    })

    function getIssues(html){
        let $ = cheerio.load(html);
        let issuesArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        let arr = [];
        for(let i = 0;i < issuesArr.length;i++){
            let link = $(issuesArr[i]).attr('href');
            arr.push(link);
        }
        let folderPath = path.join(__dirname, topic);
        dirCreator(folderPath);
        let filePath = path.join(folderPath, repoName + ".pdf");
        let text = JSON.stringify(arr);
        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();
    }
}

module.exports = getIssuesHtml;
function dirCreator(folderPath){
    if(fs.existsSync(folderPath) == false){
        fs.mkdirSync(folderPath);
    }
}