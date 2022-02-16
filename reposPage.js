const path = require("path");
const fs = require("fs");
const request = require("request");
const { head } = require("request");
const cheerio = require("cheerio");
const getIssuesHtml = require("./issues");

function getReposPageHtml(url, topic){
    request(url, function(error, response, html){
        if(error){
            console.log(error);
        }
        else{
            getRepo(html);
        }
    })

    function getRepo(html){
        let $ = cheerio.load(html);
        let headingArr = $(".f3.color-fg-muted.text-normal.lh-condensed");

        for(let i = 0;i < 8;i++){
            let twoAnchors = $(headingArr[i]).find('a');
            let link = $(twoAnchors[1]).attr('href');
            let fullLink = "https://www.github.com/" + link + "/issues";
            let repoName = link.split("/").pop();
            getIssuesHtml(fullLink, topic, repoName);
            console.log(fullLink);
        }
    }
}

module.exports = getReposPageHtml;