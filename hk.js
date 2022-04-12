const puppeteer=require('puppeteer');
const link='https://www.hackerrank.com/auth/login';
const id='yuvrajsingh6685@gmail.com';
const password='hanuman5202';
let page;
const codeObj=require("./codes.js")

let browserOpen=puppeteer.launch({
    headless:false,
    args :['--start-maximized'],
    defaultViewport:null
})
browserOpen.then(function(browser){
    let browserOpenPromise=browser.newPage();
    return browserOpenPromise;
}).then(function(newTab){
    page=newTab
    let hackerrankOpenPromise=page.goto(link)
    return hackerrankOpenPromise;
 }).then(function(){
    let emailEntered=page.type("input[id='input-1']",id,{delay : 40});
    return emailEntered;
 }).then(function(){
     let passwordEntered=page.type("input[type='password']",password,{delay :50})
     return passwordEntered;
 }).then(function(){
     let loginButtonCicked=page.click("button[data-analytics='LoginPassword']",{delay :50})
     return loginButtonCicked;
 }).then(function(){
    let clickAlgoPromise=waitAndClick('.topic-card a[data-attr1="algorithms"]',page)
    return clickAlgoPromise;
}).then(function(){
    let getToWarmUp=waitAndClick('input[value="warmup"]',page)
    return getToWarmUp;
}).then(function(){
    let waitForsecond=page.waitFor(3000);
    return waitForsecond;
}).then(function(){
    let ChallengesPromise=page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{delay :50});
    return ChallengesPromise;
}).then(function(questionArr){
    console.log('no. of questions : ',questionArr.length);
    let questionWillBeSolved=questionSolver(page,questionArr[0],codeObj.answers[0]);
    return questionWillBeSolved;
})





function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
    let waitForModelPromise=cPage.waitForSelector(selector)
    waitForModelPromise.then(function(){
    let clickModel=cPage.click(selector)
    return clickModel;
    }).then(function(){
    resolve()
    }).catch(function(err){
         reject();
    })

    })
}

function questionSolver(page,question,answer){
    return new Promise(function(resolve,reject){
        let questionwillbeClicked=question.click()
        return questionwillbeClicked.then(function(){
            let EditorInFocus=waitAndClick('.monaco-editor.no-user-select.vs',page)
            return EditorInFocus;
        }).then(function(){
            return waitAndClick('.checkbox-input',page)
        }).then(function(){
            return page.waitForSelector('textarea.custominput',page)
        }).then(function(){
            return page.type('textarea.custominput',answer,{delay:3})
        }).then(function(){
            let ctrlIsPressed=page.keyboard.down('Control')
            return ctrlIsPressed;
        }).then(function(){
            let AIsPressed=page.keyboard.press('A',{delay:100})
            return AIsPressed;
        }).then(function(){
            let XIsPressed=page.keyboard.press('X',{delay:100})
            return XIsPressed;
        }).then(function(){
            let ctrlIsPressed=page.keyboard.up('Control')
            return ctrlIsPressed;
        }).then(function(){
            let mainEditorInfocus=waitAndClick('.monaco-editor.no-user-select.vs',page)
            return mainEditorInfocus;
        }).then(function(){
            let ctrlIsPressed=page.keyboard.down('Control')
            return ctrlIsPressed;
        }).then(function(){
            let AIsPressed=page.keyboard.press('A',{delay:100})
            return AIsPressed;
        }).then(function(){
            let VIsPressed=page.keyboard.press('V',{delay:100})
            return VIsPressed;
        }).then(function(){
            let ctrlIsPressed=page.keyboard.up('Control')
            return ctrlIsPressed;
        }).then(function(){
            return page.click('.hr-monaco__run-code',{delay:50});
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}