
let loginHelper = async (page, autoLogin, sleepTime, functionSwitchSpa) => {

    let autoDefaultValue = []
    const loginUrl = autoLogin.url
    // 登录模拟
    try{
        for (const key in autoLogin) {
            if (key != 'url') {
                const autoNameType = autoLogin[key]; // 该标签下的所有的值
                for (const autoType in autoNameType) {
                    // 获取标签中的值
                    const autoValue = autoNameType[autoType]
                    if (autoType) {
                        await page.type(`input[${key}=${autoType}]`, autoValue);
                    }
                    else {
                        
                        autoDefaultValue.push({autoType: key})
                    }
                }
                
            }
        }
    
        await page.evaluate((loginUrl, autoDefaultValue, sleepTime, functionSwitchSpa) => {
            (async () => {
                
                function sleep(ms) {
                    return new Promise(resolve => setTimeout(resolve, ms));
                }

                for (const inputName in autoDefaultValue) {
                    // 赋值默认值
                    const valueInput = document.querySelector(`input[${autoDefaultValue[inputName]}=${inputName}]`);
                    if (valueInput) {
                        valueInput.value = valueInput.defaultValue;
                    }
                }
                let nodeListSubmit = document.querySelectorAll("[type=submit]");
                if (nodeListSubmit.length == 0){
                    nodeListSubmit = document.querySelectorAll("[type=button]");
                }

                for (let node of nodeListSubmit) {
                    try {
                        // debugger;
                        await sleep(sleepTime);
                        await node.click();
                        if (functionSwitchSpa){
                            const xpath = window.__PROBE__.getXpathSelector(node);
                            console.log(JSON.stringify({[`XpathCorrespondUrl------>${xpath}`]: {"xpath": xpath, "displayName": node.innerText, "url": loginUrl}}));
                        }
                        
                    } catch (e) {
                        console.error(e);
                    }
                }

                return xpathList
            })();
        }, loginUrl, autoDefaultValue, sleepTime, functionSwitchSpa);
    }catch{}
}

module.exports = loginHelper;