const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio");
const request = require("request");
const url = "https://github.com/topics";
const pdfkit = require("pdfkit");
const getReposPageHtml = require("./reposPage");

request(url, cb);
function cb(error, response, html){
    if(error){
        console.log(error);
    }
    else{
        getTopicLinks(html);
    }
}

function getTopicLinks(html){
    let $ = cheerio.load(html);
    let topicElem = $(".no-underline.d-flex.flex-column.flex-justify-center");
    for(let i = 0;i < topicElem.length;i++){
        let link = $(topicElem[i]).attr('href');
        let topic = link.split("/").pop();
        let fullLink = "https://github.com/" + link;
        console.log(fullLink);

        getReposPageHtml(fullLink, topic);
    }
}